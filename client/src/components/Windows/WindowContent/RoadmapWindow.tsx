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
`;

const TimelineItem = styled.div`
  border-left: 3px solid #0000ff;
  padding-left: 12px;
  margin-bottom: 16px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: -7px;
    top: 2px;
    width: 10px;
    height: 10px;
    background: #0000ff;
    border: 2px solid #c0c0c0;
  }
`;

const Year = styled.h3`
  font-size: 12px;
  font-weight: bold;
  color: #000080;
  margin: 0 0 4px 0;
`;

const Event = styled.p`
  font-size: 10px;
  margin: 4px 0;
  line-height: 1.4;
`;

const CurrentMarker = styled.div`
  background: #ffff00;
  border: 2px solid #ff0000;
  padding: 8px;
  margin: 12px 0;
  font-weight: bold;
  text-align: center;
  font-size: 11px;
`;

const roadmapItems = [
  {
    year: '2018',
    emoji: '💔',
    title: 'El Rechazo',
    events: ['VCs dijeron "no". El viaje comenzó.'],
  },
  {
    year: '2020',
    emoji: '🦠',
    title: 'La Peste',
    events: ['Pandemia. Todo se desvaneció.'],
  },
  {
    year: '2021',
    emoji: '😤',
    title: 'El Ladrón de Nombres',
    events: ['Zuckerberg lanzó "Meta".'],
  },
  {
    year: '2022-2024',
    emoji: '🏔️',
    title: 'La Forja en Silencio',
    events: ['7 años preparándome.'],
  },
  {
    year: '2025',
    emoji: '🌊',
    title: 'La Marea Sube',
    events: [
      'TIDΞlabs emerge',
      'Landing live',
      'Crowdfunding activo',
      'Primeros 100 Nakamas',
    ],
    isCurrent: true,
  },
  {
    year: '2026 Q1',
    emoji: '🚀',
    title: 'Launch Beta',
    events: ['Tunova MVP público', 'TRB testnet abierto', '10K Nakamas'],
  },
  {
    year: '2026 Q2-Q4',
    emoji: '👑',
    title: 'Reino Completo',
    events: ['Ecosistema funcional', 'DAO activa', 'RAZA/AZAR launch', '50K Nakamas'],
  },
  {
    year: '2027+',
    emoji: '🌍',
    title: 'Expansión Global',
    events: ['1M+ usuarios', 'Academy launch', 'Chalets inaugurados', 'Referencia mundial Web3'],
  },
];

export function RoadmapWindow() {
  return (
    <Content>
      <Title>🗺️ ROADMAP TIDELABS</Title>

      {roadmapItems.map((item, idx) => (
        <div key={idx}>
          {item.isCurrent && <CurrentMarker>← ESTÁS AQUÍ</CurrentMarker>}

          <TimelineItem>
            <Year>
              {item.emoji} {item.year} - {item.title}
            </Year>
            {item.events.map((event, eventIdx) => (
              <Event key={eventIdx}>• {event}</Event>
            ))}
          </TimelineItem>
        </div>
      ))}

      <TimelineItem style={{ marginTop: '20px' }}>
        <Year>♾️ Legado Eterno</Year>
        <Event>En blockchain, para siempre.</Event>
      </TimelineItem>
    </Content>
  );
}

