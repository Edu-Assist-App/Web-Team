"use client"

import { useState, useEffect } from "react"
import ChatSidebar from "./ChatSidebar"
import ChatMain from "./ChatMain"
import { useIsMobileOrTablet } from "@/hooks/use-mobile"

export default function ChatContainer() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(true)
  const isMobileOrTablet = useIsMobileOrTablet()

  // On mobile or tablet, when a chat is selected, hide the sidebar
  useEffect(() => {
    if (isMobileOrTablet && activeChatId) {
      setShowSidebar(false)
    }
  }, [activeChatId, isMobileOrTablet])

  // On desktop, always show sidebar
  useEffect(() => {
    if (!isMobileOrTablet) {
      setShowSidebar(true)
    }
  }, [isMobileOrTablet])

  return (
    <div className="flex w-full h-full pt-4">
      {/* Chat Sidebar */}
      <div
        className={`${showSidebar ? "flex" : "hidden"} ${
          isMobileOrTablet ? "w-full" : "w-[280px] min-w-[280px] border-r"
        } flex-col h-full bg-background transition-all duration-200`}
      >
        <ChatSidebar onChatSelect={(id) => setActiveChatId(id)} activeChatId={activeChatId} />
      </div>

      {/* Chat Main Area */}
      <div className={`${!showSidebar || !isMobileOrTablet ? "flex" : "hidden"} flex-1 h-full`}>
        {activeChatId ? (
          <ChatMain
            chatId={activeChatId}
            onBackClick={() => isMobileOrTablet && setShowSidebar(true)}
            isMobile={isMobileOrTablet}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-muted/20">
            <p className="text-muted-foreground">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  )
}
