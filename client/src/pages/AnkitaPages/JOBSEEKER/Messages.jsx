import React, { useState, useRef, useEffect } from "react";
import JobseekerLayout from "../layouts/JobseekerLayout";
import { Send } from "lucide-react";

// Dummy conversations
const dummyConversations = [
  {
    id: 1,
    companyName: "Google",
    jobTitle: "Frontend Developer",
    lastMessage: { content: "We received your application.", createdAt: "10:15 AM" },
    unread: 2,
    avatar: "G",
  },
  {
    id: 2,
    companyName: "Microsoft",
    jobTitle: "UI/UX Designer",
    lastMessage: { content: "Can you share your portfolio?", createdAt: "Yesterday" },
    unread: 0,
    avatar: "M",
  },
  {
    id: 3,
    companyName: "Amazon",
    jobTitle: "Backend Engineer",
    lastMessage: { content: "Interview scheduled for Friday.", createdAt: "Aug 28" },
    unread: 0,
    avatar: "A",
  },
];

// Dummy messages
const dummyMessages = {
  1: [
    { sender: "company", content: "Hello, thanks for applying!", createdAt: "10:00 AM" },
    { sender: "me", content: "Glad to connect!", createdAt: "10:05 AM" },
    { sender: "company", content: "We received your application.", createdAt: "10:15 AM" },
  ],
  2: [
    { sender: "company", content: "Can you share your portfolio?", createdAt: "Yesterday" },
    { sender: "me", content: "Yes, I’ll send it soon.", createdAt: "Yesterday" },
  ],
  3: [
    { sender: "company", content: "Interview scheduled for Friday.", createdAt: "Aug 28" },
  ],
};

export default function Messages() {
  const [conversations, setConversations] = useState(dummyConversations);
  const [activeChat, setActiveChat] = useState(dummyConversations[0]);
  const [messages, setMessages] = useState(dummyMessages[dummyConversations[0].id]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openChat = (chat) => {
    setActiveChat(chat);
    setMessages(dummyMessages[chat.id] || []);
    setConversations((prev) =>
      prev.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c))
    );
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = { sender: "me", content: newMessage, createdAt: "Now" };
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  return (
    <JobseekerLayout>
      <div className="h-[calc(100vh-64px)] flex bg-gray-100 rounded-lg shadow">
        {/* Sidebar */}
        <div className="w-1/3 border-r bg-white p-3 overflow-y-auto">
          <h2 className="font-semibold text-lg mb-3">Messages</h2>
          {conversations.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center gap-3 p-3 mb-2 rounded-lg cursor-pointer transition ${
                activeChat?.id === chat.id
                  ? "border-l-4 border-green-600 bg-gray-50"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => openChat(chat)}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full font-bold">
                {chat.avatar}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{chat.companyName}</span>
                  <span className="text-xs text-gray-400">{chat.lastMessage.createdAt}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage.content}</p>
              </div>
              {chat.unread > 0 && (
                <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {chat.unread}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              {/* Header */}
              <div className="border-b p-3 bg-white flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full font-bold">
                  {activeChat.avatar}
                </div>
                <div>
                  <h3 className="font-semibold">{activeChat.companyName}</h3>
                  <p className="text-xs text-gray-500">{activeChat.jobTitle}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-2xl max-w-xs shadow ${
                        msg.sender === "me"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white border rounded-bl-none text-gray-800"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <span className="text-[10px] text-gray-400 block mt-1 text-right">
                        {msg.createdAt}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef}></div>
              </div>

              {/* Input */}
              <div className="border-t p-3 bg-white flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  className="ml-2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
                  onClick={sendMessage}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </JobseekerLayout>
  );
}
