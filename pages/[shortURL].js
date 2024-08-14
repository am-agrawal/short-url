export async function getServerSideProps(context) {
  const { shortURL } = context.params;

  const urlMapping = {
    '40jmnt4': 'https://www.example.com',
  };

  const originalURL = urlMapping[shortURL];

  if (originalURL) {
    return {
      redirect: {
        destination: originalURL,
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
