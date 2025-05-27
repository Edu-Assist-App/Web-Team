import React, { useRef, useEffect } from 'react';
import { useChat } from '@/lib/chat-context';
import { format } from 'date-fns';
import { PaperClipIcon } from '@heroicons/react/24/outline';

export default function ChatMessages() {
  const { state, loadMoreMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.messages]);

  useEffect(() => {
    if (loadingRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !state.loading) {
            loadMoreMessages();
          }
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreMessages, state.loading]);

  if (!state.currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {state.loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        )}
        <div ref={loadingRef} className="h-4" />
        {state.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === 'current-user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === 'current-user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
              }`}
            >
              {message.type === 'file' && (
                <div className="flex items-center space-x-2 mb-2">
                  <PaperClipIcon className="h-5 w-5" />
                  <a
                    href={message.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline"
                  >
                    {message.fileName}
                  </a>
                </div>
              )}
              <p className="text-sm">{message.content}</p>
              <div
                className={`text-xs mt-1 ${
                  message.senderId === 'current-user'
                    ? 'text-blue-100'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {format(new Date(message.timestamp), 'HH:mm')}
                {message.senderId === 'current-user' && (
                  <span className="ml-2">
                    {message.status === 'read' ? '✓✓' : message.status === 'delivered' ? '✓✓' : '✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
} 