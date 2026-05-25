import React from 'react';

export default function Header({
  title = 'Design Crew',
  status = 'Online',
  isOnline = true,
  onBack
}) {
  const initials = title
    ? title.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'DC';

  return (
    <div className="
      fixed bottom-3 left-1/2 -translate-x-1/2
      w-[96%] max-w-3xl
      flex items-center justify-between
      px-4 py-3
      rounded-2xl
      text-primary
      font-sans select-none
      transition-all duration-300

      bg-white/70 backdrop-blur-xl
      shadow-[0_10px_30px_rgba(0,0,0,0.12)]
      hover:shadow-[0_15px_40px_rgba(0,0,0,0.18)]

      border-0
      z-50
    ">

      {/* Left Section */}
      <div className="flex items-center gap-3 min-w-0">

        {/* Back Button */}
        <button
          onClick={onBack}
          className="md:hidden p-2 rounded-xl text-secondary hover:text-primary hover:bg-white/60 active:scale-95 transition"
          aria-label="Go back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="
            w-10 h-10 rounded-full
            bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-500
            flex items-center justify-center
            text-white font-bold text-sm
            shadow-md
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

        {/* Text */}
        <div className="flex flex-col min-w-0">
          <h2 className="text-[15px] font-semibold truncate leading-tight">
            {title}
          </h2>

          <div className="flex items-center gap-2 text-xs text-secondary">
            {isOnline && (
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            )}
            <span className="truncate">{status}</span>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1">

        {/* Call */}
        <button className="p-2 rounded-xl hover:bg-white/60 active:scale-95 transition">
          📞
        </button>

        {/* Video */}
        <button className="p-2 rounded-xl hover:bg-white/60 active:scale-95 transition">
          🎥
        </button>

        {/* More */}
        <button className="p-2 rounded-xl hover:bg-white/60 active:scale-95 transition">
          ⋮
        </button>

      </div>
    </div>
  );
}