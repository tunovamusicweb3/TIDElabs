import styled from 'styled-components';
import { useEffect, useState } from 'react';

const ToastContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 100px;
  right: 20px;
  background: linear-gradient(180deg, #000080 0%, #1084d7 100%);
  color: #fff;
  padding: 12px 16px;
  border-radius: 4px;
  border: 2px solid #000080;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  max-width: 300px;
  z-index: 10000;
  animation: ${(props) =>
    props.$visible
      ? 'slideInRight 0.3s ease-out'
      : 'slideOutRight 0.3s ease-in'};
  pointer-events: none;

  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;

const ToastTitle = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const ToastMessage = styled.div`
  font-size: 10px;
  line-height: 1.4;
`;

interface NotificationToastProps {
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

export function NotificationToast({
  title,
  message,
  duration = 3000,
  onClose,
}: NotificationToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <ToastContainer $visible={visible}>
      <ToastTitle>{title}</ToastTitle>
      <ToastMessage>{message}</ToastMessage>
    </ToastContainer>
  );
}

