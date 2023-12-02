import { appWithTranslation } from 'next-i18next';
import '@/styles/globals.css';
import 'typeface-roboto';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default appWithTranslation(App);
