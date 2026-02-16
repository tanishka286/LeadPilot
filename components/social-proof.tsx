export function SocialProof() {
  const companies = [
    { name: 'TechStart', initials: 'TS' },
    { name: 'SalesHub', initials: 'SH' },
    { name: 'Growth Co', initials: 'GC' },
    { name: 'Velocity', initials: 'V' },
    { name: 'Prime Sales', initials: 'PS' },
  ]

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary-600 mb-2 uppercase tracking-wide">
            Trusted by Growing Teams
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Join 500+ businesses closing deals faster
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {companies.map((company, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-gray-600">{company.initials}</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">{company.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-12 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">98%</p>
              <p className="text-gray-600 mt-1">Uptime SLA</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">24h</p>
              <p className="text-gray-600 mt-1">Setup Time</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">4.9★</p>
              <p className="text-gray-600 mt-1">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
