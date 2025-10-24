import React from 'react';
import Head from 'next/head';
import MainNavbar from './Navbar';
import Footer from './Footer';
import { Analytics } from "@vercel/analytics/next"

const MainLayout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Sabastian Highton</title>
      </Head>
      <header>
        <MainNavbar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
        <Analytics />
      </footer>
    </div>
  )
}

export default MainLayout
