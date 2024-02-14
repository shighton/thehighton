import React from 'react';
import Head from 'next/head';
import MainNavbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Highton</title>
        <script type="module" src="https://pyscript.net/releases/2024.1.1/core.js"></script>
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
