import styles from './TextBox.module.css';
import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export default function TextBox(props) {
  return <input type="text" className={`${styles.textBox} ${poppins.className}`} {...props} />;
}
