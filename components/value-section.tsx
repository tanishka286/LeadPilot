export function ValueSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="section-container">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Stop managing spreadsheets.
            <span className="block text-primary-600">Start closing deals.</span>
          </h2>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Most CRMs are built for enterprise teams. Complicated. Expensive. Slower than the sales process itself.
          </p>

          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            LeadPilot is different. We stripped away the noise and built exactly what small businesses need. Track leads. Close deals. Scale up. No spreadsheets. No unnecessary features. No learning curve.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Built for speed',
                description: 'Your team gets organized faster. Most teams see results in the first week.'
              },
              {
                title: 'Priced fairly',
                description: 'Not per-user pricing. One flat monthly rate for your whole team. No surprises.'
              },
              {
                title: 'Privacy-first',
                description: 'Your customer data stays yours. We never sell leads or access data without permission.'
              },
              {
                title: 'Always improving',
                description: 'We listen to customer feedback and ship updates every week. Your voice shapes the product.'
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-200 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
