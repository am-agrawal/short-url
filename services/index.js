import prisma from '../lib/prisma';
import { generateUniqueShortUrl } from '../utils/urlUtils';

export async function getOriginalUrl(shortUrl) {
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
      return { originalUrl: urlData.originalUrl, error: null };
    } else {
      return { originalUrl: null, error: 'Short URL not found' };
    }
  } catch (error) {
    console.error('Error fetching original URL:', error);
    return { originalUrl: null, error: 'Internal server error' };
  }
}

export async function createShortUrl(originalUrl, createdBy = null) {
  try {
    if (!originalUrl) {
      return { shortUrl: null, error: "URL input can't be empty" };
    }

    const existing = await prisma.shortUrl.findUnique({
      where: { originalUrl },
      select: {
        shortUrl: true,
        originalUrl: true,
      },
    });

    if (existing) {
      return { shortUrl: existing, error: null };
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

    return { shortUrl: newUrl, error: null };
  } catch (error) {
    console.error('Error creating short URL:', error);
    return { shortUrl: null, error: 'Something went wrong' };
  }
}
