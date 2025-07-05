'use client';
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "../../context/AuthContext";
import { useTheme } from "next-themes";
import { FaReceipt } from "react-icons/fa";

const Navbar: React.FC = () => {
  const { user, transactionCount } = useAuthContext();
  // Placeholder for cart count, replace with real logic if available
  const cartCount = 0;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(false);

  // Sync darkMode toggle with theme
  useEffect(() => {
    // If theme is system, use resolvedTheme
    const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";
    setDarkMode(isDark);
  }, [theme, resolvedTheme]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  // On logout, reset theme to system and remove preference
  const handleLogout = () => {
    localStorage.removeItem("theme");
    setTheme("system");
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-primary-900 via-secondary-900 to-black py-3 px-6 flex items-center justify-between shadow-2xl border-b-4 border-accent-600/40 z-50">
      <Link href="/" className="text-2xl font-extrabold text-white tracking-wider font-mono flex items-center gap-2 drop-shadow-lg">
        <span className="inline-block text-accent-400 animate-pulse">🎮</span> GameStore
      </Link>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>
      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        {/* My Transactions Icon with badge */}
        <Link href="/transactions" className="relative group flex items-center gap-2">
          <FaReceipt className="text-white text-2xl drop-shadow" />
          <span className="text-white font-bold text-lg">My Transactions</span>
          <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow group-hover:scale-110 transition-transform border-2 border-primary-900">
            {transactionCount}
          </span>
        </Link>
        {/* User info with dropdown menu */}
        <div className="relative" ref={menuRef}>
          <button
            className="flex items-center gap-2 bg-gradient-to-br from-accent-700/60 to-primary-700/60 px-3 py-1 rounded-xl shadow-inner border border-accent-500/30 focus:outline-none focus:ring-2 focus:ring-accent-400"
            onClick={() => setMenuOpen((open) => !open)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            {/* Placeholder avatar */}
            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-accent-400">
              <span role="img" aria-label="avatar">👤</span>
            </span>
            <span className="text-white font-bold text-lg font-mono tracking-wide drop-shadow">{user?.username || "Guest"}</span>
            <svg className={`w-4 h-4 ml-1 text-accent-300 transition-transform ${menuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-primary-900 border border-accent-400 rounded-lg shadow-lg z-50 animate-fade-in-up py-2">
              <button
                className="flex items-center w-full px-4 py-2 text-white hover:bg-accent-600/80 rounded-lg transition-colors font-mono font-semibold gap-2"
                onClick={handleDarkModeToggle}
              >
                <span className="text-lg">{darkMode ? "🌙" : "☀️"}</span>
                <span>Dark Mode</span>
                <span className="ml-auto">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={handleDarkModeToggle}
                    className="accent-accent-500 w-4 h-4 rounded focus:ring-2 focus:ring-accent-400"
                    aria-label="Toggle dark mode"
                  />
                </span>
              </button>
              <Link
                href="/logout"
                className="block px-4 py-2 text-white hover:bg-accent-600/80 rounded-lg transition-colors font-mono font-semibold mt-1"
                onClick={handleLogout}
              >
                <span className="mr-2">🚪</span> Logout
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-primary-900 border-t border-accent-400 shadow-lg z-40 animate-fade-in-up">
          <div className="flex flex-col gap-2 py-4 px-6">
            <Link href="/transactions" className="flex items-center gap-2 text-white font-bold text-lg py-2 border-b border-accent-700" onClick={() => setMenuOpen(false)}>
              <FaReceipt className="text-white text-2xl" />
              My Transactions
              <span className="ml-auto bg-accent-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow border-2 border-primary-900">
                {transactionCount}
              </span>
            </Link>
            <button
              className="flex items-center gap-2 text-white font-bold text-lg py-2 border-b border-accent-700"
              onClick={handleDarkModeToggle}
            >
              <span className="text-lg">{darkMode ? "🌙" : "☀️"}</span>
              Dark Mode
              <input
                type="checkbox"
                checked={darkMode}
                onChange={handleDarkModeToggle}
                className="ml-auto accent-accent-500 w-4 h-4 rounded focus:ring-2 focus:ring-accent-400"
                aria-label="Toggle dark mode"
              />
            </button>
            <Link
              href="/logout"
              className="flex items-center gap-2 text-white font-bold text-lg py-2"
              onClick={() => { handleLogout(); setMenuOpen(false); }}
            >
              <span className="mr-2">🚪</span> Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default React.memo(Navbar); 