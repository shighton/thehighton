import React from 'react';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from '../components/';
import { StateContext } from '../context/stateContext';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <StateContext>
      <SessionProvider session={pageProps.session}>
        <MainLayout>
          <Toaster />
          <Component {...pageProps} />
        </MainLayout>
      </SessionProvider>
    </StateContext>
  )
}

export default App
