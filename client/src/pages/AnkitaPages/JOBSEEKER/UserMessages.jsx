import React, { useState, useEffect, useRef } from "react";
import { Search, Send, ArrowLeft } from "lucide-react";

const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const conversationsData = [
  {
    id: 1,
    company: "Google",
    jobTitle: "Frontend Developer",
    avatar: "https://logo.clearbit.com/google.com",
    lastMessage: "Please share your portfolio link.",
    lastMessageTime: "10:30 AM",
    unread: 2,
    online: true,
    typing: false,
    messages: [
      { from: "company", text: "Hi, thanks for applying!", time: "10:00 AM", seen: true },
      { from: "me", text: "Hello! Glad to connect.", time: "10:05 AM", seen: true },
      { from: "company", text: "Please share your portfolio link.", time: "10:30 AM", seen: false },
    ],
  },
  {
    id: 2,
    company: "Microsoft",
    jobTitle: "Backend Engineer",
    avatar: "https://logo.clearbit.com/microsoft.com",
    lastMessage: "Interview scheduled for tomorrow.",
    lastMessageTime: "Yesterday",
    unread: 0,
    online: false,
    typing: false,
    messages: [
      { from: "company", text: "Your interview is scheduled.", time: "Yesterday", seen: true },
      { from: "me", text: "Thank you!", time: "Yesterday", seen: true },
    ],
  },
];

export default function UserMessagesPage({ onNewMessage }) {
  const [conversations, setConversations] = useState(conversationsData);
  const [activeChat, setActiveChat] = useState(null);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat, conversations]);

  // Filter conversations
  const filteredConvos = conversations
    .filter(
      (c) =>
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.jobTitle.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (a.lastMessageTime < b.lastMessageTime ? 1 : -1));

  // Send message
  const handleSend = () => {
    if (!newMessage.trim() || !activeChat) return;

    const time = formatTime(new Date());

    const updatedConvos = conversations.map((c) => {
      if (c.id === activeChat.id) {
        const updatedChat = {
          ...c,
          lastMessage: newMessage,
          lastMessageTime: time,
          messages: [
            ...c.messages,
            { from: "me", text: newMessage, time, seen: false },
          ],
        };
        return updatedChat;
      }
      return c;
    });

    setConversations(updatedConvos);

    const refreshedChat = updatedConvos.find((c) => c.id === activeChat.id);
    setActiveChat(refreshedChat);

    //  trigger notification in Navbar
    if (onNewMessage) {
      onNewMessage(refreshedChat);
    }

    setNewMessage("");
  };

  // Typing indicator
  const handleTyping = (e) => {
    const value = e.target.value;
    setNewMessage(value);

    if (activeChat) {
      setActiveChat({ ...activeChat, typing: value.length > 0 });
    }
  };

  return (
    <div className="h-screen flex bg-bg text-lightText">
      {/* Sidebar */}
      <div
        className={`w-full md:w-1/3 lg:w-1/4 border-r border-mediumGray flex flex-col ${
          activeChat ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Header - sticky */}
        <div className="p-4 border-b border-mediumGray flex items-center gap-2 sticky top-0 bg-bg z-10">
          <h2 className="text-xl font-semibold flex-1">Messages</h2>
          <div className="flex items-center bg-surface px-2 py-1 rounded-lg">
            <Search className="w-4 h-4 text-muted mr-1" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent focus:outline-none text-sm w-full"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filteredConvos.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveChat(c)}
              className="flex items-center gap-3 p-3 hover:bg-surface cursor-pointer border-b border-darkGray"
            >
              <img
                src={c.avatar}
                alt={c.company}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{c.company}</h3>
                  <span className="text-xs text-muted">{c.lastMessageTime}</span>
                </div>
                <p className="text-sm text-muted truncate">{c.lastMessage}</p>
              </div>
              {c.unread > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {c.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div
        className={`flex-1 flex flex-col ${
          activeChat ? "flex" : "hidden md:flex"
        }`}
      >
        {activeChat ? (
          <>
            {/* Header */}
            <div className="flex items-center p-3 border-b border-mediumGray bg-surface">
              <button
                className="md:hidden mr-2"
                onClick={() => setActiveChat(null)}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <img
                src={activeChat.avatar}
                alt={activeChat.company}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <h3 className="font-semibold">{activeChat.company}</h3>
                <p className="text-xs text-muted">
                  {activeChat.typing
                    ? "Typing..."
                    : activeChat.online
                    ? "Online"
                    : `Last seen at ${activeChat.lastMessageTime}`}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeChat.messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.from === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-2xl text-sm shadow-soft ${
                      m.from === "me"
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-surface text-lightText rounded-bl-none"
                    }`}
                  >
                    <p>{m.text}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-lightGray">
                        {m.time}
                      </span>
                      {m.from === "me" && (
                        <span className="text-[10px] ml-2">
                          {m.seen ? "Seen" : "Delivered"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-mediumGray flex items-center gap-2 bg-surface">
              <input
                type="text"
                value={newMessage}
                onChange={handleTyping}
                placeholder="Type a message"
                className="flex-1 bg-darkGray text-lightText px-3 py-2 rounded-full text-sm focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-primary p-2 rounded-full text-white hover:bg-primaryLight"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
