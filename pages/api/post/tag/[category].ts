import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';
import { convert } from '@/utils/categoryToUrl';

export default async function Project(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } = req.query;

  const posts = await prisma.post.findMany({
    orderBy: [{ created_at: 'desc' }],
    select: {
      category: true,
      tags: true,
    },
  });

  let filteredPost = posts.filter(
    (post) => convert(post.category) === category
  );

  const uniqueTags = new Set(); // Use a Set to store unique tags

  filteredPost.forEach((post) => {
    post.tags.forEach((tag) => {
      uniqueTags.add(tag); // Add tags to the Set
    });
  });
  const tagsArray = Array.from(uniqueTags); // Convert Set to array
  res.status(200).send(tagsArray);
}
