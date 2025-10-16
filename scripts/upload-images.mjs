import { createClient } from '@sanity/client';
import { createReadStream } from 'fs';
import { readdir } from 'fs/promises';
import { resolve } from 'path';

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'zh12zogr',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
});

const siteId = process.argv[2] || 'infostreamhub';
const imagesDir = `images/${siteId}`;

console.log(` Looking for images in: ${imagesDir}`);
console.log(` Uploading for siteId: ${siteId}\n`);

const files = await readdir(imagesDir);
const images = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

console.log(`Found ${images.length} images\n`);

const articlesQuery = `*[_type == "article" && siteId == $siteId && !defined(mainImage)][0...${images.length}]`;
const articles = await sanity.fetch(articlesQuery, { siteId });

console.log(`Found ${articles.length} articles without images\n`);

if (articles.length === 0) {
  console.log(' No articles found without images. Exiting.');
  process.exit(0);
}

for (let i = 0; i < Math.min(images.length, articles.length); i++) {
  const imagePath = resolve(imagesDir, images[i]);
  const article = articles[i];
  
  console.log(` Uploading: ${images[i]}  ${article.title}`);
  
  try {
    const imageAsset = await sanity.assets.upload('image', createReadStream(imagePath), {
      filename: images[i]
    });
    
    await sanity.patch(article._id)
      .set({
        mainImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          },
          alt: article.title
        }
      })
      .commit();
    
    console.log(` Done: ${article.slug.current}\n`);
    
  } catch (error) {
    console.error(` Failed: ${images[i]}`, error.message, '\n');
  }
}

console.log(' Upload complete!');
