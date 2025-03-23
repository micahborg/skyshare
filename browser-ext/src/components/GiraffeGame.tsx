/* GiraffeGame for skyShare 2.0.
Description: Jumping giraffe game for skyShare upgrade.  
Programmers: Brynn Hare, Micah Borghese, Katelyn Accola, Nora Manolescu, Kyle Johnson
Date Created: 3/23/2025
Modified Date: 3/23
*/

// This is a foundation for the jumping giraffe game
// NOT MEANT TO BE FUNCTIONAL YET! Simply for storyboarding purposes

import React, { useRef, useEffect, useState } from 'react';

const GiraffeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isJumping, setIsJumping] = useState(false);

  const gameWidth = 800;
  const gameHeight = 400;

  // Giraffe character properties - TO BE CHANGED
  const giraffe = {
    x: 50,
    y: 300,
    width: 50,
    height: 80,
    color: '#8B4513',
    gravity: 0.5,
    lift: -15,
    velocity: 0,
  };

  const obstacle = {
    x: gameWidth,
    y: 300,
    width: 40,
    height: 50,
    color: 'green',
    speed: 3,
  };

  let gameInterval: NodeJS.Timeout;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const updateGame = () => {
        // Clear the canvas for the next frame
        ctx.clearRect(0, 0, gameWidth, gameHeight);

        // Update giraffe position (jumping mechanics)
        if (isJumping) {
          giraffe.velocity += giraffe.gravity;
          giraffe.y += giraffe.velocity;

          // Prevent the giraffe from falling through the ground
          if (giraffe.y >= 300) {
            giraffe.y = 300;
            giraffe.velocity = 0;
            setIsJumping(false); 
          }
        }

        // Draw giraffe (simplified as a rectangle) -- TO BE CHANGED
        ctx.fillStyle = giraffe.color;
        ctx.fillRect(giraffe.x, giraffe.y, giraffe.width, giraffe.height);

        // Update obstacle position and detect collision
        obstacle.x -= obstacle.speed;
        if (obstacle.x < 0) {
          obstacle.x = gameWidth; // reset position after it goes off-screen
        }

        // Draw obstacle
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Check for collision (simple rectangle collision check)
        if (
          giraffe.x < obstacle.x + obstacle.width &&
          giraffe.x + giraffe.width > obstacle.x &&
          giraffe.y < obstacle.y + obstacle.height &&
          giraffe.y + giraffe.height > obstacle.y
        ) {
          alert('Game Over!');
          clearInterval(gameInterval);
        }
      };

      gameInterval = setInterval(updateGame, 1000 / 60); // 60 FPS game loop

      return () => {
        clearInterval(gameInterval);
      };
    }
  }, [isJumping]);

  // Handle space bar to trigger jump
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      if (giraffe.y === 300 && !isJumping) {
        setIsJumping(true);
        giraffe.velocity = giraffe.lift;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isJumping]);

  return (
    <div>
      <h2>Giraffe Jumping Game</h2>
      <canvas ref={canvasRef} width={gameWidth} height={gameHeight} />
    </div>
  );
};

export default GiraffeGame;