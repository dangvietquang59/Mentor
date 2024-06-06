import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login - Mentor and mentee',
    description: 'Login page for the application',
};

export default function StreamLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
