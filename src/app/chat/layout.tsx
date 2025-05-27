import { ChatProvider } from '@/lib/chat-context';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {children}
      </div>
    </ChatProvider>
  );
} 