import { Html, Head, Main, NextScript } from 'next/document';
import i18nextConfig from '../next-i18next.config';

export default function Document() {
  const currentLocale = i18nextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale} className="scroll-smooth scroll-pt-28">
      <Head />
      <body className="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
