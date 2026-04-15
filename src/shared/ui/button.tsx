'use client';
import styles from '@shared/ui/button.module.css';
import { UI_COMPONENT_ATTRS } from '@utils/constants';

export type UIButtonVariant = 'text' | 'tonal' | 'outlined' | 'contained';
export type UIButtonSize = 'small' | 'medium' | 'large';
export type UIButtonRounded = 'small' | 'medium' | 'large' | 'full' | 'none';

export interface UIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: UIButtonVariant;
  size?: UIButtonSize;
  rounded?: UIButtonRounded;
  type?: 'submit' | 'reset' | 'button' | undefined;
  children: React.ReactNode;
}

export default function UIButton({
  variant = 'contained',
  size = 'medium',
  rounded = 'medium',
  type = 'button',
  children,
  className,
  ...props
}: Readonly<UIButtonProps>): React.JSX.Element {
  return (
    <button
      {...props}
      data-size={size}
      data-variant={variant}
      data-rounded={rounded}
      data-ui={UI_COMPONENT_ATTRS.BUTTON}
      type={type}
      className={`${styles['ui-button']} ${className}`}
    >
      {children}
    </button>
  );
}
