import { useState, useEffect, useCallback, useRef } from 'react';
import { Message, WebSocketMessage } from '@/types/chat';
import { chatApi } from '@/lib/api/chat';

const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000';

export const useChat = (groupId: number) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    // Initialize WebSocket connection
    useEffect(() => {
        const ws = new WebSocket(`${WS_BASE_URL}/api/v1/chat/ws/${groupId}`);
        wsRef.current = ws;

        ws.onopen = () => {
            setIsConnected(true);
            setError(null);
            // Send authentication token if available
            const token = localStorage.getItem('token');
            if (token) {
                ws.send(JSON.stringify({ type: 'auth', token }));
            }
        };

        ws.onmessage = (event) => {
            const data: WebSocketMessage = JSON.parse(event.data);
            if (data.type === 'message') {
                setMessages((prev) => [...prev, data.data]);
            }
        };

        ws.onerror = (error) => {
            setError('WebSocket error occurred');
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            setIsConnected(false);
        };

        return () => {
            ws.close();
        };
    }, [groupId]);

    // Load initial messages
    useEffect(() => {
        const loadMessages = async () => {
            try {
                const initialMessages = await chatApi.getMessages(groupId);
                setMessages(initialMessages);
            } catch (err) {
                setError('Failed to load messages');
                console.error('Error loading messages:', err);
            }
        };

        loadMessages();
    }, [groupId]);

    // Send message
    const sendMessage = useCallback(
        async (content: string) => {
            if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
                setError('WebSocket is not connected');
                return;
            }

            try {
                const message = await chatApi.createMessage({
                    group_id: groupId,
                    content,
                });
                setMessages((prev) => [...prev, message]);
            } catch (err) {
                setError('Failed to send message');
                console.error('Error sending message:', err);
            }
        },
        [groupId]
    );

    // Upload file
    const uploadFile = useCallback(
        async (file: File) => {
            try {
                const message = await chatApi.uploadFile(groupId, file);
                setMessages((prev) => [...prev, message]);
            } catch (err) {
                setError('Failed to upload file');
                console.error('Error uploading file:', err);
            }
        },
        [groupId]
    );

    // Mark message as read
    const markMessageAsRead = useCallback(async (messageId: number) => {
        try {
            await chatApi.markMessageRead(messageId);
        } catch (err) {
            console.error('Error marking message as read:', err);
        }
    }, []);

    return {
        messages,
        isConnected,
        error,
        sendMessage,
        uploadFile,
        markMessageAsRead,
    };
}; 