"use client"

import { useState } from "react"
import { Input } from "@/app/components/ui/input"
import { Avatar } from "@/app/components/ui/avatar"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for chats
const MOCK_CHATS = [
  {
    id: "1",
    name: "Chatgram",
    lastMessage: "Chatgram Web was updated.",
    time: "19:48",
    isGroup: true,
    unread: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jessica Drew",
    lastMessage: "Ok, see you later",
    time: "18:30",
    unread: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "David Moore",
    lastMessage: "You: I don't remember anything 😊",
    time: "18:16",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Greg James",
    lastMessage: "I got a job at SpaceX 🚀",
    time: "18:02",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Emily Dorson",
    lastMessage: "Table for four, 5PM. Be there.",
    time: "17:42",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Office Chat",
    lastMessage: "Lewis: All done mate 😄",
    time: "17:08",
    isGroup: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "Announcements",
    lastMessage: "Channel created",
    time: "16:15",
    isGroup: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Little Sister",
    lastMessage: "Tell mom I will be home for tea 💜",
    time: "Wed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "9",
    name: "Art Class",
    lastMessage: "Emily: 🎨 Editorial",
    time: "Tue",
    isGroup: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

interface ChatSidebarProps {
  onChatSelect: (id: string) => void
  activeChatId: string | null
}

export default function ChatSidebar({ onChatSelect, activeChatId }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChats = MOCK_CHATS.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search"
            className="pl-9 bg-muted/40 rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={cn(
              "flex items-center p-4 gap-3 cursor-pointer hover:bg-muted/40 transition-colors",
              activeChatId === chat.id && "bg-muted/60",
            )}
            onClick={() => onChatSelect(chat.id)}
          >
            <Avatar className="h-12 w-12 flex-shrink-0">
              <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-medium truncate">{chat.name}</h3>
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>

            {chat.unread && (
              <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-primary-foreground">{chat.unread}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
