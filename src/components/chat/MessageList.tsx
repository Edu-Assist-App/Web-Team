import { Message } from '@/types/chat';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface MessageListProps {
    messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
    return (
        <div className="space-y-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.sender_id === 'current_user' ? 'justify-end' : 'justify-start'
                        }`}
                >
                    <div
                        className={`max-w-[70%] rounded-lg p-3 ${message.sender_id === 'current_user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                    >
                        {message.file_url && (
                            <div className="mb-2">
                                <a
                                    href={message.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-sm hover:underline"
                                >
                                    <PaperClipIcon className="w-4 h-4" />
                                    <span>View attachment</span>
                                </a>
                            </div>
                        )}
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                        <div
                            className={`text-xs mt-1 ${message.sender_id === 'current_user'
                                    ? 'text-blue-100'
                                    : 'text-gray-500'
                                }`}
                        >
                            {format(new Date(message.created_at), 'MMM d, h:mm a')}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 