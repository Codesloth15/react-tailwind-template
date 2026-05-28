import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiHome, HiChatBubbleLeft, HiCog, HiUser, HiChevronLeft, HiChevronRight, HiArrowRightOnRectangle } from "react-icons/hi2";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  // Navigation items with icons
  const navItems = [
    { icon: HiHome, label: "Home", path: "/" },
    { icon: HiChatBubbleLeft, label: "Messages", path: "/messages" },
    { icon: HiCog, label: "Settings", path: "/settings" },
    { icon: HiUser, label: "Profile", path: "/profile" },
  ];

  const isActive = (path) => location.pathname === path;

  // Publish a CSS variable for the sidebar width so other content can adapt.
  useEffect(() => {
    const applyVar = () => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      const width = isDesktop ? (isExpanded ? '16rem' : '5rem') : '0px';
      document.documentElement.style.setProperty('--sidebar-width', width);
    };

    applyVar();

    const mql = window.matchMedia('(min-width: 768px)');
    const onChange = () => applyVar();
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else mql.addListener(onChange);
    window.addEventListener('resize', onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange);
      else mql.removeListener(onChange);
      window.removeEventListener('resize', onChange);
    };
  }, [isExpanded]);

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <div className={`
        hidden md:flex flex-col h-screen
        bg-white/70 backdrop-blur-xl
        shadow-[2px_0_20px_rgba(0,0,0,0.06)]
        transition-all duration-300 ease-out
        ${isExpanded ? "w-64" : "w-20"}
        shrink-0 fixed left-0 top-0 z-40
      `}>
        {/* Sidebar Header */}
        <div className="
          px-4 py-4 flex items-center justify-between
          bg-white/60 backdrop-blur-md border-b
          border-primary/10
        ">
          {isExpanded && (
            <h2 className="text-xl font-bold text-primary">Nav</h2>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="
              p-2 rounded-lg hover:bg-black/5
              active:scale-95 transition
              ml-auto
            "
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <HiChevronLeft size={20} /> : <HiChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const base = isExpanded
              ? 'flex items-center gap-4 px-4 py-3 rounded-lg'
              : 'flex items-center justify-center w-full py-3 rounded-lg';
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  ${base}
                  transition-all duration-200
                  ${isActive(item.path) ? 'bg-primary/10 text-primary font-semibold' : 'text-secondary hover:bg-black/5'}
                `}
                title={!isExpanded ? item.label : ''}
              >
                <IconComponent size={24} className="shrink-0" />
                {isExpanded && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="
          p-4 border-t border-primary/10
          bg-white/40
        ">
          <button className="
            w-full px-4 py-2 rounded-lg
            bg-primary/10 text-primary
            hover:bg-primary/20 transition
            text-sm font-medium
            flex items-center justify-center gap-2
          ">
            {isExpanded ? (
              <>
                <HiArrowRightOnRectangle size={18} />
                <span>Logout</span>
              </>
            ) : (
              <HiArrowRightOnRectangle size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="
        md:hidden fixed bottom-0 left-0 right-0
        bg-white/70 backdrop-blur-xl
        border-t border-primary/10
        shadow-[0_-2px_20px_rgba(0,0,0,0.06)]
        z-40
      ">
        <nav className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex flex-col items-center gap-1 p-3
                  transition-all duration-200
                  ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-secondary hover:text-primary/70"
                  }
                `}
                title={item.label}
              >
                <IconComponent size={24} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}