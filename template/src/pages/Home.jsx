import React, { useState } from "react";
import ChatView from "./../components/messaging/ChatView";

export default function Home() {
  const [currentView, setCurrentView] = useState("list");

  return (
    <div className="
      h-screen w-full flex
      bg-background text-primary
      overflow-hidden font-sans
    ">

      {/* ─────────────────────────────
          LEFT SIDEBAR (CHAT LIST)
      ───────────────────────────── */}
      <div className={`
        ${currentView === "list" ? "flex" : "hidden"}
        md:flex w-full md:w-80 h-full flex-col

        bg-white/70 backdrop-blur-xl
        shadow-[2px_0_20px_rgba(0,0,0,0.06)]

        shrink-0
      `}>

        {/* Sidebar Header */}
        <div className="
          px-4 py-3
          flex items-center justify-between
          bg-white/60 backdrop-blur-md
        ">
          <h1 className="text-lg font-bold">Messages</h1>

          <button className="
            p-2 rounded-xl
            hover:bg-black/5
            active:scale-95 transition
          ">
            ✏️
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">

          {/* ACTIVE CHAT */}
          <div
            onClick={() => setCurrentView("chat")}
            className="
              flex items-center gap-3 p-3
              cursor-pointer

              bg-gradient-to-r from-orange-400/90 to-orange-500/80
              text-white

              hover:scale-[1.01]
              transition-all duration-200

              shadow-sm
            "
          >
            <div className="
              w-10 h-10 rounded-full
              bg-white/20
              flex items-center justify-center
              font-semibold text-sm
            ">
              DC
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-sm truncate">
                  Design Crew
                </span>
                <span className="text-[11px] opacity-80">
                  10:35 AM
                </span>
              </div>

              <p className="text-xs opacity-80 truncate mt-0.5">
                Sarah: Let's make sure the assets...
              </p>
            </div>
          </div>

          {/* NORMAL CHAT */}
          <div className="
            flex items-center gap-3 p-3
            hover:bg-black/5
            cursor-pointer
            transition
          ">
            <div className="
              w-10 h-10 rounded-full
              bg-gradient-to-br from-emerald-400 to-orange-600
              flex items-center justify-center
              text-white font-semibold text-sm
            ">
              M
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-sm truncate">
                  Marketing Ops
                </span>
                <span className="text-[11px] text-secondary">
                  Yesterday
                </span>
              </div>

              <p className="text-xs text-secondary truncate mt-0.5">
                You: Sent a link
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────
          RIGHT CHAT AREA
      ───────────────────────────── */}
      <div className={`
        ${currentView === "chat" ? "flex" : "hidden"}
        md:flex flex-1 h-full flex-col
        bg-background
      `}>
        <div className="flex-1 h-full">
          <ChatView onBack={() => setCurrentView("list")} />
        </div>
      </div>

    </div>
  );
}