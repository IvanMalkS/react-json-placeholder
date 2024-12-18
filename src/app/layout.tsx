import type { Metadata } from 'next';

import './globals.scss';
import { SideBar } from '@/app/components/SideBar/SideBar';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body className={` antialiased flex h-full`}>
                <div id="modal" />
                <div className={'flex h-full'}>
                    <SideBar />
                    <main className="w-full pt-4 flex flex-col items-center">{children}</main>
                </div>
            </body>
        </html>
    );
}
