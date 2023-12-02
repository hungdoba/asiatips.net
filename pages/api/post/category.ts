import { prisma } from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function category(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const uniqueCategories = await prisma.post.groupBy({
      by: ['category'],
    });

    res.status(200).json(uniqueCategories);
  } else {
    res.status(404).json({ message: 'API endpoint not found' });
  }
}
