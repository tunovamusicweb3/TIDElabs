import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { audioManager } from '@/lib/audio/audioManager';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  height: 100%;
  background: #c0c0c0;
`;

const Canvas = styled.canvas`
  border: 3px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  background: #000;
  display: block;
  cursor: pointer;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 0 rgba(0, 0, 0, 0.5);
`;

const ScoreBoard = styled.div`
  display: flex;
  gap: 16px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 12px;
`;

const ScoreItem = styled.div`
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  padding: 6px 12px;
  min-width: 80px;
  text-align: center;
`;

const Instructions = styled.div`
  font-size: 10px;
  text-align: center;
  color: #000080;
  font-weight: bold;
`;

interface SnakeSegment {
  x: number;
  y: number;
}

interface FoodPos {
  x: number;
  y: number;
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    typeof window !== 'undefined' ? parseInt(localStorage.getItem('snakeHighScore') || '0') : 0
  );

  const gameStateRef = useRef({
    snake: [{ x: 10, y: 10 }] as SnakeSegment[],
    food: { x: 15, y: 15 } as FoodPos,
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    score: 0,
    gameOver: false,
    gameStarted: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameState = gameStateRef.current;
    const GRID_SIZE = 20;
    const TILE_SIZE = canvas.width / GRID_SIZE;

    const generateFood = () => {
      let newFood: FoodPos = { x: 15, y: 15 };
      let collision = true;
      while (collision) {
        newFood = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        };
        collision = gameState.snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
      }
      gameState.food = newFood;
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameState.gameStarted && (e.key === ' ' || e.code === 'Space')) {
        gameState.gameStarted = true;
        gameState.score = 0;
        gameState.gameOver = false;
        gameState.snake = [{ x: 10, y: 10 }];
        gameState.direction = { x: 1, y: 0 };
        gameState.nextDirection = { x: 1, y: 0 };
        generateFood();
        setScore(0);
        audioManager.playClick();
        return;
      }

      if (gameState.gameOver && (e.key === ' ' || e.code === 'Space')) {
        gameState.gameStarted = true;
        gameState.gameOver = false;
        gameState.score = 0;
        gameState.snake = [{ x: 10, y: 10 }];
        gameState.direction = { x: 1, y: 0 };
        gameState.nextDirection = { x: 1, y: 0 };
        generateFood();
        setScore(0);
        audioManager.playClick();
        return;
      }

      if (!gameState.gameStarted || gameState.gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          if (gameState.direction.y === 0) gameState.nextDirection = { x: 0, y: -1 };
          e.preventDefault();
          break;
        case 'ArrowDown':
          if (gameState.direction.y === 0) gameState.nextDirection = { x: 0, y: 1 };
          e.preventDefault();
          break;
        case 'ArrowLeft':
          if (gameState.direction.x === 0) gameState.nextDirection = { x: -1, y: 0 };
          e.preventDefault();
          break;
        case 'ArrowRight':
          if (gameState.direction.x === 0) gameState.nextDirection = { x: 1, y: 0 };
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    let gameLoopCounter = 0;
    const gameLoop = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * TILE_SIZE, 0);
        ctx.lineTo(i * TILE_SIZE, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * TILE_SIZE);
        ctx.lineTo(canvas.width, i * TILE_SIZE);
        ctx.stroke();
      }

      if (gameState.gameStarted && !gameState.gameOver) {
        gameLoopCounter++;

        if (gameLoopCounter % 10 === 0) {
          gameState.direction = gameState.nextDirection;

          const head = gameState.snake[0];
          const newHead = {
            x: head.x + gameState.direction.x,
            y: head.y + gameState.direction.y,
          };

          if (
            newHead.x < 0 ||
            newHead.x >= GRID_SIZE ||
            newHead.y < 0 ||
            newHead.y >= GRID_SIZE
          ) {
            gameState.gameOver = true;
            audioManager.playGameOver();
            if (gameState.score > highScore) {
              setHighScore(gameState.score);
              localStorage.setItem('snakeHighScore', gameState.score.toString());
            }
          }

          if (gameState.snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
            gameState.gameOver = true;
            audioManager.playGameOver();
            if (gameState.score > highScore) {
              setHighScore(gameState.score);
              localStorage.setItem('snakeHighScore', gameState.score.toString());
            }
          }

          if (!gameState.gameOver) {
            gameState.snake.unshift(newHead);

            if (newHead.x === gameState.food.x && newHead.y === gameState.food.y) {
              gameState.score++;
              setScore(gameState.score);
              audioManager.playSuccess();
              generateFood();
            } else {
              gameState.snake.pop();
            }
          }
        }
      }

      ctx.fillStyle = '#FF0000';
      ctx.fillRect(
        gameState.food.x * TILE_SIZE + 2,
        gameState.food.y * TILE_SIZE + 2,
        TILE_SIZE - 4,
        TILE_SIZE - 4
      );

      gameState.snake.forEach((segment, index) => {
        if (index === 0) {
          ctx.fillStyle = '#00FF00';
        } else {
          ctx.fillStyle = '#00AA00';
        }
        ctx.fillRect(
          segment.x * TILE_SIZE + 1,
          segment.y * TILE_SIZE + 1,
          TILE_SIZE - 2,
          TILE_SIZE - 2
        );
      });

      ctx.fillStyle = '#00FF00';
      ctx.font = 'bold 16px Courier New';
      ctx.fillText(`Score: ${gameState.score}`, 10, 20);

      if (!gameState.gameStarted) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00FF00';
        ctx.font = 'bold 20px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('SNAKE GAME', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = '14px Courier New';
        ctx.fillText('Press SPACE to Start', canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText('Use Arrow Keys to Move', canvas.width / 2, canvas.height / 2 + 40);
      }

      if (gameState.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FF0000';
        ctx.font = 'bold 28px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = 'bold 16px Courier New';
        ctx.fillStyle = '#00FF00';
        ctx.fillText(`Final Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.font = '14px Courier New';
        ctx.fillText('Press SPACE to Restart', canvas.width / 2, canvas.height / 2 + 50);
      }

      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [highScore]);

  return (
    <GameContainer>
      <ScoreBoard>
        <ScoreItem>Score: {score}</ScoreItem>
        <ScoreItem>High: {highScore}</ScoreItem>
      </ScoreBoard>
      <Canvas ref={canvasRef} width={400} height={300} />
      <Instructions>Arrow Keys to Move • Space to Start/Restart</Instructions>
    </GameContainer>
  );
}
