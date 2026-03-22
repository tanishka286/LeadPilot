# LeadPilot - Modern SaaS CRM Landing Page

A production-ready landing page for LeadPilot, a simple, action-first CRM for small businesses.

## 🎨 Design Features

- **Modern SaaS Design**: Clean, minimal aesthetic inspired by Stripe, Linear, and modern fintech
- **Dark Green Hero**: Premium color scheme with soft shadows and rounded components
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Subtle hover effects and transitions throughout
- **Semantic HTML**: Proper markup for accessibility and SEO

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Node Version**: 18+ recommended

## 📁 Project Structure

```
leadpilot/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   ├── globals.css         # Global styles and Tailwind imports
├── components/
│   ├── navbar.tsx          # Navigation with mobile menu
│   ├── hero.tsx            # Hero section with dashboard mockup
│   ├── social-proof.tsx    # Trust indicators and stats
│   ├── features.tsx        # 3-card features grid
│   ├── how-it-works.tsx    # 3-step process section
│   ├── value-section.tsx   # Value proposition section
│   ├── cta.tsx             # Call-to-action with dark background
│   └── footer.tsx          # Footer with links and socials
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, yarn, pnpm, or bun

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 📋 Landing Page Sections

1. **Navbar** - Fixed navigation with logo, links, and CTA buttons
2. **Hero** - Main headline with subtext, CTAs, and dashboard mockup UI
3. **Social Proof** - Company logos, uptime stats, and customer ratings
4. **Features** - 3 main features with icons in card layout
5. **How It Works** - 3-step horizontal timeline with descriptions
6. **Value Section** - Positioning statement and value propositions
7. **CTA** - Dark background section with primary call-to-action
8. **Footer** - Links, social media, and copyright

## 🎯 Component Highlights

### Navbar
- Responsive mobile menu with hamburger icon
- Fixed positioning with backdrop blur
- Quick access to login and trial signup

### Hero
- Large bold typography (up to 6xl on desktop)
- Gradient background with decorative circles
- Dark dashboard mockup with floating stat cards
- Trust indicators with avatar stack

### Features
- Icon cards with hover effects
- Grid that stacks on mobile
- Feature stats grid below

### How It Works
- Numbered steps with connecting lines on desktop
- Icon-based step indicators
- Info box with trial benefits

### Value Section
- Compelling positioning copy
- Grid of value propositions
- Gradient background

### CTA Section
- Dark green gradient background
- Decorative background elements
- Dual button layout (primary + secondary)

### Footer
- Multi-column link grid
- Social media links with hover states
- Dynamic copyright year
- Responsive grid layout

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to adjust the color scheme. The primary green can be modified:

```js
colors: {
  primary: {
    600: '#16a34a', // Main color
    700: '#15803d', // Hover state
  }
}
```

### Typography
Fonts are configured in `tailwind.config.js` using system fonts. Modify or add custom fonts as needed.

### Shadows & Spacing
Tailwind utilities are used throughout. Adjust breakpoints and spacing in `tailwind.config.js`.

## 📱 Responsive Design

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

All sections are optimized for each breakpoint with appropriate spacing, typography sizing, and grid adjustments.

## 🚀 Deployment

### Vercel (Recommended)

```bash
vercel
```

### Other Platforms

Works on any Node.js 18+ hosting platform including Netlify, AWS Amplify, DigitalOcean, and more.

## 📝 Features

- ✅ Production-ready Next.js 14 setup
- ✅ Full TypeScript support
- ✅ Tailwind CSS with custom config
- ✅ Responsive mobile-first design
- ✅ Reusable component architecture
- ✅ Semantic HTML
- ✅ Smooth animations and transitions
- ✅ SEO optimized
- ✅ Dark mode ready
- ✅ Accessibility compliant

## 📝 License

Open source - free to use for commercial projects.

---

**Built for growing SaaS teams**
