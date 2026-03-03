import Link from 'next/link';
import { client, urlFor } from "../../lib/sanity";
import Navbar from "../../Components/NavBar"; // Import the new component

interface EventItem {
  _id: string;
  name: string;
  slug: { current: string };
  mainImage?: any;
  metadesc?: string;
}

export default async function BlogPage() {
  // Fetch events ordered by newest first
  const query = `*[_type == "event"] | order(_createdAt desc) { _id, name, slug, mainImage, metadesc }`;
  const events: EventItem[] = await client.fetch(query);

  return (
    <>
      <Navbar /> {/* Integrated Navbar for consistent navigation */}
      
      <main className="min-h-screen bg-grey-50 pt-32 pb-20"> {/* Increased padding-top for fixed navbar */}
        <div className="container mx-auto">
          {/* Page Header */}
          <header className="mb-16 text-center">
            <h2 className="font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
              I also like to write
            </h2>
            <h4 className="pt-6 font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
              Check out my latest posts!
            </h4>
          </header>

          {/* Blog Grid */}
          <div className="mx-auto grid w-full grid-cols-1 gap-6 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10">
            {events.map((event) => (
              <Link 
                key={event._id} 
                href={`/blog/${event.slug.current}`} 
                className="shadow group block bg-white transition-transform hover:scale-105"
              >
                {/* Image Section with Hover Overlay */}
                <div 
                  style={{ 
                    backgroundImage: event.mainImage 
                      ? `url(${urlFor(event.mainImage).url()})` 
                      : "url('/assets/img/post-01.png')" 
                  }}
                  className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
                >
                  <span className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to opacity-10 transition-opacity group-hover:opacity-50"></span>
                  <span className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-primary px-6 py-2 text-center font-body text-sm font-bold uppercase text-primary md:text-base">
                    Read More
                  </span>
                </div>

                {/* Content Section */}
                <div className="bg-white py-6 px-5 xl:py-8">
                  <span className="block font-body text-lg font-semibold text-black">
                    {event.name}
                  </span>
                  <span className="block pt-2 font-body text-grey-20 line-clamp-3">
                    {event.metadesc || "Click read more to see the full event details."}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}