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

const TabContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
  border-bottom: 2px solid #808080;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ $isActive?: boolean }>`
  padding: 4px 12px;
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

const ProjectBox = styled.div`
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  padding: 12px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #c0c0c0 0%, #dfdfdf 100%);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 0 4px rgba(0, 0, 128, 0.2);
    border-color: #0000ff #808080 #808080 #0000ff;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 12px;
  font-weight: bold;
  color: #000080;
  margin-bottom: 8px;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.8);
`;

const ProjectStatus = styled.div`
  font-size: 10px;
  color: #fff;
  background: #0000ff;
  padding: 2px 6px;
  display: inline-block;
  margin-bottom: 6px;
  border-radius: 2px;
  font-weight: bold;
`;

const ProjectText = styled.p`
  font-size: 10px;
  line-height: 1.5;
  margin-bottom: 6px;
`;

const projects = [
  {
    id: 'tunova',
    name: 'TUNOVA',
    emoji: '🎵',
    status: 'MVP Funcional',
    description:
      'Plataforma Musical Web3 donde los artistas reciben 90% de ingresos. Streaming descentralizado en Solana con NFTs musicales únicos.',
  },
  {
    id: 'trb',
    name: 'TRB',
    emoji: '🏃',
    status: 'Alpha Testnet',
    description:
      'Territory Runners Bikers - Conquista tu ciudad corriendo. Run/bike to earn con rivalidad ciudad vs ciudad.',
  },
  {
    id: 'raza',
    name: 'RAZA/AZAR',
    emoji: '👕',
    status: 'Pre-Launch',
    description:
      'Streetwear Reversible Web3 - Primera marca que solo acepta crypto. Ropa reversible con NFT tag authenticity.',
  },
  {
    id: 'dao',
    name: 'PROYECTO DAO',
    emoji: '🗳️',
    status: 'En Votación',
    description: 'La comunidad decide el próximo proyecto. Propuestas abiertas a holders de $TIDE.',
  },
  {
    id: 'academy',
    name: 'ACADEMY',
    emoji: '🎓',
    status: 'Roadmap 2027',
    description:
      'Formamos a los builders del mañana. Cursos gratis Web3, Solidity, design retro con certificados NFT.',
  },
  {
    id: 'chalets',
    name: 'CHALETS CREATIVOS',
    emoji: '🏡',
    status: 'En Construcción',
    description: '7 chalets en Islas Canarias con estudios musicales, coworking retro y residencias para artistas.',
  },
];

export function ProyectosWindow() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProjects =
    activeTab === 'all' ? projects : projects.filter((p) => p.id === activeTab);

  return (
    <Content>
      <TabContainer>
        <Tab $isActive={activeTab === 'all'} onClick={() => setActiveTab('all')}>
          📋 Todos
        </Tab>
        {projects.map((p) => (
          <Tab key={p.id} $isActive={activeTab === p.id} onClick={() => setActiveTab(p.id)}>
            {p.emoji}
          </Tab>
        ))}
      </TabContainer>

      {filteredProjects.map((project) => (
        <ProjectBox key={project.id}>
          <ProjectTitle>{project.emoji} {project.name}</ProjectTitle>
          <ProjectStatus>{project.status}</ProjectStatus>
          <ProjectText>{project.description}</ProjectText>
        </ProjectBox>
      ))}
    </Content>
  );
}

