import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  FiHome,
  FiMessageCircle,
  FiSettings,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut
} from "react-icons/fi";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { pathname } = useLocation();

  const navItems = useMemo(
    () => [
      { icon: FiHome, label: "Home", path: "/" },
      { icon: FiMessageCircle, label: "Messages", path: "/messages" },
      { icon: FiSettings, label: "Settings", path: "/settings" },
      { icon: FiUser, label: "Profile", path: "/profile" },
    ],
    []
  );

  useEffect(() => {
    const updateSidebarWidth = () => {
      const isDesktop = window.innerWidth >= 768;

      document.documentElement.style.setProperty(
        "--sidebar-width",
        isDesktop
          ? (isExpanded ? "16rem" : "5rem")
          : "0px"
      );
    };

    updateSidebarWidth();

    window.addEventListener("resize", updateSidebarWidth);

    return () => {
      window.removeEventListener("resize", updateSidebarWidth);
    };
  }, [isExpanded]);

  const navClass = (active) => `
    flex items-center
    ${isExpanded
      ? "gap-4 px-4 py-3"
      : "justify-center py-3"}
    rounded-xl
    transition-all duration-200
    ${active
      ? "bg-black/5 text-black font-medium"
      : "text-gray-500 hover:bg-black/[0.04] hover:text-black"}
  `;

  return (
    <>
      <aside
        className={`
          hidden md:flex flex-col
          fixed top-0 left-0 z-40
          h-screen shrink-0
          bg-white/70 backdrop-blur-xl
          border-r border-black/[0.06]
          shadow-sm
          transition-all duration-300
          ${isExpanded ? "w-64" : "w-20"}
        `}
      >
        <div className="
          flex items-center justify-between
          px-4 py-4
          border-b border-black/[0.06]
        ">
          {isExpanded && (
            <h2 className="text-lg font-semibold">
              Nav
            </h2>
          )}

          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="
              ml-auto
              p-2
              rounded-xl
              hover:bg-black/[0.05]
              transition
            "
          >
            {isExpanded
              ? <FiChevronLeft size={18} />
              : <FiChevronRight size={18} />
            }
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              title={!isExpanded ? label : ""}
              className={navClass(pathname === path)}
            >
              <Icon size={22} className="shrink-0" />

              {isExpanded && (
                <span className="truncate">
                  {label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-black/[0.06]">
          <button
            className="
              w-full
              flex items-center justify-center gap-2
              px-4 py-3
              rounded-xl
              bg-black/[0.04]
              hover:bg-black/[0.07]
              transition
            "
          >
            <FiLogOut size={18} />

            {isExpanded && (
              <span className="text-sm font-medium">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      <div
        className="
          md:hidden
          fixed bottom-0 left-0 right-0 z-40
          bg-white/70 backdrop-blur-xl
          border-t border-black/[0.06]
          shadow-sm
        "
      >
        <nav className="flex items-center justify-around py-2">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = pathname === path;

            return (
              <Link
                key={path}
                to={path}
                title={label}
                className={`
                  flex flex-col items-center gap-1
                  p-3 rounded-xl
                  transition
                  ${active
                    ? "text-black"
                    : "text-gray-500 hover:text-black"}
                `}
              >
                <Icon size={22} />

                <span className="text-[11px] font-medium">
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}