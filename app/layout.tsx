// import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import '@/styles/styles.scss';
import { Toaster } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <Toaster richColors />
                <div>
                    <Header />
                    <div className="min-h-[100vh] p-[1.6rem_2.4rem] pt-[6rem] md:px-0 md:pt-[7rem]">
                        {children}
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
