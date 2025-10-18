'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { audioManager } from '@/lib/audio/audioManager';
import { replaceEmoticons, MSN_EMOTICONS } from '@/lib/emoticons/msn-emoticons';
import { TypingIndicator } from './TypingIndicator';
import { NotificationToast } from './NotificationToast';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #c0c0c0;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
`;

const ChatHeader = styled.div`
  background: linear-gradient(90deg, #000080 0%, #1084d7 100%);
  color: #fff;
  padding: 8px 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 2px solid #000080;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
`;

const OnlineIndicator = styled.div`
  width: 8px;
  height: 8px;
  background: #00ff00;
  border-radius: 50%;
  animation: pulse 1s infinite;
  box-shadow: 0 0 4px #00ff00;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      box-shadow: 0 0 4px #00ff00;
    }
    50% {
      opacity: 0.5;
      box-shadow: 0 0 8px #00ff00;
    }
  }
`;

const UserStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const UserName = styled.span`
  font-weight: bold;
  font-size: 12px;
`;

const StatusText = styled.span`
  font-size: 9px;
  opacity: 0.9;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 8px;

  scrollbar-width: thin;
  scrollbar-color: #808080 #c0c0c0;

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background: linear-gradient(90deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
    border: 1px solid #808080;
  }
`;

const MessageBubbleUser = styled.div`
  background: linear-gradient(135deg, #0000ff 0%, #1084d7 100%);
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  max-width: 70%;
  word-wrap: break-word;
  border: 1px solid #000080;
  animation: slideIn 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  align-self: flex-end;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px) scaleX(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scaleX(1);
    }
  }
`;

const MessageBubbleBot = styled.div`
  background: linear-gradient(135deg, #dfdfdf 0%, #f0f0f0 100%);
  color: #000;
  padding: 8px 12px;
  border-radius: 4px;
  max-width: 70%;
  word-wrap: break-word;
  border: 1px solid #808080;
  animation: slideIn 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-self: flex-start;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px) scaleX(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scaleX(1);
    }
  }
`;

const MessageGroup = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
  gap: 4px;
  width: 100%;
`;

const Timestamp = styled.div`
  font-size: 9px;
  color: #999;
  padding: 0 4px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px;
  background: #c0c0c0;
  border-top: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
`;

const Input = styled.input`
  flex: 1;
  padding: 6px;
  border: 2px solid;
  border-color: #808080 #dfdfdf #dfdfdf #808080;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  background: #fff;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0000ff #dfdfdf #dfdfdf #0000ff;
    background: #fffff0;
    box-shadow: inset 0 0 2px rgba(0, 0, 128, 0.2);
  }

  &::placeholder {
    color: #999;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2px;
`;

const Button = styled.button`
  padding: 6px 8px;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.1s ease;
  font-weight: bold;
  user-select: none;

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
    box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: scale(0.95);
    border-color: #808080 #dfdfdf #dfdfdf #808080;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmoticonSuggestions = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  background: #f0f0f0;
  border-top: 1px solid #dfdfdf;
  flex-wrap: wrap;
  max-height: 60px;
  overflow-y: auto;
`;

const EmoticonButton = styled.button`
  background: none;
  border: 1px solid #dfdfdf;
  padding: 2px 6px;
  cursor: pointer;
  font-size: 12px;
  border-radius: 2px;
  transition: all 0.2s ease;

  &:hover {
    background: #e0e0e0;
    border-color: #808080;
  }

  &:active {
    transform: scale(0.95);
  }
`;

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const UNGABUNYA_RESPONSES = [
  '¡Hola Nakama! 🌊 ¿Qué tal tu día?',
  'Soy UngaBunga, tu asistente Web3 favorito 🦈',
  'Los Nakamas son lo más importante para TIDΞlabs',
  '¿Ya donaste para la causa? 💰',
  'CRYPTO > FIAT siempre 🔥',
  'La comunidad es nuestro mayor activo 👥',
  'Construimos legado, no dinero 🏴‍☠️',
  '¿Probaste los minijuegos? 🎮',
  'El futuro es descentralizado 🌐',
  'Gracias por creer en nosotros Nakama 🙏',
  'La nostalgia es nuestro superpoder ✨',
  'Windows 95 nunca muere 💾',
  'Bienvenido a la era de los NAKAMAS 🌊',
  'Cada píxel cuenta una historia 📖',
];

