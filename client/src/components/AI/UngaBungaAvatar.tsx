import styled from 'styled-components';
import { useState } from 'react';

const AvatarContainer = styled.div<{ $isMinimized: boolean }>`
  position: fixed;
  bottom: ${(props) => (props.$isMinimized ? '28px' : '20px')};
  right: 20px;
  z-index: 9998;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const AvatarBody = styled.div`
  width: 60px;
  height: 80px;
  background: linear-gradient(135deg, #8b6f47 0%, #a0826d 100%);
  border-radius: 50% 50% 40% 40%;
  position: relative;
  border: 2px solid #5d4e37;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: idle-bounce 2s ease-in-out infinite;

  @keyframes idle-bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
  }
`;

const Head = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #a0826d 0%, #8b6f47 100%);
  border-radius: 50%;
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid #5d4e37;
`;

const Eyes = styled.div`
  display: flex;
  gap: 12px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  justify-content: center;
`;

const Eye = styled.div`
  width: 6px;
  height: 6px;
  background: #000;
  border-radius: 50%;
  animation: blink 3s infinite;

  @keyframes blink {
    0%, 90%, 100% {
      height: 6px;
    }
    95% {
      height: 2px;
    }
  }
`;

const Mouth = styled.div`
  width: 12px;
  height: 6px;
  background: #5d4e37;
  border-radius: 0 0 12px 12px;
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
`;

const Arms = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  top: 20px;
  width: 100%;
  padding: 0 4px;
  justify-content: space-between;
`;

const Arm = styled.div`
  width: 12px;
  height: 30px;
  background: linear-gradient(90deg, #8b6f47 0%, #a0826d 100%);
  border-radius: 6px;
  border: 1px solid #5d4e37;
  animation: arm-wave 1.5s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  @keyframes arm-wave {
    0%, 100% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(20deg);
    }
  }
`;

const Club = styled.div`
  width: 8px;
  height: 12px;
  background: #654321;
  position: absolute;
  bottom: -8px;
  left: 2px;
  border-radius: 2px;
`;

const Legs = styled.div`
  display: flex;
  gap: 6px;
  position: absolute;
  bottom: 4px;
  width: 100%;
  padding: 0 8px;
  justify-content: center;
`;

const Leg = styled.div`
  width: 10px;
  height: 16px;
  background: linear-gradient(90deg, #7a5c3d 0%, #8b6f47 100%);
  border-radius: 4px;
  border: 1px solid #5d4e37;
`;

const StatusBubble = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(180deg, #000080 0%, #1084d7 100%);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 9px;
  white-space: nowrap;
  border: 1px solid #000080;
  opacity: 0;
  animation: bubble-appear 0.3s ease forwards;
  pointer-events: none;

  @keyframes bubble-appear {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #000080;
  }
`;

interface UngaBungaAvatarProps {
  onChatClick?: () => void;
  isMinimized?: boolean;
}

export function UngaBungaAvatar({
  onChatClick,
  isMinimized = false,
}: UngaBungaAvatarProps) {
  const [showStatus, setShowStatus] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
    onChatClick?.();
  };

  const handleHover = () => {
    setShowStatus(true);
  };

  const handleHoverEnd = () => {
    setShowStatus(false);
  };

  return (
    <AvatarContainer
      $isMinimized={isMinimized}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      title="¡Haz clic para hablar con UngaBunga!"
    >
      <AvatarBody>
        <Head>
          <Eyes>
            <Eye />
            <Eye />
          </Eyes>
          <Mouth />
        </Head>

        <Arms>
          <Arm>
            <Club />
          </Arm>
          <Arm>
            <Club />
          </Arm>
        </Arms>

        <Legs>
          <Leg />
          <Leg />
        </Legs>

        {showStatus && (
          <StatusBubble>
            💬 ¡Hablemos!
          </StatusBubble>
        )}
      </AvatarBody>
    </AvatarContainer>
  );
}

