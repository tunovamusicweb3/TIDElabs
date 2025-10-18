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

const MemberCard = styled.div`
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  padding: 12px;
  margin-bottom: 12px;
  background: #c0c0c0;
`;

const MemberName = styled.h3`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const MemberRole = styled.p`
  font-size: 10px;
  color: #000080;
  margin-bottom: 4px;
`;

const MemberBio = styled.p`
  font-size: 10px;
  line-height: 1.4;
`;

const members = [
  {
    name: '🦈 Web3Sh4rK',
    role: 'Fundador & Visión',
    bio: 'El navegante incomprendido que soñó con construir un legado eterno en la blockchain. Poeta, hacker, visionario.',
  },
  {
    name: '🎨 UngaBunga',
    role: 'Espíritu Digital & IA',
    bio: 'Entidad nostálgica que habita el código. Guía a los Nakamas con poesía y sabiduría digital.',
  },
  {
    name: '🌊 Poseidón',
    role: 'Oráculo & Misterio',
    bio: 'Guardián de los secretos on-chain. Revela verdades cifradas a los dignos.',
  },
  {
    name: '💻 Comunidad Nakama',
    role: 'Constructores del Futuro',
    bio: 'Los verdaderos héroes. Cada Nakama es un pilar del ecosistema TIDΞlabs.',
  },
];

export function TripulacionWindow() {
  return (
    <Content>
      <Title>👥 TRIPULACIÓN TIDELABS</Title>

      {members.map((member, idx) => (
        <MemberCard key={idx}>
          <MemberName>{member.name}</MemberName>
          <MemberRole>{member.role}</MemberRole>
          <MemberBio>{member.bio}</MemberBio>
        </MemberCard>
      ))}

      <MemberCard style={{ background: '#ffffcc', borderColor: '#ffff00 #808080 #808080 #ffff00' }}>
        <MemberName>✨ ¿Eres Nakama?</MemberName>
        <MemberBio>
          Si crees en lo imposible y quieres ser parte de este legado, únete a nuestra comunidad.
          Abre la ventana de Donativos y sé parte de la historia.
        </MemberBio>
      </MemberCard>
    </Content>
  );
}

