'use client';

import styled from 'styled-components';
import { audioManager } from '@/lib/audio/audioManager';

const IconContainer = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 2px;
  background: ${(props) => (props.$isSelected ? 'rgba(0, 0, 128, 0.4)' : 'transparent')};
  border: ${(props) => (props.$isSelected ? '1px dashed #000080' : '1px solid transparent')};
  user-select: none;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    background: rgba(0, 0, 128, 0.25);
    border: 1px dashed rgba(0, 0, 128, 0.7);
  }

  &:active {
    background: rgba(0, 0, 128, 0.35);
    transform: scale(0.98);
  }
`;

const IconImage = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  background: linear-gradient(135deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  border-radius: 2px;
  transition: all 0.2s ease;
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));

  ${IconContainer}:hover & {
    transform: scale(1.08);
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
  }

  ${IconContainer}:active & {
    transform: scale(0.95);
  }
`;

const IconLabel = styled.div`
  font-size: 11px;
  text-align: center;
  color: #000;
  font-weight: 500;
  max-width: 60px;
  word-wrap: break-word;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.9);
  line-height: 1.3;
  transition: color 0.2s ease;

  ${IconContainer}:hover & {
    color: #000080;
    font-weight: 600;
  }
`;

interface DesktopIconProps {
  id: string;
  label: string;
  emoji: string;
  onDoubleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  isSelected?: boolean;
  onSelect?: () => void;
  title?: string;
}

export function DesktopIcon({
  id,
  label,
  emoji,
  onDoubleClick,
  isSelected,
  onSelect,
}: DesktopIconProps) {
  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    audioManager.playWindowOpen();
    onDoubleClick(event);
  };

  const handleClick = () => {
    audioManager.playClick();
    onSelect?.();
  };

  return (
    <IconContainer
      id={id}
      $isSelected={isSelected}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      title={label}
    >
      <IconImage>{emoji}</IconImage>
      <IconLabel>{label}</IconLabel>
    </IconContainer>
  );
}

