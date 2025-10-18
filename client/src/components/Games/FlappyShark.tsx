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
  background: linear-gradient(180deg, #87ceeb 0%, #e0f6ff 100%);
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

export function FlappyShark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    typeof window !== 'undefined' ? parseInt(localStorage.getItem('flappySharkHighScore') || '0') : 0
  );

  const gameStateRef = useRef({
    bird: { x: 50, y: 150, width: 20, height: 20, velocity: 0 },
    pipes: [] as Array<{ x: number; gapY: number; width: number; gapSize: number; passed: boolean }>,
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
    const GRAVITY = 0.5;
    const PIPE_WIDTH = 60;
    const PIPE_GAP = 100;

    // Inicializar pipes
    gameState.pipes = [
      { x: 300, gapY: 100, width: PIPE_WIDTH, gapSize: PIPE_GAP, passed: false },
      { x: 500, gapY: 150, width: PIPE_WIDTH, gapSize: PIPE_GAP, passed: false },
      { x: 700, gapY: 80, width: PIPE_WIDTH, gapSize: PIPE_GAP, passed: false },
    ];

    const handleClick = () => {
      if (!gameState.gameStarted) {
        gameState.gameStarted = true;
        gameState.score = 0;
        gameState.gameOver = false;
        gameState.bird.y = 150;
        gameState.bird.velocity = 0;
        audioManager.playClick();
      } else if (gameState.gameOver) {
        gameState.gameStarted = true;
        gameState.gameOver = false;
        gameState.score = 0;
        gameState.bird.y = 150;
        gameState.bird.velocity = 0;
        gameState.pipes = [
          { x: 300, gapY: 100, width: PIPE_WIDTH, gapSize: PIPE_GAP, passed: false },
          { x: 500, gapY: 150, width: PIPE_WIDTH, gapSize: PIPE_GAP, passed: false },
          { x: 700, gapY: 80, width: PIPE_WIDTH, gapSize: PIPE_GAP, passed: false },
        ];
        setScore(0);
        audioManager.playClick();
      } else {
        gameState.bird.velocity = -8;
        audioManager.playClick();
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleClick();
      }
    };

    canvas.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyPress);

    const gameLoop = () => {
      // Limpiar canvas con gradiente
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87ceeb');
      gradient.addColorStop(1, '#e0f6ff');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (gameState.gameStarted && !gameState.gameOver) {
        // Aplicar gravedad
        gameState.bird.velocity += GRAVITY;
        gameState.bird.y += gameState.bird.velocity;

        // Mover pipes
        gameState.pipes.forEach((pipe) => {
          pipe.x -= 4;

          // Detectar si pasó el pipe
          if (!pipe.passed && pipe.x + pipe.width < gameState.bird.x) {
            pipe.passed = true;
            gameState.score++;
            setScore(gameState.score);
            audioManager.playSuccess();
          }

          // Regenerar pipes que salieron de pantalla
          if (pipe.x + pipe.width < 0) {
            pipe.x = canvas.width;
            pipe.gapY = Math.random() * (canvas.height - PIPE_GAP - 40) + 20;
            pipe.passed = false;
          }
        });

        // Detectar colisiones
        gameState.pipes.forEach((pipe) => {
          const birdLeft = gameState.bird.x;
          const birdRight = gameState.bird.x + gameState.bird.width;
          const birdTop = gameState.bird.y;
          const birdBottom = gameState.bird.y + gameState.bird.height;

          if (birdRight > pipe.x && birdLeft < pipe.x + pipe.width) {
            if (birdTop < pipe.gapY || birdBottom > pipe.gapY + pipe.gapSize) {
              gameState.gameOver = true;
              audioManager.playGameOver();
              if (gameState.score > highScore) {
                setHighScore(gameState.score);
                localStorage.setItem('flappySharkHighScore', gameState.score.toString());
              }
            }
          }
        });

        // Detectar colisiones con bordes
        if (gameState.bird.y < 0 || gameState.bird.y + gameState.bird.height > canvas.height) {
          gameState.gameOver = true;
          audioManager.playGameOver();
          if (gameState.score > highScore) {
            setHighScore(gameState.score);
            localStorage.setItem('flappySharkHighScore', gameState.score.toString());
          }
        }
      }

      // Dibujar pájaro (tiburón)
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.ellipse(gameState.bird.x + 10, gameState.bird.y + 10, 10, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ojos del tiburón
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(gameState.bird.x + 14, gameState.bird.y + 8, 2, 0, Math.PI * 2);
      ctx.fill();

      // Aleta
      ctx.fillStyle = '#FF8C00';
      ctx.beginPath();
      ctx.moveTo(gameState.bird.x + 15, gameState.bird.y + 5);
      ctx.lineTo(gameState.bird.x + 20, gameState.bird.y - 2);
      ctx.lineTo(gameState.bird.x + 18, gameState.bird.y + 10);
      ctx.fill();

      // Dibujar pipes
      ctx.fillStyle = '#228B22';
      gameState.pipes.forEach((pipe) => {
        // Tubo superior
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.gapY);
        // Tubo inferior
        ctx.fillRect(pipe.x, pipe.gapY + pipe.gapSize, pipe.width, canvas.height - (pipe.gapY + pipe.gapSize));

        // Borde de pipes
        ctx.strokeStyle = '#1a6b1a';
        ctx.lineWidth = 2;
        ctx.strokeRect(pipe.x, 0, pipe.width, pipe.gapY);
        ctx.strokeRect(pipe.x, pipe.gapY + pipe.gapSize, pipe.width, canvas.height - (pipe.gapY + pipe.gapSize));
      });

      // Dibujar score
      ctx.fillStyle = '#000';
      ctx.font = 'bold 24px Arial';
      ctx.fillText(`Score: ${gameState.score}`, 10, 30);

      if (!gameState.gameStarted) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🦈 Click to Start!', canvas.width / 2, canvas.height / 2);
        ctx.font = '14px Arial';
        ctx.fillText('Avoid the pipes!', canvas.width / 2, canvas.height / 2 + 30);
      }

      if (gameState.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`Final Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.font = '14px Arial';
        ctx.fillText('Click to Restart', canvas.width / 2, canvas.height / 2 + 50);
      }

      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      canvas.removeEventListener('click', handleClick);
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
      <Instructions>Click or Space to Jump • Avoid Pipes!</Instructions>
    </GameContainer>
  );
}

