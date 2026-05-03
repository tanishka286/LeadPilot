'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100/90 shadow-sm shadow-sky-900/5">
      <div className="section-container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-emerald-600/25 ring-2 ring-white group-hover:shadow-lg transition-shadow">
            L
          </div>
          <span className="font-bold text-lg text-slate-900">LeadPilot</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-slate-600 hover:text-blue-700 transition-colors font-medium text-sm cursor-pointer">
            Features
          </Link>
          <Link href="#how-it-works" className="text-slate-600 hover:text-blue-700 transition-colors font-medium text-sm cursor-pointer">
            How it works
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-sm inline-flex items-center justify-center cursor-pointer">
            Login
          </Link>
          <Link href="/signup" className="btn-primary text-sm inline-flex items-center justify-center cursor-pointer">
            Sign up
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className={`w-5 h-0.5 bg-slate-800 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-slate-800 transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-slate-800 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-sky-100 md:hidden shadow-lg shadow-sky-900/5">
            <div className="section-container py-4 flex flex-col gap-4">
              <Link
                href="#features"
                className="text-slate-600 hover:text-blue-700 font-medium cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-slate-600 hover:text-blue-700 font-medium cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                How it works
              </Link>
              <div className="pt-4 border-t border-sky-100 flex flex-col gap-2">
                <Link href="/login" className="btn-ghost justify-center text-center cursor-pointer" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link href="/signup" className="btn-primary text-center cursor-pointer" onClick={() => setIsOpen(false)}>
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
