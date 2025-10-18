'use client';

import styled from 'styled-components';

const Content = styled.div`
  padding: 16px;
  overflow-y: auto;
  height: 100%;
  background: #c0c0c0;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #000080;
  text-align: center;
`;

const InfoBox = styled.div`
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  padding: 12px;
  background: #c0c0c0;
  margin-bottom: 12px;
  text-align: center;
`;

const TelegramHandle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #0088cc;
  margin: 12px 0;
  font-family: 'Courier New', monospace;
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

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
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
`;

export function TelegramWindow() {
  return (
    <Content>
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
        <ul style={{ margin: '8px 0 0 0', paddingLeft: '16px' }}>
          <li>Comunicación directa con Web3Sh4rK</li>
          <li>Actualizaciones en tiempo real</li>
          <li>Soporte a la comunidad Nakama</li>
          <li>Anuncios de eventos y lanzamientos</li>
          <li>Votaciones y decisiones comunitarias</li>
          <li>Acceso a recursos exclusivos</li>
        </ul>
      </DescriptionBox>

      <DescriptionBox style={{ background: '#e0e0ff', borderColor: '#0000ff' }}>
        <strong>⚠️ ADVERTENCIA:</strong>
        <p style={{ margin: '8px 0 0 0' }}>
          Este es el ÚNICO canal oficial. Desconfía de imitadores. Nunca compartimos links de
          "airdrop" o pedimos contraseñas.
        </p>
      </DescriptionBox>
    </Content>
  );
}

