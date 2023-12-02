import fs from 'fs';
import { IncomingForm, Files } from 'formidable';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface FileData {
  fields: any;
  files: Files;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return;
  }

  const data = await new Promise<FileData>((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  if (data.files && data.files.file) {
    const fileName = data.fields.url;

    const now = new Date();
    const year = now.getFullYear().toString().slice(-2).padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const uploadedFile = data.files.file;
    const oldPath = uploadedFile.filepath;

    let newFilename = `${fileName}-image-${hours}${minutes}${seconds}.${uploadedFile.originalFilename
      .split('.')
      .pop()}`;
    if (fileName == '') {
      newFilename = `image-${year}${month}${day}-${hours}${minutes}${seconds}.${uploadedFile.originalFilename
        .split('.')
        .pop()}`;
    }

    const newPath = `public/${newFilename}`;
    try {
      await fs.promises.rename(oldPath, newPath);
      res.status(200).json({ url: newFilename });
    } catch (error) {
      console.error('Error moving file:', error);
      res.status(500).json({ error: 'Error saving the file.' });
      return;
    }
  } else {
    res.status(400).json({ error: 'No file uploaded.' });
  }
}
