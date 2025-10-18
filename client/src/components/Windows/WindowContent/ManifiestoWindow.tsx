'use client';

import styled from 'styled-components';

const Content = styled.div`
  padding: 16px;
  overflow-y: auto;
  height: 100%;
  background: #c0c0c0;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  line-height: 1.6;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #000080;
`;

const Paragraph = styled.p`
  margin-bottom: 8px;
  text-align: justify;
`;

const Highlight = styled.span`
  background: #ffff00;
  font-weight: bold;
`;

export function ManifiestoWindow() {
  return (
    <Content>
      <Title>🏴‍☠️ MANIFIESTO TIDELABS</Title>

      <Paragraph>
        <strong>MISIÓN SAGRADA:</strong>
      </Paragraph>

      <Paragraph>
        Construir la primera landing Web3 que sea una experiencia de escritorio Windows 95
        completamente funcional, donde cada píxel respira nostalgia y cada línea de código es un
        verso hacia el futuro descentralizado.
      </Paragraph>

      <Paragraph>
        Aquí no buscamos usuarios. Buscamos <Highlight>NAKAMAS</Highlight>.
      </Paragraph>

      <Paragraph>
        Aquí no vendemos productos. Construimos <Highlight>LEGADO</Highlight>.
      </Paragraph>

      <Paragraph>
        Aquí no aceptamos dinero fiat. Solo <Highlight>CRYPTO</Highlight>.
      </Paragraph>

      <Paragraph>
        <strong>OBJETIVO PRIMARIO:</strong>
      </Paragraph>

      <Paragraph>
        Captar donativos de verdaderos Nakamas Web3 sin monto mínimo ni máximo, ofreciendo
        beneficios extraordinarios a los primeros que crean, con opción de donativos tradicionales
        redirigiendo a plataformas establecidas (pero con menores beneficios para incentivar el
        camino Web3).
      </Paragraph>

      <Paragraph>
        <strong>PILARES INAMOVIBLES:</strong>
      </Paragraph>

      <Paragraph>
        1. Estética Win95 auténtica (píxel-perfect)
        <br />
        2. Narrativa poético-renacentista en cada texto
        <br />
        3. Crypto-only como camino principal
        <br />
        4. Contacto directo: SOLO Telegram @Web3Sh4rK
        <br />
        5. Transparencia radical on-chain
        <br />
        6. Comunidad &gt; Capital
      </Paragraph>

      <Paragraph style={{ marginTop: '16px', fontSize: '10px', fontStyle: 'italic' }}>
        "En la intersección del pasado nostálgico y el futuro descentralizado, construimos un
        legado eterno."
      </Paragraph>
    </Content>
  );
}

