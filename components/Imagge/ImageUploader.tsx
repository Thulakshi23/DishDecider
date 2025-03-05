"use client"; // Add this line at the top to mark it as a client component


// src/app/components/ImageUploader.tsx

import { useState } from 'react';
import Image from 'next/image';

const ImageUploader = () => {
  const [, setImage] = useState<File | null>(null);
  const [imageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };



  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {imageUrl && <Image src={imageUrl} alt="Uploaded" layout="responsive" width={700} height={475} style={{ width: '100%', marginTop: '10px' }} />}
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '100%', marginTop: '10px' }} />}
    </div>
  );
};

export default ImageUploader;
