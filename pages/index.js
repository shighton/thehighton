import React from 'react'

const Home = () => (

  <div>

    <div className='welcome'>

      <h1 className='welcome-home'>Welcome!</h1>

      <h3 className='welcome-interests'>Music |x| Tech</h3>

      <p className='first-line'><a className='blue-links' href='/sabastian'>Learn more</a> about Sabastian or 
      check out the <a className='blue-links' href='/dashboard'>indie playlist</a>.</p>

      <p>Site's under heavy construction, so beware of potholes. Hand coded y'know.</p>

      <div className='home-pics'>

        <img className='home-img' src='resources/FAME_Bass.JPG'></img>

      </div>

      <p>Issue? Email below.</p>

      {/* <p className='index-monty'>Music <a className='blue-links' href='/store'>store</a> currently closed.</p> */}

    </div>

  </div>
)

export default Home
