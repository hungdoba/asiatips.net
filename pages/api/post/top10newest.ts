import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';
import { post } from '@prisma/client';

export default async function top10newest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    let relatedPosts: post[];

    relatedPosts = (await prisma.post.findMany({
      where: {
        active: true,
      },
      include: {
        post_translation: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 10,
    })) as post[];
    res.status(200).json(relatedPosts);
  } else {
    res.status(404).json({ message: 'API endpoint not found' });
  }
}
