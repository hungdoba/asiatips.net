import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function searchHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { searchTerm } = req.query;

  try {
    const searchResults = await prisma.post.findMany({
      where: {
        active: true,
        post_translation: {
          some: {
            OR: [
              {
                title: { contains: searchTerm as string, mode: 'insensitive' },
              },
              {
                markdown: {
                  contains: searchTerm as string,
                  mode: 'insensitive',
                },
              },
            ],
          },
        },
      },
      include: {
        post_translation: true,
      },
    });

    res.status(200).json({ results: searchResults });
  } catch (error) {
    console.error('Error while searching:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
