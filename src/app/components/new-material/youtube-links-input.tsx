"use client"

import { useState } from "react"
import { X, Plus, Youtube } from "lucide-react"
import { Button } from "@/app/components/ui/button"

interface YoutubeLinksInputProps {
  onClose: () => void
}

export function YoutubeLinksInput({ onClose }: YoutubeLinksInputProps) {
  const [links, setLinks] = useState<string[]>([""])

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links]
    newLinks[index] = value
    setLinks(newLinks)
  }

  const addNewLink = () => {
    setLinks([...links, ""])
  }

  const removeLink = (index: number) => {
    if (links.length === 1) {
      setLinks([""])
    } else {
      const newLinks = links.filter((_, i) => i !== index)
      setLinks(newLinks)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-medium flex items-center">
          <Youtube className="w-4 h-4 mr-2" />
          YouTube Links
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {links.map((link, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-grow bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <button onClick={() => removeLink(index)} className="text-gray-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <Button
        onClick={addNewLink}
        variant="outline"
        className="w-full border-dashed border-gray-600 text-gray-400 hover:text-white hover:bg-gray-800"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Link
      </Button>

      <div className="text-xs text-gray-500">
        Add YouTube video links that contain relevant content for your study material
      </div>
    </div>
  )
}
