'use client';

import { ReactNode, useState } from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';
import { useWindowStore, WindowState } from '@/lib/window/windowStore';
import { audioManager } from '@/lib/audio/audioManager';

const WindowFrame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  box-shadow: 1px 1px 0 #fff, -1px -1px 0 #808080, 2px 2px 8px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 1px 1px 0 #fff, -1px -1px 0 #808080, 3px 3px 12px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    border: 1px solid;
    border-color: #dfdfdf #808080 #808080 #dfdfdf;
  }
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #000080 0%, #1084d7 100%);
  color: #fff;
  padding: 3px 3px;
  font-weight: bold;
  font-size: 12px;
  font-family: 'MS Sans Serif', 'Courier Prime', monospace;
  cursor: move;
  user-select: none;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
  min-height: 20px;
  gap: 4px;

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 2px 2px;
    min-height: 18px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 2px 2px;
    min-height: 16px;
  }
`;

const TitleText = styled.div`
  flex: 1;
  padding: 2px 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 9px;
    padding: 1px 2px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    gap: 1px;
  }
`;

const WindowButton = styled.button`
  width: 18px;
  height: 16px;
  padding: 0;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  font-size: 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.1s ease;
  flex-shrink: 0;

  &:active {
    border-color: #808080 #dfdfdf #dfdfdf #808080;
    transform: scale(0.95);
  }

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
    box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 18px;
    font-size: 12px;
    border: 1px solid;
    border-color: #dfdfdf #808080 #808080 #dfdfdf;
  }

  @media (max-width: 480px) {
    width: 22px;
    height: 20px;
    font-size: 13px;
    border: 1px solid;
    border-color: #dfdfdf #808080 #808080 #dfdfdf;
    padding: 1px;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow: auto;
  background: #c0c0c0;
  scrollbar-width: thin;
  scrollbar-color: #808080 #c0c0c0;
  padding: 8px;

  @media (max-width: 768px) {
    padding: 6px;
  }

  @media (max-width: 480px) {
    padding: 4px;
  }

  &::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }

  &::-webkit-scrollbar-track {
    background: linear-gradient(90deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
    border: 1px solid;
    border-color: #dfdfdf #808080 #808080 #dfdfdf;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
    border: 1px solid;
    border-color: #dfdfdf #808080 #808080 #dfdfdf;

    &:hover {
      background: linear-gradient(90deg, #e0e0e0 0%, #d0d0d0 50%, #909090 100%);
    }
  }

  @media (max-width: 480px) {
    &::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }
  }
`;

interface WindowProps {
  window: WindowState;
  children: ReactNode;
}

export function Window({ window, children }: WindowProps) {
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const maximizeWindow = useWindowStore((state) => state.maximizeWindow);
  const restoreWindow = useWindowStore((state) => state.restoreWindow);
  const updateWindowPosition = useWindowStore((state) => state.updateWindowPosition);
  const updateWindowSize = useWindowStore((state) => state.updateWindowSize);
  const focusWindow = useWindowStore((state) => state.focusWindow);

  const [lastClickTime, setLastClickTime] = useState(0);
  const [isDoubleClick, setIsDoubleClick] = useState(false);

  const handleClose = () => {
    audioManager.playClick();
    closeWindow(window.id);
  };

  const handleMinimize = () => {
    audioManager.playClick();
    minimizeWindow(window.id);
  };

  const handleMaximize = () => {
    audioManager.playClick();
    if (window.isMaximized) {
      restoreWindow(window.id);
    } else {
      maximizeWindow(window.id);
    }
  };

  // Doble click en titlebar para maximizar/minimizar
  const handleTitleBarClick = () => {
    const now = Date.now();
    if (now - lastClickTime < 300) {
      setIsDoubleClick(true);
      handleMaximize();
      setTimeout(() => setIsDoubleClick(false), 300);
    }
    setLastClickTime(now);
  };

  if (!window.isOpen) return null;

  return (
    <Rnd
      default={{
        x: window.x,
        y: window.y,
        width: window.width,
        height: window.height,
      }}
      onDragStop={(e, d) => {
        updateWindowPosition(window.id, d.x, d.y);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateWindowSize(window.id, ref.offsetWidth, ref.offsetHeight);
        updateWindowPosition(window.id, position.x, position.y);
      }}
      style={{ zIndex: window.zIndex }}
      onMouseDown={() => focusWindow(window.id)}
      dragHandleClassName="window-drag-handle"
      minWidth={250}
      minHeight={150}
      bounds="parent"
    >
      <WindowFrame>
        <TitleBar 
          className="window-drag-handle"
          onClick={handleTitleBarClick}
          style={{ cursor: 'move' }}
        >
          <TitleText>{window.title}</TitleText>
          <ButtonGroup>
            <WindowButton 
              onClick={(e) => {
                e.stopPropagation();
                handleMinimize();
              }} 
              title="Minimize"
              aria-label="Minimize"
            >
              _
            </WindowButton>
            <WindowButton 
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }} 
              title="Maximize"
              aria-label="Maximize"
            >
              □
            </WindowButton>
            <WindowButton 
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }} 
              title="Close"
              aria-label="Close"
            >
              ✕
            </WindowButton>
          </ButtonGroup>
        </TitleBar>
        <Content>{children}</Content>
      </WindowFrame>
    </Rnd>
  );
}

