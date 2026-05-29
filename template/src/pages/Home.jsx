import React, { useState, useEffect } from "react";
import ChatView from "./../components/messaging/ChatView";
import Sidebar from "./../components/sidebar/Sidebar";
import RightPanel from "./../components/RightPanel";
import { supabase } from "./../services/supabase"; // Ensure this import matches your project structure

export default function Home() {
  const [currentView, setCurrentView] = useState("list");
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(
    "11111111-1111-1111-1111-111111111111" // Defaults to your original ID
  );
  const [loading, setLoading] = useState(true);

  // Current logged-in user identifier
  const currentUserId = "eca87d57-670b-433c-9b0f-46c85388fd7d";

  // -------------------------------------------------------------
  // FETCH ACTIVE CONVERSATIONS & LATEST MESSAGES
  // -------------------------------------------------------------
  const fetchConversationsList = async () => {
    try {
      setLoading(true);
      
      // Step 1: Fetch distinct conversation IDs that contain messages
      const { data: rawMessages, error: msgError } = await supabase
        .from("messages")
        .select("conversation_id, text, created_at, sender_id")
        .order("created_at", { ascending: false });

      if (msgError) throw msgError;

      // Step 2: Group records to extract only the single newest message per chat channel
      const uniqueChatMap = {};
      rawMessages.forEach((msg) => {
        if (!uniqueChatMap[msg.conversation_id]) {
          uniqueChatMap[msg.conversation_id] = {
            id: msg.conversation_id,
            // Fallback display logic for naming groups / people
            name: msg.conversation_id === "11111111-1111-1111-1111-111111111111" 
              ? "Design Crew" 
              : `Chat Room (${msg.conversation_id.slice(0, 4)})`,
            initials: msg.conversation_id === "11111111-1111-1111-1111-111111111111" ? "DC" : "CR",
            lastMessage: msg.text || "📷 Sent an attachment",
            senderId: msg.sender_id,
            time: new Date(msg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            rawDate: new Date(msg.created_at)
          };
        }
      });

      // Convert mapping dictionary back into an ordered list array
      const sortedConversations = Object.values(uniqueChatMap).sort(
        (a, b) => b.rawDate - a.rawDate
      );

      setConversations(sortedConversations);
    } catch (err) {
      console.error("Error loading chat conversations list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversationsList();

    // -------------------------------------------------------------
    // REALTIME PIPELINE: Refresh list metadata when any message updates
    // -------------------------------------------------------------
    const chatListSubscription = supabase
      .channel("public-chat-list-sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => {
          // Re-fetch profiles and message configurations dynamically upon change events
          fetchConversationsList();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(chatListSubscription);
    };
  }, []);

  return (
    <div className="h-screen w-full bg-background text-primary overflow-hidden font-sans">
      {/* Main Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div 
        className="h-screen flex flex-col md:pt-0 pb-20 md:pb-0" 
        style={{ marginLeft: 'var(--sidebar-width)', transition: 'margin-left 200ms ease' }}
      >
        <div className="flex flex-1 overflow-hidden">
          
          {/* LEFT SIDEBAR (DYNAMIC CHAT LIST) */}
          <div
            className={`
              ${currentView === "list" ? "flex" : "hidden"}
              md:flex w-full md:w-80 h-full flex-col
              bg-white/70 backdrop-blur-xl
              shadow-[2px_0_20px_rgba(0,0,0,0.06)]
              shrink-0
            `}
          >
            {/* Sidebar Header */}
            <div className="px-4 py-3 flex items-center justify-between bg-white/60 backdrop-blur-md border-b border-gray-100">
              <h1 className="text-lg font-bold text-gray-800">Messages</h1>
              <button className="p-2 rounded-xl hover:bg-black/5 active:scale-95 transition">
                ✏️
              </button>
            </div>

            {/* Chat List Stream */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {loading && conversations.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-400">Loading your chats...</div>
              ) : conversations.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-400">No active chats found.</div>
              ) : (
                conversations.map((chat) => {
                  const isSelected = selectedConversationId === chat.id;
                  const isMe = chat.senderId === currentUserId;

                  return (
                    <div
                      key={chat.id}
                      onClick={() => {
                        setSelectedConversationId(chat.id);
                        setCurrentView("chat");
                      }}
                      className={`flex items-center gap-3 p-3 cursor-pointer rounded-xl transition-all duration-200 ${
                        isSelected
                          ? "bg-gradient-to-r from-orange-400/90 to-orange-500/80 text-white shadow-sm"
                          : "hover:bg-gray-100/80 text-gray-700 bg-transparent"
                      }`}
                    >
                      {/* Avatar container */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 ${
                        isSelected 
                          ? "bg-white/20 text-white" 
                          : "bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600"
                      }`}>
                        {chat.initials}
                      </div>

                      {/* Message metadata layout */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <span className={`font-semibold text-sm truncate ${isSelected ? "text-white" : "text-gray-900"}`}>
                            {chat.name}
                          </span>
                          <span className={`text-[10px] shrink-0 ml-2 ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                            {chat.time}
                          </span>
                        </div>
                        <p className={`text-xs truncate mt-0.5 ${isSelected ? "text-white/80" : "text-gray-500"}`}>
                          {isMe ? "You: " : ""}{chat.lastMessage}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT CHAT AREA */}
          <div
            className={`
              ${currentView === "chat" ? "flex" : "hidden"}
              md:flex flex-1 h-full flex-col
              bg-background
            `}
          >
            <div className="flex-1 h-full">
              {/* IMPORTANT: Added conversationId prop here to load the selected chat dynamically */}
              <ChatView 
                key={selectedConversationId} // Re-mounts ChatView instantly when switching conversations
                conversationId={selectedConversationId} 
                onBack={() => setCurrentView("list")} 
              />
            </div>
          </div>

          {/* Right details panel (shared files) */}
          <RightPanel />
        </div>
      </div>
    </div>
  );
}