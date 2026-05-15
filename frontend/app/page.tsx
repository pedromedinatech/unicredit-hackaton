import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/ui/Header";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 10%, var(--color-unicredit-red) 0, transparent 40%), radial-gradient(circle at 90% 80%, var(--color-unicredit-navy) 0, transparent 40%)",
            }}
          />
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-unicredit-red-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-unicredit-red">
                <Sparkles size={14} strokeWidth={2.4} /> AI Financial Coach
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-unicredit-ink sm:text-5xl">
                Personal financial guidance that knows you.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-unicredit-navy/75 sm:text-lg">
                Answer a short questionnaire and chat with a coach that
                recommends the UniCredit products that actually fit your goals,
                income, and life stage.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/onboarding">
                  <Button
                    size="lg"
                    rightIcon={<ArrowRight size={18} strokeWidth={2} />}
                  >
                    Get started
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-xs text-unicredit-navy/60">
                No sign-up, no passwords. Try the live demo in under a minute.
              </p>
            </div>

            <div className="relative flex flex-col gap-4 rounded-3xl border border-unicredit-line bg-white p-6 shadow-card sm:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-unicredit-red">
                <Sparkles size={14} strokeWidth={2.4} /> UniCredit Coach
              </div>
              <div className="rounded-2xl bg-unicredit-mist p-4 text-sm leading-relaxed text-unicredit-navy">
                <p className="font-semibold">Andrei, 32 — Bucharest</p>
                <p className="mt-1 italic text-unicredit-navy/80">
                  &ldquo;I want to buy my first home, salary 4,500 RON / month.&rdquo;
                </p>
              </div>
              <div className="rounded-2xl border border-unicredit-line bg-white p-4 text-sm leading-relaxed text-unicredit-ink">
                <p className="font-semibold text-unicredit-navy">
                  UniCredit Coach
                </p>
                <p className="mt-1 text-unicredit-navy/80">
                  Based on your income band and your goal to buy a first home,
                  here is what I recommend:
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="rounded-xl border border-unicredit-line p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-unicredit-red">
                      Mortgage
                    </p>
                    <p className="text-sm font-semibold text-unicredit-navy">
                      Mortgage Loan for Home Acquisition
                    </p>
                    <p className="text-xs text-unicredit-navy/70">
                      First-time buyer with steady income — long-term financing
                      fits.
                    </p>
                  </li>
                  <li className="rounded-xl border border-unicredit-line p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-unicredit-red">
                      Insurance
                    </p>
                    <p className="text-sm font-semibold text-unicredit-navy">
                      Life Insurance for Loans
                    </p>
                    <p className="text-xs text-unicredit-navy/70">
                      Protects the mortgage repayment for your family.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-unicredit-line bg-unicredit-mist">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:grid-cols-3 sm:px-6">
            <Feature
              icon={<BadgeCheck size={22} strokeWidth={2} />}
              title="Personalized profile"
              body="A short, MiFID-aware questionnaire builds a precise picture of your goals, income, and risk tolerance."
            />
            <Feature
              icon={<MessagesSquare size={22} strokeWidth={2} />}
              title="Real product matches"
              body="Recommendations are pulled from UniCredit's product catalog and ranked by fit, not by marketing."
            />
            <Feature
              icon={<ShieldCheck size={22} strokeWidth={2} />}
              title="Bank-grade trust"
              body="Powered by UniCredit's core banking data. When something needs a human, you'll be routed to an advisor."
            />
          </div>
        </section>

        <footer className="border-t border-unicredit-line py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 text-xs text-unicredit-navy/60 sm:flex-row sm:items-center sm:px-6">
            <div className="flex items-center gap-2">
              <Logo variant="mark" size={20} />
              <span>
                © {new Date().getFullYear()} UniCredit AI Coach prototype
              </span>
            </div>
            <p>
              Demonstration project — not affiliated with UniCredit S.p.A.
              Product names referenced for educational purposes.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-unicredit-line bg-white p-6 shadow-card">
      <div className="flex size-10 items-center justify-center rounded-xl bg-unicredit-red-soft text-unicredit-red">
        {icon}
      </div>
      <p className="mt-4 text-base font-semibold text-unicredit-navy">{title}</p>
      <p className="mt-1 text-sm text-unicredit-navy/70">{body}</p>
    </div>
  );
}
