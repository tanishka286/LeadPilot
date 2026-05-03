import Link from 'next/link'

export function CTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-900 to-sky-950 text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-sky-400/25 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight">Try LeadPilot</h2>
          <p className="text-lg text-sky-100/90 mb-10 leading-relaxed">
            Sign up to add leads and see your today list. Already registered? Log in to continue.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-white text-emerald-900 shadow-lg shadow-emerald-950/30 hover:bg-sky-50 transition-colors active:scale-[0.98] cursor-pointer"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border-2 border-sky-300/80 text-white hover:bg-white/10 transition-colors active:scale-[0.98] cursor-pointer"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
