import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TradingPro - Ticaret Potansiyelinizi Açığa Çıkarın',
  description: 'Profesyonel trading eğitimi ve mentorlik hizmeti. Başarılı trader olma yolculuğunuzda yanınızdayız.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}