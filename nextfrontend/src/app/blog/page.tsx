import Link from 'next/link';
import { client, urlFor } from "../../lib/sanity";

interface EventItem {
  _id: string;
  title: string; 
  slug: { current: string };
  mainImage?: any;
  metadesc?: string;
  category?: string;
  publishedAt?: string;
}

export default async function BlogPage() {
  // 1. Fetch ALL events ordered by newest first
  const query = `*[_type == "event"] | order(publishedAt desc) { 
    _id, 
    title, 
    slug, 
    mainImage, 
    metadesc, 
    category, 
    publishedAt 
  }`;
  const events: EventItem[] = await client.fetch(query);

  return (
    <>
      {/* MINIMALIST FLOATING BACK BUTTON */}
      <div className="fixed top-8 left-8 z-50">
        <Link 
          href="/" 
          className="group flex items-center gap-2 bg-primary dark:bg-yellow text-white dark:text-black px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95"
        >
          <i className="bx bx-left-arrow-alt text-2xl group-hover:-translate-x-1 transition-transform"></i>
          <span className="uppercase tracking-widest text-xs">Back to Home</span>
        </Link>
      </div>
      
      <main className="min-h-screen bg-grey-50 dark:bg-slate-950 pt-32 pb-20 transition-colors duration-300">
        <div className="container mx-auto px-4">
          
          {/* Page Header */}
          <header className="mb-16 text-center">
            <h2 className="font-header text-4xl font-bold uppercase text-primary dark:text-yellow sm:text-5xl lg:text-6xl tracking-tight">
              Project Archive
            </h2>
            <div className="mt-4 flex justify-center">
                <span className="h-1.5 w-24 rounded-full bg-primary dark:bg-yellow"></span>
            </div>
            <h4 className="pt-6 font-header text-xl font-medium text-black dark:text-grey-10 sm:text-2xl max-w-2xl mx-auto">
              A comprehensive list of my technical journey, from embedded systems to full-stack applications.
            </h4>
          </header>

          {/* Blog Grid */}
          <div className="mx-auto grid w-full grid-cols-1 gap-8 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10">
            {events.map((event) => (
              <Link 
                key={event._id} 
                href={`/blog/${event.slug.current}`} 
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.mainImage ? urlFor(event.mainImage).url() : "/assets/img/post-01.png"}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={event.title}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 dark:bg-slate-900/90 text-primary dark:text-yellow backdrop-blur-sm px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                      {event.category || "Development"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-grey-30 dark:text-grey-20 mb-4 gap-2 opacity-60">
                    <i className='bx bx-calendar-event text-lg'></i>
                    <span>{event.publishedAt ? new Date(event.publishedAt).toLocaleDateString() : "March 2026"}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-primary dark:group-hover:text-yellow transition-colors duration-300 line-clamp-2 leading-tight">
                    {event.title}
                  </h3>
                  
                  <p className="pt-4 text-sm text-grey-20 dark:text-grey-10 line-clamp-3 leading-relaxed opacity-80">
                    {event.metadesc || "Exploring the architecture and implementation details of this specific project."}
                  </p>
                  
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700/50 flex items-center font-black text-primary dark:text-yellow text-[10px] uppercase tracking-[0.2em]">
                    <span>View Full Case Study</span>
                    <i className="bx bx-right-arrow-alt ml-2 text-xl group-hover:translate-x-3 transition-transform duration-300"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {events.length === 0 && (
            <div className="text-center py-32">
              <i className='bx bx-ghost text-7xl text-grey-30 animate-bounce'></i>
              <p className="mt-6 text-grey-20 text-xl font-bold">Nothing here yet. Stay tuned!</p>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4 text-center">
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black tracking-[0.4em] uppercase">
                Adityaraj Chatterjee • Built with Next.js & Sanity
            </p>
        </div>
      </footer>
    </>
  );
}