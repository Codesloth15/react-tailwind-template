import React, { useState, useRef, useEffect } from "react";
import { Paperclip, Send, Edit2, Check, X, MessageSquare } from "lucide-react";

export default function ChatBox() {
  // 1. STATE MANAGEMENT
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the project chat!", sender: "bot", time: "10:00 AM" },
    { id: 2, text: "You can send messages and attach files here.", sender: "bot", time: "10:01 AM" },
  ]);

  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Editing states
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 2. HANDLERS
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedFile) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fileName: selectedFile ? selectedFile.name : null,
    };

    setMessages([...messages, newMessage]);
    setInputText("");
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, text: editText } : msg));
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="flex flex-col w-full max-w-2xl h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 mx-auto">
      
      {/* HEADER */}
      <div className="bg-[#FF9B51] p-4 text-white font-bold flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} />
          <h2 className="tracking-wide">Project Discussion</h2>
        </div>
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Active Now</span>
      </div>

      {/* MESSAGES VIEWPORT */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4 scroll-smooth"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col max-w-[80%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
          >
            <div className={`p-3 rounded-2xl relative group shadow-sm transition-all ${
              msg.sender === "user" 
                ? "bg-[#FF9B51] text-white rounded-tr-none" 
                : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
            }`}>
              
              {editingId === msg.id ? (
                <div className="flex items-center gap-2">
                  <input 
                    autoFocus
                    type="text" 
                    value={editText} 
                    onChange={(e) => setEditText(e.target.value)} 
                    className="p-1 text-black rounded border border-gray-300 focus:outline-none text-sm w-full"
                  />
                  <button onClick={() => saveEdit(msg.id)} className="text-green-500 hover:text-green-600"><Check size={18} /></button>
                  <button onClick={() => setEditingId(null)} className="text-red-400 hover:text-red-500"><X size={18} /></button>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  {msg.fileName && (
                    <div className="mt-2 p-2 bg-black/10 rounded-lg text-[11px] flex items-center gap-2 font-medium">
                      <Paperclip size={12} /> {msg.fileName}
                    </div>
                  )}
                </div>
              )}

              {/* Edit Trigger - Only for user messages */}
              {msg.sender === "user" && editingId !== msg.id && (
                <button 
                  onClick={() => startEdit(msg.id, msg.text)}
                  className="absolute -left-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-400 hover:text-[#FF9B51] hover:bg-gray-100 rounded-lg"
                >
                  <Edit2 size={14} />
                </button>
              )}
            </div>
            <span className="text-[10px] text-gray-400 mt-1 px-1 uppercase font-semibold">{msg.time}</span>
          </div>
        ))}
      </div>

      {/* FILE PREVIEW BAR */}
      {selectedFile && (
        <div className="px-4 py-2 bg-orange-50 border-t border-orange-100 flex items-center justify-between text-xs animate-slide-up">
          <span className="flex items-center gap-2 text-orange-700 italic">
            <Paperclip size={14} /> Attachment: {selectedFile.name}
          </span>
          <button onClick={() => setSelectedFile(null)} className="text-gray-400 hover:text-red-500">
            <X size={14} />
          </button>
        </div>
      )}

      {/* INPUT FORM */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />
        
        <button 
          type="button" 
          onClick={() => fileInputRef.current.click()}
          className="p-2 text-gray-400 hover:text-[#FF9B51] hover:bg-orange-50 rounded-full transition-all"
          title="Attach File"
        >
          <Paperclip size={22} />
        </button>

        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 p-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF9B51]/50 focus:bg-white transition-all text-sm"
        />

        <button 
          type="submit"
          disabled={!inputText.trim() && !selectedFile}
          className="p-3 bg-[#FF9B51] text-white rounded-2xl hover:bg-[#e88a45] transition-all shadow-lg shadow-orange-200 disabled:opacity-50 disabled:shadow-none"
        >
          <Send size={20} />
        </button>
      </form>

    </div>
  );
}