export function UngaBungaChatMSN() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      text: 'Hola Nakama! Soy UngaBunga 🌊 ¿En qué puedo ayudarte?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoticons, setShowEmoticons] = useState(false);
  const [notifications, setNotifications] = useState<Array<{ id: string }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    audioManager.playClick();

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setShowEmoticons(false);
    setIsTyping(true);

    // Simulate typing and response
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: UNGABUNYA_RESPONSES[Math.floor(Math.random() * UNGABUNYA_RESPONSES.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
      audioManager.playWindowOpen();

      // Show notification
      const notifId = `notif-${Date.now()}`;
      setNotifications((prev) => [...prev, { id: notifId }]);
    }, 1000 + Math.random() * 1500);
  };

  const handleZumbido = () => {
    audioManager.playClick();
    // Create vibration effect
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
  };

  const handleEmoticonClick = (emoji: string) => {
    setInput((prev) => prev + emoji);
    setShowEmoticons(false);
  };

  const emoticonsToShow = input.includes(':')
    ? MSN_EMOTICONS.filter((e) =>
        e.triggers.some((t) => t.includes(input.slice(input.lastIndexOf(':')))),
      ).slice(0, 5)
    : [];

  return (
    <ChatContainer>
      <ChatHeader>
        <OnlineIndicator />
        <UserStatus>
          <UserName>UngaBunga</UserName>
          <StatusText>Online - Disponible</StatusText>
        </UserStatus>
        <span style={{ marginLeft: 'auto', fontSize: '9px' }}>v1.0</span>
      </ChatHeader>

      <MessagesContainer>
        {messages.map((msg) => (
          <MessageGroup key={msg.id} $isUser={msg.isUser}>
            {msg.isUser ? (
              <MessageBubbleUser>{replaceEmoticons(msg.text)}</MessageBubbleUser>
            ) : (
              <MessageBubbleBot>{replaceEmoticons(msg.text)}</MessageBubbleBot>
            )}
            <Timestamp>{msg.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</Timestamp>
          </MessageGroup>
        ))}
        {isTyping && (
          <MessageGroup $isUser={false}>
            <TypingIndicator userName="UngaBunga" />
          </MessageGroup>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      {emoticonsToShow.length > 0 && (
        <EmoticonSuggestions>
          {emoticonsToShow.map((emoticon) => (
            <EmoticonButton
              key={emoticon.name}
              onClick={() => handleEmoticonClick(emoticon.emoji)}
              title={emoticon.description}
            >
              {emoticon.emoji}
            </EmoticonButton>
          ))}
        </EmoticonSuggestions>
      )}

      <InputContainer>
        <Input
          type="text"
          placeholder="Escribe tu pregunta... (usa :) :P ;) etc)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <ButtonGroup>
          <Button onClick={handleSend} title="Enviar (Enter)" disabled={!input.trim()}>
            →
          </Button>
          <Button onClick={handleZumbido} title="Zumbido (Vibración)">
            🔔
          </Button>
          <Button
            onClick={() => setShowEmoticons(!showEmoticons)}
            title="Emoticonos"
            style={{ fontWeight: showEmoticons ? 'bold' : 'normal' }}
          >
            😊
          </Button>
        </ButtonGroup>
      </InputContainer>

      {notifications.map((notif) => (
        <NotificationToast
          key={notif.id}
          title="Nuevo Mensaje"
          message="UngaBunga te ha respondido 🌊"
          duration={2000}
          onClose={() => setNotifications((prev) => prev.filter((n) => n.id !== notif.id))}
        />
      ))}
    </ChatContainer>
  );
}

