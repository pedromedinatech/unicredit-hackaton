"use client";

import { useState } from "react";
import { Header } from "@/components/ui/Header";
import { Lead } from "@/lib/leadTypes";
import { Users, RefreshCw } from "lucide-react";

const API_BASE =
  process.env.NEXT_PUBLIC_COACH_API_URL?.replace("/api/chat", "") ??
  "http://localhost:3001";

const STATUSES = ["new", "contacted", "converted", "dismissed"] as const;
type Status = (typeof STATUSES)[number];

const STATUS_COLORS: Record<Status, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-green-100 text-green-700",
  dismissed: "bg-gray-100 text-gray-500",
};

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
      if (res.status === 401) {
        setError("Incorrect password.");
        return;
      }
      if (!res.ok) throw new Error("Server error.");
      const data = await res.json();
      setLeads(data as Lead[]);
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
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ status }),
    });
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l)),
    );
  }

  if (!authenticated) {
    return (
      <>
        <Header />
        <main className="flex flex-1 items-center justify-center bg-unicredit-mist px-4">
          <div className="w-full max-w-sm rounded-2xl border border-unicredit-line bg-white p-8 shadow-card">
            <div className="flex items-center gap-2 text-unicredit-red">
              <Users size={20} strokeWidth={2} />
              <h1 className="text-lg font-bold text-unicredit-navy">Call Center Dashboard</h1>
            </div>
            <p className="mt-1 text-xs text-unicredit-navy/60">UniCredit internal access only</p>
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

  return (
    <>
      <Header />
      <main className="flex-1 bg-unicredit-mist px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-unicredit-navy">Lead Pipeline</h1>
              <p className="mt-1 text-sm text-unicredit-navy/60">
                {leads.length} lead{leads.length !== 1 ? "s" : ""} total
              </p>
            </div>
            <button
              onClick={() => fetchLeads(password)}
              className="inline-flex items-center gap-2 rounded-full border border-unicredit-line bg-white px-4 py-2 text-xs font-semibold text-unicredit-navy hover:border-unicredit-red hover:text-unicredit-red"
            >
              <RefreshCw size={13} strokeWidth={2.2} />
              Refresh
            </button>
          </div>

          {leads.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-unicredit-line bg-white p-12 text-center">
              <Users size={32} className="mx-auto text-unicredit-navy/20" strokeWidth={1.5} />
              <p className="mt-3 text-sm text-unicredit-navy/50">No leads yet. They will appear here when clients request advisor contact.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-unicredit-line bg-white shadow-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-unicredit-line bg-unicredit-mist text-left text-[11px] font-semibold uppercase tracking-wider text-unicredit-navy/60">
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Age / Employment</th>
                    <th className="px-5 py-3">Income / Savings</th>
                    <th className="px-5 py-3">Goals</th>
                    <th className="px-5 py-3">Risk</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-unicredit-line">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-unicredit-mist/50">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-unicredit-navy">{lead.name}</p>
                        {lead.advisor_reason && (
                          <p className="mt-0.5 text-[11px] text-unicredit-navy/50 italic">{lead.advisor_reason}</p>
                        )}
                      </td>
                      <td className="px-5 py-4 text-unicredit-navy/80">
                        <p>{lead.age ?? "—"} y/o</p>
                        <p className="text-xs text-unicredit-navy/55">{lead.employment_status ?? "—"}</p>
                      </td>
                      <td className="px-5 py-4 text-unicredit-navy/80">
                        <p>€{lead.monthly_income ?? "—"}/mo</p>
                        <p className="text-xs text-unicredit-navy/55">Savings: €{lead.savings ?? "—"}</p>
                      </td>
                      <td className="px-5 py-4 max-w-[180px]">
                        <p className="text-xs text-unicredit-navy/70 leading-relaxed">
                          {lead.goals?.join(", ") ?? "—"}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-unicredit-mist px-2 py-0.5 text-xs font-medium text-unicredit-navy">
                          {lead.risk_tolerance ?? "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-unicredit-navy/55 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
                        })}
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value)}
                          className={`rounded-full border-0 px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-unicredit-red/30 ${STATUS_COLORS[lead.status as Status] ?? "bg-gray-100 text-gray-600"}`}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
