import styled from 'styled-components';

const IconContainer = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;
  border: 2px dashed transparent;

  ${(props) =>
    props.$isSelected &&
    `
    border-color: #000080;
    background: rgba(0, 0, 128, 0.15);
  `}

  &:hover {
    border-color: #000080;
    background: rgba(0, 0, 128, 0.2);
    transform: scale(1.08);
    filter: drop-shadow(0 4px 12px rgba(0, 0, 128, 0.3));
  }

  &:active {
    transform: scale(0.95);
  }
`;

const IconEmoji = styled.div`
  font-size: 48px;
  line-height: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));

  ${IconContainer}:hover & {
    transform: scale(1.15) rotate(-5deg);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 128, 0.4));
  }
`;

const IconLabel = styled.div`
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  color: #000;
  word-break: break-word;
  max-width: 80px;
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;

  ${IconContainer}:hover & {
    color: #000080;
    font-weight: 600;
    text-shadow: 0 1px 3px rgba(0, 0, 128, 0.3);
  }
`;

interface DesktopIconProps {
  id: string;
  label: string;
  emoji: string;
  isSelected?: boolean;
  onDoubleClick?: (event: React.MouseEvent) => void;
}

export function DesktopIcon({
  id,
  label,
  emoji,
  isSelected = false,
  onDoubleClick,
}: DesktopIconProps) {
  return (
    <IconContainer
      $isSelected={isSelected}
      onDoubleClick={onDoubleClick}
      title={`Doble clic para abrir ${label}`}
    >
      <IconEmoji>{emoji}</IconEmoji>
      <IconLabel>{label}</IconLabel>
    </IconContainer>
  );
}
