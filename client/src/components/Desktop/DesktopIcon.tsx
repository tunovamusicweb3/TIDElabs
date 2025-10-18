'use client';

import styled from 'styled-components';
import { audioManager } from '@/lib/audio/audioManager';

const IconContainer = styled.div<{ isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  background: ${(props) => (props.isSelected ? 'rgba(0, 0, 128, 0.3)' : 'transparent')};
  border: ${(props) => (props.isSelected ? '1px dotted #000080' : 'none')};
  user-select: none;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 128, 0.2);
  }

  &:active {
    background: rgba(0, 0, 128, 0.4);
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
`;

const IconLabel = styled.div`
  font-size: 11px;
  text-align: center;
  color: #000;
  font-weight: bold;
  max-width: 60px;
  word-wrap: break-word;
  text-shadow: 1px 1px 0 #fff;
`;

interface DesktopIconProps {
  id: string;
  label: string;
  emoji: string;
  onDoubleClick: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function DesktopIcon({
  id,
  label,
  emoji,
  onDoubleClick,
  isSelected,
  onSelect,
}: DesktopIconProps) {
  const handleDoubleClick = () => {
    audioManager.playWindowOpen();
    onDoubleClick();
  };

  const handleClick = () => {
    audioManager.playClick();
    onSelect?.();
  };

  return (
    <IconContainer
      id={id}
      isSelected={isSelected}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      <IconImage>{emoji}</IconImage>
      <IconLabel>{label}</IconLabel>
    </IconContainer>
  );
}

