import prisma from '../../lib/prisma';
import { generateUniqueShortUrl } from '../../utils/urlUtils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { originalUrl, createdBy } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: 'Original URL is required' });
    }

    const existing = await prisma.shortUrl.findUnique({
      where: { originalUrl },
      select: {
        shortUrl: true,
        originalUrl: true,
      },
    });

    if (existing) {
      return res.status(200).json(existing);
    }

    const shortUrl = await generateUniqueShortUrl();

    const newUrl = await prisma.shortUrl.create({
      data: {
        shortUrl,
        originalUrl,
        createdBy,
      },
      select: {
        shortUrl: true,
        originalUrl: true,
      },
    });

    res.status(201).json(newUrl);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
