import React from 'react'

// import {Sabastian} from '../components'

const Sabastian = () => (
    <div>

        <div className='sabastian-intro'>

            <h1 className='big-name'>Sabastian Highton</h1>

            <div className='abstract'>

                <p>Recent graduate in computer science seeking software development role to gain high quality experience.</p>
        
                <p>Over two years of software development and data science in a university environment.</p>

                <p>Self-starter applying software development and machine learning models to real-world problems.</p>

                <p>Graduated summa cum laude a year and a half early as a co-author of conference accepted research.</p>

            </div>

            <p>Download his resume <a className='blue-links' target='_blank' 
            href='resources/Highton_Resume.pdf' download>here</a>.</p>

            <div className='grad-images'>

                <img className='fullbody-grad' src='resources/Fullbody_Grad.JPEG'></img>

            </div>

            <h1 className='big-name'>Music</h1>

            <p>Listen to the music of Sabastian Highton on all major streaming platforms.</p>

            <iframe
            src="https://open.spotify.com/embed/artist/4OnCpjtl0a1UNKeVkLdPYI?utm_source=generator" 
            width="100%" height="352" allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy" className='spotify'></iframe>

            <p>Listen on <a className='blue-links' target='_blank' 
            href='https://music.apple.com/us/artist/sabastian-highton/1505555600'>Apple Music</a>.</p>

            <p>Listen on <a className='blue-links' target='_blank' href='https://www.youtube.com/@sabhighton'>YouTube</a>.</p>

        </div>

    </div>
)

export default Sabastian
