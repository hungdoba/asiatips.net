import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const fileStr = req.body.image;
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'new-preset',
      });
      res.status(200).json({ imageURL: uploadResponse.secure_url });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
