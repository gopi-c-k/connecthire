// src/pages/AnkitaPages/COMPANY/CompanyMessages.jsx
import React, { useState, useEffect, useRef } from "react";
import { Search, Send, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import api from '../../../secureApi'; // axios wrapper (teammate will wire backend)

const formatTime = (date) =>
  new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function CompanyMessages({ initialConversationId = null }) {
  
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // preselect id can come from navigate state or ?to= query
  const preselectIdFromState = location.state?.to || null;
  const preselectNameFromState = location.state?.name || null; // optional nicer label
  const preselectIdFromQuery = new URLSearchParams(location.search).get("to");
  const preselectId = preselectIdFromState || preselectIdFromQuery || null;

  // helper: open conversation and load messages (safe fallback if messages endpoint fails)
  const openConversation = async (conv) => {
    if (!conv) return;
    try {
      // try to fetch messages for conversation id
      const res = await api.get(`/messages/${conv.id}`);
      const msgs = Array.isArray(res.data)
        ? res.data.map(m => ({
            from: m.senderModel === "Company" ? "company" : "jobseeker",
            text: m.messageText,
            time: formatTime(m.sentAt),
            seen: m.isRead
          }))
        : [];
      setActiveChat({ ...conv, messages: msgs });
    } catch (err) {
      // backend might not be ready — open UI with empty messages (frontend-only)
      console.warn("Could not load messages, opening chat with empty messages:", err);
      setActiveChat({ ...conv, messages: conv.messages || [] });
    }
  };

  // fetch conversations and auto-open preselect if provided
  useEffect(() => {
    let mounted = true;

    const fetchConversations = async () => {
      try {
        const res = await api.get("/company/conversations");
        const convos = Array.isArray(res.data)
          ? res.data.map(c => ({
              id: c._id,
              jobSeekerId: c.jobSeekerId?._id || null,
              candidateName: c.jobSeekerId?.fullName || c.candidateName || "Candidate",
              jobTitle: c.jobId?.title || "",
              jobId: c.jobId?._id,
              avatar: c.jobSeekerId?.profilePicture || "/default-avatar.png",
              lastMessage: c?.lastMessage?.text || "",
              lastMessageTime: c.lastMessage?.sentAt ? formatTime(c.lastMessage.sentAt) : "",
              messages: []
            }))
          : [];

        if (!mounted) return;
        setConversations(convos);

        // priority: initialConversationId prop -> preselectId (state/query)
        if (initialConversationId) {
          const found = convos.find(c => c.id === initialConversationId || c.jobSeekerId === initialConversationId);
          if (found) {
            openConversation(found);
            return;
          }
        }

        if (preselectId) {
          // try find by conversation id or jobSeekerId
          let found = convos.find(c => c.id === preselectId || c.jobSeekerId === preselectId);
          if (found) {
            openConversation(found);
            return;
          }

          // not found in fetched convos — create a local temporary conversation (frontend-only fallback)
          // prefer a nicer name if passed via state
          const tempConv = {
            id: `local-${preselectId}-${Date.now()}`, // local temporary id
            jobSeekerId: preselectId,
            candidateName: preselectNameFromState || `Candidate ${preselectId}`,
            jobTitle: "",
            jobId: null,
            avatar: "/default-avatar.png",
            lastMessage: "",
            lastMessageTime: "",
            messages: []
          };

          // add to top and open it immediately
          setConversations(prev => [tempConv, ...prev]);
          openConversation(tempConv);

          // Optionally: fire off backend create request in background (teammate can enable)
          // try { await api.post("/company/conversations", { jobSeekerId: preselectId }); } catch(e){/*ignore*/}

        }
      } catch (err) {
        console.error("Failed to load conversations (frontend fallback):", err);
        // If fetch failed entirely, still open a local convo if preselectId present
        if (preselectId) {
          const tempConv = {
            id: `local-${preselectId}-${Date.now()}`,
            jobSeekerId: preselectId,
            candidateName: preselectNameFromState || `Candidate ${preselectId}`,
            jobTitle: "",
            jobId: null,
            avatar: "/default-avatar.png",
            lastMessage: "",
            lastMessageTime: "",
            messages: []
          };
          setConversations([tempConv]);
          openConversation(tempConv);
        }
      }
    };

    fetchConversations();

    return () => {
      mounted = false;
    };
    // intentionally include preselectId so effect re-runs if navigation state/query changes
  }, [initialConversationId, preselectId, preselectNameFromState]);

  // auto-scroll when active chat changes
  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [activeChat]);

  // send message (backend will handle actual save; frontend updates optimistic)
  const handleSend = async () => {
    if (!newMessage.trim() || !activeChat) return;

    // optimistic message object
    const tempMsg = {
      from: "company",
      text: newMessage.trim(),
      time: formatTime(new Date()),
      seen: false
    };

    // update UI
    setActiveChat(prev => ({
      ...prev,
      messages: [...(prev.messages || []), tempMsg],
      lastMessage: tempMsg.text,
      lastMessageTime: tempMsg.time
    }));

    setConversations(prev =>
      prev.map(c =>
        c.id === activeChat.id ? { ...c, lastMessage: tempMsg.text, lastMessageTime: tempMsg.time } : c
      )
    );

    setNewMessage("");

    try {
      // try to send to backend (if teammate wires it later)
      const res = await api.post(`/messages/${activeChat.id}`, { messageText: tempMsg.text });
      const saved = res.data;
      // replace last optimistic message with server-saved message details if needed
      // (simple approach: no replacement; adjust later when backend returns message id)
    } catch (err) {
      console.warn("Failed to persist message to backend (frontend-only mode):", err);
      // keep optimistic message — teammate can implement retry/flagging later
    }
  };

  const filteredConvos = conversations.filter(c =>
    (c.candidateName || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.jobTitle || "").toLowerCase().includes(search.toLowerCase())
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

              
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(activeChat.messages || []).map((m, i) => (
                <div key={i} className={`flex ${m.from === "company" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs px-3 py-2 rounded-2xl text-sm shadow-soft ${m.from === "company" ? "bg-primary text-white rounded-br-none" : "bg-surface text-lightText rounded-bl-none"}`}>
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
