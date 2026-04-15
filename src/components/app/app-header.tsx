'use client';
import Image from 'next/image';
import { BsQuestionCircle } from 'react-icons/bs';

import styles from '@components/app/app-header.module.css';
import HelpDialogContent from '@components/dialog/help-dialog-content';
import { useDialog } from '@context/dialog-context';

export default function AppHeader(): React.JSX.Element {
  const { showDialog } = useDialog();

  function openHelpDialog(): void {
    showDialog('Wordle Help & Resources', <HelpDialogContent />);
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles['nav-logo']}>
          <Image
            width={10}
            height={10}
            className={styles.logo}
            src="/images/wordle.jpg"
            alt={`${process.env.NEXT_PUBLIC_APP_NAME}`}
            priority
          />
          <p className={styles['app-title']} aria-current="page">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </p>
        </div>

        <div className={styles['nav-links']}>
          <BsQuestionCircle size={20} onClick={openHelpDialog} />
          <a href="https://github.com/brysonbw/wordle" target="_blank">
            <Image
              className={styles['github-logo']}
              src="/images/github.jpg"
              alt="GitHub"
              width={21}
              height={21}
              priority
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
