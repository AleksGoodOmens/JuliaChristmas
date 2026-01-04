import type { Metadata } from 'next';
import './globals.css';

import localFont from 'next/font/local';
import { Footer } from '@/components/footer/Footer';
import { Banner } from '@/components/banner/Banner';
import { bannerMessages } from '@/components/banner/messages';

const segoe = localFont({
  src: './fonts/segoeuithis.ttf',
  variable: '--font-segoe',
});

const vibes = localFont({
  src: './fonts/GreatVibes-Regular.ttf',
  variable: '--font-vibes',
});
const montserrat = localFont({
  src: [
    {
      path: './fonts/Montserrat-Bold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Montserrat-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-Montserrat',
});

export const metadata: Metadata = {
  title: 'Happy New Year - 2027!',
  description: 'Designed by Nikita',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={` ${segoe.variable} ${vibes.variable} ${montserrat.variable}antialiased`}>
        <Banner messages={bannerMessages} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
