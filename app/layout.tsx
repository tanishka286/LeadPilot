import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LeadPilot - Sales Made Simple',
  description: 'LeadPilot helps small businesses track leads, manage deals, and close more sales faster without complicated CRM setups.',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90" font-weight="bold" fill="%2316a34a">L</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
