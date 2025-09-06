// src/pages/AnkitaPages/COMPANY/Messages.jsx
import React, { useState, useEffect, useRef } from "react";
import { Search, Send, ArrowLeft } from "lucide-react";



const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });


const placeholderConvos = [
  {
    id: 101,
    candidateName: "Ankita Sharma",
    jobTitle: "Frontend Developer",
    avatar: "https://i.pravatar.cc/100?img=12",
    lastMessage: "Thanks — just sent the code sample.",
    lastMessageTime: "10:30 AM",
    unread: 1,
    online: true,
    typing: false,
    messages: [
      { from: "candidate", text: "Hi, is this role remote?", time: "10:00 AM", seen: true },
      { from: "company", text: "Yes, it's remote-first.", time: "10:05 AM", seen: true },
      { from: "candidate", text: "Thanks — just sent the code sample.", time: "10:30 AM", seen: false },
    ],
  },
  {
    id: 102,
    candidateName: "Rohit Verma",
    jobTitle: "Backend Engineer",
    avatar: "https://i.pravatar.cc/100?img=5",
    lastMessage: "I can do Monday interview.",
    lastMessageTime: "Yesterday",
    unread: 0,
    online: false,
    typing: false,
    messages: [
      { from: "company", text: "Can you do an interview next week?", time: "Yesterday", seen: true },
      { from: "candidate", text: "I can do Monday interview.", time: "Yesterday", seen: true },
    ],
  },
];

