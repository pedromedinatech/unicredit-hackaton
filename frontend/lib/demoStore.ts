import type { UserProfile } from "./userProfile";

export type Recommendation = {
  product_id: string;
  name?: string;
  reason: string;
  fit_score: number;
};

export type StoredChat = {
  id: string;
  title: string | null;
  created_at: string;
};

export type StoredMessage = {
  id: string;
  chat_id: string;
  role: "user" | "assistant";
  content: string;
  recommendations?: Recommendation[];
  created_at: string;
};

const K_PROFILE = "userProfile";
const K_CHATS = "uc.demo.chats";
const K_MESSAGES = "uc.demo.messages";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getProfile(): UserProfile | null {
  return readJSON<UserProfile | null>(K_PROFILE, null);
}

export function saveProfile(profile: UserProfile): void {
  writeJSON(K_PROFILE, profile);
}

export function clearAll(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(K_PROFILE);
  window.localStorage.removeItem(K_CHATS);
  window.localStorage.removeItem(K_MESSAGES);
}

export function listChats(): StoredChat[] {
  return readJSON<StoredChat[]>(K_CHATS, []);
}

function uuid(): string {
  if (isBrowser() && typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `c-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createChat(): StoredChat {
  const chat: StoredChat = {
    id: uuid(),
    title: null,
    created_at: new Date().toISOString(),
  };
  const chats = listChats();
  chats.unshift(chat);
  writeJSON(K_CHATS, chats);
  return chat;
}

export function getChat(id: string): StoredChat | null {
  return listChats().find((c) => c.id === id) ?? null;
}

export function updateChatTitle(id: string, title: string): void {
  const chats = listChats();
  const next = chats.map((c) => (c.id === id ? { ...c, title } : c));
  writeJSON(K_CHATS, next);
}

function readAllMessages(): Record<string, StoredMessage[]> {
  return readJSON<Record<string, StoredMessage[]>>(K_MESSAGES, {});
}

export function listMessages(chatId: string): StoredMessage[] {
  const all = readAllMessages();
  return all[chatId] ?? [];
}

export function appendMessage(message: Omit<StoredMessage, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
}): StoredMessage {
  const all = readAllMessages();
  const stored: StoredMessage = {
    id: message.id ?? uuid(),
    chat_id: message.chat_id,
    role: message.role,
    content: message.content,
    recommendations: message.recommendations,
    created_at: message.created_at ?? new Date().toISOString(),
  };
  const list = all[stored.chat_id] ?? [];
  list.push(stored);
  all[stored.chat_id] = list;
  writeJSON(K_MESSAGES, all);
  return stored;
}
