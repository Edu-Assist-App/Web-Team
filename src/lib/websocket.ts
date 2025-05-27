import { io, Socket } from 'socket.io-client';
import { WebSocketMessage } from '@/types/chat';

class WebSocketService {
    private socket: Socket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000;

    constructor() {
        this.initializeSocket();
    }

    private initializeSocket() {
        this.socket = io(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001', {
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: this.maxReconnectAttempts,
            reconnectionDelay: this.reconnectDelay,
        });

        this.setupEventListeners();
    }

    private setupEventListeners() {
        if (!this.socket) return;

        this.socket.on('connect', () => {
            console.log('WebSocket connected');
            this.reconnectAttempts = 0;
        });

        this.socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });

        this.socket.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
            this.handleReconnect();
        });
    }

    private handleReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(() => {
                this.initializeSocket();
            }, this.reconnectDelay * this.reconnectAttempts);
        }
    }

    public connect(userId: string) {
        if (this.socket) {
            this.socket.emit('user:connect', { userId });
        }
    }

    public disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    public sendMessage(message: WebSocketMessage) {
        if (this.socket) {
            this.socket.emit('message:send', message);
        }
    }

    public joinChat(chatId: string) {
        if (this.socket) {
            this.socket.emit('chat:join', { chatId });
        }
    }

    public leaveChat(chatId: string) {
        if (this.socket) {
            this.socket.emit('chat:leave', { chatId });
        }
    }

    public onMessage(callback: (message: WebSocketMessage) => void) {
        if (this.socket) {
            this.socket.on('message:receive', callback);
        }
    }

    public onTyping(callback: (data: { chatId: string; userId: string; isTyping: boolean }) => void) {
        if (this.socket) {
            this.socket.on('typing:status', callback);
        }
    }

    public onUserStatus(callback: (data: { userId: string; status: 'online' | 'offline' | 'away' }) => void) {
        if (this.socket) {
            this.socket.on('user:status', callback);
        }
    }

    public onMessageRead(callback: (data: { messageId: string; userId: string }) => void) {
        if (this.socket) {
            this.socket.on('message:read', callback);
        }
    }
}

export const websocketService = new WebSocketService(); 