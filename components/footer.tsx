import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-emerald-950 text-sky-200/80 border-t border-emerald-800/50">
      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-emerald-900/40">
                L
              </div>
              <span className="font-bold text-lg text-white">LeadPilot</span>
            </div>
            <p className="text-sm text-sky-200/60">Track leads, set follow-ups, and work from a today list.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="hover:text-emerald-300 transition-colors cursor-pointer">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-emerald-300 transition-colors cursor-pointer">How it works</Link></li>
              <li><Link href="/signup" className="hover:text-emerald-300 transition-colors cursor-pointer">Sign up</Link></li>
              <li><Link href="/login" className="hover:text-emerald-300 transition-colors cursor-pointer">Login</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#about" className="hover:text-emerald-300 transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-emerald-300 transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-emerald-300 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-emerald-300 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-emerald-300 transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-emerald-300 transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-emerald-300 transition-colors">Cookies</Link></li>
              <li><Link href="#" className="hover:text-emerald-300 transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-sky-200/50">
            © {currentYear} LeadPilot. All rights reserved. Built for growing businesses.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="text-sky-300/70 hover:text-white transition-colors p-2 hover:bg-emerald-800/50 rounded-lg cursor-pointer">
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-sky-300/70 hover:text-white transition-colors p-2 hover:bg-emerald-800/50 rounded-lg cursor-pointer">
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="text-sky-300/70 hover:text-white transition-colors p-2 hover:bg-emerald-800/50 rounded-lg cursor-pointer">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:hello@leadpilot.io" className="text-sky-300/70 hover:text-white transition-colors p-2 hover:bg-emerald-800/50 rounded-lg cursor-pointer">
              <Mail className="w-5 h-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
