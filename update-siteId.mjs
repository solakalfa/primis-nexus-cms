import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'zh12zogr',
  dataset: 'production',
  apiVersion: '2025-10-15',
  token: 'skRDTsJ9GpVa8Msj4qcHvGQvfPrZqOD7jXoWlDYaA02RiLMitwFbEP3B8AMoZNb9ofZlbsSP2CLqUrxAJ',
  useCdn: false
});

const articles = await client.fetch(`*[_type == "article" && !defined(siteId)]{_id}`);
console.log(`Found ${articles.length} articles without siteId`);

for (const article of articles) {
  await client.patch(article._id).set({ siteId: 'smartcents' }).commit();
  console.log(`Updated ${article._id}`);
}

console.log('Done!');