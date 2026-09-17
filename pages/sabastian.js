import React from 'react'
import USMap from '../components/main/USMap';
// import {Sabastian} from '../components'

const Sabastian = () => (
    <div>

        <div className='sabastian-intro'>

            <h1 className='big-name'>Sabastian Highton</h1>

            <div className='abstract'>

                <p><i>~ IT enthusiast with quality industry experience and a love for creativity.</i></p>
        
                <p><i>Proven business ROI applying soft/hardware break/fix, networking, web dev, data analysis, and machine learning solutions.</i></p>

                <p><i>B.S. in Computer Science with a year of work experience in a variety of settings and plenty more years outside the office.</i></p>

                <p><i>Co-author of <a href='https://ieeexplore.ieee.org/document/10500205' className='blue-links' target='_blank'>published research</a> in machine learning contributing to bioinformatics. ~</i></p>

            </div>

            <p className='first-line'><b>*Download my work resume </b><a className='blue-links' target='_blank' 
            href='resources/2025_Sabastian-Highton_Resume_.pdf' download><b>here</b></a><b>.*</b></p>

            <USMap
                groupOne={['ND', 'LA']}
                groupTwo={['WI', 'GA']}
                groupThree={['AK', 'HI']}
                onStateClick={(state) => {console.log(state)}}
            ></USMap>
            
            {/* <p className='first-line'>I've been to 46 states and lived in GA and WI. I'll make it out to AK and HI at some point and don't mind skipping ND and LA for now.</p> */}

            <h1 className='big-sth'>Music</h1>

            <p className='first-line'>Listen to Sabastian Highton on all major streaming platforms.</p>

            <iframe
            src="https://open.spotify.com/embed/artist/4OnCpjtl0a1UNKeVkLdPYI?utm_source=generator" 
            width="100%" height="352" allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy" className='spotify'></iframe>

            <p className='first-line'>Listen on <a className='blue-links' target='_blank' 
            href='https://music.apple.com/us/artist/sabastian-highton/1505555600'>Apple Music</a>.</p>

            <p className='first-line'>Listen on <a className='blue-links' target='_blank' href='https://www.youtube.com/@sabhighton'>YouTube</a>.</p>

            {/* <h1 className='big-sth'>Travel</h1>

            <div className='grad-images'>

                <img className='travel-grad' src='resources/MapChart_Map.png'></img>

            </div>

            <h1 className='big-sth'>Photos</h1> */}
            
            <div className='grad-images'>

                <img className='fullbody-grad' src='resources/bwfullbodyavalon.jpg'></img>

            </div>

            {/* <div className='grad-images'>

                <img className='fullbody-grad' src='resources/meprof.jpg'></img>

            </div>

            <div className='grad-images'>

                <img className='fullbody-grad' src='resources/Fullbody_Grad.JPEG'></img>

            </div> */}

            <p className='first-line'>Here are some old <a className='blue-links' href='/projects'>projects</a>.</p>

            <p className='first-line'>Issue? Email below.</p>

        </div>

    </div>
)

export default Sabastian
