import React from 'react'

const Home = () => (

  <div>

    <div className='welcome'>

      <h1 className='welcome-home'>Welcome!</h1>

      <h3 className='welcome-interests'>Music |x| Tech</h3>

      <p className='first-line'><a className='blue-links' href='/sabastian'>Learn more</a> about Sabastian or 
      check out <a className='blue-links' href='/dashboard'>the playlist</a>.</p>

      <div className='home-pics'>

        <img className='home-img' src='resources/FAME_Bass.JPG'></img>

      </div>

      <p className='first-line'>Issue? Email below.</p>

      {/* <p className='index-monty'>Music <a className='blue-links' href='/store'>store</a> currently closed.</p> */}

    </div>

  </div>
)

export default Home
