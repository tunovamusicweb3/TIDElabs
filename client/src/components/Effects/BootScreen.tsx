'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { audioManager } from '@/lib/audio/audioManager';

const BootContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #000080 0%, #00008b 50%, #000080 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  font-family: 'Courier New', monospace;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 100, 255, 0.3);
  animation: fadeOut 0.8s ease-in-out 3.2s forwards;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.03),
      rgba(0, 0, 0, 0.03) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    animation: scanlines 0.1s linear infinite;
    z-index: 1;
  }

  @keyframes scanlines {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(2px);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      pointer-events: none;
    }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const BootLogo = styled.div`
  font-size: 64px;
  margin-bottom: 40px;
  animation: bootPulse 1.2s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(0, 255, 0, 0.5));

  @keyframes bootPulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.05);
    }
  }
`;

const BootText = styled.div<{ $delay?: number }>`
  font-size: 14px;
  font-weight: bold;
  margin: 8px 0;
  letter-spacing: 2px;
  opacity: 0;
  animation: typewriter 0.5s ease-out forwards;
  animation-delay: ${(props) => props.$delay || 0}s;

  @keyframes typewriter {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const ProgressBar = styled.div`
  width: 320px;
  height: 24px;
  border: 2px solid #00ff00;
  margin-top: 30px;
  background: #000;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3), inset 0 0 10px rgba(0, 255, 0, 0.1);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #00ff00 0%, #00aa00 50%, #00ff00 100%);
    animation: progress 3s ease-in-out forwards;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
  }

  @keyframes progress {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

const PercentText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #00ff00;
  z-index: 10;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
`;

const ContinueText = styled(BootText)`
  margin-top: 30px;
  font-size: 12px;
  animation: blink 1s infinite;

  @keyframes blink {
    0%, 49% {
      opacity: 1;
    }
    50%, 100% {
      opacity: 0.3;
    }
  }
`;

interface BootScreenProps {
  onBootComplete?: () => void;
}

export function BootScreen({ onBootComplete }: BootScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    audioManager.playBoot();

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 30, 95));
    }, 300);

    const timer = setTimeout(() => {
      setProgress(100);
      setIsVisible(false);
      onBootComplete?.();
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onBootComplete]);

  if (!isVisible) return null;

  return (
    <BootContainer>
      <Content>
        <BootLogo>🌊</BootLogo>

        <BootText $delay={0.2}>TIDΞlabs BIOS v1.0</BootText>
        <BootText $delay={0.6}>━━━━━━━━━━━━━━━━━━━━━━━━━━━</BootText>

        <BootText $delay={1.0}>Initializing Web3 Consciousness...</BootText>
        <BootText $delay={1.4}>Loading Nakama Protocol...</BootText>
        <BootText $delay={1.8}>Connecting to Decentralized Realm...</BootText>
        <BootText $delay={2.2}>Activating UngaBunga AI...</BootText>

        <ProgressBar>
          <PercentText>{Math.floor(progress)}%</PercentText>
        </ProgressBar>

        <ContinueText $delay={2.8}>Press any key to continue...</ContinueText>
      </Content>
    </BootContainer>
  );
}

