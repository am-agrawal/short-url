import { useState } from 'react';
import Button from '../components/Button';
import styles from '../styles/home.module.css';
import { getBaseUrl } from '../utils/urlUtils';
import { Gravitas_One, Poppins } from '@next/font/google';
import TextBox from '../components/TextBox';
import { Refresh2, Copy } from 'iconsax-react';
import { Toaster, toast } from 'sonner';

const gravitasOne = Gravitas_One({
  weight: '400',
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: '500',
  subsets: ['latin'],
});

function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  async function handleSubmit() {
    fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalUrl }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShortenedUrl(`${getBaseUrl()}/${data.shortUrl}`);
      })
      .catch((error) => {
        console.error('Error while shortening URL:', error);
        toast.error('Something went wrong. Please try again later');
      });
  }

  function handleTextChange(event) {
    setShortenedUrl('');
    setOriginalUrl(event.target.value);
  }

  function handleCopyText() {
    toast.success('Link copied to clipboard');
    navigator.clipboard.writeText(shortenedUrl);
  }

  return (
    <>
      <main className={styles.mainDiv}>
        <div className={`${styles.card} dotted-grid`}>
          <h2 className={gravitasOne.className}>
            {process.env.NEXT_SHORT_URL_APP_NAME || 'Short - It'}
          </h2>
          <div className={styles.form}>
            <h3 className={`${poppins.className} ${styles.tagline}`}>
              The simplest URL shortner you were looking for
            </h3>

            <div className={styles.flex}>
              <TextBox
                id="original-url"
                name="original-url"
                placeholder='Enter your link here...'
                value={originalUrl}
                onChange={handleTextChange}
              />

              <Button onClick={() => handleSubmit()}>
                <Refresh2 variant="Outline" />
              </Button>
            </div>

            <div className={styles.flex}>
              <TextBox
                id="short-url"
                name="short-url"
                value={shortenedUrl}
                readOnly
              />

              <Button onClick={handleCopyText} disabled={!shortenedUrl}>
                <Copy variant="Broken" /> Copy Link
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Toaster position="bottom-center" richColors />
    </>
  );
}

export default Home;
