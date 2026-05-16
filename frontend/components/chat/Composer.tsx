"use client";

import { Send } from "lucide-react";
import { useRef, type FormEvent, type KeyboardEvent } from "react";

export function Composer({
  value,
  onChange,
  onSubmit,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!value.trim() || disabled) return;
    onSubmit();
    requestAnimationFrame(() => {
      if (taRef.current) {
        taRef.current.style.height = "auto";
      }
    });
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form
      onSubmit={submit}
      className="flex items-end gap-2 rounded-2xl border border-unicredit-line bg-white p-2 shadow-card focus-within:border-unicredit-red focus-within:ring-2 focus-within:ring-unicredit-red/15"
    >
      <textarea
        ref={taRef}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (taRef.current) {
            taRef.current.style.height = "auto";
            taRef.current.style.height = `${Math.min(taRef.current.scrollHeight, 140)}px`;
          }
        }}
        onKeyDown={onKey}
        rows={1}
        placeholder="Ask GENOVAI anything..."
        className="block flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm text-unicredit-ink outline-none placeholder:text-unicredit-navy/40"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || value.trim().length === 0}
        className="inline-flex size-10 items-center justify-center rounded-xl bg-unicredit-red text-white transition hover:bg-unicredit-red-dark disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Send"
      >
        <Send size={16} strokeWidth={2.2} />
      </button>
    </form>
  );
}
