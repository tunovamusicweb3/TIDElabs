'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWindowStore } from '@/lib/window/windowStore';

const TaskbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 28px;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border-top: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  display: flex;
  align-items: center;
  padding: 2px;
  gap: 2px;
  z-index: 1000;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
`;

const StartButton = styled.button`
  padding: 2px 8px;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;

  &:active {
    border-color: #808080 #dfdfdf #dfdfdf #808080;
  }

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
  }
`;

const TaskbarSpacer = styled.div`
  flex: 1;
`;

const Clock = styled.div`
  padding: 2px 8px;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #808080 #dfdfdf #dfdfdf #808080;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  min-width: 50px;
  text-align: center;
`;

const TaskButton = styled.button<{ isActive?: boolean }>`
  padding: 2px 8px;
  background: ${(props) =>
    props.isActive
      ? 'linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%)'
      : 'linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%)'};
  border: 2px solid;
  border-color: ${(props) =>
    props.isActive
      ? '#808080 #dfdfdf #dfdfdf #808080'
      : '#dfdfdf #808080 #808080 #dfdfdf'};
  cursor: pointer;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
  }
`;

interface TaskbarProps {
  onStartClick?: () => void;
}

export function Taskbar({ onStartClick }: TaskbarProps) {
  const [time, setTime] = useState('00:00');
  const windows = useWindowStore((state) => state.windows);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const restoreWindow = useWindowStore((state) => state.restoreWindow);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTaskClick = (windowId: string) => {
    const window = windows[windowId];
    if (window?.isMinimized) {
      restoreWindow(windowId);
    }
    focusWindow(windowId);
  };

  return (
    <TaskbarContainer>
      <StartButton onClick={onStartClick}>
        <span>🪟</span>
        <span>Start</span>
      </StartButton>

      <TaskbarSpacer />

      {Object.values(windows)
        .filter((w) => w.isOpen)
        .map((window) => (
          <TaskButton
            key={window.id}
            isActive={!window.isMinimized}
            onClick={() => handleTaskClick(window.id)}
          >
            {window.title}
          </TaskButton>
        ))}

      <TaskbarSpacer />

      <Clock>{time}</Clock>
    </TaskbarContainer>
  );
}

