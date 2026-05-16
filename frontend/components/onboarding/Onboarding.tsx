"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  ONBOARDING_QUESTIONS,
  type OnboardingQuestion,
} from "@/lib/onboardingQuestions";
import { saveProfile, createChat } from "@/lib/demoStore";
import { calculateProfile } from "@/lib/profilingService";
import type { UserProfile } from "@/lib/userProfile";

type Answers = Record<number, unknown>;

function hasValue(question: OnboardingQuestion, answers: Answers): boolean {
  const v = answers[question.id];
  if (question.type === "select-multiple") {
    return Array.isArray(v) && v.length > 0;
  }
  if (question.type === "number") {
    return typeof v === "number" && !Number.isNaN(v);
  }
  if (typeof v === "string") return v.trim().length > 0;
  return v !== undefined && v !== null;
}

function buildProfile(answers: Answers): UserProfile {
  const name = typeof answers[1] === "string" ? answers[1] : "";
  const phone = typeof answers[11] === "string" ? answers[11] : "";

  // Map radio answers to single letters (A/B/C/D)
  const extractLetter = (answerText: string): string => {
    const match = answerText?.match(/^([A-D])\)/);
    return match ? match[1] : "A";
  };

  const q1 = extractLetter(answers[2] as string);
  const q2 = extractLetter(answers[3] as string);
  const q3 = extractLetter(answers[4] as string);
  const q4 = extractLetter(answers[5] as string);
  const q5 = extractLetter(answers[6] as string);
  const q6 = extractLetter(answers[7] as string);
  const q7 = extractLetter(answers[8] as string);
  const q8 = extractLetter(answers[9] as string);
  const q9 = extractLetter(answers[10] as string);

  const answerMap: Record<number, string> = {
    2: q1,
    3: q2,
    4: q3,
    5: q4,
    6: q5,
    7: q6,
    8: q7,
    9: q8,
    10: q9,
  };

  return calculateProfile(name, phone, answerMap);
}

export function Onboarding() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const question = ONBOARDING_QUESTIONS[index];
  const total = ONBOARDING_QUESTIONS.length;
  const progress = ((index + 1) / total) * 100;
  const isLast = index === total - 1;

  const canContinue = useMemo(() => {
    if (!question.required) return true;
    return hasValue(question, answers);
  }, [question, answers]);

  const setAnswer = (value: unknown) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    setError(null);
  };

  const toggleMulti = (opt: string) => {
    const current = Array.isArray(answers[question.id])
      ? (answers[question.id] as string[])
      : [];
    if (current.includes(opt)) {
      setAnswer(current.filter((v) => v !== opt));
    } else {
      setAnswer([...current, opt]);
    }
  };

  const next = () => {
    if (question.required && !hasValue(question, answers)) {
      setError("This question is required.");
      return;
    }
    if (!isLast) {
      setIndex(index + 1);
      return;
    }
    setSubmitting(true);
    try {
      const profile = buildProfile(answers);
      saveProfile(profile);
      const chat = createChat();
      router.replace(`/chat/${chat.id}`);
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : "Could not save profile.");
    }
  };

  const back = () => {
    if (index > 0) {
      setIndex(index - 1);
      setError(null);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold text-unicredit-navy">
          Build your profile
        </h1>
        <p className="mt-1 text-sm text-unicredit-navy/70">
          A few quick questions so GENOVAI understands your situation.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-unicredit-red">
          Step {index + 1} of {total}
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-unicredit-line">
          <div
            className="h-full rounded-full bg-unicredit-red transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        key={question.id}
        className="rounded-2xl border border-unicredit-line bg-white p-6 shadow-card uc-fade-up"
      >
        <h2 className="text-lg font-semibold text-unicredit-navy">
          {question.text}
          {!question.required && (
            <span className="ml-2 text-xs font-normal text-unicredit-navy/50">
              (optional)
            </span>
          )}
        </h2>
        {question.subtitle && (
          <p className="mt-1 text-sm text-unicredit-navy/55">{question.subtitle}</p>
        )}

        <div className="mt-4">
          <QuestionInput
            question={question}
            value={answers[question.id]}
            onChange={setAnswer}
            onToggleMulti={toggleMulti}
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-unicredit-red" role="alert">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          onClick={back}
          disabled={index === 0 || submitting}
          leftIcon={<ArrowLeft size={16} strokeWidth={2} />}
        >
          Previous
        </Button>
        <Button
          onClick={next}
          disabled={!canContinue}
          loading={submitting}
          rightIcon={
            isLast ? (
              <Check size={16} strokeWidth={2} />
            ) : (
              <ArrowRight size={16} strokeWidth={2} />
            )
          }
        >
          {isLast ? "Start Chat" : "Next"}
        </Button>
      </div>
    </div>
  );
}

