'use client';

import { useState, useEffect } from 'react';
import { ChatGroup } from '@/types/chat';
import { chatApi } from '@/lib/api/chat';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatWindow from '@/components/chat/ChatWindow';

export default function ChatPage() {
  const [groups, setGroups] = useState<ChatGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<ChatGroup | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const fetchedGroups = await chatApi.getGroups();
        setGroups(fetchedGroups);
        if (fetchedGroups.length > 0) {
          setSelectedGroup(fetchedGroups[0]);
        }
      } catch (err) {
        setError('Failed to load chat groups');
        console.error('Error loading groups:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadGroups();
  }, []);

  const handleCreateGroup = async (name: string) => {
    try {
      const newGroup = await chatApi.createGroup({ name });
      setGroups((prev) => [...prev, newGroup]);
      setSelectedGroup(newGroup);
    } catch (err) {
      setError('Failed to create chat group');
      console.error('Error creating group:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSidebar
        groups={groups}
        selectedGroup={selectedGroup}
        onSelectGroup={setSelectedGroup}
        onCreateGroup={handleCreateGroup}
      />
      {selectedGroup ? (
        <ChatWindow group={selectedGroup} />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Select a chat group to start messaging</p>
        </div>
      )}
    </div>
  );
} 