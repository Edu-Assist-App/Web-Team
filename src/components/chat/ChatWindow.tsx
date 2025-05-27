import { useRef, useEffect } from 'react';
import { ChatGroup } from '@/types/chat';
import { useChat } from '@/hooks/useChat';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface ChatWindowProps {
    group: ChatGroup;
}

export default function ChatWindow({ group }: ChatWindowProps) {
    const { messages, isConnected, error, sendMessage, uploadFile } = useChat(group.id);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 flex flex-col bg-white">
            {/* Chat header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{group.name}</h2>
                        <p className="text-sm text-gray-500">
                            Created by {group.created_by}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'
                                }`}
                        />
                        <span className="text-sm text-gray-500">
                            {isConnected ? 'Connected' : 'Disconnected'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Error message */}
            {error && (
                <div className="p-4 bg-red-50 border-b border-red-200">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                <MessageList messages={messages} />
                <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-gray-200">
                <MessageInput
                    onSendMessage={sendMessage}
                    onUploadFile={uploadFile}
                    disabled={!isConnected}
                />
            </div>
        </div>
    );
} 