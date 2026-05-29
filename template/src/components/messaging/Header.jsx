import React, { useState } from "react";
import {
  FiArrowLeft,
  FiPhone,
  FiVideo,
  FiMoreVertical
} from "react-icons/fi";

export default function Header({ title = "Design Crew", status = "Online", isOnline = true, onOpenPanel, onBack }) {
  const initials = title
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="
      flex items-center justify-between
      px-4 py-3
      bg-white/70 backdrop-blur-xl
      border-b border-black/10
    ">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="md:hidden p-2 hover:bg-black/5 rounded-xl">
          <FiArrowLeft size={18} />
        </button>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold">
          {initials}
        </div>

        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-gray-500">{status}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-black/5 rounded-xl">
          <FiPhone size={18} />
        </button>

        <button className="p-2 hover:bg-black/5 rounded-xl">
          <FiVideo size={18} />
        </button>

        {/* 3 DOTS → OPEN RIGHT PANEL */}
        <button
          onClick={onOpenPanel}
          className="p-2 hover:bg-black/5 rounded-xl"
        >
          <FiMoreVertical size={18} />
        </button>
      </div>
    </div>
  );
}