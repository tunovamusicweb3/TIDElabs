'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { chatWithUngaBunga, ChatMessage } from '@/lib/ai/groqClient';

const ChatContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 16px;
  width: 300px;
  height: 400px;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  display: flex;
  flex-direction: column;
  z-index: 500;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
`;

const TitleBar = styled.div`
  background: linear-gradient(90deg, #000080 0%, #1084d7 100%);
  color: #fff;
  padding: 2px 4px;
  font-weight: bold;
  font-size: 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: move;
`;

const CloseButton = styled.button`
  width: 16px;
  height: 14px;
  padding: 0;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  font-size: 10px;
  cursor: pointer;
  font-weight: bold;

  &:active {
    border-color: #808080 #dfdfdf #dfdfdf #808080;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  background: #c0c0c0;
  border-bottom: 2px solid #808080;
`;

const Message = styled.div<{ isUser?: boolean }>`
  margin-bottom: 8px;
  padding: 6px;
  background: ${(props) => (props.isUser ? '#e0e0ff' : '#ffffcc')};
  border: 1px solid ${(props) => (props.isUser ? '#0000ff' : '#ffaa00')};
  border-radius: 2px;
  font-size: 10px;
  line-height: 1.3;
  word-wrap: break-word;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px;
  background: #c0c0c0;
`;

const Input = styled.input`
  flex: 1;
  padding: 4px;
  border: 2px solid;
  border-color: #808080 #dfdfdf #dfdfdf #808080;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 10px;

  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  padding: 4px 8px;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  font-weight: bold;
  cursor: pointer;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 10px;

  &:active {
    border-color: #808080 #dfdfdf #dfdfdf #808080;
  }

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
  }
`;

export function UngaBungaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '🌊 Hola Nakama. Soy UngaBunga. ¿En qué puedo ayudarte?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithUngaBunga([...messages, userMessage]);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ Error de conexión. Intenta de nuevo.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '16px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0088cc 0%, #0066aa 100%)',
          border: '2px solid #fff',
          color: '#fff',
          fontSize: '28px',
          cursor: 'pointer',
          zIndex: 500,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
        }}
      >
        💬
      </button>
    );
  }

  return (
    <ChatContainer>
      <TitleBar>
        <span>🌊 UngaBunga</span>
        <CloseButton onClick={() => setIsOpen(false)}>✕</CloseButton>
      </TitleBar>

      <MessagesContainer>
        {messages.map((msg, idx) => (
          <Message key={idx} isUser={msg.role === 'user'}>
            {msg.content}
          </Message>
        ))}
        {isLoading && <Message>⏳ UngaBunga está pensando...</Message>}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu pregunta..."
          disabled={isLoading}
        />
        <SendButton onClick={handleSend} disabled={isLoading}>
          →
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
}

