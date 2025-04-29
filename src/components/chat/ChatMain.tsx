"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Smile } from "lucide-react"
import ChatMessage from "./ChatMessage"
import { cn } from "@/lib/utils"

// Mock data for the active chat
const MOCK_CHATS = {
  "3": {
    id: "3",
    name: "David Moore",
    status: "last seen 5 mins ago",
    avatar: "/placeholder.svg?height=40&width=40",
    messages: [
      {
        id: "m1",
        content: "OMG 😮 do you remember what you did last night at the work night out?",
        timestamp: "18:12",
        sender: "them",
        status: "read",
      },
      {
        id: "m2",
        content: "i don't remember",
        timestamp: "18:15",
        sender: "me",
        status: "sent",
      },
    ],
  },
}

interface ChatMainProps {
  chatId: string
  onBackClick: () => void
  isMobile: boolean
}

export default function ChatMain({ chatId, onBackClick, isMobile }: ChatMainProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(MOCK_CHATS[chatId as keyof typeof MOCK_CHATS]?.messages || [])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chat = MOCK_CHATS[chatId as keyof typeof MOCK_CHATS]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: `m${messages.length + 1}`,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "me",
      status: "sent",
    }

    setMessages([...messages, newMessage])
    setMessage("")
    inputRef.current?.focus()
  }

  if (!chat) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p>Chat not found</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full w-[100%]">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b gap-3">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onBackClick} className="mr-1">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <Avatar className="h-10 w-10">
          <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
        </Avatar>

        <div className="flex-1">
          <h2 className="font-medium">{chat.name}</h2>
          <p className="text-xs text-muted-foreground">{chat.status}</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=800')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" className="flex-shrink-0">
            <Smile className="h-5 w-5" />
          </Button>

          <Input
            ref={inputRef}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />

          <Button
            type="submit"
            size="icon"
            className={cn("flex-shrink-0", !message.trim() && "opacity-50 cursor-not-allowed")}
            disabled={!message.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
