import { NextApiRequest, NextApiResponse } from 'next';

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Clear the user session or token
    // For example, if you are using cookies:
    res.setHeader('Set-Cookie', 'session=; Max-Age=0; path=/; HttpOnly'); // Adjust according to your session management

    return res.status(200).json({ message: 'Logged out successfully' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
