import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWindowStore } from '@/lib/window/windowStore';
import { audioManager } from '@/lib/audio/audioManager';

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
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5);
`;

const StartButton = styled.button`
  padding: 2px 10px;
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
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 0 rgba(0, 0, 0, 0.2);

  &:active {
    border-color: #808080 #dfdfdf #dfdfdf #808080;
    transform: scale(0.96);
    box-shadow: inset -1px -1px 0 rgba(255, 255, 255, 0.5), inset 1px 1px 0 rgba(0, 0, 0, 0.2);
  }

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #a0a0a0 100%);
    box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.8), inset -1px -1px 0 rgba(0, 0, 0, 0.3);
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
  font-weight: bold;
  color: #000080;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 0 rgba(0, 0, 0, 0.2);
`;

const TaskButton = styled.button<{ $isActive?: boolean }>`
  padding: 2px 8px;
  background: ${(props) =>
    props.$isActive
      ? 'linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%)'
      : 'linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%)'};
  border: 2px solid;
  border-color: ${(props) =>
    props.$isActive
      ? '#808080 #dfdfdf #dfdfdf #808080'
      : '#dfdfdf #808080 #808080 #dfdfdf'};
  cursor: pointer;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: ${(props) =>
    props.$isActive
      ? 'inset -1px -1px 0 rgba(255, 255, 255, 0.5), inset 1px 1px 0 rgba(0, 0, 0, 0.2)'
      : 'inset 1px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 0 rgba(0, 0, 0, 0.2)'};

  &:hover {
    background: ${(props) =>
      props.$isActive
        ? 'linear-gradient(180deg, #e0e0e0 0%, #d0d0d0 50%, #909090 100%)'
        : 'linear-gradient(180deg, #d0d0d0 0%, #c0c0c0 50%, #909090 100%)'};
  }

  &:active {
    transform: scale(0.96);
  }
`;

interface TaskbarProps {
  onStartClick?: () => void;
}

export function Taskbar({ onStartClick }: TaskbarProps) {
  const windows = useWindowStore((state) => state.windows);
  const [time, setTime] = useState(new Date());
  const focusWindow = useWindowStore((state) => state.focusWindow);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStartClick = () => {
    audioManager.playClick();
    onStartClick?.();
  };

  const handleTaskClick = (windowId: string) => {
    audioManager.playClick();
    focusWindow(windowId);
  };

  const windowList = Object.values(windows).filter((w) => w.isOpen && !w.isMinimized);
  const maxZIndex = Math.max(...windowList.map((w) => w.zIndex), 0);

  return (
    <TaskbarContainer>
      <StartButton onClick={handleStartClick}>
        🪟 Start
      </StartButton>
      <TaskbarSpacer />
      {windowList.map((window) => (
        <TaskButton
          key={window.id}
          $isActive={window.zIndex === maxZIndex}
          onClick={() => handleTaskClick(window.id)}
          title={window.title}
        >
          {window.title}
        </TaskButton>
      ))}
      <TaskbarSpacer />
      <Clock>{time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</Clock>
    </TaskbarContainer>
  );
}
