import { createClient } from "next-sanity";
// Change the import to the named export
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: "6qirslwu", // Ensure this is your actual ID
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
});

// Use the new named builder function
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}