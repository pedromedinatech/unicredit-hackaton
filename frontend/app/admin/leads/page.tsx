"use client";

import { useRef, useState } from "react";
import { Header } from "@/components/ui/Header";
import { Lead } from "@/lib/leadTypes";
import { Users, RefreshCw, Phone, Clock, TrendingUp, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

const API_BASE =
  process.env.NEXT_PUBLIC_COACH_API_URL?.replace("/api/chat", "") ??
  "http://localhost:3001";

const STATUSES = ["new", "contacted", "converted", "dismissed"] as const;
type Status = (typeof STATUSES)[number];

const SEGMENT_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  CONSERVATIVE: { label: "Conservative", color: "text-emerald-700", bg: "bg-emerald-50" },
  BALANCED:     { label: "Balanced",     color: "text-blue-700",    bg: "bg-blue-50"    },
  GROWTH:       { label: "Growth",       color: "text-orange-700",  bg: "bg-orange-50"  },
  AGGRESSIVE:   { label: "High Risk",    color: "text-red-700",     bg: "bg-red-50"     },
};

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string }> = {
  new:       { label: "New",       color: "text-blue-700",    bg: "bg-blue-50"   },
  contacted: { label: "Contacted", color: "text-yellow-700",  bg: "bg-yellow-50" },
  converted: { label: "Converted", color: "text-emerald-700", bg: "bg-emerald-50"},
  dismissed: { label: "Dismissed", color: "text-gray-500",    bg: "bg-gray-50"   },
};

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const isToday = d.toDateString() === today.toDateString();
  if (isToday) return `Today, ${d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) +
    " · " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function StatusDropdown({ lead, onStatusChange }: { lead: Lead; onStatusChange: (id: number, s: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const st = STATUS_CONFIG[lead.status as Status] ?? { label: lead.status, color: "text-gray-600", bg: "bg-gray-50" };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-2 rounded-full pl-3.5 pr-5 py-1.5 text-xs font-semibold ${st.bg} ${st.color}`}
      >
        {st.label}
        <ChevronDown size={11} strokeWidth={2.5} />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-10 min-w-[130px] overflow-hidden rounded-xl border border-unicredit-line bg-white shadow-lg">
          {STATUSES.map((s) => {
            const cfg = STATUS_CONFIG[s];
            return (
              <button
                key={s}
                onClick={() => { onStatusChange(lead.id, s); setOpen(false); }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-unicredit-mist ${lead.status === s ? `${cfg.bg} ${cfg.color}` : "text-unicredit-navy"}`}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LeadCard({ lead, onStatusChange }: { lead: Lead; onStatusChange: (id: number, s: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const seg = SEGMENT_CONFIG[lead.segment ?? ""] ?? { label: lead.segment ?? "Unknown", color: "text-gray-600", bg: "bg-gray-50" };

  return (
    <div className="rounded-2xl border border-unicredit-line bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 p-5">
        {/* Avatar */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-unicredit-red/10 text-sm font-bold text-unicredit-red">
          {initials(lead.name)}
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-unicredit-navy">{lead.name}</h3>
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${seg.bg} ${seg.color}`}>
              {seg.label}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <p className="text-xs text-unicredit-navy/55 flex items-center gap-1">
              <Clock size={11} strokeWidth={2} />
              {formatDate(lead.created_at)}
            </p>
            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="inline-flex items-center gap-1 rounded-full bg-unicredit-red/10 px-2.5 py-0.5 text-xs font-semibold text-unicredit-red hover:bg-unicredit-red hover:text-white transition-colors"
              >
                <Phone size={11} strokeWidth={2.2} />
                {lead.phone}
              </a>
            )}
          </div>
          {lead.advisor_reason && (
            <p className="mt-2 text-sm text-unicredit-navy/75 leading-snug">
              {lead.advisor_reason}
            </p>
          )}
        </div>

        {/* Status + actions */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <StatusDropdown lead={lead} onStatusChange={onStatusChange} />
          {lead.conversation_summary && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1 text-[11px] text-unicredit-navy/45 hover:text-unicredit-red"
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {expanded ? "Hide" : "View conversation"}
            </button>
          )}
        </div>
      </div>

      {/* Expandable conversation */}
      {expanded && lead.conversation_summary && (
        <div className="border-t border-unicredit-line px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-unicredit-navy/40 mb-2">Conversation summary</p>
          <p className="text-xs text-unicredit-navy/70 leading-relaxed whitespace-pre-wrap">
            {lead.conversation_summary}
          </p>
        </div>
      )}
    </div>
  );
}

