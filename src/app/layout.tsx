import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Shoppy // Solana Athletics & Apparel',
  description: 'Fast, fee-less apparel shopping powered by Solana Pay sub-second settlement and Supabase realtime orders. Built for Dev3pack.',
  keywords: ['Solana', 'Solana Pay', 'Apparel', 'Streetwear', 'Dev3pack', 'Crypto Commerce'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-[#09090b] text-[#f4f4f5]">
        {children}
      </body>
    </html>
  );
}
