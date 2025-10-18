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
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)" /></svg>');
  overflow: hidden;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  position: relative;
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 80px);
  gap: 16px;
  padding: 16px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 28px);
  overflow: hidden;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

const icons = [
  { id: 'manifiesto', label: 'Manifiesto', emoji: '📄' },
  { id: 'proyectos', label: 'Proyectos', emoji: '🚀' },
  { id: 'tripulacion', label: 'Tripulación', emoji: '👥' },
  { id: 'donativos', label: 'Donativos', emoji: '💰' },
  { id: 'waitlist', label: 'Waitlist', emoji: '📋' },
  { id: 'roadmap', label: 'Roadmap', emoji: '🗺️' },
  { id: 'juegos', label: 'Juegos', emoji: '🎮' },
  { id: 'telegram', label: 'Telegram', emoji: '💬' },
];

interface DesktopProps {
  showBootScreen?: boolean;
}

export function Desktop({ showBootScreen = true }: DesktopProps) {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [showBoot, setShowBoot] = useState(showBootScreen);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: string; emoji: string; x: number; y: number }>>([])
  const [chatOpen, setChatOpen] = useState(false);
  const openWindow = useWindowStore((state) => state.openWindow);

  useEffect(() => {
    // Auto-open first window for demo
    setTimeout(() => {
      openWindow('manifiesto', 'Manifiesto');
    }, 4000);
  }, [openWindow]);

  const handleIconDoubleClick = (id: string, label: string, event: React.MouseEvent) => {
    openWindow(id, label);
    
    // Crear emoji flotante
    const emoji = icons.find(i => i.id === id)?.emoji || '✨';
    const newEmoji = {
      id: `emoji-${Date.now()}-${Math.random()}`,
      emoji,
      x: event.clientX,
      y: event.clientY,
    };
    setFloatingEmojis((prev) => [...prev, newEmoji]);
  };

  const handleRemoveEmoji = (id: string) => {
    setFloatingEmojis((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <>
      {showBoot && <BootScreen onBootComplete={() => setShowBoot(false)} />}

      <DesktopContainer onClick={() => setStartMenuOpen(false)}>
        <IconGrid>
          {icons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              label={icon.label}
              emoji={icon.emoji}
              isSelected={selectedIcon === icon.id}
              onSelect={() => setSelectedIcon(icon.id)}
              onDoubleClick={(e) => handleIconDoubleClick(icon.id, icon.label, e)}
            />
          ))}
        </IconGrid>

        <WindowManager />
        {chatOpen && <UngaBungaChat />}
        <FloatingEmojisManager emojis={floatingEmojis} onRemove={handleRemoveEmoji} />
        <UngaBungaAvatar onChatClick={() => setChatOpen(!chatOpen)} isMinimized={chatOpen} />

        <Taskbar onStartClick={() => setStartMenuOpen(!startMenuOpen)} />
        <StartMenu isOpen={startMenuOpen} onClose={() => setStartMenuOpen(false)} />

        <CRTScanlines />
        <VHSNoise />
      </DesktopContainer>
    </>
  );
}

