'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { FlappyShark } from '@/components/Games/FlappyShark';
import { MemoryGame } from '@/components/Games/MemoryGame';
import { SnakeGame } from '@/components/Games/SnakeGame';

const Content = styled.div`
  padding: 0;
  overflow-y: auto;
  height: 100%;
  background: #c0c0c0;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  display: flex;
  flex-direction: column;
`;

const MenuContainer = styled.div`
  padding: 16px;
  overflow-y: auto;
  flex: 1;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #000080;
  text-align: center;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.8);
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
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
    transform: translateY(-2px);
    box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.5);
  }

  &:active {
    border-color: #808080 #dfdfdf #dfdfdf #808080;
    transform: scale(0.98);
  }
`;

const GameEmoji = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
  transition: transform 0.2s ease;

  ${GameCard}:hover & {
    transform: scale(1.1);
  }
`;

const GameName = styled.div`
  font-weight: bold;
  font-size: 11px;
  color: #000080;
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
  background: linear-gradient(135deg, #c0c0c0 0%, #dfdfdf 100%);
  margin-top: 12px;
`;

const ScoreTitle = styled.h3`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #000080;
  border-bottom: 2px solid #000080;
  padding-bottom: 4px;
`;

const ScoreItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px dotted #808080;
  font-size: 10px;

  &:last-child {
    border-bottom: none;
  }
`;

const BackButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  cursor: pointer;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  font-weight: bold;
  transition: all 0.1s ease;
  margin: 12px;

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
    box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: scale(0.98);
    border-color: #808080 #dfdfdf #dfdfdf #808080;
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
  {
    id: 'coming',
    name: 'Próximamente',
    emoji: '🎮',
    description: 'Más juegos retro',
  },
];

const topScores = [
  { name: 'Web3Sh4rK', score: 9999, game: 'FlappyShark' },
  { name: 'UngaBunga', score: 8765, game: 'Memory' },
  { name: 'Nakama #42', score: 7654, game: 'Snake' },
];

export function JuegosWindow() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleGameClick = (gameId: string) => {
    if (gameId !== 'coming') {
      setSelectedGame(gameId);
    }
  };

  return (
    <Content>
      {selectedGame ? (
        <>
          {selectedGame === 'flappy' && <FlappyShark />}
          {selectedGame === 'memory' && <MemoryGame />}
          {selectedGame === 'snake' && <SnakeGame />}
          <BackButton onClick={() => setSelectedGame(null)}>← Volver al Menú</BackButton>
        </>
      ) : (
        <MenuContainer>
          <Title>🎮 ARCADE RETRO NAKAMA</Title>

          <GameGrid>
            {games.map((game) => (
              <GameCard
                key={game.id}
                onClick={() => handleGameClick(game.id)}
                disabled={game.id === 'coming'}
                style={{ opacity: game.id === 'coming' ? 0.6 : 1 }}
              >
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
        </MenuContainer>
      )}
    </Content>
  );
}

