import { client, urlFor } from "../../../lib/sanity";
import { PortableText } from "@portabletext/react";
import Script from "next/script";
import BlogNav from "../../../Components/BlogNav";
import type { Metadata } from 'next';

// 1. CUSTOM PORTABLE TEXT COMPONENTS (Handles H2/H3/List styling)
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-10 mb-4 text-primary dark:text-yellow uppercase tracking-tight">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-8 mb-4 text-primary dark:text-yellow border-l-4 border-yellow pl-4 italic">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-semibold mt-6 mb-3 text-slate-800 dark:text-slate-200">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>,
    normal: ({ children }: any) => <p className="text-lg leading-relaxed mb-6 text-grey-20 dark:text-grey-10">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-yellow bg-slate-50 dark:bg-slate-900 p-6 my-8 italic text-xl shadow-inner">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-6 space-y-2 ml-4 text-lg">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-6 space-y-2 ml-4 text-lg">{children}</ol>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-primary dark:text-yellow">{children}</strong>,
    link: ({ children, value }: any) => (
      <a href={value.href} className="text-yellow hover:underline decoration-2 underline-offset-4 font-semibold">
        {children}
      </a>
    ),
  },
};

// 2. DYNAMIC METADATA
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(`*[_type == "event" && slug.current == $slug][0]{title}`, { slug });

  return {
    title: post?.title ? `${post.title} | Adityaraj Chatterjee` : 'Blog Post',
    description: "Project case study by Adityaraj Chatterjee",
    openGraph: {
      title: post?.title,
      images: ['/assets/img/social.jpg'],
    },
  };
}

const defaultProfile = {
  name: "Adityaraj Chatterjee",
  headline: "Software Engineer",
  bio: "I am a Software Engineer with a passion for building modern web solutions and embedded systems.",
  image: "/assets/img/blog-author.jpeg",
  githubLink: "https://github.com/Aditya3010raj",
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 3. FETCH CURRENT POST TIMESTAMP
  const currentPostDate = await client.fetch(
    `*[_type == "event" && slug.current == $slug][0]._createdAt`,
    { slug }
  );

  // 4. FETCH DATA WITH SIBLINGS
  const query = `{
    "post": *[_type == "event" && slug.current == $slug][0]{
      title,
      body,
      mainImage,
      projectType,
      status,
      techStack,
      projectLinks,
      duration,
      myRole,
      _createdAt,
      "slug": slug.current
    },
    "next": *[_type == "event" && _createdAt > $date] | order(_createdAt asc)[0]{ "slug": slug.current },
    "prev": *[_type == "event" && _createdAt < $date] | order(_createdAt desc)[0]{ "slug": slug.current }
  }`;

  const { post, next, prev } = await client.fetch(query, { 
    slug, 
    date: currentPostDate || "" 
  });

  if (!post) return <div className="p-20 text-center font-body text-2xl">Post not found</div>;

  return (
    <>
      <div className="relative bg-white text-black dark:bg-slate-950 dark:text-white min-h-screen transition-colors duration-300">
        
        {/* NAV BAR WITH AC LOGO */}
        <div className="w-full bg-primary dark:bg-slate-900 py-6 border-b border-yellow/20">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <a href="/" className="flex items-center gap-3 group">
              {/* YELLOW AC CIRCLE LOGO */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow shadow-lg transition-transform group-hover:scale-110">
                <span className="text-sm font-black text-black">AC</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tighter">{defaultProfile.name}</h2>
            </a>
            <a href="/blog" className="text-white font-bold hover:text-yellow transition-all uppercase text-sm tracking-widest">Back to Archive</a>
          </div>
        </div>

        <div className="container py-10 mx-auto px-6">
          <article className="mx-auto max-w-4xl">
            {/* BADGE */}
            <div className="mb-6">
               <span className="bg-yellow text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                 {post.projectType || "Project"}
               </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-primary dark:text-yellow leading-tight mb-8">
              {post.title}
            </h1>

            {/* INFO BAR */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 mb-10">
              <div>
                <p className="text-[10px] text-grey-30 dark:text-grey-20 uppercase font-black tracking-widest mb-1">Status</p>
                <p className="text-sm font-bold">{post.status || 'Completed'}</p>
              </div>
              <div>
                <p className="text-[10px] text-grey-30 dark:text-grey-20 uppercase font-black tracking-widest mb-1">My Role</p>
                <p className="text-sm font-bold">{post.myRole || 'Full-Stack Developer'}</p>
              </div>
              <div>
                <p className="text-[10px] text-grey-30 dark:text-grey-20 uppercase font-black tracking-widest mb-1">Duration</p>
                <p className="text-sm font-bold">{post.duration || '2 Months'}</p>
              </div>
              <div>
                <p className="text-[10px] text-grey-30 dark:text-grey-20 uppercase font-black tracking-widest mb-1">Published</p>
                <p className="text-sm font-bold">{new Date(post._createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* MAIN IMAGE */}
            {post.mainImage && (
              <div className="relative w-full aspect-video mb-12 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                <img 
                  src={urlFor(post.mainImage).url()} 
                  alt={post.title} 
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700" 
                />
              </div>
            )}

            {/* TECH STACK */}
            {post.techStack && (
              <div className="mb-12">
                <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 opacity-60">
                  Built With
                </h3>
                <div className="flex flex-wrap gap-3">
                  {post.techStack.map((tech: any, idx: number) => (
                    <span key={idx} className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 shadow-sm">
                      {tech.icon && <i className={`bx ${tech.icon} text-primary dark:text-yellow text-xl`}></i>}
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* THE CONTENT */}
            <div className="font-body">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>

            {/* ACTION LINKS */}
            {post.projectLinks && (
              <div className="mt-16 p-8 bg-primary dark:bg-yellow rounded-3xl flex flex-wrap gap-6 items-center justify-between shadow-xl">
                <h4 className="text-2xl font-black text-white dark:text-black">Like the project?</h4>
                <div className="flex flex-wrap gap-4">
                  {post.projectLinks.live && (
                    <a href={post.projectLinks.live} target="_blank" className="bg-white text-primary px-8 py-3 rounded-full hover:scale-105 transition-all font-black shadow-lg">
                      Live View
                    </a>
                  )}
                  {post.projectLinks.github && (
                    <a href={post.projectLinks.github} target="_blank" className="bg-black text-white px-8 py-3 rounded-full hover:scale-105 transition-all font-black shadow-lg">
                      Github
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* FIXED NAV */}
            <BlogNav prevSlug={prev?.slug} nextSlug={next?.slug} />

            {/* AUTHOR */}
            <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center md:items-start gap-8">
              <img src={defaultProfile.image} className="w-24 h-24 rounded-2xl rotate-3 shadow-lg" alt="author" />
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black">{defaultProfile.name}</h3>
                <p className="text-grey-30 dark:text-grey-20 mt-2 italic leading-relaxed">{defaultProfile.bio}</p>
              </div>
            </div>
          </article>
        </div>

        <footer className="bg-slate-50 dark:bg-slate-900 py-12 mt-20 text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Made with ❤️ by Adityaraj Chatterjee</p>
        </footer>
      </div>

      <Script src="/assets/js/main.js" strategy="lazyOnload" />
    </>
  );
}