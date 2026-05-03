import { Users, CalendarCheck, LayoutDashboard, CheckCircle, Flame } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group bg-white border border-sky-100 rounded-2xl p-8 hover:shadow-soft-lg transition-all duration-300 hover:border-emerald-200/80 ring-1 ring-emerald-50/50">
      <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-sky-100 rounded-xl flex items-center justify-center text-emerald-700 mb-4 group-hover:scale-105 transition-transform [&_svg]:text-emerald-700">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-[15px]">{description}</p>
    </div>
  )
}

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white border-t border-sky-100/80">
      <div className="section-container">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Leads and follow-ups in one place
          </h2>
          <p className="text-lg text-slate-600">
            Add leads, set dates, and work from a short today list.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <FeatureCard
            icon={<Users className="w-6 h-6" />}
            title="Track your leads"
            description="Name, phone, status, and notes stay in one list you can search and edit."
          />
          <FeatureCard
            icon={<CalendarCheck className="w-6 h-6" />}
            title="Set follow-ups"
            description="Pick a next contact date so nothing stays off your radar."
          />
          <FeatureCard
            icon={<LayoutDashboard className="w-6 h-6" />}
            title="See what to do today"
            description="Due and overdue items show first so you can scan the list quickly."
          />
          <FeatureCard
            icon={<CheckCircle className="w-6 h-6" />}
            title="Complete tasks"
            description="Mark a follow-up done and set the next date when you are ready."
          />
          <FeatureCard
            icon={<Flame className="w-6 h-6" />}
            title="Streak"
            description="See how many days in a row you have finished at least one task."
          />
        </div>
      </div>
    </section>
  )
}
