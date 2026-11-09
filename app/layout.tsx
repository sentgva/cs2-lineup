import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'LINEUP — раскидки Counter-Strike 2',
  description: 'Раcкидки CS2 за T и CT на Mirage, Dust2, Anubis, Overpass и Nuke. Планы A, B и мид, видео и тренировки в Telegram.',
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#101415" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ru"><body><Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />{children}</body></html>;
}
