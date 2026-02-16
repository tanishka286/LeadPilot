import { Bell, Zap, BarChart3 } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-soft-lg transition-all duration-300 hover:border-primary-200">
      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to close deals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built for small teams who want CRM power without the complexity. Get started in 24 hours, not months.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Bell className="w-6 h-6" />}
            title="Smart Follow-Ups"
            description="Automatic reminders and follow-up suggestions so no lead falls through the cracks. Stay on top of every conversation."
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Clear Deal Pipeline"
            description="Visualize your entire pipeline at a glance. Track deal stages, probabilities, and forecasts in real-time without complexity."
          />
          <FeatureCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Action Dashboard"
            description="See what matters most. Your dashboard shows leads to contact today, deals closing soon, and key metrics in one view."
          />
        </div>

        <div className="mt-16 pt-16 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Integrations', value: '50+' },
              { label: 'Team Members', value: 'Unlimited' },
              { label: 'Data History', value: 'Unlimited' },
              { label: 'API Access', value: 'Included' },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-primary-600 mb-1">{feature.value}</p>
                <p className="text-sm text-gray-600">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
