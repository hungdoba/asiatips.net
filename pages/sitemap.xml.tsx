import { prisma } from '@/utils/db';
import { post } from '@prisma/client';
import { convert } from '@/utils/slugify';

const EXTERNAL_DATA_URL = 'https://asiatips.net';
function generateSiteMap(posts: post[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${EXTERNAL_DATA_URL}/about</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/contact</loc>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/privacy</loc>
     </url>
     ${posts
       .map((post) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${convert(post.category)}/${
             post.url
           }`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

interface Props {
  res: any;
}

export async function getServerSideProps({ res }: Props) {
  const posts = await prisma.post.findMany({
    select: {
      url: true,
      category: true,
      active: true,
    },
    where: {
      active: true,
    },
  });

  const sitemap = generateSiteMap(posts as post[]);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
