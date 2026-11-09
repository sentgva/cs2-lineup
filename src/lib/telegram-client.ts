export interface TelegramWebApp {
  initData: string;
  ready(): void;
  expand(): void;
  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;
  disableVerticalSwipes?(): void;
  BackButton: { show(): void; hide(): void; onClick(fn: () => void): void; offClick(fn: () => void): void };
  HapticFeedback?: { selectionChanged(): void; notificationOccurred(type: 'success' | 'error'): void };
}
declare global { interface Window { Telegram?: { WebApp?: TelegramWebApp } } }
export function telegram() { return typeof window === 'undefined' ? undefined : window.Telegram?.WebApp; }
