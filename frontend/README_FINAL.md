# Pujara Print Pack - Next.js Frontend

A production-ready Next.js 16 homepage matching your exact design reference images.

## 🚀 Quick Start

```bash
cd pujara-print-pack
npm install
npm run dev
```

Visit `http://localhost:3000` to see the live site.

## ✨ What's Built

- **Navbar** with logo, nav links, phone CTA
- **Hero section** with printer image, trust badges, and CTA buttons
- **Solutions grid** with 6 service cards (Business Cards, Flyers, Banners, Booklets, Packaging, Custom)
- **How It Works** process flow (5 steps) + stats sidebar (10K+ clients, 25K+ projects, 99.5% delivery, 5★ rating)
- **Recent Work** portfolio carousel with 6 project categories
- **CTA Band** with why-us benefits grid
- **Footer** with links, contact info, social icons, newsletter signup

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (wires all sections)
│   └── globals.css         # Design tokens, brand colors, gradients
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── SolutionsGrid.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── RecentWork.tsx
│   │   └── CTABand.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Container.tsx
│       ├── IconChip.tsx
│       ├── Logo.tsx (SVG)
│       └── SectionHeading.tsx
├── lib/
│   ├── site-data.ts        # All content (fully typed)
│   ├── accent.ts           # Color mapping
│   └── utils.ts            # cn() utility
└── types/
    └── index.ts            # TypeScript types
```

## 🎨 Design Match

✅ Exact color palette (cream background #fdf5f0, navy ink #171331, brand gradient purple→orange)  
✅ Hero printer image optimized and included  
✅ All icons using lucide-react  
✅ Responsive mobile-first design  
✅ Tailwind CSS v4  

## 📝 Edit Content

All copy and data live in `src/lib/site-data.ts` — no magic strings scattered in components. Change it once, updates everywhere.

## 🏗️ Build & Deploy

```bash
npm run build    # Production build
npm run start    # Start production server
```

Ready for Vercel, Netlify, or any Node.js host.

---

Everything is production-ready. Just run it and deploy! 🚀
