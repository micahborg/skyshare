"use client";
import React, { useState } from 'react';

export default function Home() {
  const [activePage, setActivePage] = useState('index');

  const navigateToPage = (page) => {
    setActivePage(page);
  };

  return (
    <>
      <h1>skyShare test</h1>
      <button onClick={() => navigateToPage('index')}>Index</button>
      <button onClick={() => navigateToPage('about')}>About</button>
      <button onClick={() => navigateToPage('contact')}>Contact</button>
      <div>
        {activePage === 'index' && <h2>Index Page</h2>}
        {activePage === 'about' && <h2>About Page</h2>}
        {activePage === 'contact' && <h2>Contact Page</h2>}
      </div>
    </>
  );
}