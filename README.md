# 🚀 Personal Portfolio & Headless CMS Integration

This is more than a static site; it is a high-performance content hub designed to showcase the intersection of **Electrical Engineering** and **Full-Stack Development**. It features a decoupled architecture using **Sanity.io** as a backend.

## 💎 Design Philosophy
- **Performance:** Achieved 95+ Lighthouse scores through Next.js Image optimization and code splitting.
- **Scalability:** Content is strictly separated from code. Adding a new project or certification requires zero code changes.
- **Interactivity:** Utilizes **Framer Motion** for physics-based entrance animations and hover states.

## 🛠️ Technical Breakdown
- **Headless CMS (Sanity.io):** - Designed custom schemas for `Project`, `Experience`, and `Skill` types.
    - Utilized **GROQ (Graph-Relational Object Queries)** to fetch deeply nested project metadata and transform it into frontend props.
- **Frontend:** Next.js 14 with Server Components for reduced client-side JavaScript.
- **Deployment:** Continuous Deployment via **Vercel** with automated preview deployments for every branch.

## 📂 Content Schema (Sanity)
The backend is structured to allow granular control:
- **Project Schema:** Includes fields for Title, Slug, GitHub URL, Live Demo, Tech Stack (Array), and Portable Text for the description.
- **Image Pipeline:** Uses Sanity's `next-sanity` image builder to serve WebP formats with LQIP (Low-Quality Image Placeholders) for better UX.

## 🛠️ Development
```bash
# To run the frontend
npm run dev

# To run the Sanity Studio (if integrated locally)
npm run dev:cms
