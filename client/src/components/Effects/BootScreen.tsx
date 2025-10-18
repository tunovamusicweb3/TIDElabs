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
  background: #000080;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  animation: fadeOut 0.5s ease-in-out 3s forwards;

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

const BootText = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
`;

const BootLogo = styled.div`
  font-size: 48px;
  margin-bottom: 30px;
  animation: pulse 1s infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 20px;
  border: 2px solid #00ff00;
  margin-top: 20px;
  background: #000;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #00ff00, #00aa00);
    animation: progress 3s ease-in-out forwards;
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

interface BootScreenProps {
  onBootComplete?: () => void;
}

export function BootScreen({ onBootComplete }: BootScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    audioManager.playBoot();

    const timer = setTimeout(() => {
      setIsVisible(false);
      onBootComplete?.();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onBootComplete]);

  if (!isVisible) return null;

  return (
    <BootContainer>
      <BootLogo>🌊</BootLogo>
      <BootText>TIDΞlabs BIOS v1.0</BootText>
      <BootText>Initializing Web3 Consciousness...</BootText>
      <BootText>Loading Nakama Protocol...</BootText>
      <BootText>Connecting to Decentralized Realm...</BootText>
      <ProgressBar />
      <BootText style={{ marginTop: '20px', fontSize: '12px' }}>
        Press any key to continue...
      </BootText>
    </BootContainer>
  );
}

