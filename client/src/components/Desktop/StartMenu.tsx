'use client';

import styled from 'styled-components';
import { useWindowStore } from '@/lib/window/windowStore';

const MenuContainer = styled.div`
  position: fixed;
  bottom: 28px;
  left: 0;
  width: 200px;
  background: linear-gradient(90deg, #000080 0%, #1084d7 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  z-index: 999;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  color: #fff;
`;

const MenuItem = styled.div`
  padding: 4px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:active {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  margin: 2px 0;
`;

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StartMenu({ isOpen, onClose }: StartMenuProps) {
  const openWindow = useWindowStore((state) => state.openWindow);

  const menuItems = [
    { label: '📄 Manifiesto', id: 'manifiesto' },
    { label: '🚀 Proyectos', id: 'proyectos' },
    { label: '👥 Tripulación', id: 'tripulacion' },
    { label: '💰 Donativos', id: 'donativos' },
    { label: '📋 Waitlist', id: 'waitlist' },
    { label: '🗺️ Roadmap', id: 'roadmap' },
    { label: '🎮 Juegos', id: 'juegos' },
    { label: '💬 Telegram', id: 'telegram' },
  ];

  const handleMenuClick = (id: string, label: string) => {
    openWindow(id, label.split(' ')[1]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <MenuContainer onClick={onClose}>
      {menuItems.map((item, idx) => (
        <div key={item.id}>
          <MenuItem onClick={() => handleMenuClick(item.id, item.label)}>
            {item.label}
          </MenuItem>
          {idx === 3 && <MenuDivider />}
        </div>
      ))}
    </MenuContainer>
  );
}

