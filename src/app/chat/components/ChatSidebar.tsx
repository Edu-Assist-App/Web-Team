import React, { useState } from 'react';
import { useChat } from '@/lib/chat-context';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export default function ChatSidebar() {
    const { state, setCurrentChat } = useChat();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChats = state.chats.filter((chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="p-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search chats..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-4rem)]">
                {filteredChats.map((chat) => (
                    <button
                        key={chat.id}
                        className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${state.currentChat?.id === chat.id
                                ? 'bg-blue-50 dark:bg-blue-900/20'
                                : ''
                            }`}
                        onClick={() => setCurrentChat(chat)}
                    >
                        <div className="relative">
                            <img
                                src={chat.avatar || '/default-avatar.png'}
                                alt={chat.name}
                                className="w-12 h-12 rounded-full"
                            />
                            {chat.participants.some((p) => p.status === 'online') && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    {chat.name}
                                </p>
                                {chat.lastMessage && (
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {format(new Date(chat.lastMessage.timestamp), 'HH:mm')}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {chat.lastMessage?.content || 'No messages yet'}
                                </p>
                                {chat.unreadCount > 0 && (
                                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full">
                                        {chat.unreadCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
} 