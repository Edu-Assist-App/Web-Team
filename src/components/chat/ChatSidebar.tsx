import { useState } from 'react';
import { ChatGroup } from '@/types/chat';
import { PlusIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface ChatSidebarProps {
    groups: ChatGroup[];
    selectedGroup: ChatGroup | null;
    onSelectGroup: (group: ChatGroup) => void;
    onCreateGroup: (name: string) => void;
}

export default function ChatSidebar({
    groups,
    selectedGroup,
    onSelectGroup,
    onCreateGroup,
}: ChatSidebarProps) {
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    const handleCreateGroup = (e: React.FormEvent) => {
        e.preventDefault();
        if (newGroupName.trim()) {
            onCreateGroup(newGroupName.trim());
            setNewGroupName('');
            setIsCreatingGroup(false);
        }
    };

    return (
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Chat Groups</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                    <button
                        onClick={() => setIsCreatingGroup(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>New Group</span>
                    </button>
                </div>

                {isCreatingGroup && (
                    <form onSubmit={handleCreateGroup} className="p-4 border-b border-gray-200">
                        <input
                            type="text"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            placeholder="Enter group name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                        <div className="mt-2 flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Create
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsCreatingGroup(false)}
                                className="flex-1 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                <div className="divide-y divide-gray-200">
                    {groups.map((group) => (
                        <button
                            key={group.id}
                            onClick={() => onSelectGroup(group)}
                            className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${selectedGroup?.id === group.id ? 'bg-blue-50' : ''
                                }`}
                        >
                            <UserGroupIcon className="w-6 h-6 text-gray-500" />
                            <div className="flex-1 text-left">
                                <h3 className="font-medium text-gray-900">{group.name}</h3>
                                <p className="text-sm text-gray-500">
                                    Created by {group.created_by}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
} 