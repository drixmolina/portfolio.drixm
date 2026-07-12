# Drix Molina — Personal Portfolio

Professional portfolio for Drix Molina, a Full Stack Developer, IT Support Specialist, and AI Automation Developer.

**Live website:** [webfolio-dm.vercel.app](https://webfolio-dm.vercel.app/)

## Overview

This responsive single-page portfolio presents selected projects, experience, skills, the FacilitEASE capstone case study, education, certifications, resume, and a secure contact form while retaining a black, red, and off-white developer aesthetic.

## Features

- Recruiter-focused project case studies and screenshot galleries
- Responsive navigation, command palette, resume preview, and PDF downloads
- Adaptive neural-network canvas and session-only loading screen
- Accessible keyboard navigation, focus-managed modals, reduced-motion support, and semantic content
- Vercel Function contact endpoint with server-side Resend delivery, validation, and a honeypot
- Private reviews and suggestions form with optional ratings and server-side Resend delivery
- Open Graph, Twitter Card, canonical metadata, favicon, and Person JSON-LD

## Technology stack

React 18, TypeScript, Vite 6, Tailwind CSS 4, Motion, Lucide React, Vercel Functions, and Resend.

## Local setup

Requires Node.js 24.

```bash
npm install
npm run dev
```

The Vite development server serves the frontend. To exercise the Vercel Function locally, use `vercel dev` after linking the project and configuring the variables below.

## Environment variables

Copy `.env.example` to `.env.local` for local Vercel development. Never commit real keys.

```env
RESEND_API_KEY=
CONTACT_EMAIL=drixmolina31@gmail.com
```

## Resend setup

1. Create a Resend account and API key, or add Resend from the Vercel Marketplace.
2. Add `RESEND_API_KEY` and `CONTACT_EMAIL` to the Vercel project for Production, Preview, and Development as needed.
3. The endpoint initially sends from `Portfolio Contact <onboarding@resend.dev>`. Resend's testing sender can only send under its account restrictions. For unrestricted production delivery, verify a sending domain in Resend and replace the `from` value in `api/contact.ts` with an address on that domain.
4. Redeploy after environment-variable changes, then submit the form and confirm receipt.

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Deploy to Vercel

1. Import [github.com/drixmolina/WEBPOLIO](https://github.com/drixmolina/WEBPOLIO) into Vercel.
2. Keep the Vite framework preset and default `npm run build` command.
3. Configure the Resend environment variables described above.
4. Deploy and verify `/api/contact`, project links, PDFs, and social metadata.

## Project structure

```text
api/contact.ts                 Vercel contact function
public/                        Images, project galleries, PDFs, and SEO assets
src/app/App.tsx                Page composition
src/components/layout/         Background effects
src/components/navigation/     Navbar and command palette
src/components/sections/       Portfolio sections and contact form
src/components/ui/             Reusable headers, social links, and modal shell
src/data/portfolioData.ts      Typed portfolio content
src/styles/portfolio.css       Portfolio layout, responsive, and motion rules
```

## Accessibility improvements

The portfolio includes a skip link, strong focus-visible styles, semantic headings and landmarks, minimum touch targets, active navigation state, accessible form errors, stable screen-reader role text, modal focus trapping/restoration, Escape-key closing, and reduced-motion behavior.

## Performance optimizations

The neural background adapts its particle count by viewport, stops on hidden tabs, and is disabled on mobile. Cursor effects avoid touch-only devices and use animation frames. Below-the-fold images and PDF previews are lazy-loaded with explicit aspect ratios and asynchronous decoding, while small screens use lighter blur effects.
