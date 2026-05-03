export function ValueSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white border-t border-sky-100/80">
      <div className="section-container">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            A light tool for people who follow up by phone or message
          </h2>

          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            LeadPilot is for keeping a clear list of who to contact next. The dashboard shows today&apos;s items so you
            open the app, act, and move on—without a large CRM to learn.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Simple screens',
                description: 'Fewer fields and pages so you can add a lead or close a task in a minute.',
              },
              {
                title: 'Dates you actually use',
                description: 'Follow-up dates drive what appears on your dashboard each day.',
              },
              {
                title: 'Tasks and streak',
                description: 'Complete tasks and build streak when you use the app on consecutive days.',
              },
              {
                title: 'Straightforward scope',
                description: 'Leads, follow-ups, and a today list—no extra automation beyond that.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gradient-to-br from-sky-50/80 to-emerald-50/50 rounded-xl p-6 border border-sky-100 hover:border-emerald-200 transition-colors"
              >
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
