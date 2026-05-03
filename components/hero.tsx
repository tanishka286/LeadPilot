'use client'

import Link from 'next/link'
import { ListChecks, Flame } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-sky-50 via-white to-emerald-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-200/45 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
                Track your leads.
                <span className="block bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mt-1">
                  Set follow-ups. See what to do today.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                One list for who to call or message and when. Mark tasks done and keep a small streak when you show up
                regularly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="#how-it-works"
                className="btn-secondary flex items-center justify-center gap-2 text-base py-3 cursor-pointer"
              >
                How it works
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-slate-800 via-emerald-950 to-sky-950 rounded-2xl shadow-soft-lg overflow-hidden border border-emerald-800/40 ring-1 ring-sky-500/20">
              <div className="bg-slate-900/80 border-b border-emerald-800/50 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <div className="w-3 h-3 rounded-full bg-sky-400/70" />
                <div className="w-3 h-3 rounded-full bg-white/25" />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-2 w-28 bg-sky-400/30 rounded" />
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-emerald-500/20 rounded border border-emerald-500/30" />
                    <div className="h-8 w-8 bg-sky-500/20 rounded border border-sky-400/30" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {['Today', 'Overdue', 'Hot'].map((label) => (
                    <div key={label} className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="h-2 w-12 bg-sky-300/40 rounded mb-2" />
                      <div className="h-4 w-8 bg-emerald-400/80 rounded" />
                      <p className="text-[10px] text-sky-200/70 mt-2 font-medium uppercase tracking-wide">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="space-y-1 flex-1">
                        <div className="h-2 w-32 bg-white/20 rounded" />
                        <div className="h-1.5 w-24 bg-sky-300/25 rounded" />
                      </div>
                      <div className="h-2 w-14 bg-emerald-400/50 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-soft-lg border border-sky-100 ring-1 ring-emerald-100/60 p-3 max-w-[220px] hidden lg:block">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                  <ListChecks className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Today&apos;s actions</p>
                  <p className="text-sm font-semibold text-slate-900">Follow-ups due</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-soft-lg border border-sky-100 ring-1 ring-emerald-100/60 p-3 max-w-[220px] hidden lg:block">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 text-sky-700" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Streak</p>
                  <p className="text-sm font-semibold text-slate-900">Build your streak</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
