'use client'

import { ArrowRight, TrendingUp, BarChart3, Zap } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Sales Made Simple.
                <span className="block text-primary-600">Deals Closed Faster.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                LeadPilot helps small businesses track leads, manage clients, and close more deals without complicated CRM setups. Get organized in minutes, not months.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary flex items-center justify-center gap-2 text-base py-3">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="btn-secondary flex items-center justify-center gap-2 text-base py-3">
                See How It Works
              </button>
            </div>

            {/* Trust indicators */}
            <div className="pt-4 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">500+</span> teams already growing with LeadPilot
              </p>
            </div>
          </div>

          {/* Right Dashboard Mockup */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-soft-lg overflow-hidden border border-gray-700">
              {/* Window header */}
              <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              {/* Dashboard content */}
              <div className="p-6 space-y-4">
                {/* Header bar */}
                <div className="flex items-center justify-between">
                  <div className="h-2 w-24 bg-gray-700 rounded" />
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-700 rounded" />
                    <div className="h-8 w-8 bg-gray-700 rounded" />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="h-2 w-16 bg-gray-600 rounded mb-2" />
                    <div className="h-4 w-12 bg-primary-500 rounded" />
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="h-2 w-16 bg-gray-600 rounded mb-2" />
                    <div className="h-4 w-12 bg-primary-500 rounded" />
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="h-2 w-16 bg-gray-600 rounded mb-2" />
                    <div className="h-4 w-12 bg-primary-500 rounded" />
                  </div>
                </div>

                {/* Table mock */}
                <div className="space-y-3 pt-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b border-gray-700 pb-3">
                      <div className="space-y-1 flex-1">
                        <div className="h-2 w-32 bg-gray-600 rounded" />
                        <div className="h-1.5 w-24 bg-gray-700 rounded" />
                      </div>
                      <div className="h-2 w-16 bg-primary-500/30 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-soft-lg border border-gray-100 p-3 max-w-xs hidden lg:block">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Pipeline Value</p>
                  <p className="text-sm font-bold text-gray-900">$125,000</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-soft-lg border border-gray-100 p-3 max-w-xs hidden lg:block">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Deals Closed</p>
                  <p className="text-sm font-bold text-gray-900">+8 This Week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
