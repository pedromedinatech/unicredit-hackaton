import { Header } from "@/components/ui/Header";
import { Onboarding } from "@/components/onboarding/Onboarding";

export const metadata = {
  title: "Build your profile — UniCredit Coach",
};

export default function OnboardingPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-unicredit-mist">
        <Onboarding />
      </main>
    </>
  );
}
