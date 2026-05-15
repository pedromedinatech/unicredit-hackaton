"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Composer } from "./Composer";
import {
  FollowupChips,
  MessageBubble,
  type MessagePayload,
} from "./MessageBubble";
import { ThinkingArc } from "./ThinkingArc";
import { AdvisorCTA } from "./AdvisorCTA";
import type { RecommendationCard } from "./ProductCard";
import {
  appendMessage,
  updateChatTitle,
  type StoredMessage,
} from "@/lib/demoStore";
import type { UserProfile } from "@/lib/userProfile";

const API_BASE =
  process.env.NEXT_PUBLIC_COACH_API_URL?.replace("/api/chat", "") ??
  "http://localhost:3001";

const COACH_ENDPOINT = `${API_BASE}/api/chat`;
const LEADS_ENDPOINT = `${API_BASE}/api/leads`;

const EXAMPLES = [
  "I want to save money for a trip to Italy.",
  "Should I pay down my credit card or invest?",
  "What's the best UniCredit product for an emergency fund?",
];

type CoachResponse = {
  response?: string;
  recommendations?: RecommendationCard[];
  options?: string[];
  followups?: string[];
  needs_human_advisor?: boolean;
  advisor_reason?: string | null;
  suggest_advisor?: boolean;
};

export function ChatClient({
  chatId,
  profile,
  initialMessages,
}: {
  chatId: string;
  profile: UserProfile;
  initialMessages: StoredMessage[];
}) {
  const [messages, setMessages] = useState<MessagePayload[]>(() =>
    initialMessages.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      recommendations: m.recommendations ?? null,
    })),
  );
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [followups, setFollowups] = useState<string[]>([]);
  const [advisor, setAdvisor] = useState<string | null>(null);
  const [showAdvisorCTA, setShowAdvisorCTA] = useState(false);
  const [advisorSubmitting, setAdvisorSubmitting] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const firstMessageRef = useRef<boolean>(initialMessages.length === 0);
  const advisorOffered = useRef<boolean>(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, pending, showAdvisorCTA]);

  const send = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || pending) return;
      setError(null);
      setOptions([]);
      setFollowups([]);
      setAdvisor(null);

      const userMsg: MessagePayload = {
        id: `local-${Date.now()}`,
        role: "user",
        content: text,
      };
      setMessages((prev) => [...prev, userMsg]);
      appendMessage({ chat_id: chatId, role: "user", content: text });
      if (firstMessageRef.current) {
        const title = text.length > 60 ? `${text.slice(0, 57)}…` : text;
        updateChatTitle(chatId, title);
        firstMessageRef.current = false;
      }
      setInput("");
      setPending(true);

      try {
        const history = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch(COACH_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            clientProfile: profile,
            conversationHistory: history,
          }),
        });

        if (!res.ok) {
          const detail = await res.text().catch(() => "");
          throw new Error(`Coach service returned ${res.status}. ${detail.slice(0, 120)}`);
        }

        const body: CoachResponse = await res.json();
        const replyText = body.response ?? "(empty response)";
        const recs = body.recommendations ?? null;

        const reply: MessagePayload = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: replyText,
          recommendations: recs,
        };
        setMessages((prev) => [...prev, reply]);
        appendMessage({
          chat_id: chatId,
          role: "assistant",
          content: replyText,
          recommendations: recs ?? undefined,
        });
        setOptions(body.options ?? []);
        setFollowups(body.followups ?? []);

        if (body.needs_human_advisor) {
          setAdvisor(
            body.advisor_reason ??
              "A human advisor can help you with this — we'll connect you shortly.",
          );
        }

        if (body.suggest_advisor && !advisorOffered.current) {
          advisorOffered.current = true;
          setShowAdvisorCTA(true);
        }
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Could not reach the coach service.";
        setError(msg);
      } finally {
        setPending(false);
      }
    },
    [chatId, pending, profile],
  );

  const submitLead = useCallback(async () => {
    setAdvisorSubmitting(true);
    try {
      const summary = messages
        .slice(-10)
        .map((m) => `${m.role === "user" ? "Client" : "Coach"}: ${m.content}`)
        .join("\n");

      await fetch(LEADS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientProfile: profile,
          conversationSummary: summary,
          advisorReason: "Client requested advisor contact via chat.",
        }),
      });

      setShowAdvisorCTA(false);
      const confirmation: MessagePayload = {
        id: `confirm-${Date.now()}`,
        role: "assistant",
        content:
          "Your details have been shared with our team. A UniCredit advisor will reach out to you soon. In the meantime, feel free to keep asking me questions!",
      };
      setMessages((prev) => [...prev, confirmation]);
    } catch {
      setShowAdvisorCTA(false);
    } finally {
      setAdvisorSubmitting(false);
    }
  }, [messages, profile]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="uc-scroll flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-8">
          {messages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-unicredit-line bg-white p-6">
              <h2 className="text-lg font-bold text-unicredit-navy">
                Hi {profile.name?.split(" ")[0] || "there"}, ready when you are.
              </h2>
              <p className="mt-1 text-sm text-unicredit-navy/70">
                Ask the coach anything about your money, goals, or UniCredit products.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => send(ex)}
                    className="rounded-full border border-unicredit-line bg-white px-3 py-1.5 text-xs font-medium text-unicredit-navy hover:border-unicredit-red hover:text-unicredit-red"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m) => <MessageBubble key={m.id} message={m} />)
          )}
          {pending && (
            <div className="ml-2">
              <ThinkingArc />
            </div>
          )}
          {advisor && (
            <div className="rounded-xl border border-unicredit-red/30 bg-unicredit-red-soft px-3 py-2 text-sm text-unicredit-navy">
              <span className="font-semibold text-unicredit-red">Talk to an advisor:</span>{" "}
              {advisor}
            </div>
          )}
          {showAdvisorCTA && (
            <AdvisorCTA
              onAccept={submitLead}
              onDismiss={() => setShowAdvisorCTA(false)}
              submitting={advisorSubmitting}
            />
          )}
          {error && (
            <p className="rounded-lg bg-unicredit-red-soft px-3 py-2 text-sm text-unicredit-red">
              {error}
            </p>
          )}
          {options.length > 0 && !pending && (
            <div className="flex flex-wrap gap-2 px-1">
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => send(opt)}
                  className="rounded-full border border-unicredit-red/40 bg-white px-3 py-1.5 text-xs font-semibold text-unicredit-red hover:bg-unicredit-red hover:text-white transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
          {followups.length > 0 && !pending && (
            <FollowupChips items={followups} onPick={(t) => send(t)} />
          )}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="border-t border-unicredit-line bg-white">
        <div className="mx-auto w-full max-w-3xl px-4 py-3 sm:px-6">
          <Composer
            value={input}
            onChange={setInput}
            onSubmit={() => send(input)}
            disabled={pending}
          />
        </div>
      </div>
    </div>
  );
}
