# 🚀 Full-Stack Portfolio & Technical Blog

A high-performance, SEO-optimized personal brand hub and content management platform. This project serves as a professional showcase of my **Full-Stack Development** expertise and a medium for documenting my journey in **Electrical Engineering**.

## 🌟 Project Overview
This platform is divided into two core pillars:
1. **The Portfolio:** A dynamic showcase of engineering and software projects, fetching real-time data from a Headless CMS.
2. **The Technical Blog:** A blogging engine designed for technical documentation, featuring syntax highlighting and rich-text rendering for engineering concepts.

## 🛠️ Tech Stack
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **CMS:** [Sanity.io](https://www.sanity.io/) (Headless CMS for Blogs & Projects)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Deployment:** [Vercel](https://vercel.com/)
- **Query Language:** **GROQ** (Graph-Relational Object Queries)

## 💎 Key Features

### 📝 Dynamic Blogging Engine
- **Rich Text Rendering:** Uses `@portabletext/react` to render complex blog layouts including code blocks, images, and callouts.
- **Categorization:** Blogs are categorized by tech stacks (e.g., Next.js, IoT, Power Electronics).
- **SEO Ready:** Automated metadata generation for every blog post to improve search engine visibility.

### 📁 Advanced Portfolio Management
- **Decoupled Backend:** Project details, live links, and GitHub repositories are managed via **Sanity.io**, allowing updates without code redeployment.
- **Schema Design:** Custom-built schemas for projects that distinguish between "Software" and "Electrical Engineering" tracks.
- **Optimized Media:** Leveraging Sanity's Image Pipeline for WebP conversion and responsive image delivery.

### 🎨 User Experience
- **Fluid Animations:** Physics-based page transitions and component entrances using **Framer Motion**.
- **Responsive Design:** A mobile-first approach ensuring a premium experience across all device sizes.

## 🏗️ Architecture & Data Flow
1. **Content Authoring:** Content is written and managed in the **Sanity Studio** dashboard.
2. **Data Fetching:** The Next.js frontend fetches data using **GROQ** queries during build time (SSG) and request time (ISR).
3. **Rendering:** Server Components handle the heavy lifting, ensuring minimal JavaScript is sent to the client for faster load times.

## 📦 Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Aditya3010raj/portfolio.git](https://github.com/Aditya3010raj/portfolio.git)
