/* GiraffeGame for skyShare 2.0.
Description: Jumping giraffe game for skyShare upgrade.  
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 3/23/2025
Modified Date: 3/23
*/

// SO FAR: Giraffe jumps in white space :O

import React, { useState, useEffect, useRef } from 'react';

const GiraffeGame: React.FC = () => {
  const [isJumping, setIsJumping] = useState(false);
  const giraffeRef = useRef<HTMLDivElement | null>(null);

  const jump = () => {
    if (isJumping) return; // Prevent jumping while already jumping
    setIsJumping(true);

    // Set the jump duration and reset it after a smooth transition
    setTimeout(() => {
      setIsJumping(false);
    }, 500); // Duration of the jump 
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        jump(); // Trigger jump on spacebar press
      }
    };
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isJumping]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        ref={giraffeRef}
        style={{
          position: 'absolute',
          bottom: isJumping ? '150px' : '50px', // Giraffe jumps when space is pressed
          left: '50px',
          width: '50px', // Width of the giraffe image (container size)
          height: '50px', // Height of the giraffe image (container size)
          transition: 'bottom 0.5s ease-out', // Smooth jump transition
        }}
      >
        {/* Giraffe Image with conditional image change based on jumping state */}
        <img
          src={isJumping ? '/images/jumpinggiraffe.png' : '/images/giraffetransparent.png'}  // Switch image based on jump state
          alt="Giraffe"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain', // Ensures the image is scaled properly
            transform: `scaleX(-1) ${isJumping ? 'scale(3)' : 'scale(1)'}`, // Huge scaling on jump (3x bigger)
          }}
        />
      </div>
    </div>
  );
};

export default GiraffeGame;