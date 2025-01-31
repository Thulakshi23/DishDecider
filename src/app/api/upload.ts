import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { image } = req.body;

    try {
      const result = await cloudinary.uploader.upload(image, {
        folder: 'user_profiles',
      });
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ error: 'Image upload failed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
