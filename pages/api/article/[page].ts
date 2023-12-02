import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/db';

export default async function Project(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page } = req.query;

  const posts = await prisma.post.findMany({
    orderBy: [{ created_at: 'desc' }],
    select: {
      title: true,
      brief: true,
      url: true,
      active: true,
    },
    where: {
      active: true,
    },
    skip: 10 * Number(page),
    take: 10,
  });

  res.status(200).send(posts);
}
