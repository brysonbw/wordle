import Link from 'next/link';

import styles from '@app/not-found.module.css';

export default function NotFound(): React.JSX.Element {
  return (
    <main className={styles.page}>
      <div className={styles.title}>
        <p>Page Not Found</p>
      </div>
      <div className={styles.message}>
        <p>Unfortunately, the requested resource could not be found.</p>
      </div>
      <div className={styles['button-wrapper']}>
        <Link className={styles.link} href="/">
          Return Home
        </Link>
      </div>
    </main>
  );
}