export default function CompanyMessages({ onNewMessage /* optional callback */ }) {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [wsConnected, setWsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);

  // load conversations from API (starter)
  useEffect(() => {
    async function fetchConvos() {
      try {
        
        setConversations(placeholderConvos); // placeholder while building backend
      } catch (err) {
        console.error("Failed to load conversations:", err);
        setConversations(placeholderConvos);
      }
    }
    fetchConvos();
  }, []);

  // Auto scroll when messages or activeChat change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat, conversations]);

  // WebSocket: receive real-time messages 
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const wsUrl = `wss://your-backend.com/ws/messages?token=${token}`; // <-- update
      const socket = new WebSocket(wsUrl);
      wsRef.current = socket;

      socket.onopen = () => {
        setWsConnected(true);
        console.log("WS connected");
      };

      socket.onmessage = (evt) => {
        try {
          const payload = JSON.parse(evt.data);
          // Expected payload example:
          // { type: "NEW_MESSAGE", conversationId: 101, message: { from: "candidate", text: "...", time: "..." } }
          if (payload.type === "NEW_MESSAGE") {
            setConversations((prev) =>
              prev.map((c) =>
                c.id === payload.conversationId
                  ? {
                      ...c,
                      messages: [...c.messages, payload.message],
                      lastMessage: payload.message.text,
                      lastMessageTime: payload.message.time || formatTime(new Date()),
                      unread: (c.unread || 0) + (activeChat && activeChat.id === c.id ? 0 : 1),
                    }
                  : c
              )
            );

            // if active chat is the same conversation, mark seen / update activeChat
            if (activeChat && activeChat.id === payload.conversationId) {
              setActiveChat((prev) => ({
                ...prev,
                messages: [...prev.messages, payload.message],
              }));
            }

            if (onNewMessage) onNewMessage(payload);
          }

          if (payload.type === "TYPING") {
            setConversations((prev) =>
              prev.map((c) =>
                c.id === payload.conversationId ? { ...c, typing: payload.typing } : c
              )
            );
            if (activeChat && activeChat.id === payload.conversationId) {
              setActiveChat((prev) => ({ ...prev, typing: payload.typing }));
            }
          }
        } catch (err) {
          console.error("Failed to parse WS message:", err);
        }
      };

      socket.onerror = (err) => {
        console.error("WebSocket error:", err);
      };

      socket.onclose = () => {
        setWsConnected(false);
        console.log("WS closed");
      };

      return () => {
        socket.close();
      };
    } catch (err) {
      console.error("WS setup failed", err);
    }
  }, [activeChat, onNewMessage]);

  // Filtered & sorted conversations
  const filteredConvos = conversations
    .filter(
      (c) =>
        c.candidateName.toLowerCase().includes(search.toLowerCase()) ||
        c.jobTitle.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (a.lastMessageTime < b.lastMessageTime ? 1 : -1));

  // Select a conversation (and mark unread -> 0)
  const openConversation = (conv) => {
    setActiveChat(conv);
    setConversations((prev) => prev.map((c) => (c.id === conv.id ? { ...c, unread: 0 } : c)));
  };

  // Handle message input typing 
  const handleTyping = (e) => {
    const value = e.target.value;
    setNewMessage(value);

    //  send typing indicator
    if (wsRef.current && activeChat) {
      try {
        wsRef.current.send(JSON.stringify({ type: "TYPING", conversationId: activeChat.id, typing: value.length > 0 }));
      } catch (err) {
       
      }
    }

    if (activeChat) {
      setActiveChat({ ...activeChat, typing: value.length > 0 });
    }
  };

  // Send message 
  const handleSend = async () => {
    if (!newMessage.trim() || !activeChat) return;

    const time = formatTime(new Date());
    const messageObj = { from: "company", text: newMessage.trim(), time, seen: false };

    // Optimistic update
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? {
              ...c,
              messages: [...c.messages, messageObj],
              lastMessage: messageObj.text,
              lastMessageTime: time,
            }
          : c
      )
    );

    setActiveChat((prev) => ({ ...prev, messages: [...prev.messages, messageObj], lastMessage: messageObj.text, lastMessageTime: time }));

    
    if (onNewMessage) onNewMessage({ conversationId: activeChat.id, message: messageObj });

    setNewMessage("");

    //  (replace with real API)
    try {
      // Example POST (replace URL):
      
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        try {
          wsRef.current.send(JSON.stringify({ type: "SEND_MESSAGE", conversationId: activeChat.id, message: messageObj }));
        } catch (err) {
          console.warn("WS send failed", err);
        }
      }
    } catch (err) {
      console.error("Failed to send message to server:", err);
      
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

          {/* ws connection status indicator */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">WS</span>
            <span
              className={`w-2 h-2 rounded-full ${wsConnected ? "bg-green-400" : "bg-slate-600"}`}
              title={wsConnected ? "Connected" : "Disconnected"}
            />
          </div>

          <div className="flex items-center bg-surface px-2 py-1 rounded-lg ml-3">
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
              onClick={() => openConversation(c)}
              className="flex items-center gap-3 p-3 hover:bg-surface cursor-pointer border-b border-darkGray"
            >
              <img src={c.avatar} alt={c.candidateName} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{c.candidateName}</h3>
                  <span className="text-xs text-muted">{c.lastMessageTime}</span>
                </div>
                <p className="text-sm text-muted truncate">{c.lastMessage}</p>
              </div>
              {c.unread > 0 && <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">{c.unread}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`flex-1 flex flex-col ${activeChat ? "flex" : "hidden md:flex"}`}>
        {activeChat ? (
          <>
            {/* Header */}
            <div className="flex items-center p-3 border-b border-mediumGray bg-surface">
              <button className="md:hidden mr-2" onClick={() => setActiveChat(null)}>
                <ArrowLeft className="w-5 h-5" />
              </button>
              <img src={activeChat.avatar} alt={activeChat.candidateName} className="w-10 h-10 rounded-full object-cover mr-3" />
              <div>
                <h3 className="font-semibold">{activeChat.candidateName}</h3>
                <p className="text-xs text-muted">
                  {activeChat.typing ? "Typing..." : activeChat.online ? "Online" : `Last seen at ${activeChat.lastMessageTime}`}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeChat.messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "company" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-3 py-2 rounded-2xl text-sm shadow-soft ${
                      m.from === "company" ? "bg-primary text-white rounded-br-none" : "bg-surface text-lightText rounded-bl-none"
                    }`}
                  >
                    <p>{m.text}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-lightGray">{m.time}</span>
                      {m.from === "company" && <span className="text-[10px] ml-2">{m.seen ? "Seen" : "Delivered"}</span>}
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
              <button onClick={handleSend} className="bg-primary p-2 rounded-full text-white hover:bg-primaryLight" aria-label="Send">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted">Select a conversation to start chatting</div>
        )}
      </div>
    </div>
  );
}
