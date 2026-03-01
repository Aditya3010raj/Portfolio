import { client, urlFor } from "../../../lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Script from 'next/script'; // For template JS files

interface SingleEvent {
  name: string;
  body: any;
  mainImage: any;
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await for Next.js 15
  const query = `*[_type == "event" && slug.current == $slug][0]{ name, body, mainImage }`;
  const event: SingleEvent = await client.fetch(query, { slug });

  if (!event) return <div className="p-20 text-center">Post not found</div>;

  return (
    <>
      <article className="max-w-4xl mx-auto py-20 px-6">
        <header className="mb-12 text-center">
          <h1 className="text-6xl font-black mb-6 tracking-tight">{event.name}</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </header>

        {event.mainImage && (
          <div className="relative w-full h-[500px] mb-12 rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src={urlFor(event.mainImage).url()} 
              alt={event.name} 
              fill 
              className="object-cover" 
              priority 
            />
          </div>
        )}

        <div className="prose lg:prose-2xl mx-auto prose-blue">
          <PortableText value={event.body} />
        </div>
      </article>

      {/* Example of loading a template script from public/assets/ */}
      <Script src="/assets/js/main.js" strategy="lazyOnload" />
    </>
  );
}