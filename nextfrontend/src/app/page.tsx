import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

export default async function Home() {
  // Fetch latest events/posts for the template
  const query = `*[_type == "event"][0...3]{ _id, name, slug, mainImage }`;
  const events = await client.fetch(query);

  return (
    <div id="main" className="relative">
      {/* Navbar Section */}
      <nav className="w-full z-50 top-0 py-3 sm:py-5 absolute">
        <div className="container flex items-center justify-between">
          <a href="/"><img src="/assets/img/logo.svg" className="w-24 lg:w-48" alt="logo" /></a>
          <div className="hidden lg:block">
            <ul className="flex items-center">
              <li className="group pl-6"><span className="cursor-pointer font-semibold uppercase text-white">About</span></li>
              <li className="group pl-6"><span className="cursor-pointer font-semibold uppercase text-white">Services</span></li>
              <li className="group pl-6"><a href="#blog" className="cursor-pointer font-semibold uppercase text-white">Blog</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-cover bg-center py-8" style={{ backgroundImage: "url(/assets/img/bg-hero.jpg)" }}>
        <div className="container relative z-30 pt-20 pb-12 sm:pt-56 sm:pb-48 lg:pt-64 lg:pb-48 text-center">
          <h1 className="text-4xl text-white sm:text-5xl md:text-6xl font-bold">Hello I'm Adityaraj Chatterjee!</h1>
          <p className="text-white uppercase mt-4">Hardware & Software Developer</p>
        </div>
      </div>

      {/* Dynamic Blog Section */}
      <div className="bg-grey-50" id="blog">
        <div className="container py-16 md:py-20">
          <h2 className="text-center text-4xl font-semibold uppercase text-primary">Latest Posts</h2>
          <div className="mx-auto grid w-full grid-cols-1 gap-6 pt-12 lg:grid-cols-3">
            {events.map((event: any) => (
              <Link key={event._id} href={`/blog/${event.slug.current}`} className="shadow hover:scale-105 transition-transform">
                <div
                  /* THE FIX: Use a ternary check to avoid passing null to urlFor */
                  style={{
                    backgroundImage: event.mainImage
                      ? `url(${urlFor(event.mainImage).url()})`
                      : "url('/assets/img/placeholder.jpg')" // Optional fallback image
                  }}
                  className="group relative h-72 bg-cover bg-center"
                >
                  <span className="absolute inset-0 bg-black opacity-10 group-hover:opacity-40 transition-opacity"></span>
                </div>
                <div className="bg-white py-6 px-5">
                  <span className="block font-bold text-lg">{event.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}