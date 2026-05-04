"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut, User } from "lucide-react";

export type AppNavActive = "dashboard" | "leads" | "profile";

interface AppNavbarProps {
  active: AppNavActive;
  onLogout: () => void;
}

export function AppNavbar({ active, onLogout }: AppNavbarProps) {
  const linkBase =
    "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold transition-all duration-200 ease-in-out cursor-pointer";
  const inactive = `${linkBase} text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800`;
  const activeLink = `${linkBase} text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800`;

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-wrap">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 shrink-0 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:bg-gray-800 transition-colors">
              L
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              LeadPilot
            </span>
          </Link>
          <span
            className="hidden sm:inline text-gray-300 dark:text-gray-600 select-none"
            aria-hidden
          >
            |
          </span>
          <nav className="flex items-center gap-1 sm:gap-3 text-sm font-semibold">
            <Link
              href="/dashboard"
              className={active === "dashboard" ? activeLink : inactive}
            >
              <LayoutDashboard className="h-4 w-4 opacity-70" />
              <span>Dashboard</span>
            </Link>
            <span className="text-gray-300 dark:text-gray-600 hidden sm:inline" aria-hidden>
              |
            </span>
            <Link
              href="/leads"
              className={active === "leads" ? activeLink : inactive}
            >
              <span>Leads</span>
            </Link>
            <span className="text-gray-300 dark:text-gray-600 hidden sm:inline" aria-hidden>
              |
            </span>
            <Link
              href="/profile"
              className={active === "profile" ? activeLink : inactive}
            >
              <User className="h-4 w-4 opacity-70" />
              <span>Profile</span>
            </Link>
          </nav>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out hover:scale-[1.02] shrink-0 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
