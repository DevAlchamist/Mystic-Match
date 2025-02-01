"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
export function ChatPanel({ isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How are you?", sender: "other" },
    { id: 2, text: "I'm doing great, thanks for asking!", sender: "user" },
    { id: 3, text: "That's wonderful to hear!", sender: "other" },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: inputMessage, sender: "user" }])
      setInputMessage("")
    }
  }

  return (
    <div
      className={`w-80 bg-white shadow-lg transition-all transform duration-500  ease-in-out ${
        isOpen ? "hidden" : "block"
      }`}
    >
      <div className="flex flex-col h-full">
      <div className="border-b p-3 flex items-center gap-3 justify-end">
        <div className="font-semibold text-sm">Dev Alchemist</div>
        <div className="rounded-full bg-blue-500 h-10 w-10 border-[4px] border-green-400"></div>        
      </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === "user" ? "bg-blue-100 text-blue-800 ml-auto" : "bg-gray-100 text-gray-800 mr-auto"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button variant="ghost" size="icon" onClick={sendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

