import { useState } from 'react';

const SaveImageForm: React.FC = () => {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/saveImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, path }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Image saved successfully!');
      } else {
        setMessage(data.error || 'Failed to save image.');
      }
    } catch (error) {
      console.error('Error saving image:', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Image Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image Path (e.g., /images/myImage.png)"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        required
      />
      <button type="submit">Save Image</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SaveImageForm;
