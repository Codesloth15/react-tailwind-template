import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import RightPanel from "./../RightPanel";

import {
  FiPaperclip,
  FiSend,
  FiEdit2,
  FiCheck,
  FiX,
  FiMoreVertical,
  FiTrash2,
} from "react-icons/fi";

import { supabase } from "./../../services/supabase";
import { insertData } from "../../services/databaseService";
import { getCurrentUser } from "../../services/authService"; // Imported your auth service function

export default function ChatView({ 
  conversationId = "11111111-1111-1111-1111-111111111111"
}) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Auth States
  const [senderId, setSenderId] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);

  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);

  // -------------------------------------------------------------
  // FETCH CURRENT AUTHENTICATED USER ON MOUNT
  // -------------------------------------------------------------
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const { user, error } = await getCurrentUser();
        if (error || !user) {
          console.error("Auth check failed:", error);
          return;
        }
        
        // -----------------------------------------------------------
        // CONSOLE LOGS FOR DEBUGGING CURRENT USER UI INFORMATION
        // -----------------------------------------------------------
        console.log("=== CURRENT AUTHENTICATED USER DETAILS ===", user);
        console.log("CURRENT USER ID:", user.id);

        // Save the dynamic user ID directly to state
        setSenderId(user.id);
      
      } catch (err) {
        console.error("System auth error:", err);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUserSession();
  }, []);

  // -------------------------------------------------------------
  // HELPER: Map database snake_case properties to camelCase state
  // -------------------------------------------------------------
  const mapDatabaseToStateMessage = (msg) => {
    // Matches database sender_id with the dynamic senderId state hook
    const isCurrentUser = msg.sender_id === senderId;
    
    return {
      id: msg.id,
      text: msg.text,
      sender: isCurrentUser ? "user" : "other", 
      time: new Date(msg.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      fileName: msg.file_url ? msg.file_url.split("/").pop() : null,
      fileUrl: msg.file_url,
    };
  };

  // -------------------------
  // FETCH MESSAGES ON LOAD
  // -------------------------
  useEffect(() => {
    if (authLoading || !senderId) return; // Prevent executing queries until user is verified

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Fetch Error:", error);
        return;
      }

      setMessages(data.map(mapDatabaseToStateMessage));
    };

    fetchMessages();
  }, [conversationId, senderId, authLoading]);

  // -------------------------
  // REALTIME SUBSCRIPTION
  // -------------------------
  useEffect(() => {
    if (authLoading || !senderId) return;

    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const formattedMsg = mapDatabaseToStateMessage(payload.new);
            
            setMessages((prev) => {
              const placeholderIdx = prev.findIndex(
                (m) => m.id === formattedMsg.id || (m.isOptimistic && m.text === formattedMsg.text)
              );

              if (placeholderIdx !== -1) {
                const updated = [...prev];
                updated[placeholderIdx] = formattedMsg;
                return updated;
              }
              return [...prev, formattedMsg];
            });
          } 
          
          else if (payload.eventType === "UPDATE") {
            const formattedMsg = mapDatabaseToStateMessage(payload.new);
            setMessages((prev) =>
              prev.map((m) => (m.id === formattedMsg.id ? formattedMsg : m))
            );
          } 
          
          else if (payload.eventType === "DELETE") {
            setMessages((prev) => prev.filter((m) => m.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, senderId, authLoading]);

  // -------------------------
  // AUTO SCROLL
  // -------------------------
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // -------------------------
  // SEND MESSAGE
  // -------------------------
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputText.trim() && !selectedFile) return;
    if (!senderId) return console.error("Cannot send message: Unauthenticated user.");

    const temporaryId = `temp-${Date.now()}`;
    const cachedInputText = inputText;
    const cachedSelectedFile = selectedFile;

    const optimisticMessage = {
      id: temporaryId,
      text: cachedInputText,
      sender: "user", 
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      fileUrl: cachedSelectedFile ? URL.createObjectURL(cachedSelectedFile) : null,
      isOptimistic: true 
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setInputText("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    try {
      let fileUrl = null;

      if (cachedSelectedFile) {
        const filePath = `chat-files/${Date.now()}-${cachedSelectedFile.name}`;

        const { error: uploadError } = await supabase.storage
          .from("chat-files")
          .upload(filePath, cachedSelectedFile);

        if (uploadError) {
          console.error("Upload Error:", uploadError);
          setMessages((prev) => prev.filter((m) => m.id !== temporaryId));
          return;
        }

        const { data } = supabase.storage
          .from("chat-files")
          .getPublicUrl(filePath);

        fileUrl = data.publicUrl;
      }

      const messageRecord = {
        conversation_id: conversationId,
        sender_id: senderId, // Dynamic logged-in user ID applied to the DB write
        text: cachedInputText,
        file_url: fileUrl,
      };

      const { error } = await insertData("messages", messageRecord);

      if (error) {
        console.error("Database Insert Error:", error);
        setMessages((prev) => prev.filter((m) => m.id !== temporaryId));
        return;
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => prev.filter((m) => m.id !== temporaryId));
    }
  };

  // -------------------------
  // FILE CHANGE
  // -------------------------
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // -------------------------
  // EDIT ACTIONS
  // -------------------------
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = async (id) => {
    setEditingId(null);
    setEditText("");

    const { error } = await supabase
      .from("messages")
      .update({ text: editText })
      .eq("id", id);

    if (error) console.error("Edit Backend Error:", error);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // -------------------------
  // DELETE ACTION
  // -------------------------
  const handleDeleteMessage = async (id) => {
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) console.error("Delete Backend Error:", error);
  };

  // Render safe loading visual barrier while verifying session
  if (authLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-500 text-sm">
        Verifying secure session access...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white/80 backdrop-blur-md">
      <Header onOpenPanel={() => setRightPanelOpen(true)} />

      {/* CHAT CONTAINER */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[80%] ${
                msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              <div
                className={`p-3 rounded-2xl relative group flex items-start gap-4 ${
                  msg.sender === "user"
                    ? "bg-[#FF9B51] text-white rounded-tr-none pr-8"
                    : "bg-white text-gray-800 rounded-tl-none pr-4"
                } shadow-sm border border-black/5 ${msg.isOptimistic ? "opacity-70" : ""}`}
              >
                {editingId === msg.id ? (
                  <div className="flex items-center gap-2 w-full min-w-[200px]">
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 text-sm text-gray-900 bg-white rounded-lg px-2 py-1 outline-none border border-gray-300 focus:border-[#FF9B51]"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => saveEdit(msg.id)}
                      className="p-1 hover:bg-black/10 rounded text-green-500"
                    >
                      <FiCheck size={16} />
                    </button>
                    <button type="button" onClick={cancelEdit} className="p-1 hover:bg-black/10 rounded text-red-400">
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="break-words w-full space-y-2">
                    {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}

                    {msg.fileUrl && (
                      <img
                        src={msg.fileUrl}
                        alt="attachment"
                        className="max-w-[220px] max-h-[200px] object-cover rounded-lg border border-black/10 block bg-gray-200"
                        onError={() => {
                          console.error("Image loading failed for source: ", msg.fileUrl);
                        }}
                      />
                    )}
                  </div>
                )}

                {/* 3 DOT MENU */}
                {msg.sender === "user" && editingId !== msg.id && !msg.isOptimistic && (
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 z-10">
                    <button
                      type="button"
                      onClick={() => setActiveMenuId(activeMenuId === msg.id ? null : msg.id)}
                      className="p-1.5 rounded-full hover:bg-black/10 text-white/80 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <FiMoreVertical size={16} />
                    </button>

                    {activeMenuId === msg.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                        <div className="absolute right-0 mt-1 w-28 bg-white rounded-xl shadow-lg border py-1 z-20">
                          <button
                            onClick={() => {
                              startEdit(msg.id, msg.text);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-2 text-xs hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                          >
                            <FiEdit2 size={12} />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              handleDeleteMessage(msg.id);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <FiTrash2 size={12} />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <span className="text-[10px] text-gray-400 mt-1 px-1">
                {msg.isOptimistic ? "Sending..." : msg.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CHATBOX QUEUE ATTACHMENT VISUAL PREVIEW */}
      {selectedFile && (
        <div className="px-4 py-2 bg-gray-100 border-t flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-2 truncate">
            <span className="font-medium text-gray-700 truncate">📎 Ready to send: {selectedFile.name}</span>
          </div>
          <button 
            type="button" 
            onClick={() => { setSelectedFile(null); if(fileInputRef.current) fileInputRef.current.value = ""; }}
            className="text-red-500 hover:bg-red-50 p-1 rounded-full"
          >
            <FiX size={14} />
          </button>
        </div>
      )}

      {/* INPUT CONTAINER */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white flex items-center gap-3">
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-xl text-gray-500 hover:text-[#FF9B51] hover:bg-[#FF9B51]/10 transition-all duration-200"
        >
          <FiPaperclip size={20} />
        </button>

        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 p-3 bg-gray-100 rounded-xl outline-none"
        />

        <button
          type="submit"
          disabled={!inputText.trim() && !selectedFile}
          className="p-3 bg-[#FF9B51] text-white rounded-xl disabled:opacity-50 active:scale-95 transition-all"
        >
          <FiSend size={20} />
        </button>
      </form>

      <RightPanel isOpen={rightPanelOpen} onClose={() => setRightPanelOpen(false)} />
    </div>
  );
}