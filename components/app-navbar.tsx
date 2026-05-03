"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";

export type AppNavActive = "dashboard" | "leads";

interface AppNavbarProps {
  active: AppNavActive;
  onLogout: () => void;
}

export function AppNavbar({ active, onLogout }: AppNavbarProps) {
  const linkBase =
    "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold transition-colors cursor-pointer";
  const inactive = `${linkBase} text-gray-600 hover:text-gray-900 hover:bg-gray-50`;
  const activeLink = `${linkBase} text-gray-900 bg-gray-100`;

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-wrap">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 shrink-0 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:bg-gray-800 transition-colors">
              L
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              LeadPilot
            </span>
          </Link>
          <span
            className="hidden sm:inline text-gray-300 select-none"
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
            <span className="text-gray-300 hidden sm:inline" aria-hidden>
              |
            </span>
            <Link
              href="/leads"
              className={active === "leads" ? activeLink : inactive}
            >
              <span>Leads</span>
            </Link>
          </nav>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-colors shrink-0 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
