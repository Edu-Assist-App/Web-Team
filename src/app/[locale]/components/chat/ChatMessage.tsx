import { cn } from "@/lib/utils"
import { Check, CheckCheck } from "lucide-react"

interface MessageProps {
  message: {
    id: string
    content: string
    timestamp: string
    sender: "me" | "them"
    status?: "sent" | "delivered" | "read"
  }
}

export default function ChatMessage({ message }: MessageProps) {
  const isMe = message.sender === "me"

  return (
    <div className={cn("flex", isMe ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[75%] rounded-lg p-3 break-words",
          isMe ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
        )}
      >
        <div className="flex flex-col">
          <span>{message.content}</span>
          <div className={cn("flex items-center gap-1 text-xs mt-1", isMe ? "justify-end" : "justify-start")}>
            <span className={cn(isMe ? "text-primary-foreground/70" : "text-muted-foreground")}>
              {message.timestamp}
            </span>

            {isMe && message.status && (
              <span className="text-primary-foreground/70">
                {message.status === "read" ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
