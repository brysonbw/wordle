import { createPortal } from 'react-dom';

import styles from '@components/portal/dialog-portal.module.css';
import { DialogState } from '@context/dialog-context';
import UIButton from '@shared/ui/button';

interface DialogPortalProps extends Omit<DialogState, 'content'> {
  children: React.ReactNode;
  onClose: () => void;
}

export default function DialogPortal({
  title,
  closeButtonText = 'Close',
  showFooter = true,
  children,
  onClose,
}: Readonly<DialogPortalProps>): React.ReactPortal | null {
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      className={styles['dialog-overlay']}
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        className={styles['dialog-card']}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles['dialog-header']}>
          <h2 className={styles['dialog-title']}>{title}</h2>
        </div>

        <div className={styles['dialog-body']}>{children}</div>

        {showFooter && (
          <div className={styles['dialog-footer']}>
            <UIButton
              className={styles['close-button']}
              onClick={onClose}
              type="button"
              aria-label="Close dialog"
            >
              {closeButtonText}
            </UIButton>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
