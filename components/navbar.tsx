'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:shadow-soft transition-shadow">
            L
          </div>
          <span className="font-bold text-lg text-gray-900">LeadPilot</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm">
            Pricing
          </Link>
          <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm">
            About
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="btn-ghost text-sm">
            Login
          </button>
          <button className="btn-primary text-sm">
            Start Free Trial
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-0.5 bg-gray-900 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-gray-900 transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-gray-900 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 md:hidden">
            <div className="section-container py-4 flex flex-col gap-4">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 font-medium">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">
                Pricing
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 font-medium">
                About
              </Link>
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                <button className="btn-ghost justify-center">Login</button>
                <button className="btn-primary">Start Free Trial</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
