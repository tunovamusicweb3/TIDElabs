'use client';

import { ReactNode } from 'react';
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
  box-shadow: 1px 1px 0 #fff, -1px -1px 0 #808080;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #000080 0%, #1084d7 100%);
  color: #fff;
  padding: 2px 2px;
  font-weight: bold;
  font-size: 11px;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  cursor: move;
  user-select: none;
`;

const TitleText = styled.div`
  flex: 1;
  padding: 2px 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2px;
`;

const WindowButton = styled.button`
  width: 16px;
  height: 14px;
  padding: 0;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  &:active {
    border-color: #808080 #dfdfdf #dfdfdf #808080;
  }

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
  }
`;

const Content = styled.div`
  flex: 1;
  overflow: auto;
  background: #c0c0c0;
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
      minWidth={200}
      minHeight={100}
      bounds="parent"
    >
      <WindowFrame>
        <TitleBar className="window-drag-handle">
          <TitleText>{window.title}</TitleText>
          <ButtonGroup>
            <WindowButton onClick={handleMinimize} title="Minimize">
              _
            </WindowButton>
            <WindowButton onClick={handleMaximize} title="Maximize">
              □
            </WindowButton>
            <WindowButton onClick={handleClose} title="Close">
              ✕
            </WindowButton>
          </ButtonGroup>
        </TitleBar>
        <Content>{children}</Content>
      </WindowFrame>
    </Rnd>
  );
}

