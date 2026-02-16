# LeadPilot Design System & Styling Guide

## 🎨 Color Palette

### Primary Colors
- **Primary-600**: `#16a34a` - Main action color (buttons, highlights)
- **Primary-700**: `#15803d` - Hover state for buttons
- **Primary-900**: `#145231` - Dark green for hero background

### Neutral Colors
- **White**: `#ffffff` - Background
- **Gray-50**: `#f9fafb` - Light backgrounds
- **Gray-100**: `#f3f4f6` - Secondary backgrounds
- **Gray-600**: `#4b5563` - Body text
- **Gray-900**: `#111827` - Headlines and primary text

### Semantic Colors
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)

## 📐 Spacing Scale

Based on Tailwind's 4px base unit:

```
xs  = 0.5rem  (8px)
sm  = 1rem    (16px)
md  = 1.5rem  (24px)
lg  = 2rem    (32px)
xl  = 3rem    (48px)
2xl = 4rem    (64px)
```

### Application:
- **Padding inside cards**: 8px (xs)
- **Gap between components**: 32px (lg) on desktop, 24px (md) on mobile
- **Section padding**: 64px (2xl) top/bottom desktop, 48px (xl) mobile
- **Margin top/bottom**: 32px (lg) between sections

## 🔤 Typography

### Headings
- **H1** (Largest): 3.75rem (60px) - Hero main headline
- **H2**: 2.25rem (36px) - Section headlines
- **H3**: 1.25rem (20px) - Card titles
- **H4**: 1.125rem (18px) - Subsections

### Body Text
- **Large**: 1.125rem (18px) - Lead paragraphs
- **Regular**: 1rem (16px) - Body text
- **Small**: 0.875rem (14px) - Secondary text
- **Xs**: 0.75rem (12px) - Captions, badges

### Font Weight
- **Regular**: 400 - Body text
- **Medium**: 500 - Labels, secondary headings
- **Semibold**: 600 - Feature titles
- **Bold**: 700 - Headlines, emphasis

## 🎯 Button Styles

### Primary Button
```css
.btn-primary {
  @apply px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium 
         transition-all duration-300 hover:bg-primary-700 active:scale-95
}
```
- Use for main CTAs (Sign Up, Start Free Trial)
- Size: 44px height minimum (accessibility)
- Rounded: lg (8px border-radius)

### Ghost Button
```css
.btn-ghost {
  @apply px-6 py-2.5 bg-transparent text-gray-900 rounded-lg font-medium 
         border border-gray-200 transition-all duration-300 hover:bg-gray-50
}
```
- Use for secondary actions (Login, Learn More)
- Size: 44px height minimum

### Secondary Button
```css
.btn-secondary {
  @apply px-6 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium 
         transition-all duration-300 hover:bg-gray-200
}
```
- Use for tertiary actions

## 🌳 Components

### Card
- **Border**: 1px solid #f3f4f6 (gray-100)
- **Border Radius**: 1rem (16px)
- **Padding**: 2rem (32px)
- **Shadow**: `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05)`
- **Hover Effect**: Lift slightly, shadow increases, border becomes primary-200
- **Transition**: 300ms

### Section Container
```css
.section-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
}
```
- Max width: 80rem (1280px)
- Responsive padding for different screens

### Cards Grid
- **Desktop**: 3 columns (Features section)
- **Tablet**: 2 columns
- **Mobile**: 1 column
- **Gap**: 2rem (32px)

## 🎬 Animations & Transitions

### Hover Effects
- **Button Scale**: `active:scale-95` (press effect)
- **Button Color**: `transition-colors duration-300`
- **Card Lift**: `hover:shadow-lg transition-shadow`
- **Icon Scale**: `group-hover:scale-110 transition-transform`

### All Transitions: 300ms ease-in-out

### Fade In (on scroll)
- Use built-in Tailwind animations or Framer Motion for scroll effects
- Current: None (static), ready to add

## 📱 Responsive Breakpoints

```
Mobile:   < 640px   (sm)
Tablet:   640px - 1024px (md)
Desktop:  > 1024px  (lg)
```

### Typography Adjustments
- **Headlines**: Smaller on mobile, scale up on desktop
- **Padding**: Reduced on mobile, normal on desktop
- **Grid**: Stack on mobile, 2-col on tablet, 3-col on desktop

## ✨ Effects & Shadows

### Soft Shadow (default)
```css
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 
            0 2px 4px -1px rgba(0, 0, 0, 0.03)
```

### Soft Large Shadow (hover)
```css
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
            0 4px 6px -2px rgba(0, 0, 0, 0.05)
```

## 🎨 Gradient Usage

### Hero Background
```css
background: linear-gradient(to bottom, #f0fdf4, #ffffff)
```

### CTA Background
```css
background: linear-gradient(to right, #145231, #166534, #145231)
```

## 📏 Icon Sizing

- **Navigation icons**: 20px (w-5 h-5)
- **Feature card icons**: 24px (w-6 h-6)
- **Button icons**: 16px (w-4 h-4)
- **Social icons**: 20px (w-5 h-5)

## 🔍 Focus States (Accessibility)

- **Outline**: 2px solid primary-600
- **Offset**: 2px
- **Visible on keyboard navigation**

## 📋 Best Practices

1. **Consistency**: Use defined spacing scale, not arbitrary values
2. **Hierarchy**: Headlines → Subheadings → Body text → Captions
3. **Whitespace**: 60% of design is empty space for breathing room
4. **Color**: Primary for CTAs, gray for secondary information
5. **Shadows**: Soft shadows, not bold
6. **Rounded corners**: Consistent 2xl (16px) for cards, lg (8px) for buttons
7. **Animations**: Subtle, 300ms, purpose-driven

## 🔧 Customization

To change the primary color globally:

1. Edit `tailwind.config.js`
2. Find the `colors` section
3. Update all `primary` color values
4. All components automatically update

To adjust spacing:
1. Edit `tailwind.config.js` theme extension
2. Modify the spacing values
3. Regenerate CSS

---

**All Tailwind utility classes can be used directly in components. This guide covers the custom configuration.**
