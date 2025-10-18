'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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
`;

const ScoreBoard = styled.div`
  display: flex;
  gap: 16px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 12px;
  color: #00ff00;
`;

const ScoreItem = styled.div`
  background: #000;
  border: 2px solid #00ff00;
  padding: 6px 12px;
  font-family: 'Courier New', monospace;
`;

const Instructions = styled.div`
  font-size: 10px;
  text-align: center;
  color: #000080;
  font-weight: bold;
`;

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameStateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    score: 0,
    gameRunning: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GRID_SIZE = 20;
    const TILE_SIZE = canvas.width / GRID_SIZE;

    const drawGame = () => {
      const state = gameStateRef.current;

      // Clear canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = '#1a1a1a';
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

      // Draw snake
      state.snake.forEach((segment, index) => {
        if (index === 0) {
          ctx.fillStyle = '#00ff00';
        } else {
          ctx.fillStyle = '#00cc00';
        }
        ctx.fillRect(
          segment.x * TILE_SIZE + 1,
          segment.y * TILE_SIZE + 1,
          TILE_SIZE - 2,
          TILE_SIZE - 2
        );

        // Eyes on head
        if (index === 0) {
          ctx.fillStyle = '#000';
          const eyeSize = TILE_SIZE / 6;
          ctx.fillRect(
            segment.x * TILE_SIZE + TILE_SIZE / 4,
            segment.y * TILE_SIZE + TILE_SIZE / 4,
            eyeSize,
            eyeSize
          );
          ctx.fillRect(
            segment.x * TILE_SIZE + (TILE_SIZE * 3) / 4 - eyeSize,
            segment.y * TILE_SIZE + TILE_SIZE / 4,
            eyeSize,
            eyeSize
          );
        }
      });

      // Draw food
      ctx.fillStyle = '#ffff00';
      ctx.beginPath();
      ctx.arc(
        state.food.x * TILE_SIZE + TILE_SIZE / 2,
        state.food.y * TILE_SIZE + TILE_SIZE / 2,
        TILE_SIZE / 2 - 2,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw score
      ctx.fillStyle = '#00ff00';
      ctx.font = 'bold 14px Courier New';
      ctx.fillText(`SCORE: ${state.score}`, 10, 20);
    };

    const gameLoop = () => {
      const state = gameStateRef.current;

      if (!state.gameRunning) return;

      // Update direction
      state.direction = state.nextDirection;

      // Move snake
      const head = state.snake[0];
      const newHead = {
        x: head.x + state.direction.x,
        y: head.y + state.direction.y,
      };

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        state.gameRunning = false;
        setGameOver(true);
        drawGame();
        return;
      }

      // Check self collision
      if (state.snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        state.gameRunning = false;
        setGameOver(true);
        drawGame();
        return;
      }

      state.snake.unshift(newHead);

      // Check food collision
      if (newHead.x === state.food.x && newHead.y === state.food.y) {
        state.score += 10;
        setScore(state.score);
        state.food = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        };
      } else {
        state.snake.pop();
      }

      drawGame();
      setTimeout(gameLoop, 100);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const state = gameStateRef.current;
      const key = e.key.toLowerCase();

      if (key === 'arrowup' && state.direction.y === 0) {
        state.nextDirection = { x: 0, y: -1 };
      } else if (key === 'arrowdown' && state.direction.y === 0) {
        state.nextDirection = { x: 0, y: 1 };
      } else if (key === 'arrowleft' && state.direction.x === 0) {
        state.nextDirection = { x: -1, y: 0 };
      } else if (key === 'arrowright' && state.direction.x === 0) {
        state.nextDirection = { x: 1, y: 0 };
      }

      if (!state.gameRunning && key === 'enter') {
        state.snake = [{ x: 10, y: 10 }];
        state.food = { x: 15, y: 15 };
        state.direction = { x: 1, y: 0 };
        state.nextDirection = { x: 1, y: 0 };
        state.score = 0;
        state.gameRunning = true;
        setScore(0);
        setGameOver(false);
        gameLoop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <GameContainer>
      <Instructions>🐍 Snake - Use arrow keys, press ENTER to restart</Instructions>
      <Canvas ref={canvasRef} width={300} height={300} />
      <ScoreBoard>
        <ScoreItem>Score: {score}</ScoreItem>
        <ScoreItem>{gameOver ? 'Game Over' : 'Playing'}</ScoreItem>
      </ScoreBoard>
    </GameContainer>
  );
}

