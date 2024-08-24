import styles from './Button.module.css'
import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export default function Button(props) {
  return <button type="button" className={`${styles.btn} ${poppins.className}`} {...props} />
}
