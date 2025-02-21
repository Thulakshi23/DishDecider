import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { image } = req.body;

    try {
      const result = await cloudinary.uploader.upload(image, {
        folder: 'user_profiles',
      });
      res.status(200).json({ url: result.secure_url });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: 'Image upload failed', details: error.message });
      } else {
        res.status(500).json({ error: 'Image upload failed', details: 'Unknown error' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
