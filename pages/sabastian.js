import React from 'react'

// import {Sabastian} from '../components'

const Sabastian = () => (
    <div>

        <div className='sabastian-intro'>

            <h1 className='big-name' >Sabastian Highton</h1>

            <div className='abstract'>

                <p>Recent graduate in computer science seeking software development role to gain high quality experience.</p>
        
                <p>Over two years of software development and data science in a university environment.</p>

                <p>Self-starter applying software development and machine learning models to real-world problems.</p>

                <p>Graduated summa cum laude a year and a half early as a co-author of conference accepted research.</p>

            </div>

            <p>Download his resume <a className='blue-links' target='_blank' href='resources/Highton_Resume.pdf' download>here</a>.</p>

            <div className='grad-images'>

                <img className='fullbody-grad' src='resources/Fullbody_Grad.JPEG'></img>
                {/* <img className='head-grad' src='resources/Head_Grad.JPEG'></img> */}

            </div>

        </div>

    </div>
)

export default Sabastian
