import { getOriginalUrl } from '../services';

export async function getServerSideProps(context) {
  const { shortURL } = context.params;

  const { originalUrl } = await getOriginalUrl(shortURL);

  if (originalUrl) {
    return {
      redirect: {
        destination: originalUrl,
        permanent: false,
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
