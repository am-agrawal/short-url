import prisma from "../lib/prisma";

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
};