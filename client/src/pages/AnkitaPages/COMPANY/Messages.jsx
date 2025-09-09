import React, { useState, useEffect, useRef } from "react";
import { Search, Send, ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom"; // for navigation
import api from '../../../secureApi'; // axios wrapper

const formatTime = (date) =>
  new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function CompanyMessages({ initialConversationId = null }) {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Load conversations from backend
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await api.get("/company/conversations");
        const convos = res.data.map(c => ({
          id: c._id,
          candidateName: c.jobSeekerId?.fullName,
          jobTitle: c.jobId?.title || "",
          jobId: c.jobId?._id,
          avatar: c.jobSeekerId?.profilePicture || "/default-avatar.png",
          lastMessage: c?.lastMessage?.text || "",
          lastMessageTime: c.lastMessage?.sentAt ? formatTime(c.lastMessage.sentAt) : "",
          messages: []
        }));
        setConversations(convos);

        // If initialConversationId provided, open it
        if (initialConversationId) {
          const conv = convos.find(c => c.id === initialConversationId);
          if (conv) openConversation(conv);
        }

      } catch (err) {
        console.error("Failed to load conversations:", err);
      }
    };

    fetchConversations();
  }, [initialConversationId]);

  // Auto-scroll when active chat or messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat]);

  // Open a conversation and load messages
  const openConversation = async (conv) => {
    try {
      const res = await api.get(`/messages/${conv.id}`);
      const msgs = res.data.map(m => ({
        from: m.senderModel === "Company" ? "company" : "jobseeker",
        text: m.messageText,
        time: formatTime(m.sentAt),
        seen: m.isRead
      }));
      setActiveChat({ ...conv, messages: msgs });
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  };

  // Send a message
  const handleSend = async () => {
    if (!newMessage.trim() || !activeChat) return;

    try {
      const res = await api.post(`/messages/${activeChat.id}`, {
        messageText: newMessage.trim()
      });

      const saved = res.data;
      const msgObj = {
        from: "company",
        text: saved.messageText,
        time: formatTime(saved.sentAt),
        seen: saved.isRead
      };

      // Update active chat messages
      setActiveChat(prev => ({
        ...prev,
        messages: [...prev.messages, msgObj],
        lastMessage: msgObj.text,
        lastMessageTime: msgObj.time
      }));

      // Update conversations list
      setConversations(prev =>
        prev.map(c =>
          c.id === activeChat.id
            ? { ...c, lastMessage: msgObj.text, lastMessageTime: msgObj.time }
            : c
        )
      );

      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // Filtered conversations for search
  const filteredConvos = conversations.filter(c =>
    c.candidateName.toLowerCase().includes(search.toLowerCase()) ||
    c.jobTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen flex bg-bg text-lightText">
      {/* Sidebar */}
      <div className={`w-full md:w-1/3 lg:w-1/4 border-r border-mediumGray flex flex-col ${activeChat ? "hidden md:flex" : "flex"}`}>
        <div className="p-4 border-b border-mediumGray flex items-center gap-2 sticky top-0 bg-bg z-10">
          <h2 className="text-xl font-semibold flex-1">Messages</h2>
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

        <div className="flex-1 overflow-y-auto">
          {filteredConvos.map(c => (

            <div
              key={c.id}
              onClick={() => openConversation(c)}
              className={`flex items-center gap-3 p-3 cursor-pointer border-b border-darkGray ${activeChat?.id === c.id ? "bg-primary/20" : "hover:bg-surface"}`} 
            >
              <img src={c.avatar} alt={c.candidateName} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{c.candidateName}</h3>
                  <span className="text-xs text-muted">{c.lastMessageTime}</span>
                </div>
                <p className="text-sm text-muted truncate">{c.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`flex-1 flex flex-col ${activeChat ? "flex" : "hidden md:flex"}`}>
        {activeChat ? (
          <>
            {/* Chat header */}
            <div className="flex items-center justify-between p-3 border-b border-mediumGray bg-surface">
              <div className="flex items-center">
                <button className="md:hidden mr-2" onClick={() => setActiveChat(null)}>
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <img src={activeChat.avatar} alt={activeChat.candidateName} className="w-10 h-10 rounded-full object-cover mr-3" />
                <div>
                  <h3 className="font-semibold">{activeChat.candidateName}</h3>
                </div>
              </div>
              <button
                onClick={() => navigate(`/company/job/${activeChat.jobId}`)}
                className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded hover:bg-primaryLight text-sm"
              >
                <ExternalLink className="w-4 h-4" /> Job Details
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeChat.messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "company" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs px-3 py-2 rounded-2xl text-sm shadow-soft ${m.from === "company"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-surface text-lightText rounded-bl-none"
                    }`}>
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
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 bg-darkGray text-lightText px-3 py-2 rounded-full text-sm focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-primary p-2 rounded-full text-white hover:bg-primaryLight"
                aria-label="Send"
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
