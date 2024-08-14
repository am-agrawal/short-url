import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import styles from '../styles/home.module.css'
import Link from 'next/link'

function Home() {
  const [shortenedUrl, setShortenedUrl] = useState(null)

  return (
    <div>
      <h3>Enter a URL to be shorten</h3>
      <input type="text" id="url" name="url" />
      <Button>Shorten</Button>
      
      <div className={styles.shortenedUrl}>
        {shortenedUrl && (<Link href={shortenedUrl}>{shortenedUrl}</Link>)}
      </div>
    </div>
  )
}

export default Home
