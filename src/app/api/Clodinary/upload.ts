// src/app/api/upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Add your Cloud Name here
  api_key: process.env.CLOUDINARY_API_KEY, // Add your API Key here
  api_secret: process.env.CLOUDINARY_API_SECRET, // Add your API Secret here
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { image } = req.body; // Expecting image data in the request body

      // Upload image to Cloudinary
      const uploadResponse = await cloudinary.v2.uploader.upload(image, {
        folder: 'your_folder_name', // Optional: specify a folder
      });

      // Return the URL of the uploaded image
      res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Image upload failed' });
    }
  } else {
    // Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
