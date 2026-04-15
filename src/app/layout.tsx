import '@app/globals.css';

import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

import AppProvider from '@app/app-provider';
import AppFooter from '@components/app/app-footer';
import AppHeader from '@components/app/app-header';

export const metadata: Metadata = {
  title: 'Wordle | Home',
  description: 'Wordle - Guess The Word',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <main id="root">
            <AppHeader />
            <div id="outlet">{children}</div>
            <AppFooter />
          </main>
        </AppProvider>
        <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
      </body>
    </html>
  );
}
