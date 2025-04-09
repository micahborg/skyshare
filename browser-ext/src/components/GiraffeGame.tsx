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
  const [obstacles, setObstacles] = useState<{ id: number; left: number }[]>([]);
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

  // Generate obstacles at random intervals
  useEffect(() => {
    const generateObstacle = () => {
      setObstacles((prev) => [
        ...prev,
        { id: obstacleId.current++, left: window.innerWidth },
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
          giraffe.bottom > obstacleRect.top &&
          giraffe.top < obstacleRect.bottom
        ) {
          alert('Game Over! Your score: ' + score);
          setScore(0);
          setObstacles([]);
        }
      });

      setScore((prev) => prev + 1); // Increment score
    }, 50); // Game loop runs every 50ms

    return () => clearInterval(gameLoop);
  }, [score]);

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
            objectFit: 'contain',
            transform: `scaleX(-1) ${isJumping ? 'scale(3)' : 'scale(1)'}`, // Huge scaling on jump (3x bigger)
          }}
        />
      </div>
      {/* Obstacles */}
      {obstacles.map((obstacle) => {
        const obstacleId = `obstacle-${obstacle.id}`;
        return (
          <div
            key={obstacle.id}
            id={`obstacle-${obstacle.id}`}
            style={{
              position: 'absolute',
              bottom: '50px',
              left: `${obstacle.left}px`,
              width: '30px',
              height: '30px',
              backgroundColor: 'brown',
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