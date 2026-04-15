import Link from 'next/link';

import styles from '@components/app/app-footer.module.css';
import { currentYear } from '@utils/datetime';

export default function AppFooter(): React.JSX.Element {
  return (
    <footer>
      <div className={styles['footer-content-wrapper']}>
        <div className={styles['footer-content']}>
          <p>© {currentYear()}</p>•
          <p>
            <Link className={styles.link} href="/">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
