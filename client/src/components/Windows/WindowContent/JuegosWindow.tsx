'use client';

import { useState } from 'react';
import styled from 'styled-components';

const Content = styled.div`
  padding: 16px;
  overflow-y: auto;
  height: 100%;
  background: #c0c0c0;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #000080;
  text-align: center;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
`;

const GameCard = styled.button`
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  padding: 12px;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  cursor: pointer;
  text-align: center;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
  }

  &:active {
    border-color: #808080 #dfdfdf #dfdfdf #808080;
  }
`;

const GameEmoji = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
`;

const GameName = styled.div`
  font-weight: bold;
  font-size: 11px;
`;

const GameDescription = styled.div`
  font-size: 9px;
  color: #333;
  margin-top: 4px;
`;

const ScoreBoardBox = styled.div`
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  padding: 12px;
  background: #c0c0c0;
  margin-top: 12px;
`;

const ScoreTitle = styled.h3`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #000080;
`;

const ScoreItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-bottom: 1px dotted #808080;
  font-size: 10px;

  &:last-child {
    border-bottom: none;
  }
`;

const games = [
  {
    id: 'flappy',
    name: 'FlappyShark',
    emoji: '🦈',
    description: 'Evita los obstáculos',
  },
  {
    id: 'runner',
    name: 'UngaBunga Runner',
    emoji: '🏃',
    description: 'Corre por el código',
  },
  {
    id: 'memory',
    name: 'Memory Nakama',
    emoji: '🧠',
    description: 'Encuentra los pares',
  },
  {
    id: 'snake',
    name: 'Crypto Snake',
    emoji: '🐍',
    description: 'Come los tokens',
  },
];

const topScores = [
  { name: 'Web3Sh4rK', score: 9999, game: 'FlappyShark' },
  { name: 'UngaBunga', score: 8765, game: 'Runner' },
  { name: 'Nakama #42', score: 7654, game: 'Memory' },
];

export function JuegosWindow() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleGameClick = (gameId: string) => {
    setSelectedGame(gameId);
    // En una implementación real, aquí se cargaría el juego
  };

  return (
    <Content>
      <Title>🎮 ARCADE RETRO</Title>

      {selectedGame ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '12px' }}>
            El juego "{games.find((g) => g.id === selectedGame)?.name}" se cargaría aquí.
          </p>
          <button
            onClick={() => setSelectedGame(null)}
            style={{
              padding: '6px 12px',
              background: 'linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%)',
              border: '2px solid',
              borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
              cursor: 'pointer',
              fontFamily: 'MS Sans Serif',
              fontSize: '11px',
            }}
          >
            ← Volver
          </button>
        </div>
      ) : (
        <>
          <GameGrid>
            {games.map((game) => (
              <GameCard key={game.id} onClick={() => handleGameClick(game.id)}>
                <GameEmoji>{game.emoji}</GameEmoji>
                <GameName>{game.name}</GameName>
                <GameDescription>{game.description}</GameDescription>
              </GameCard>
            ))}
          </GameGrid>

          <ScoreBoardBox>
            <ScoreTitle>🏆 TOP SCORES</ScoreTitle>
            {topScores.map((score, idx) => (
              <ScoreItem key={idx}>
                <span>
                  {idx + 1}. {score.name}
                </span>
                <strong>{score.score}</strong>
              </ScoreItem>
            ))}
          </ScoreBoardBox>
        </>
      )}
    </Content>
  );
}

