/* GiraffeGame for skyShare 2.0.
Description: Jumping giraffe game for skyShare upgrade.  
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 3/23/2025
Modified Date: 3/23
*/

// Added background!!!

import React, { useState, useEffect, useRef } from 'react';

const GiraffeGame: React.FC = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [isDucking, setIsDucking] = useState(false); // New state for ducking
  const [obstacles, setObstacles] = useState<{ id: number; left: number; type: 'low' | 'medium' | 'high' }[]>([]);
  const [score, setScore] = useState(0);
  const giraffeRef = useRef<HTMLDivElement | null>(null);
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const obstacleId = useRef(0);
  const obstaclesRef = useRef(obstacles); // Ref to store the latest obstacles state
  const [gameOver, setGameOver] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const cooldownRef = useRef(false); // for real-time check in callbacks
  const isGiraffeBusy = () => isJumpingRef.current || isDuckingRef.current || cooldownRef.current;

  // Update the ref whenever obstacles change
  useEffect(() => {
    obstaclesRef.current = obstacles;
  }, [obstacles]);

  const isJumpingRef = useRef(isJumping);

  useEffect(() => {
    isJumpingRef.current = isJumping;
  }, [isJumping]);

  const startCooldown = (duration = 980) => {
    setCooldown(true);
    cooldownRef.current = true;
    setTimeout(() => {
      setCooldown(false);
      cooldownRef.current = false;
    }, duration);
  };

  const jump = () => {
    if (isGiraffeBusy()) return; // Don't jump if busy
    setIsJumping(true);
    isJumpingRef.current = true;
    startCooldown();

    setTimeout(() => {
      setIsJumping(false);
      isJumpingRef.current = false;
    }, 500);
  };

  const duck = () => {
    if (isGiraffeBusy()) return;
    setIsDucking(true);
    isDuckingRef.current = true;
    startCooldown();

    setTimeout(() => {
      setIsDucking(false);
      isDuckingRef.current = false;
    }, 500);
  };

  const isDuckingRef = useRef(false);
  useEffect(() => {
    isDuckingRef.current = isDucking;
  }, [isDucking]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.repeat || gameOver) return;

      if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        jump();
      } else if (event.code === 'ArrowDown') {
        duck();
      }
    };

    const handleKeyRelease = (event: KeyboardEvent) => {
      if (event.code === 'ArrowDown') {
        duck();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyRelease);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyRelease);
    };
  }, []);

  // Generate obstacles at random intervals
  useEffect(() => {
    if (gameOver) return;
    const generateObstacle = () => {
      const randomValue = Math.random();
      let obstacleType: 'low' | 'medium' | 'high';

      if (obstacleId.current > 15) {
        // Start generating medium and high obstacles after 15 obstacles
        if (randomValue < 0.33) {
          obstacleType = 'low';
        } else if (randomValue < 0.66) {
          obstacleType = 'medium';
        } else {
          obstacleType = 'high';
        }
      } else {
        // Only generate low obstacles initially
        obstacleType = 'low';
      }

      const newObstacle = { id: obstacleId.current++, left: window.innerWidth, type: obstacleType };
      setObstacles((prev) => [...prev, newObstacle]);

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
    if (gameOver) return; //stops the game loop when the game is over
    const gameLoop = setInterval(() => {
      // Adjust the speed based on the score (e.g., speed increases as the score increases)
      const speed = Math.max(10, 10 + Math.floor(score / 40)); // Increase speed every 25 points

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
          (
            (obstacle.type === 'low' && giraffe.bottom > obstacleRect.top) || // Collision with low obstacle
            (obstacle.type === 'medium' && !isDucking && giraffe.top < obstacleRect.bottom) || // Collision with medium obstacle
            (obstacle.type === 'high' && giraffe.top < obstacleRect.bottom) // Collision with high obstacle
          )
        ) {
          setGameOver(true)
        }
      });

      setScore((prev) => prev + 1); // Increment score
    }, 50); // Game loop runs every 50ms

    return () => clearInterval(gameLoop);
  }, [score, isDucking, gameOver]);

  return (
    <div
      ref={gameContainerRef} // Assign the ref here
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to bottom, #BFEFFF 65%, #90EE90 65%)', // Background with grass at the bottom
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
          bottom: isJumping ? '150px' : isDucking ? '20px' : '50px', // Giraffe jumps when space is pressed
          left: '50px',
          width: '50px', // Width of the giraffe image (container size)
          height: '50px', // Keep the height consistent
          transition: 'bottom 0.5s ease-out', // Smooth transition for ducking
        }}
      >
        <img
          src={isJumping ? '/images/updatedgiraffejumping.png' : isDucking ? '/images/duckinggiraffe.png' : '/images/giraffe_transparent_small.png'}
          alt="Giraffe"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: `scaleX(-1) ${isJumping || isDucking ? 'scale(2)' : 'scale(1)'}`, // Huge scaling on jump and duck (2x bigger)
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
              bottom:
                obstacle.type === 'low'
                  ? '50px' // Low obstacles are on the ground
                  : obstacle.type === 'medium'
                  ? '85px' // Medium obstacles are at head height
                  : '140px', // High obstacles are above the giraffe's head
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

      {gameOver && (
        <div
          style={{
            position: 'absolute',
            textAlign: 'center',
            width: '100%',
            fontSize: '22px',
            fontWeight: 'bold',
            top: '50%',
            left: '36%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
          }}
        >
          <div>Game Over! Final Score: {score}</div>
          <button
            onClick={() => {
              setGameOver(false);
              setScore(0);
              setObstacles([]);
              obstacleId.current = 0;
            }}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default GiraffeGame;