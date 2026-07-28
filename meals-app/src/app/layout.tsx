import './globals.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';

import MainHeader from '@/components/MainHeader/main-header';

export const metadata: Metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className='flex'>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
