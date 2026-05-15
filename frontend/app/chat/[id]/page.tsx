"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { ChatClient } from "@/components/chat/ChatClient";
import { BankPanel } from "@/components/chat/BankPanel";
import {
  getProfile,
  listMessages,
  getChat,
  type StoredMessage,
} from "@/lib/demoStore";
import type { UserProfile } from "@/lib/userProfile";

type Loaded = {
  profile: UserProfile;
  messages: StoredMessage[];
  chatExists: boolean;
};

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState<Loaded | null>(null);

  useEffect(() => {
    const profile = getProfile();
    if (!profile) {
      router.replace("/onboarding");
      return;
    }
    const chat = getChat(id);
    const messages = listMessages(id);
    setData({ profile, messages, chatExists: chat !== null });
  }, [id, router]);

  if (!data) {
    return (
      <>
        <Header />
        <main className="flex flex-1 items-center justify-center bg-unicredit-mist">
          <p className="text-sm text-unicredit-navy/60">Loading your chat…</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col bg-unicredit-mist">
        <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-unicredit-navy hover:bg-white"
          >
            <ArrowLeft size={14} strokeWidth={2.2} />
            Home
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[1fr_320px] lg:gap-6">
          <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-unicredit-line bg-white shadow-card overflow-hidden">
            <ChatClient
              chatId={id}
              profile={data.profile}
              initialMessages={data.messages}
            />
          </div>
          <div className="lg:sticky lg:top-20 lg:self-start">
            <BankPanel name={data.profile.name} />
          </div>
        </div>
      </main>
    </>
  );
}
