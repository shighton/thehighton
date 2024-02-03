import React from 'react';
import Head from 'next/head';
import MainNavbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Highton</title>
      </Head>
      <header>
        <MainNavbar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default MainLayout
