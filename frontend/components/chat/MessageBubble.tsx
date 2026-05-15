"use client";

import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import { ProductCard, type RecommendationCard } from "./ProductCard";

export type MessagePayload = {
  id: string;
  role: "user" | "assistant";
  content: string;
  recommendations?: RecommendationCard[] | null;
};

export function MessageBubble({ message }: { message: MessagePayload }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end uc-fade-up">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-unicredit-navy px-4 py-2.5 text-sm leading-relaxed text-white sm:max-w-[70%]">
          {message.content}
        </div>
      </div>
    );
  }

  const recs = message.recommendations ?? [];

  return (
    <div className="flex w-full flex-col gap-3 uc-fade-up">
      <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-unicredit-line bg-white px-4 py-3 text-sm leading-relaxed text-unicredit-ink shadow-sm sm:max-w-[80%]">
        <div className="prose prose-sm max-w-none prose-p:my-2 prose-strong:text-unicredit-navy prose-li:my-0.5">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
      {recs.length > 0 && (
        <div className="ml-2 flex flex-col gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-unicredit-navy/60">
            Recommended for you
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {recs.map((r) => (
              <ProductCard key={r.product_id} rec={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function FollowupChips({
  items,
  onPick,
}: {
  items: string[];
  onPick: (text: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="ml-2 mt-1 flex flex-col gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-unicredit-navy/50">
        Suggested next questions
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onPick(item)}
            className={clsx(
              "rounded-full border border-unicredit-line bg-white px-3 py-1 text-xs font-medium text-unicredit-navy",
              "hover:border-unicredit-red hover:text-unicredit-red",
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
