import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to handle post translation upsert
const handleTranslationUpsert = async (
  postId: any,
  languageCode: any,
  fields: any
) => {
  const translation = await prisma.post_translation.findUnique({
    where: {
      post_id_language_code: {
        post_id: postId,
        language_code: languageCode,
      },
    },
    select: {
      id: true,
    },
  });

  return prisma.post_translation.upsert({
    where: { id: translation?.id || undefined },
    create: {
      language_code: languageCode,
      title: fields[`${languageCode}Title`],
      brief: fields[`${languageCode}Brief`],
      tableOfContents: fields[`${languageCode}TableOfContents`],
      markdown: fields[`${languageCode}Markdown`],
    },
    update: {
      title: fields[`${languageCode}Title`],
      brief: fields[`${languageCode}Brief`],
      tableOfContents: fields[`${languageCode}TableOfContents`],
      markdown: fields[`${languageCode}Markdown`],
    },
  });
};

export default async function Create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const promise = new Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
  }>((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const { fields, files } = await promise;

  const searchResults = await prisma.post.findMany({
    where: {
      url: fields.url as string,
    },
  });

  if (req.method === 'POST') {
    if (searchResults.length > 0) {
      return res.status(500).json({ message: 'URL Exist' });
    } else {
      const newPost = {
        url: String(fields.url),
        category: String(fields.category),
        tags: (fields.tags as string).replace(/\s/g, '').split(','),
        image: String(fields.image),
        active: Boolean(fields.active),
        post_translation: {
          create: [
            {
              language_code: 'vi',
              title: String(fields.viTitle),
              brief: String(fields.viBrief),
              tableOfContents: String(fields.viTableOfContents),
              markdown: String(fields.viMarkdown),
            },
            {
              language_code: 'ja',
              title: String(fields.jaTitle),
              brief: String(fields.jaBrief),
              tableOfContents: String(fields.jaTableOfContents),
              markdown: String(fields.jaMarkdown),
            },
          ],
        },
      };
      const _ = await prisma.post.create({ data: newPost });
      return res.status(200).json({ message: 'Create post Successfully' });
    }
  } else if (req.method === 'PUT') {
    if (searchResults.length > 0) {
      const postId = searchResults[0].id;
      const newPostData = {
        url: String(fields.url),
        tags: (fields.tags as string).replace(/\s/g, '').split(','),
        category: String(fields.category),
        image: String(fields.image),
        active: Boolean(fields.active),
        // created_at: new Date(),
      };

      const viTranslation = await handleTranslationUpsert(postId, 'vi', fields);
      const jaTranslation = await handleTranslationUpsert(postId, 'ja', fields);

      const _ = await prisma.post.update({
        where: { id: postId },
        data: {
          ...newPostData,
          post_translation: {
            connect: [{ id: viTranslation.id }, { id: jaTranslation.id }],
          },
        },
        include: {
          post_translation: true,
        },
      });

      return res.status(200).json({ message: 'Post Updated Successfully' });
    } else {
      return res.status(500).json({ message: 'URL Not Exist' });
    }
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}
