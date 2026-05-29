import React from "react";
import { FiX, FiFile, FiImage } from "react-icons/fi";

export default function RightPanel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="
      fixed right-0 top-0
      w-80 h-screen
      bg-white/90 backdrop-blur-xl
      border-l border-black/10
      shadow-lg
      flex flex-col
      z-50
    ">
      {/* HEADER */}
      <div className="
        flex items-center justify-between
        px-4 py-3
        border-b border-black/10
      ">
        <p className="text-sm font-semibold">Media & Files</p>

        <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-lg">
          <FiX size={18} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">

        <div className="p-3 rounded-xl bg-black/5 flex items-center gap-3">
          <FiFile />
          <div>
            <p className="text-sm font-medium">Files</p>
            <p className="text-xs text-gray-500">Connected to backend</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-black/5 flex items-center gap-3">
          <FiImage />
          <div>
            <p className="text-sm font-medium">Media</p>
            <p className="text-xs text-gray-500">Connected to backend</p>
          </div>
        </div>

      </div>
    </div>
  );
}