function QuestionInput({
  question,
  value,
  onChange,
  onToggleMulti,
}: {
  question: OnboardingQuestion;
  value: unknown;
  onChange: (v: unknown) => void;
  onToggleMulti: (opt: string) => void;
}) {
  if (question.type === "text") {
    return (
      <input
        type="text"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer..."
        className="w-full rounded-xl border border-unicredit-line bg-white px-4 py-3 text-sm text-unicredit-navy placeholder:text-unicredit-navy/40 focus:border-unicredit-red focus:outline-none focus:ring-2 focus:ring-unicredit-red/20"
      />
    );
  }

  if (question.type === "tel") {
    return (
      <input
        type="tel"
        inputMode="tel"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="+39 333 123 4567"
        className="w-full rounded-xl border border-unicredit-line bg-white px-4 py-3 text-sm text-unicredit-navy placeholder:text-unicredit-navy/40 focus:border-unicredit-red focus:outline-none focus:ring-2 focus:ring-unicredit-red/20"
      />
    );
  }

  if (question.type === "number") {
    return (
      <input
        type="number"
        inputMode="numeric"
        value={typeof value === "number" ? value : ""}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === "") {
            onChange(undefined);
          } else {
            onChange(Number(raw));
          }
        }}
        placeholder="0"
        className="w-full rounded-xl border border-unicredit-line bg-white px-4 py-3 text-sm text-unicredit-navy placeholder:text-unicredit-navy/40 focus:border-unicredit-red focus:outline-none focus:ring-2 focus:ring-unicredit-red/20"
      />
    );
  }

  if (question.type === "radio" || question.type === "select") {
    const opts = question.options ?? [];
    const selected = typeof value === "string" ? value : "";
    return (
      <div
        className={clsx(
          "grid gap-2",
          opts.length > 4 ? "sm:grid-cols-2" : "",
        )}
      >
        {opts.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={clsx(
                "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition",
                isSelected
                  ? "border-unicredit-red bg-unicredit-red-soft text-unicredit-navy"
                  : "border-unicredit-line bg-white text-unicredit-navy hover:border-unicredit-navy/30 hover:bg-unicredit-mist",
              )}
            >
              <span>{opt}</span>
              {isSelected && (
                <Check
                  size={16}
                  strokeWidth={2.4}
                  className="text-unicredit-red"
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  if (question.type === "select-multiple") {
    const opts = question.options ?? [];
    const selected = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div
        className={clsx(
          "grid gap-2",
          opts.length > 4 ? "sm:grid-cols-2" : "",
        )}
      >
        {opts.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggleMulti(opt)}
              className={clsx(
                "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition",
                isSelected
                  ? "border-unicredit-red bg-unicredit-red-soft text-unicredit-navy"
                  : "border-unicredit-line bg-white text-unicredit-navy hover:border-unicredit-navy/30 hover:bg-unicredit-mist",
              )}
            >
              <span>{opt}</span>
              {isSelected && (
                <Check
                  size={16}
                  strokeWidth={2.4}
                  className="text-unicredit-red"
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return null;
}
