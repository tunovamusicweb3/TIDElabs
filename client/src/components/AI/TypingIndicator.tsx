import styled from 'styled-components';

const TypingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: #dfdfdf;
  border-radius: 4px;
  border: 1px solid #808080;
  width: fit-content;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  background: #000;
  border-radius: 50%;
  animation: bounce 1.4s infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    0%, 80%, 100% {
      transform: translateY(0);
      opacity: 0.5;
    }
    40% {
      transform: translateY(-8px);
      opacity: 1;
    }
  }
`;

const Label = styled.span`
  font-size: 10px;
  color: #666;
  font-style: italic;
  margin-right: 4px;
`;

interface TypingIndicatorProps {
  userName?: string;
}

export function TypingIndicator({ userName = 'UngaBunga' }: TypingIndicatorProps) {
  return (
    <TypingContainer>
      <Label>{userName} está escribiendo</Label>
      <Dot />
      <Dot />
      <Dot />
    </TypingContainer>
  );
}