export default function AdminLeadsPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchLeads(pwd: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        headers: { "x-admin-password": pwd },
      });
      if (res.status === 401) { setError("Incorrect password."); return; }
      if (!res.ok) throw new Error("Server error.");
      setLeads(await res.json());
      setAuthenticated(true);
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    await fetch(`${API_BASE}/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ status }),
    });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  if (!authenticated) {
    return (
      <>
        <Header />
        <main className="flex flex-1 items-center justify-center bg-unicredit-mist px-4">
          <div className="w-full max-w-sm rounded-2xl border border-unicredit-line bg-white p-8 shadow-card">
            <div className="flex items-center gap-2">
              <Users size={20} strokeWidth={2} className="text-unicredit-red" />
              <h1 className="text-lg font-bold text-unicredit-navy">Call Center Dashboard</h1>
            </div>
            <p className="mt-1 text-xs text-unicredit-navy/50">UniCredit internal access only</p>
            <div className="mt-6 flex flex-col gap-3">
              <input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchLeads(password)}
                className="w-full rounded-xl border border-unicredit-line px-4 py-3 text-sm text-unicredit-navy placeholder:text-unicredit-navy/40 focus:border-unicredit-red focus:outline-none focus:ring-2 focus:ring-unicredit-red/20"
              />
              {error && <p className="text-xs text-unicredit-red">{error}</p>}
              <button
                onClick={() => fetchLeads(password)}
                disabled={loading || !password}
                className="rounded-xl bg-unicredit-red px-4 py-3 text-sm font-semibold text-white hover:bg-unicredit-red-dark disabled:opacity-50"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  const counts = {
    new:       leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-unicredit-mist px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl">

          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-unicredit-navy">Lead Pipeline</h1>
              <p className="mt-0.5 text-sm text-unicredit-navy/55">{leads.length} client{leads.length !== 1 ? "s" : ""} requested advisor contact</p>
            </div>
            <button
              onClick={() => fetchLeads(password)}
              className="inline-flex items-center gap-2 rounded-full border border-unicredit-line bg-white px-4 py-2 text-xs font-semibold text-unicredit-navy hover:border-unicredit-red hover:text-unicredit-red"
            >
              <RefreshCw size={12} strokeWidth={2.2} />
              Refresh
            </button>
          </div>

          {/* Stats row */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            {[
              { label: "To call",   value: counts.new,       icon: Phone,        color: "text-blue-600",    bg: "bg-blue-50"    },
              { label: "Contacted", value: counts.contacted,  icon: Clock,        color: "text-yellow-600",  bg: "bg-yellow-50"  },
              { label: "Converted", value: counts.converted,  icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-unicredit-line bg-white px-5 py-4">
                <div className={`rounded-xl p-2 ${bg}`}>
                  <Icon size={16} strokeWidth={2} className={color} />
                </div>
                <div>
                  <p className="text-xl font-bold text-unicredit-navy">{value}</p>
                  <p className="text-xs text-unicredit-navy/50">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Lead cards */}
          {leads.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-unicredit-line bg-white p-12 text-center">
              <TrendingUp size={32} className="mx-auto text-unicredit-navy/20" strokeWidth={1.5} />
              <p className="mt-3 text-sm text-unicredit-navy/50">No leads yet. They will appear here when clients request advisor contact.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {leads.map((lead) => (
                <LeadCard key={lead.id} lead={lead} onStatusChange={updateStatus} />
              ))}
            </div>
          )}

        </div>
      </main>
    </>
  );
}
