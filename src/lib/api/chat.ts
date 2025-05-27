import { ChatGroup, Message, MessageRead, ChatGroupCreate, MessageCreate } from '@/types/chat';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const chatApi = {
    // Chat Groups
    createGroup: async (group: ChatGroupCreate): Promise<ChatGroup> => {
        const response = await fetch(`${API_BASE_URL}/chat/groups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(group),
            credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to create group');
        return response.json();
    },

    getGroups: async (): Promise<ChatGroup[]> => {
        const response = await fetch(`${API_BASE_URL}/chat/groups`, {
            credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch groups');
        return response.json();
    },

    getGroup: async (groupId: number): Promise<ChatGroup> => {
        const response = await fetch(`${API_BASE_URL}/chat/groups/${groupId}`, {
            credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch group');
        return response.json();
    },

    addMember: async (groupId: number, userId: string): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/chat/groups/${groupId}/members/${userId}`, {
            method: 'POST',
            credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to add member');
    },

    removeMember: async (groupId: number, userId: string): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/chat/groups/${groupId}/members/${userId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to remove member');
    },

    // Messages
    createMessage: async (message: MessageCreate): Promise<Message> => {
        const response = await fetch(`${API_BASE_URL}/chat/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
            credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to send message');
        return response.json();
    },

    getMessages: async (groupId: number, skip = 0, limit = 50): Promise<Message[]> => {
        const response = await fetch(
            `${API_BASE_URL}/chat/groups/${groupId}/messages?skip=${skip}&limit=${limit}`,
            {
                credentials: 'include',
            }
        );
        if (!response.ok) throw new Error('Failed to fetch messages');
        return response.json();
    },

    searchMessages: async (groupId: number, query: string): Promise<Message[]> => {
        const response = await fetch(
            `${API_BASE_URL}/chat/groups/${groupId}/search?query=${encodeURIComponent(query)}`,
            {
                credentials: 'include',
            }
        );
        if (!response.ok) throw new Error('Failed to search messages');
        return response.json();
    },

    // Message Reads
    markMessageRead: async (messageId: number): Promise<MessageRead> => {
        const response = await fetch(`${API_BASE_URL}/chat/messages/${messageId}/read`, {
            method: 'POST',
            credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to mark message as read');
        return response.json();
    },

    getMessageReads: async (messageId: number): Promise<MessageRead[]> => {
        const response = await fetch(`${API_BASE_URL}/chat/messages/${messageId}/reads`, {
            credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch message reads');
        return response.json();
    },

    // File Upload
    uploadFile: async (groupId: number, file: File): Promise<Message> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/chat/groups/${groupId}/files`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to upload file');
        return response.json();
    },
}; 