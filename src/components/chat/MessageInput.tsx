import { useState, useRef } from 'react';
import { PaperClipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface MessageInputProps {
    onSendMessage: (content: string) => void;
    onUploadFile: (file: File) => void;
    disabled?: boolean;
}

export default function MessageInput({
    onSendMessage,
    onUploadFile,
    disabled = false,
}: MessageInputProps) {
    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && !disabled) {
            onUploadFile(file);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={disabled}
            />
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={disabled}
            >
                <PaperClipIcon className="w-6 h-6" />
            </button>
            <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!message.trim() || disabled}
            >
                <PaperAirplaneIcon className="w-6 h-6" />
            </button>
        </form>
    );
} 