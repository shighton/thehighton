import React from 'react';
import { AiFillInstagram, AiOutlineYoutube, AiOutlineLinkedin, AiOutlineMail, AiOutlineGithub } from 'react-icons/ai';

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <div className='footer-container'>
      <p>{currentYear} - The Highton - All Rights Reserved</p>
      <p className='icons'>
        <a target='_blank' href='https://www.linkedin.com/in/sabastian-highton/'><AiOutlineLinkedin /></a>
        <a target='_blank' href="mailto:sthighton@gmail.com"><AiOutlineMail /></a>
        {/* <a target='_blank' href='https://www.instagram.com/the.highton/'><AiFillInstagram /></a> */}
        <a target='_blank' href='https://www.youtube.com/@shighton?si=k-kvsBW1uREqGjxZ'><AiOutlineYoutube /></a>
        <a target='_blank' href='https://www.github.com/shighton'><AiOutlineGithub /></a>
      </p>
    </div>
  )
}

export default Footer
