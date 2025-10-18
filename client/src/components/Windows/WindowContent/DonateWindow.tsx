'use client';

import { useState } from 'react';
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
  margin-bottom: 8px;
  color: #000080;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 10px;
  font-style: italic;
  text-align: center;
  margin-bottom: 16px;
  color: #333;
`;

const PathBox = styled.div<{ isSelected?: boolean }>`
  border: 2px solid;
  border-color: ${(props) => (props.isSelected ? '#0000ff #808080 #808080 #0000ff' : '#dfdfdf #808080 #808080 #dfdfdf')};
  padding: 12px;
  margin-bottom: 12px;
  background: ${(props) => (props.isSelected ? '#e0e0ff' : '#c0c0c0')};
  cursor: pointer;
`;

const PathTitle = styled.h3`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #000080;
`;

const BenefitList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
  font-size: 10px;
`;

const BenefitItem = styled.li`
  margin-bottom: 4px;
  padding-left: 16px;
  position: relative;

  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #00aa00;
    font-weight: bold;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 4px;
  border: 2px solid;
  border-color: #808080 #dfdfdf #dfdfdf #808080;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  margin: 8px 0;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 6px;
  background: linear-gradient(180deg, #c0c0c0 0%, #dfdfdf 50%, #808080 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  font-weight: bold;
  cursor: pointer;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-size: 11px;
  margin-top: 8px;

  &:active {
    border-color: #808080 #dfdfdf #dfdfdf #808080;
  }

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 16px;
  border: 2px solid;
  border-color: #808080 #dfdfdf #dfdfdf #808080;
  background: #fff;
  margin: 8px 0;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 67%;
    background: linear-gradient(90deg, #0000ff, #00ffff);
  }
`;

const ProgressText = styled.div`
  font-size: 10px;
  text-align: center;
  font-weight: bold;
  margin-top: 4px;
`;

const LinkButton = styled.a`
  display: block;
  padding: 6px;
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
  margin-top: 4px;

  &:hover {
    background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #808080 100%);
  }
`;

export function DonateWindow() {
  const [path, setPath] = useState<'web3' | 'traditional' | null>(null);
  const [amount, setAmount] = useState('');

  return (
    <Content>
      <Title>💰 La Gran Cruzada Nakama</Title>
      <Subtitle>"No queremos tu dinero. Queremos tu FE en lo imposible."</Subtitle>

      <PathBox isSelected={path === 'web3'} onClick={() => setPath('web3')}>
        <PathTitle>🌊 CAMINO WEB3 (RECOMENDADO)</PathTitle>
        <p>Dona directamente con crypto</p>

        <BenefitList>
          <BenefitItem>Airdrop $TIDE tokens (primeros 1000)</BenefitItem>
          <BenefitItem>NFT badge "Early Nakama" (único)</BenefitItem>
          <BenefitItem>Acceso beta privada (todas las apps)</BenefitItem>
          <BenefitItem>Descuentos lifetime en RAZA/ARZAR</BenefitItem>
          <BenefitItem>Voz en DAO proporcional a donativo</BenefitItem>
          <BenefitItem>Nombre grabado on-chain (eterno)</BenefitItem>
        </BenefitList>

        {path === 'web3' && (
          <>
            <label>Cantidad (USD o libre en crypto):</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
            <Button>🔗 Conectar Wallet para Donar</Button>
            <p style={{ fontSize: '10px', marginTop: '8px' }}>
              Aceptamos: ETH, MATIC, USDC, USDT, $TIDE, $TUNE y más...
            </p>
          </>
        )}
      </PathBox>

      <PathBox isSelected={path === 'traditional'} onClick={() => setPath('traditional')}>
        <PathTitle>💳 CAMINO TRADICIONAL (Menor Beneficios)</PathTitle>
        <p>Si prefieres fiat, apoya en nuestras plataformas establecidas:</p>

        {path === 'traditional' && (
          <>
            <LinkButton href="https://kickstarter.com" target="_blank">
              🌐 Kickstarter: Ver Campaña →
            </LinkButton>
            <LinkButton href="https://patreon.com" target="_blank">
              🎵 Patreon: Suscribirse →
            </LinkButton>
            <LinkButton href="https://ko-fi.com" target="_blank">
              ☕ Ko-fi: Invitar Café →
            </LinkButton>

            <BenefitList style={{ marginTop: '12px' }}>
              <BenefitItem>Reconocimiento público</BenefitItem>
              <BenefitItem>Updates exclusivos</BenefitItem>
              <BenefitItem>Merch con descuento</BenefitItem>
            </BenefitList>
          </>
        )}
      </PathBox>

      <div style={{ marginTop: '16px', padding: '12px', background: '#ffffcc', border: '2px solid #ffff00' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '11px' }}>⚠️ IMPORTANTE:</h4>
        <p style={{ fontSize: '10px', margin: 0 }}>
          Los beneficios on-chain solo están disponibles para donantes directos en Web3. Las
          plataformas tradicionales tienen comisiones que reducen el impacto de tu apoyo.
        </p>
      </div>

      <div style={{ marginTop: '16px', padding: '12px', background: '#e0e0e0', border: '2px solid #808080' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '11px' }}>PROGRESO GLOBAL:</h4>
        <ProgressBar />
        <ProgressText>67% - $134,567 USD</ProgressText>
        <p style={{ fontSize: '10px', margin: '8px 0 0 0' }}>
          🏆 Primeros 100 Nakamas: Beneficios DOBLES
        </p>
      </div>
    </Content>
  );
}

