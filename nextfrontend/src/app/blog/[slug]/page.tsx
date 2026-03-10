import { client, urlFor } from "../../../lib/sanity";
import { PortableText } from "@portabletext/react";
import Navbar from "../../../Components/NavBar";
import Script from "next/script";
import BlogNav from "../../../Components/BlogNav";
import type { Metadata } from 'next';

// 1. DYNAMIC METADATA
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(`*[_type == "event" && slug.current == $slug][0]{name}`, { slug });

  return {
    title: post?.name ? `${post.name} | Adityaraj Chatterjee` : 'Blog Post',
    description: "Project case study and blog post by Adityaraj Chatterjee",
    openGraph: {
      title: post?.name,
      images: ['/assets/img/social.jpg'],
    },
  };
}

const profile = {
  name: "Adityaraj Chatterjee",
  image: "/assets/img/blog-author.jpeg",
  twitterlink: "https://x.com/AdityarajC3010",
  instagramLink: "https://www.instagram.com/chatterjeeadityaraj/",
  linkedinLink: "https://www.linkedin.com/in/adityaraj-chatterjee-42162a372/"
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 2. FETCH CURRENT POST TIMESTAMP FIRST
  const currentPostDate = await client.fetch(
    `*[_type == "event" && slug.current == $slug][0]._createdAt`,
    { slug }
  );

  // 3. FETCH DATA WITH SIBLINGS USING EXPLICIT DATE COMPARISON
  const query = `{
    "post": *[_type == "event" && slug.current == $slug][0]{
      name,
      body,
      mainImage,
      _createdAt,
      "slug": slug.current,
      "authorName": author->name,   
      "authorImage": author->image, 
      "authorBio": author->bio      
    },
    "next": *[_type == "event" && _createdAt > $date] | order(_createdAt asc)[0]{
      "slug": slug.current
    },
    "prev": *[_type == "event" && _createdAt < $date] | order(_createdAt desc)[0]{
      "slug": slug.current
    }
  }`;

  const { post, next, prev } = await client.fetch(query, { 
    slug, 
    date: currentPostDate || "" 
  });

  if (!post) return <div className="p-20 text-center font-body text-2xl">Post not found</div>;

  return (
    <>
      <div id="main" className="relative">
        {/* HEADER / NAVIGATION */}
        <div className="w-full z-50 top-0 py-3 sm:py-5 bg-primary">
          <div className="container flex items-center justify-between mx-auto px-4">
            <div>
              <a href="/">
                <h2 className="text-2xl font-bold text-white">Adityaraj Chatterjee</h2>
              </a>
            </div>
            <div className="hidden lg:block">
              <ul className="flex items-center">
                <li className="group pl-6">
                  <a href="/#about" className="pt-0.5 font-header font-semibold uppercase text-white hover:text-yellow transition-colors">About</a>
                  <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow transition-all"></span>
                </li>
                <li className="group pl-6">
                  <a href="/#work" className="pt-0.5 font-header font-semibold uppercase text-white hover:text-yellow transition-colors">Work</a>
                  <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow transition-all"></span>
                </li>
                <li className="group pl-6">
                  <a href="/#blog" className="pt-0.5 font-header font-semibold uppercase text-white hover:text-yellow transition-colors">Blog</a>
                  <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow transition-all"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* POST CONTENT */}
        <div className="container py-6 md:py-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h1 className="pt-5 font-body text-3xl font-semibold text-primary sm:text-4xl md:text-5xl xl:text-6xl">
              {post.name}
            </h1>
            
            <div className="flex items-center pt-5 pb-10">
               <span className="font-body font-bold text-grey-10">By {post.authorName || profile.name}</span>
               <span className="px-3 text-grey-30">|</span>
               <span className="font-body text-grey-30">{new Date(post._createdAt).toLocaleDateString()}</span>
            </div>

            {post.mainImage && (
              <div className="relative w-full aspect-video mb-12 rounded-xl overflow-hidden shadow-xl bg-grey-50">
                <img
                  src={urlFor(post.mainImage).url()}
                  alt={post.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose lg:prose-xl max-w-none font-body text-grey-20 leading-relaxed">
              <PortableText value={post.body} />
            </div>

            {/* NAVIGATION COMPONENT */}
            <BlogNav prevSlug={prev?.slug} nextSlug={next?.slug} />

            {/* AUTHOR SECTION */}
            <div className="flex flex-col items-center border-t border-lila py-12 mt-12 md:flex-row md:items-start">
              <div className="w-32 md:w-48 flex-shrink-0">
                <img src={profile.image} className="rounded-full shadow-lg border-2 border-primary" alt="author" />
              </div>
              <div className="ml-0 text-center md:ml-10 md:w-5/6 md:text-left">
                <h3 className="pt-5 md:pt-0 font-body text-2xl font-bold text-secondary">
                  {profile.name}
                </h3>
                <p className="pt-3 font-body text-grey-30">
                   {post.authorBio || "Embedded Systems and Software Developer. Student at VIT."}
                </p>
                <div className="flex items-center justify-center pt-5 md:justify-start">
                  <a href={profile.twitterlink} className="pr-4 text-primary hover:text-yellow transition-colors">
                    <i className="bx bxl-twitter text-2xl"></i>
                  </a>
                  <a href={profile.linkedinLink} className="pr-4 text-primary hover:text-yellow transition-colors">
                    <i className="bx bxl-linkedin text-2xl"></i>
                  </a>
                  <a href={profile.instagramLink} className="pr-4 text-primary hover:text-yellow transition-colors">
                    <i className="bx bxl-instagram text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-primary py-6 mt-10">
          <div className="container mx-auto px-4 flex justify-center items-center">
            <p className="font-body text-white">Lets Build Together</p>
          </div>
        </div>
      </div>

      <Script src="/assets/js/main.js" strategy="lazyOnload" />
    </>
  );
}