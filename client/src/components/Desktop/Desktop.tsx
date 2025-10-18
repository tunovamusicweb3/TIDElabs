'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useWindowStore } from '@/lib/window/windowStore';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { WindowManager } from '../Windows/WindowManager';
import { CRTScanlines } from '../Effects/CRTScanlines';
import { VHSNoise } from '../Effects/VHSNoise';
import { BootScreen } from '../Effects/BootScreen';
import { UngaBungaChat } from '../AI/UngaBungaChat';
import { FloatingEmojisManager } from '../Effects/FloatingEmojis';
import { UngaBungaAvatar } from '../AI/UngaBungaAvatar';

const DesktopContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #0a5f7f 0%, #1a8faa 50%, #0d4f6f 100%);
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(26, 143, 170, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(10, 95, 127, 0.3) 0%, transparent 50%),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)" /></svg>');
  background-attachment: fixed;
  overflow: hidden;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.1) 100%);
    pointer-events: none;
    z-index: 1;
  }
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 90px);
  gap: 20px;
  padding: 24px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 28px);
  overflow: hidden;
  pointer-events: none;
  z-index: 2;

  > * {
    pointer-events: auto;
  }
`;

const FloatingEmojisContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
`;

const FloatingEmoji = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  font-size: 32px;
  animation: float-up 2s ease-out forwards;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 101;

  @keyframes float-up {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-100px) scale(0.5);
    }
  }
`;

const icons = [
  { id: 'manifiesto', label: 'Manifiesto', emoji: '📄', color: '#FF6B6B' },
  { id: 'proyectos', label: 'Proyectos', emoji: '🚀', color: '#4ECDC4' },
  { id: 'tripulacion', label: 'Tripulación', emoji: '👥', color: '#FFE66D' },
  { id: 'donativos', label: 'Donativos', emoji: '💰', color: '#95E1D3' },
  { id: 'waitlist', label: 'Waitlist', emoji: '📋', color: '#A8E6CF' },
  { id: 'roadmap', label: 'Roadmap', emoji: '🗺️', color: '#FFD3B6' },
  { id: 'juegos', label: 'Juegos', emoji: '🎮', color: '#FFAAA5' },
  { id: 'telegram', label: 'Telegram', emoji: '💬', color: '#FF8B94' },
];

interface DesktopProps {
  showBootScreen?: boolean;
}

export function Desktop({ showBootScreen = true }: DesktopProps) {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [showBoot, setShowBoot] = useState(showBootScreen);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: string; emoji: string; x: number; y: number }>>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const openWindow = useWindowStore((state) => state.openWindow);

  useEffect(() => {
    // Auto-open first window for demo
    const timer = setTimeout(() => {
      openWindow('manifiesto', 'Manifiesto');
    }, 4000);
    return () => clearTimeout(timer);
  }, [openWindow]);

  const handleIconDoubleClick = (id: string, label: string, event: React.MouseEvent) => {
    openWindow(id, label);
    
    // Crear emoji flotante
    const icon = icons.find(i => i.id === id);
    const emoji = icon?.emoji || '✨';
    const newEmoji = {
      id: `emoji-${Date.now()}`,
      emoji,
      x: event.clientX,
      y: event.clientY,
    };
    
    setFloatingEmojis((prev) => [...prev, newEmoji]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
    }, 2000);

    setSelectedIcon(id);
  };

  const handleBootComplete = () => {
    setShowBoot(false);
  };

  return (
    <DesktopContainer>
      {showBoot && <BootScreen onBootComplete={handleBootComplete} />}
      
      <CRTScanlines />
      <VHSNoise />

      <IconGrid>
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            label={icon.label}
            emoji={icon.emoji}
            isSelected={selectedIcon === icon.id}
            onDoubleClick={(e) => handleIconDoubleClick(icon.id, icon.label, e)}
          />
        ))}
      </IconGrid>

      <FloatingEmojisContainer>
        {floatingEmojis.map((item) => (
          <FloatingEmoji key={item.id} $x={item.x} $y={item.y}>
            {item.emoji}
          </FloatingEmoji>
        ))}
      </FloatingEmojisContainer>

      <WindowManager />
      <UngaBungaAvatar onChatClick={() => setChatOpen(!chatOpen)} />
      {chatOpen && <UngaBungaChat />}
      <Taskbar onStartClick={() => setStartMenuOpen(!startMenuOpen)} />
      {startMenuOpen && <StartMenu isOpen={startMenuOpen} onClose={() => setStartMenuOpen(false)} />}
    </DesktopContainer>
  );
}

