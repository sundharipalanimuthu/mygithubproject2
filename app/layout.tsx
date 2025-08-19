import './globals.css';
import { inter } from '@/lib/fonts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Navarasu Portfolio',
    template: '%s | Navarasu',
  },
  description:
    'A portfolio by Navarasu showcasing open source work, blogs, and contact info.',
};

export default function RootLayout({
  children,
}: { 
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* ✅ Preload important images */}
        <link
          rel="preload"
          href="/navarasu/img/navarasu_desktop.avif"
          as="image"
          type="image/avif"
        />
        <link
          rel="preload"
          href="/navarasu/img/navarasu_tab.avif"
          as="image"
          type="image/avif"
        />
        <link
          rel="preload"
          href="/navarasu/img/navarasu_mob.avif"
          as="image"
          type="image/avif"
        />

        {/* ✅ DNS Prefetch */}
        <link rel="dns-prefetch" href="//api.github.com" />
        <link rel="dns-prefetch" href="//raw.githubusercontent.com" />
        <link rel="dns-prefetch" href="//img.shields.io" />
        <link rel="dns-prefetch" href="//navarasu.com" />

        {/* ✅ Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ✅ Non-blocking Google Fonts load */}
        <link
          href="https://fonts.googleapis.com/css2?family=Spartan:wght@300;400;500&display=swap"
          rel="stylesheet"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* ✅ Defer service worker registration to reduce JS execution cost */}
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function () {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function (registration) {
                      console.log('SW registered:', registration);
                    })
                    .catch(function (registrationError) {
                      console.log('SW registration failed:', registrationError);
                    });
                }
              });
            `,
          }}
        />
      </head>
      <body className="font-inter">
        <main>{children}</main>
      </body>
    </html>
  );
}
