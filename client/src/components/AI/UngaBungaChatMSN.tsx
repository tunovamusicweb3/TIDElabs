'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { audioManager } from '@/lib/audio/audioManager';

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
`;

const OnlineIndicator = styled.div`
  width: 8px;
  height: 8px;
  background: #00ff00;
  border-radius: 50%;
  animation: pulse 1s infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
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

const Message = styled.div<{ $isUser?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
  gap: 4px;
  width: 100%;
`;

const MessageBubble = styled.div<{ $isUser?: boolean }>`
  background: ${(props) => (props.$isUser ? '#0000ff' : '#dfdfdf')};
  color: ${(props) => (props.$isUser ? '#fff' : '#000')};
  padding: 8px 12px;
  border-radius: 4px;
  max-width: 70%;
  word-wrap: break-word;
  border: 1px solid ${(props) => (props.$isUser ? '#000080' : '#808080')};
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Timestamp = styled.div`
  font-size: 9px;
  color: #666;
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

  &:focus {
    outline: none;
    border-color: #0000ff #dfdfdf #dfdfdf #0000ff;
    background: #fffff0;
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

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
    box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: scale(0.95);
    border-color: #808080 #dfdfdf #dfdfdf #808080;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    }, 1000 + Math.random() * 1000);
  };

  const handleZumbido = () => {
    audioManager.playClick();
    // Create vibration effect
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <OnlineIndicator />
        <span>UngaBunga</span>
        <span style={{ marginLeft: 'auto', fontSize: '9px' }}>Online</span>
      </ChatHeader>

      <MessagesContainer>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.isUser ? 'flex-end' : 'flex-start', gap: '4px' }}>
            <MessageBubble $isUser={msg.isUser}>{msg.text}</MessageBubble>
            <Timestamp>{msg.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</Timestamp>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
            <MessageBubble $isUser={false}>
              <span style={{ animation: 'blink 1s infinite' }}>...</span>
            </MessageBubble>
          </div>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer>
        <Input
          type="text"
          placeholder="Escribe tu pregunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <ButtonGroup>
          <Button onClick={handleSend} title="Enviar">
            →
          </Button>
          <Button onClick={handleZumbido} title="Zumbido">
            🔔
          </Button>
        </ButtonGroup>
      </InputContainer>
    </ChatContainer>
  );
}

