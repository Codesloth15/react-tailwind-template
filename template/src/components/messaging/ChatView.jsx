import React from 'react';

export default function ChatView({
  title = 'Design Crew',
  status = 'Online',
  isOnline = true
}) {
  const initials = title
    ? title.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'DC';

  return (
    <div className="
      w-full
      flex items-center justify-between
      px-4 py-3

      bg-white/80 backdrop-blur-md
      shadow-[0_6px_18px_rgba(0,0,0,0.08)]

      text-primary font-sans select-none
      transition-all duration-300
    ">

      {/* Left Section */}
      <div className="flex items-center gap-3 min-w-0">

        {/* Avatar */}
        <div className="relative">
          <div className="
            w-10 h-10 rounded-full
            bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-500
            text-white flex items-center justify-center
            font-semibold text-sm
          ">
            {initials}
          </div>

          {isOnline && (
            <span className="
              absolute bottom-0 right-0
              w-3 h-3
              bg-emerald-500
              border-2 border-white
              rounded-full
              animate-pulse
            " />
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col min-w-0 leading-tight">
          <h2 className="text-[15px] font-semibold truncate">
            {title}
          </h2>

          <div className="flex items-center gap-2 text-xs text-secondary mt-0.5">
            {isOnline && (
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            )}
            <span className="truncate">{status}</span>
          </div>
        </div>

      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 shrink-0">

        <button className="p-2 hover:bg-black/5 active:scale-95 transition">
          📞
        </button>

        <button className="p-2 hover:bg-black/5 active:scale-95 transition">
          🎥
        </button>

        <button className="p-2 hover:bg-black/5 active:scale-95 transition">
          ⋮
        </button>

      </div>
    </div>
  );
}