import styled from 'styled-components';
import { useState, useEffect } from 'react';

const FloatingEmoji = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  font-size: 24px;
  pointer-events: none;
  z-index: 9999;
  animation: float-up 2s ease-out forwards;

  @keyframes float-up {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-100px) scale(0.5) rotate(360deg);
    }
  }
`;

interface FloatingEmojiProps {
  emoji: string;
  x: number;
  y: number;
  id: string;
  onComplete?: () => void;
}

export function FloatingEmojiComponent({
  emoji,
  x,
  y,
  id,
  onComplete,
}: FloatingEmojiProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [id, onComplete]);

  return <FloatingEmoji $x={x} $y={y}>{emoji}</FloatingEmoji>;
}

interface FloatingEmojisManagerProps {
  emojis: Array<{ id: string; emoji: string; x: number; y: number }>;
  onRemove: (id: string) => void;
}

export function FloatingEmojisManager({ emojis, onRemove }: FloatingEmojisManagerProps) {
  return (
    <>
      {emojis.map((item) => (
        <FloatingEmojiComponent
          key={item.id}
          emoji={item.emoji}
          x={item.x}
          y={item.y}
          id={item.id}
          onComplete={() => onRemove(item.id)}
        />
      ))}
    </>
  );
}

