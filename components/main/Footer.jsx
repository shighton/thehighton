import React from 'react';
import { AiFillInstagram, AiOutlineYoutube, AiOutlineLinkedin } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2024 - The Highton - All Rights Reserved</p>
      <p className='icons'>
        <a target='_blank' href='https://www.instagram.com/the.highton/'><AiFillInstagram /></a>
        <a target='_blank' href='https://youtube.com/@shighton?si=k-kvsBW1uREqGjxZ'><AiOutlineYoutube /></a>
        <a target='_blank' href='https://www.linkedin.com/in/sabastian-highton/'><AiOutlineLinkedin /></a>
      </p>
    </div>
  )
}

export default Footer
