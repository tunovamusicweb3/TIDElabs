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
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.8);
  border-bottom: 2px solid #000080;
  padding-bottom: 8px;
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 8px;
  color: #000080;
  background: rgba(0, 0, 128, 0.1);
  padding: 4px 8px;
  border-left: 3px solid #000080;
`;

const Paragraph = styled.p`
  margin-bottom: 8px;
  text-align: justify;
  line-height: 1.5;
`;

const Highlight = styled.span`
  background: #ffff00;
  font-weight: bold;
  padding: 0 2px;
  border-radius: 1px;
`;

const HighlightBlue = styled.span`
  color: #0000ff;
  font-weight: bold;
`;

const PillarList = styled.div`
  background: linear-gradient(90deg, rgba(0, 0, 128, 0.05) 0%, transparent 100%);
  border-left: 3px solid #0000ff;
  padding: 8px 12px;
  margin: 8px 0;
`;

const PillarItem = styled.div`
  margin-bottom: 6px;
  padding-left: 16px;
  position: relative;
  font-size: 10px;

  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #0000ff;
    font-weight: bold;
  }
`;

const Quote = styled.div`
  margin-top: 16px;
  padding: 12px;
  background: #ffffcc;
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  font-style: italic;
  font-size: 10px;
  text-align: center;
  color: #000080;
`;

export function ManifiestoWindow() {
  return (
    <Content>
      <Title>🏴‍☠️ MANIFIESTO TIDELABS</Title>

      <SectionTitle>MISIÓN SAGRADA</SectionTitle>

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

      <SectionTitle>OBJETIVO PRIMARIO</SectionTitle>

      <Paragraph>
        Captar donativos de verdaderos Nakamas Web3 sin monto mínimo ni máximo, ofreciendo
        beneficios extraordinarios a los primeros que crean, con opción de donativos tradicionales
        redirigiendo a plataformas establecidas (pero con menores beneficios para incentivar el
        camino Web3).
      </Paragraph>

      <SectionTitle>PILARES INAMOVIBLES</SectionTitle>

      <PillarList>
        <PillarItem>Estética Win95 auténtica (píxel-perfect)</PillarItem>
        <PillarItem>Narrativa poético-renacentista en cada texto</PillarItem>
        <PillarItem>Crypto-only como camino principal</PillarItem>
        <PillarItem>Contacto directo: SOLO Telegram @Web3Sh4rK</PillarItem>
        <PillarItem>Transparencia radical on-chain</PillarItem>
        <PillarItem>Comunidad &gt; Capital</PillarItem>
      </PillarList>

      <Quote>
        "En la intersección del pasado nostálgico y el futuro descentralizado, construimos un
        legado eterno."
      </Quote>
    </Content>
  );
}

