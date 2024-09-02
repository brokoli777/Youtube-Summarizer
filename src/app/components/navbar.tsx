
'use client';

import Link from 'next/link';
import { Navbar } from 'flowbite-react';
import React from 'react'

function NavigationBar() {
  return (
    <Navbar fluid rounded className='mx-10 pt-5'>
      <Navbar.Brand as={Link} href="/">
        <span className=" text-xl self-center flex flex-row whitespace-nowrap font-semibold text-black dark:text-white"> 
          <svg className="pr-2 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 16.5c0-1-8-2.7-9-2V1.8c1-1 9 .707 9 1.706M10 16.5V3.506M10 16.5c0-1 8-2.7 9-2V1.8c-1-1-9 .707-9 1.706"/>
      </svg>
        YouTubeSummary
      </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="#about">
          About
        </Navbar.Link>
        {/* <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar