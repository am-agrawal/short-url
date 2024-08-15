import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  const { shortUrl } = req.query;

  if (req.method === 'GET') {
    try {
      const urlData = await prisma.ShortUrl.findUnique({
        where: {
          shortUrl: shortUrl,
        },
        select: {
          originalUrl: true,
        },
      });

      if (urlData) {
        res.status(200).json({ originalUrl: urlData.originalUrl });
      } else {
        res.status(404).json({ error: 'Short URL not found' });
      }
    } catch (error) {
      console.error('Error fetching original URL:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
