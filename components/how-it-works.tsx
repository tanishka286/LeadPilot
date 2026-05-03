import { UserPlus, Calendar, LayoutDashboard, CheckCircle, CalendarPlus, Flame } from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'Add lead',
    line: 'Enter name, phone, and notes',
    description: 'Create a lead with the basics in one form.',
    icon: UserPlus,
  },
  {
    number: 2,
    title: 'Set follow-up date',
    line: 'Choose next contact date',
    description: 'It appears on your dashboard when due.',
    icon: Calendar,
  },
  {
    number: 3,
    title: 'Open your dashboard',
    line: 'See what to do today',
    description: 'Overdue, today, and marked-hot leads are listed first.',
    icon: LayoutDashboard,
  },
  {
    number: 4,
    title: 'Mark tasks done',
    line: 'Log call or message done',
    description: 'Check off the follow-up when you are finished.',
    icon: CheckCircle,
  },
  {
    number: 5,
    title: 'Set next follow-up',
    line: 'Choose next follow-up date',
    description: 'The lead stays on your list until you clear it.',
    icon: CalendarPlus,
  },
  {
    number: 6,
    title: 'Build a streak',
    line: 'Complete tasks and build streak',
    description: 'Finish at least one task on days you use the app.',
    icon: Flame,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-emerald-50/40 via-sky-50/30 to-white border-t border-sky-100">
      <div className="section-container">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">How it works</h2>
          <p className="text-lg text-slate-600">
            From a new lead to your next follow-up in a few steps.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ol className="relative border-l-2 border-sky-200 ml-4 md:ml-8 space-y-14 md:space-y-16 pl-8 md:pl-12">
            {steps.map(({ number, title, line, description, icon: Icon }) => (
              <li key={number} className="relative">
                <span className="absolute -left-[calc(1rem+13px)] md:-left-[calc(2rem+13px)] flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 text-white text-base font-bold ring-4 ring-emerald-50 shadow-md shadow-emerald-600/20">
                  {number}
                </span>
                <div className="bg-white rounded-2xl border border-sky-100 p-6 md:p-8 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all ring-1 ring-emerald-50/40">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-sky-700 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>
                      <p className="text-sm font-semibold text-blue-800/90 mb-2">{line}</p>
                      <p className="text-slate-600 leading-relaxed text-[15px]">{description}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
