'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { UngaBungaChatMSN } from '@/components/AI/UngaBungaChatMSN';

const Content = styled.div`
  padding: 0;
  overflow: hidden;
  height: 100%;
  background: #c0c0c0;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  display: flex;
  flex-direction: column;
`;

const TabBar = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border-bottom: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
`;

const Tab = styled.button<{ $isActive?: boolean }>`
  padding: 6px 12px;
  background: ${(props) =>
    props.$isActive
      ? 'linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%)'
      : 'linear-gradient(180deg, #808080 0%, #dfdfdf 50%, #c0c0c0 100%)'};
  border: 2px solid;
  border-color: ${(props) =>
    props.$isActive
      ? '#dfdfdf #808080 #808080 #dfdfdf'
      : '#808080 #dfdfdf #dfdfdf #808080'};
  cursor: pointer;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  font-weight: bold;
  transition: all 0.1s ease;

  &:hover {
    background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const TabContent = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const MenuContent = styled.div`
  padding: 16px;
  overflow-y: auto;
  flex: 1;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #000080;
  text-align: center;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.8);
`;

const InfoBox = styled.div`
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  padding: 12px;
  background: linear-gradient(135deg, #c0c0c0 0%, #dfdfdf 100%);
  margin-bottom: 12px;
  text-align: center;
`;

const TelegramHandle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #0088cc;
  margin: 12px 0;
  font-family: 'Courier New', monospace;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.8);
`;

const Button = styled.a`
  display: block;
  padding: 8px;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  text-align: center;
  text-decoration: none;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  margin: 8px 0;
  transition: all 0.1s ease;

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
    box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
    border-color: #808080 #dfdfdf #dfdfdf #808080;
  }
`;

const DescriptionBox = styled.div`
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  padding: 12px;
  background: #ffffcc;
  margin-top: 12px;
  font-size: 10px;
  line-height: 1.6;

  ul {
    margin: 8px 0 0 0;
    padding-left: 16px;
  }

  li {
    margin-bottom: 4px;
  }
`;

const WarningBox = styled(DescriptionBox)`
  background: #e0e0ff;
  border-color: #0000ff #808080 #808080 #0000ff;
`;

export function TelegramWindow() {
  const [activeTab, setActiveTab] = useState<'chat' | 'info'>('chat');

  return (
    <Content>
      <TabBar>
        <Tab $isActive={activeTab === 'chat'} onClick={() => setActiveTab('chat')}>
          💬 UngaBunga Chat
        </Tab>
        <Tab $isActive={activeTab === 'info'} onClick={() => setActiveTab('info')}>
          📱 Telegram Info
        </Tab>
      </TabBar>

      <TabContent>
        {activeTab === 'chat' ? (
          <UngaBungaChatMSN />
        ) : (
          <MenuContent>
            <Title>💬 CONTACTO DIRECTO</Title>

            <InfoBox>
              <p style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: 'bold' }}>
                Únete a nuestra comunidad en Telegram
              </p>
              <TelegramHandle>@Web3Sh4rK</TelegramHandle>
              <p style={{ margin: '12px 0 0 0', fontSize: '10px' }}>
                El único canal oficial de comunicación
              </p>
            </InfoBox>

            <Button href="https://t.me/Web3Sh4rK" target="_blank" rel="noopener noreferrer">
              🔗 Abrir en Telegram
            </Button>

            <DescriptionBox>
              <strong>¿Por qué Telegram?</strong>
              <ul>
                <li>Comunicación directa con Web3Sh4rK</li>
                <li>Actualizaciones en tiempo real</li>
                <li>Soporte a la comunidad Nakama</li>
                <li>Anuncios de eventos y lanzamientos</li>
                <li>Votaciones y decisiones comunitarias</li>
                <li>Acceso a recursos exclusivos</li>
              </ul>
            </DescriptionBox>

            <WarningBox>
              <strong>⚠️ ADVERTENCIA:</strong>
              <p style={{ margin: '8px 0 0 0' }}>
                Este es el ÚNICO canal oficial. Desconfía de imitadores. Nunca compartimos links de
                "airdrop" o pedimos contraseñas.
              </p>
            </WarningBox>
          </MenuContent>
        )}
      </TabContent>
    </Content>
  );
}

