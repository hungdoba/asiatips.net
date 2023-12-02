import { prisma } from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

import { post } from '@prisma/client';

export default async function related(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const uniqueTags = (await prisma.post.findMany({
      select: {
        tags: true,
      },
      where: {
        active: true,
      },
    })) as post[];

    const tagsSet = new Set<string>();

    uniqueTags.forEach((post) => {
      post.tags.forEach((tag) => {
        tagsSet.add(tag);
      });
    });

    const uniqueTagsArray = Array.from(tagsSet).filter(
      (tag) => tag !== 'hidden' && tag !== 'Asiatips'
    );

    res.status(200).json(uniqueTagsArray);
  } else {
    res.status(404).json({ message: 'API endpoint not found' });
  }
}
