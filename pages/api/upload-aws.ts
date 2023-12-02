import S3 from 'aws-sdk/clients/s3';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const s3 = new S3({
      apiVersion: '2023-08-10',
      region: process.env.S3_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .substring(0, 14);

    const post = await s3.createPresignedPost({
      Bucket: process.env.BUCKET_NAME,
      Fields: {
        key: `images/${timestamp}-${req.query.file}`,
        'Content-Type': req.query.fileType,
      },
      Expires: 60, // seconds
      Conditions: [
        ['content-length-range', 0, 1048576], // up to 1 MB
      ],
    });

    res.status(200).json(post);
  } catch (error) {
    // Handle errors appropriately
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
