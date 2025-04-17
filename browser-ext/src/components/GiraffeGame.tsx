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
  const [isDucking, setIsDucking] = useState(false); // New state for ducking
  const [obstacles, setObstacles] = useState<{ id: number; left: number; type: 'low' | 'high' }[]>([]);
  const [score, setScore] = useState(0);
  const giraffeRef = useRef<HTMLDivElement | null>(null);
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const obstacleId = useRef(0);
  const obstaclesRef = useRef(obstacles); // Ref to store the latest obstacles state
  

  // Update the ref whenever obstacles change
  useEffect(() => {
    obstaclesRef.current = obstacles;
  }, [obstacles]);

  const jump = () => {
    if (isJumping) return; // Prevent jumping while already jumping
    setIsJumping(true);

    // Set the jump duration and reset it after a smooth transition
    setTimeout(() => {
      setIsJumping(false);
    }, 500); // Duration of the jump
  };

  const duck = (isKeyDown: boolean) => {
    setIsDucking(isKeyDown); // Set ducking state based on key press
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.repeat) return; // 👈 This line blocks held key repeats
    
      if (event.code === 'Space') {
        jump(); // Trigger jump on spacebar press
      } else if (event.code === 'ArrowDown') {
        duck(true); // Start ducking on down arrow press
      }
    };

    const handleKeyRelease = (event: KeyboardEvent) => {
      if (event.code === 'ArrowDown') {
        duck(false); // Stop ducking on down arrow release
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyRelease);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyRelease);
    };
  }, [isJumping]);

  // Generate obstacles at random intervals
  useEffect(() => {
    const generateObstacle = () => {
      // const isHighObstacle = score > 20 && Math.random() < 0.5; // Start generating high obstacles after score > 20
      const randomValue = Math.random();
      const isHighObstacle = obstacleId.current > 20 && randomValue < 0.5; // Start generating high obstacles after 20 obstacles
      
      const newObstacle = { id: obstacleId.current++, left: window.innerWidth, type: isHighObstacle ? 'high' : 'low' };
      
      setObstacles((prev) => [
        ...prev,
        { id: obstacleId.current++, left: window.innerWidth, type: isHighObstacle ? 'high' : 'low' },
      ]);

      // Set a random delay for the next obstacle
      const randomDelay = Math.random() * 2000 + 1000; // Random delay between 1s and 3s
      setTimeout(generateObstacle, randomDelay);
    };

    generateObstacle(); // Start generating obstacles

    return () => {
      // Cleanup any pending timeouts when the component unmounts
      obstacleId.current = 0;
    };
  }, []);

  // Move obstacles and check for collisions
  useEffect(() => {
    const gameLoop = setInterval(() => {
      // Adjust the speed based on the score (e.g., speed increases as the score increases)
      const speed = Math.max(10, 10 + Math.floor(score / 20)); // Increase speed every 25 points

      setObstacles((prev) =>
        prev
          .map((obstacle) => ({ ...obstacle, left: obstacle.left - speed })) // Move obstacles left based on speed
          .filter((obstacle) => obstacle.left > -50) // Remove obstacles that are off-screen
      );

      // Check for collisions
      obstaclesRef.current.forEach((obstacle) => {
        const obstacleId = `obstacle-${obstacle.id}`;
        const obstacleElement = gameContainerRef.current?.querySelector(`#${obstacleId}`);
        const giraffe = giraffeRef.current?.getBoundingClientRect();
        const obstacleRect = obstacleElement?.getBoundingClientRect();

        if (
          giraffe &&
          obstacleRect &&
          giraffe.left < obstacleRect.right &&
          giraffe.right > obstacleRect.left &&
          ((obstacle.type === 'low' && giraffe.bottom > obstacleRect.top) || // Collision with low obstacle
            (obstacle.type === 'high' && !isDucking && giraffe.top < obstacleRect.bottom)) // Collision with high obstacle
        ) {
          alert('Game Over! Your score: ' + score);
          setScore(0);
          setObstacles([]);
          //obstacleId.current = 0; // Reset obstacle ID counter
        }
      });

      setScore((prev) => prev + 1); // Increment score
    }, 50); // Game loop runs every 50ms

    return () => clearInterval(gameLoop);
  }, [score, isDucking]);

  return (
    <div
      ref={gameContainerRef} // Assign the ref here
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
      {/* Scrolling Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200%',
          height: '100%',
          backgroundRepeat: 'repeat-x',
          animation: 'scroll 5s linear infinite',
        }}
      />

      {/* Giraffe */}
      <div
        ref={giraffeRef}
        style={{
          position: 'absolute',
          bottom: isJumping ? '150px' :isDucking ? '20px' : '50px', // Giraffe jumps when space is pressed
          left: '50px',
          width: '50px', // Width of the giraffe image (container size)
          height: '50px', // Keep the height consistent
          transition: 'bottom 0.5s ease-out',  // Smooth transition for ducking
        }}
      >
        {/* Giraffe Image with conditional image change based on jumping state */}
        <img
          src={isJumping ? '/images/jumpinggiraffe.png' : isDucking ? '/images/jumpinggiraffe.png' : '/images/giraffetransparent.png'}  // Switch image based on jump state
          alt="Giraffe"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: `scaleX(-1) ${isJumping ? 'scale(3)' : 'scale(1)'}`, // Huge scaling on jump (3x bigger)
          }}
        />
      </div>
      {/* Obstacles */}
  
      {obstacles.map((obstacle) => {
        const obstacleId = `obstacle-${obstacle.id}`;
        return (
          <img
            key={obstacle.id}
            id={obstacleId}
            src="/images/folder-icon.png"
            alt="Obstacle"
            style={{
              position: 'absolute',
              bottom: obstacle.type === 'low' ? '50px' : '150px', // High obstacles are at head height
              left: `${obstacle.left}px`,
              width: '30px',
              height: '30px',
              objectFit: 'contain',
            }}
          />
        );
      })}

      {/* Score */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        Score: {score}
      </div>
    </div>
  );
};

export default GiraffeGame;