import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Калькулятор пряжи",
  description: "Расчет метража при сложении нескольких нитей пряжи. Простой и удобный онлайн калькулятор для вязания.",
  keywords: ["калькулятор пряжи", "вязание", "расчет метража", "пряжа", "калькулятор для вязания"],
  authors: [{ name: "Yarn Calculator" }],
  creator: "Yarn Calculator",
  publisher: "Yarn Calculator",
  metadataBase: new URL('https://itbali.github.io'),
  alternates: {
    canonical: '/yarn-calc',
  },
  openGraph: {
    title: "Калькулятор пряжи",
    description: "Расчет метража при сложении нескольких нитей пряжи. Простой и удобный онлайн калькулятор для вязания.",
    url: 'https://itbali.github.io/yarn-calc',
    siteName: "Калькулятор пряжи",
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Калькулятор пряжи",
    description: "Расчет метража при сложении нескольких нитей пряжи",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Калькулятор пряжи',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#9333EA' },
    { media: '(prefers-color-scheme: dark)', color: '#1F2937' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
