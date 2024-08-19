import { useState } from 'react';
import Button from '../components/Button';
import styles from '../styles/home.module.css';
import { getBaseUrl } from '../utils/urlUtils';
import { createShortUrl } from '../services/index';

function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState(null);

  async function handleSubmit() {
    const { error, shortUrl } = await createShortUrl(originalUrl);
    if (error) {
      console.error('Error shortening URL:', error);
      return;
    }
    setShortenedUrl(`${getBaseUrl()}/${shortUrl.shortUrl}`);
  }

  return (
    <div>
      <h3>Enter a URL to be shorten</h3>
      <input
        type="text"
        id="url"
        name="url"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <Button onClick={() => handleSubmit()}>Shorten</Button>

      <div className={styles.shortenedUrl}>
        {shortenedUrl && (
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        )}
      </div>
    </div>
  );
}

export default Home;
