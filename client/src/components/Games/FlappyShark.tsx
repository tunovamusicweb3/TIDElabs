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
  background: linear-gradient(180deg, #87ceeb 0%, #e0f6ff 100%);
  display: block;
  cursor: pointer;
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

export function FlappyShark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameStateRef = useRef({
    birdY: 150,
    birdVelocity: 0,
    pipes: [] as Array<{ x: number; gapY: number }>,
    score: 0,
    gameRunning: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GRAVITY = 0.5;
    const JUMP_STRENGTH = -12;
    const PIPE_WIDTH = 60;
    const PIPE_GAP = 120;
    const PIPE_SPACING = 200;
    const BIRD_SIZE = 20;

    let lastPipeX = 300;

    const drawBird = (x: number, y: number) => {
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(x, y, BIRD_SIZE, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFA500';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Eyes
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(x + 6, y - 5, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPipe = (x: number, gapY: number) => {
      const topHeight = gapY;
      const bottomY = gapY + PIPE_GAP;

      // Top pipe
      ctx.fillStyle = '#228B22';
      ctx.fillRect(x, 0, PIPE_WIDTH, topHeight);
      ctx.strokeStyle = '#1a6b1a';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, 0, PIPE_WIDTH, topHeight);

      // Bottom pipe
      ctx.fillRect(x, bottomY, PIPE_WIDTH, canvas.height - bottomY);
      ctx.strokeRect(x, bottomY, PIPE_WIDTH, canvas.height - bottomY);
    };

    const checkCollision = (birdX: number, birdY: number): boolean => {
      // Boundary collision
      if (birdY - BIRD_SIZE < 0 || birdY + BIRD_SIZE > canvas.height) {
        return true;
      }

      // Pipe collision
      for (let pipe of gameStateRef.current.pipes) {
        if (
          birdX + BIRD_SIZE > pipe.x &&
          birdX - BIRD_SIZE < pipe.x + PIPE_WIDTH
        ) {
          if (
            birdY - BIRD_SIZE < pipe.gapY ||
            birdY + BIRD_SIZE > pipe.gapY + PIPE_GAP
          ) {
            return true;
          }
        }
      }

      return false;
    };

    const gameLoop = () => {
      const state = gameStateRef.current;

      if (!state.gameRunning) return;

      // Update bird
      state.birdVelocity += GRAVITY;
      state.birdY += state.birdVelocity;

      // Generate pipes
      if (lastPipeX < canvas.width - PIPE_SPACING) {
        const gapY = Math.random() * (canvas.height - PIPE_GAP - 100) + 50;
        state.pipes.push({ x: lastPipeX + PIPE_SPACING, gapY });
        lastPipeX += PIPE_SPACING;
      }

      // Update pipes
      state.pipes = state.pipes.filter((pipe) => {
        pipe.x -= 5;
        if (pipe.x + PIPE_WIDTH < 0) {
          state.score++;
          setScore(state.score);
          return false;
        }
        return true;
      });

      // Check collision
      if (checkCollision(100, state.birdY)) {
        state.gameRunning = false;
        setGameOver(true);
        return;
      }

      // Draw
      ctx.fillStyle = '#87ceeb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient sky
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87ceeb');
      gradient.addColorStop(1, '#e0f6ff');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw pipes
      state.pipes.forEach((pipe) => drawPipe(pipe.x, pipe.gapY));

      // Draw bird
      drawBird(100, state.birdY);

      // Draw score
      ctx.fillStyle = '#000080';
      ctx.font = 'bold 20px Arial';
      ctx.fillText(`Score: ${state.score}`, 10, 30);

      requestAnimationFrame(gameLoop);
    };

    const handleClick = () => {
      const state = gameStateRef.current;
      if (!state.gameRunning) {
        // Reset game
        state.birdY = 150;
        state.birdVelocity = 0;
        state.pipes = [];
        state.score = 0;
        state.gameRunning = true;
        setScore(0);
        setGameOver(false);
        lastPipeX = 300;
        gameLoop();
      } else {
        state.birdVelocity = JUMP_STRENGTH;
      }
    };

    canvas.addEventListener('click', handleClick);
    gameLoop();

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <GameContainer>
      <Instructions>
        🌊 FlappyShark - Click to jump, avoid pipes! {gameOver && '- GAME OVER!'}
      </Instructions>
      <Canvas ref={canvasRef} width={400} height={300} />
      <ScoreBoard>
        <ScoreItem>Score: {score}</ScoreItem>
        <ScoreItem>{gameOver ? 'Game Over' : 'Playing'}</ScoreItem>
      </ScoreBoard>
    </GameContainer>
  );
}

