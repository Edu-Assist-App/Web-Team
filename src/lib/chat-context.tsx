import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ChatContextType, ChatState, Message, Chat } from '@/types/chat';
import { websocketService } from './websocket';
import axios from 'axios';

const initialState: ChatState = {
    chats: [],
    currentChat: null,
    messages: [],
    loading: false,
    error: null,
};

type Action =
    | { type: 'SET_CHATS'; payload: Chat[] }
    | { type: 'SET_CURRENT_CHAT'; payload: Chat }
    | { type: 'ADD_MESSAGE'; payload: Message }
    | { type: 'SET_MESSAGES'; payload: Message[] }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'UPDATE_CHAT'; payload: Chat }
    | { type: 'UPDATE_MESSAGE_STATUS'; payload: { messageId: string; status: Message['status'] } };

const chatReducer = (state: ChatState, action: Action): ChatState => {
    switch (action.type) {
        case 'SET_CHATS':
            return { ...state, chats: action.payload };
        case 'SET_CURRENT_CHAT':
            return { ...state, currentChat: action.payload };
        case 'ADD_MESSAGE':
            return { ...state, messages: [action.payload, ...state.messages] };
        case 'SET_MESSAGES':
            return { ...state, messages: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'UPDATE_CHAT':
            return {
                ...state,
                chats: state.chats.map((chat) =>
                    chat.id === action.payload.id ? action.payload : chat
                ),
            };
        case 'UPDATE_MESSAGE_STATUS':
            return {
                ...state,
                messages: state.messages.map((message) =>
                    message.id === action.payload.messageId
                        ? { ...message, status: action.payload.status }
                        : message
                ),
            };
        default:
            return state;
    }
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    useEffect(() => {
        // Set up WebSocket listeners
        websocketService.onMessage((message) => {
            dispatch({ type: 'ADD_MESSAGE', payload: message.payload });
        });

        websocketService.onMessageRead((data) => {
            dispatch({
                type: 'UPDATE_MESSAGE_STATUS',
                payload: { messageId: data.messageId, status: 'read' },
            });
        });

        return () => {
            websocketService.disconnect();
        };
    }, []);

    const sendMessage = async (content: string, type: 'text' | 'file' = 'text') => {
        try {
            if (!state.currentChat) return;

            const message = {
                content,
                type,
                chatId: state.currentChat.id,
                timestamp: new Date(),
            };

            websocketService.sendMessage({
                type: 'message',
                payload: message,
            });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to send message' });
        }
    };

    const loadMoreMessages = async () => {
        try {
            if (!state.currentChat) return;

            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await axios.get(`/api/chats/${state.currentChat.id}/messages`);
            dispatch({ type: 'SET_MESSAGES', payload: response.data });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to load messages' });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const setCurrentChat = (chat: Chat) => {
        dispatch({ type: 'SET_CURRENT_CHAT', payload: chat });
        websocketService.joinChat(chat.id);
    };

    const searchMessages = async (query: string): Promise<Message[]> => {
        try {
            if (!state.currentChat) return [];

            const response = await axios.get(`/api/chats/${state.currentChat.id}/search`, {
                params: { query },
            });
            return response.data;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to search messages' });
            return [];
        }
    };

    const uploadFile = async (file: File): Promise<string> => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.url;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to upload file' });
            throw error;
        }
    };

    return (
        <ChatContext.Provider
            value={{
                state,
                sendMessage,
                loadMoreMessages,
                setCurrentChat,
                searchMessages,
                uploadFile,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}; 