# 🚀 Quick Start Guide - LeadPilot

## Get Running in 3 Steps

### Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons

### Step 2: Start Development Server

```bash
npm run dev
```

The server starts at `http://localhost:3000`

### Step 3: Open in Browser

Navigate to http://localhost:3000 and see your landing page live!

---

## 📦 Available Scripts

### Development
```bash
npm run dev
```
Start the development server with hot-reload. Visit http://localhost:3000

### Build
```bash
npm run build
```
Creates an optimized production build in the `.next` folder

### Production
```bash
npm start
```
Runs the built app (requires `npm run build` first)

### Linting
```bash
npm run lint
```
Check code quality with ESLint

---

## 🎯 Quick Customization

### Change Brand Color
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    600: '#YOUR_HEX_COLOR',  // Main color
    700: '#DARKER_HEX',       // Hover state
    900: '#DARKEST_HEX'       // Dark sections
  }
}
```

### Edit Headlines
Edit component files in `components/`:
- Hero headline: `components/hero.tsx` line ~25
- Feature titles: `components/features.tsx`
- Section titles: Each component

### Change CTA Text
Update button text in `components/navbar.tsx` and `components/cta.tsx`

---

## 🌐 Deployment

### Vercel (Easiest - Recommended)
```bash
npm install -g vercel
vercel
```
Follow prompts. Site goes live automatically.

### Build for Any Host
```bash
npm run build
npm start
```
Outputs static site ready for:
- Netlify
- AWS Amplify
- DigitalOcean
- Any Node.js server

---

## 📁 Project Structure

```
LeadPilot/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main landing page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── navbar.tsx
│   ├── hero.tsx
│   ├── features.tsx
│   ├── footer.tsx
│   └── ... (5 more)
├── public/                # Static assets (add images/logos here)
├── package.json
└── tailwind.config.js     # Tailwind customization
```

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies & scripts |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.js` | Tailwind CSS customization |
| `next.config.js` | Next.js settings |
| `.eslintrc.json` | Code quality rules |
| `.env.example` | Environment variables template |

---

## 💡 Key Features

✅ **Modern SaaS Design** - Clean, minimal aesthetic
✅ **Fully Responsive** - Mobile, tablet, desktop optimized
✅ **Dark Green Theme** - Professional color scheme
✅ **Component-Based** - Reusable, maintainable code
✅ **TypeScript** - Full type safety
✅ **Tailwind CSS** - Utility-first styling
✅ **Production Ready** - Deploy immediately

---

## 🎨 Sections Included

1. **Navbar** - Fixed navigation with mobile menu
2. **Hero** - Main section with CTA and dashboard mockup
3. **Social Proof** - Trust indicators and logos
4. **Features** - 3-card feature showcase
5. **How It Works** - 3-step process explanation
6. **Value Section** - Brand positioning
7. **CTA** - Dark call-to-action section
8. **Footer** - Links and social media

---

## 📱 Fully Responsive

- **Mobile** (< 640px) - Touch-friendly, stacked layout
- **Tablet** (640px - 1024px) - 2-column where applicable
- **Desktop** (> 1024px) - Full 3-column grid layouts

---

## 🚨 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```
Runs on port 3001 instead

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
npm run lint
```
Check for linting errors, then fix them

---

## 📚 Learn More

- [Next.js Docs](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org)
- [React Docs](https://react.dev)

---

## 📄 Documentation

- **IMPLEMENTATION.md** - Complete feature breakdown
- **DESIGN-SYSTEM.md** - Colors, typography, spacing guide
- **README-SETUP.md** - Detailed setup instructions

---

## 🎉 You're All Set!

```bash
npm run dev
```

Your LeadPilot landing page is live! 🚀

Happy coding! 💚

---

**Questions?** Email: hello@leadpilot.io
