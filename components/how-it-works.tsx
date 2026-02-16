import { ArrowRight, Upload, MessageSquare, Target } from 'lucide-react'

interface StepProps {
  number: number
  icon: React.ReactNode
  title: string
  description: string
}

function Step({ number, icon, title, description }: StepProps) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 relative z-10">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary-600">
            {icon}
          </div>
        </div>
        <span className="text-sm font-bold text-gray-400 mb-2">Step {number}</span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed max-w-xs">{description}</p>
      </div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Three simple steps to more deals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in minutes and start closing deals in hours. It's that simple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-[calc(33.333%)] right-[calc(33.333%)] h-0.5 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200" />

          <Step
            number={1}
            icon={<Upload className="w-6 h-6" />}
            title="Add Your Leads"
            description="Import leads from email, forms, or add them manually. Connect your favorite tools for seamless data flow."
          />
          <Step
            number={2}
            icon={<MessageSquare className="w-6 h-6" />}
            title="Track Conversations"
            description="Log calls, emails, and meetings automatically. Keep all interactions in one place with full context."
          />
          <Step
            number={3}
            icon={<Target className="w-6 h-6" />}
            title="Close More Deals"
            description="Move deals through your pipeline, get smart reminders, and watch your close rate climb month over month."
          />
        </div>

        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-primary-600">✓</span>
                  Free for 14 days
                </h4>
                <p className="text-gray-600 text-sm">No credit card required. Full access to all features.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-primary-600">✓</span>
                  Personal onboarding
                </h4>
                <p className="text-gray-600 text-sm">Our team walks you through setup. Usually takes 30 minutes.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-primary-600">✓</span>
                  Cancel anytime
                </h4>
                <p className="text-gray-600 text-sm">If it doesn't work for you, no questions asked. Monthly or annual.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
