import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LINEUP — раскидки Counter-Strike 2',
  description: 'Раcкидки CS2 за T и CT на Mirage, Dust2, Anubis, Overpass и Nuke. Планы A, B и мид, видео и тренировки в Telegram.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ru"><body>{children}</body></html>;
}
