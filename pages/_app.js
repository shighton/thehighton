import React from 'react';
import { Toaster } from 'react-hot-toast';
import {Layout} from '../components';

import '../styles/globals.css';
import { StateContext } from '../context/stateContext';

function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default App