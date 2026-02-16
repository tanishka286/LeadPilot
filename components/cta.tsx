import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to take control of your sales?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Join hundreds of growing teams who are closing deals faster with LeadPilot. Start your free 14-day trial today—no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 hover:bg-primary-50 font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center gap-2 text-base">
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-colors text-base">
              Schedule Demo
            </button>
          </div>

          <p className="text-sm text-primary-200 mt-8">
            No credit card required. Full access for 14 days. Questions? Email us at hello@leadpilot.io
          </p>
        </div>
      </div>
    </section>
  )
}
