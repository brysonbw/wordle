import styles from '@shared/ui/loading-indicator.module.css';

export interface UILoadingIndicatorProps {
  size?: 'small' | 'large';
  text?: string;
}

export default function UILoadingIndicator({
  size,
  text = 'Loading...',
}: Readonly<UILoadingIndicatorProps>): React.JSX.Element {
  return (
    <div className={styles['spinner-wrapper']}>
      <div className={styles.spinner} data-size={size}></div>
      <div className={styles['spinner-text']}>{text}</div>
    </div>
  );
}
