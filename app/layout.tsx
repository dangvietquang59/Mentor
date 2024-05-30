import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Sider from './components/Sider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Mentor and mentee',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <div className="flex">
                    <Sider />
                    <div className="p-[2rem]"> {children}</div>
                </div>
            </body>
        </html>
    );
}
