'use client';
import { DialogProvider } from '@context/dialog-context';

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({
  children,
}: Readonly<AppProviderProps>): React.JSX.Element {
  return <DialogProvider>{children}</DialogProvider>;
}
