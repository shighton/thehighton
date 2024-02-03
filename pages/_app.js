import React from 'react';
import { Toaster } from 'react-hot-toast';
import {MainLayout} from '../components/';

import '../styles/globals.css';
import { StateContext } from '../context/stateContext';

function App({ Component, pageProps }) {
  return (
    <StateContext>
      <MainLayout>
        <Toaster />
        <Component {...pageProps} />
      </MainLayout>
    </StateContext>
  )
}

export default App
