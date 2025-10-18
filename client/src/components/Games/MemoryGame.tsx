'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
  height: 100%;
  background: #c0c0c0;
  overflow-y: auto;
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 12px;
  background: linear-gradient(135deg, #c0c0c0 0%, #dfdfdf 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
`;

const Card = styled.button<{ $isFlipped?: boolean; $isMatched?: boolean }>`
  width: 60px;
  height: 60px;
  border: 3px solid;
  border-color: ${(props) =>
    props.$isFlipped ? '#808080 #dfdfdf #dfdfdf #808080' : '#dfdfdf #808080 #808080 #dfdfdf'};
  background: ${(props) =>
    props.$isMatched
      ? 'linear-gradient(180deg, #90EE90 0%, #7CCD7C 100%)'
      : props.$isFlipped
        ? 'linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 100%)'
        : 'linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%)'};
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.5);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 12px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 11px;
`;

const StatBox = styled.div`
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  padding: 6px 12px;
`;

const ResetButton = styled.button`
  padding: 6px 16px;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  font-weight: bold;
  cursor: pointer;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  transition: all 0.1s ease;

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
    box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const emojis = ['🐠', '🐟', '🦈', '🐙', '🦑', '🦀', '🦞', '🐚'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (id: number) => {
    if (flipped.includes(id) || matched.includes(id) || flipped.length === 2) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.emoji === secondCard.emoji) {
        const newMatched = [...matched, first, second];
        setMatched(newMatched);
        setFlipped([]);

        if (newMatched.length === cards.length) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 600);
      }

      setMoves((m) => m + 1);
    }
  };

  return (
    <GameContainer>
      <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>
        🧠 Memory Game - Find matching pairs!
      </div>

      <GameBoard>
        {cards.map((card) => (
          <Card
            key={card.id}
            $isFlipped={flipped.includes(card.id) || matched.includes(card.id)}
            $isMatched={matched.includes(card.id)}
            onClick={() => handleCardClick(card.id)}
            disabled={matched.includes(card.id)}
          >
            {flipped.includes(card.id) || matched.includes(card.id) ? card.emoji : '?'}
          </Card>
        ))}
      </GameBoard>

      <Stats>
        <StatBox>Moves: {moves}</StatBox>
        <StatBox>Matched: {matched.length / 2}/8</StatBox>
        {gameWon && <StatBox style={{ background: '#90EE90' }}>🎉 WON!</StatBox>}
      </Stats>

      <ResetButton onClick={initializeGame}>New Game</ResetButton>
    </GameContainer>
  );
}

