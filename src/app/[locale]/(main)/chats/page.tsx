import type { Metadata } from "next";
import ChatContainer from "@/app/[locale]/components/chat/ChatContainer";

export const metadata: Metadata = {
  title: "Chat | Your App Name",
  description: "Chat with your contacts and teams",
};

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-4rem-1rem)] w-full overflow-hidden mt-4">
      <ChatContainer />
    </div>
  );
}
