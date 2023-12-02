import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';
import { post } from '@prisma/client';

export default async function related(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const tags = req.query.tags as string | string[];
    const tagsArray = Array.isArray(tags) ? tags : [tags]; // convert to array if it's not already an array
    const sanitizedTags = tagsArray.map((tag) => tag.replace(/\n/g, ''));

    let relatedPosts: post[];

    if (tags === 'all') {
      relatedPosts = (await prisma.post.findMany({
        select: {
          url: true,
          category: true,
          title: true,
          image: true,
          brief: true,
          tags: true,
          created_at: true,
          active: true,
        },
        where: {
          active: true,
        },
      })) as post[];
    } else {
      relatedPosts = (await prisma.post.findMany({
        where: {
          active: true,
          tags: {
            hasSome: sanitizedTags,
          },
        },
        select: {
          url: true,
          title: true,
          image: true,
          brief: true,
          tags: true,
          created_at: true,
        },
      })) as post[];
    }

    res.status(200).json(relatedPosts);
  } else {
    res.status(404).json({ message: 'API endpoint not found' });
  }
}
