import React, { useState, useRef } from 'react';
import { useChat } from '@/lib/chat-context';
import { PaperClipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function ChatInput() {
    const { state, sendMessage, uploadFile } = useChat();
    const [message, setMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !state.currentChat) return;

        await sendMessage(message);
        setMessage('');
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !state.currentChat) return;

        try {
            setIsUploading(true);
            const fileUrl = await uploadFile(file);
            await sendMessage(fileUrl, 'file');
        } catch (error) {
            console.error('Failed to upload file:', error);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    if (!state.currentChat) return null;

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                >
                    <PaperClipIcon className="h-6 w-6" />
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isUploading}
                />
                <button
                    type="submit"
                    disabled={!message.trim() || isUploading}
                    className="p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
                >
                    <PaperAirplaneIcon className="h-6 w-6" />
                </button>
            </div>
            {isUploading && (
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Uploading file...
                </div>
            )}
        </form>
    );
} 