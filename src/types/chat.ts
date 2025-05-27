export interface User {
    id: string;
    name: string;
    avatar?: string;
    status: 'online' | 'offline' | 'away';
    lastSeen?: Date;
}

export interface Message {
    id: string;
    content: string;
    senderId: string;
    chatId: string;
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
    type: 'text' | 'file' | 'image';
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
}

export interface Chat {
    id: string;
    type: 'private' | 'group';
    name: string;
    avatar?: string;
    participants: User[];
    lastMessage?: Message;
    unreadCount: number;
    isTyping: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ChatState {
    chats: Chat[];
    currentChat: Chat | null;
    messages: Message[];
    loading: boolean;
    error: string | null;
}

export interface ChatGroup {
    id: number;
    name: string;
    created_by: string;
    created_at: string;
}

export interface MessageRead {
    id: number;
    message_id: number;
    user_id: string;
    read_at: string;
}

export interface ChatGroupCreate {
    name: string;
}

export interface MessageCreate {
    group_id: number;
    content: string;
    file_url?: string;
}

export interface WebSocketMessage {
    type: 'message';
    data: {
        id: number;
        content: string;
        sender_id: string;
        created_at: string;
    };
}

export interface ChatContextType {
    state: ChatState;
    sendMessage: (content: string, type?: 'text' | 'file') => Promise<void>;
    loadMoreMessages: () => Promise<void>;
    setCurrentChat: (chat: Chat) => void;
    searchMessages: (query: string) => Promise<Message[]>;
    uploadFile: (file: File) => Promise<string>;
} 