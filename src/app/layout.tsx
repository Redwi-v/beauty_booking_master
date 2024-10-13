'use client';
import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import './_styles/globals.scss';
import localFont from 'next/font/local';
import Script from 'next/script';
import { ClientRoot } from '@/widgets/client.root';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAppointmentStore } from '@/features/appointment/model/appointment.store';
import { useEffect } from 'react';

const roboto = Roboto({
	subsets: ['latin'],
	variable: '--font-roboto',
	display: 'swap',
	weight: ['400', '500', '700'],
});

const myFont = localFont({
	variable: '--font-sf_pro_text',

	src: [
		{
			path: '../../public/fonts/SF-Pro-Text-Medium.otf',
			weight: '500',
			style: 'normal',
		},

		{
			path: '../../public/fonts/SF-Pro-Text-Regular.otf',
			weight: '400',
			style: 'normal',
		},

		{
			path: '../../public/fonts/SF-Pro-Text-Semibold.otf',
			weight: '600',
			style: 'normal',
		},
	],
});

const queryClient = new QueryClient();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='ru'>
			<QueryClientProvider client={queryClient}>
				<body className={`${roboto.variable} ${myFont.variable}`}>
					<main className='content'>{children}</main>
				</body>

				<ClientRoot />
			</QueryClientProvider>
			<Script src='https://telegram.org/js/telegram-web-app.js'></Script>
		</html>
	);
}
