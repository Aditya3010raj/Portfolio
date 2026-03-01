import Link from 'next/link';
import { client } from "../../lib/sanity";

interface EventItem {
  _id: string;
  name: string;
  slug: { current: string };
}

export default async function BlogPage() {
  const query = `*[_type == "event"]{ _id, name, slug }`;
  const events: EventItem[] = await client.fetch(query);

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-900">Latest Updates</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition">
              <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
              <Link 
                href={`/blog/${event.slug.current}`}
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}