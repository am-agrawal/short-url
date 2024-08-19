import { nanoid } from 'nanoid';
import prisma from "../lib/prisma";

export async function generateUniqueShortUrl() {
  let unique = false;
  let shortUrl;

  while (!unique) {
    shortUrl = nanoid(6);

    const existing = await prisma.shortUrl.findUnique({
      where: { shortUrl }
    });

    if (!existing) {
      unique = true;
    }
  }

  return shortUrl;
}

export function getBaseUrl() {
  return `${window.location.protocol}//${window.location.host}`;
}