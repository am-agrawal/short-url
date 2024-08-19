import { getOriginalUrl } from '../services';
console.log('Short URL Page');

export async function getServerSideProps(context) {
  const { shortURL } = context.params;
  console.log('Short URL:', shortURL);

  const { originalUrl } = await getOriginalUrl(shortURL);
  console.log('Original URL:', originalUrl);
  if (originalUrl) {
    const isExternalUrl =
      originalUrl.startsWith('http://') || originalUrl.startsWith('https://');
    const destinationUrl = isExternalUrl
      ? originalUrl
      : `https://${originalUrl}`;
    console.log('Redirecting to:', destinationUrl);

    return {
      redirect: {
        destination: destinationUrl,
        permanent: true,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}

export default function ShortURLPage() {
  // This page will never be rendered as the user will be redirected
  return null;
}
