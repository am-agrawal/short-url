import { useState } from 'react';
import Button from '../components/Button';
import styles from '../styles/home.module.css';
import { getBaseUrl } from '../utils/urlUtils';

function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState(null);

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
      .catch((error) => console.error('Error shortening URL:', error));
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
