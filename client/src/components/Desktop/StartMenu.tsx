'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useWindowStore } from '@/lib/window/windowStore';
import { audioManager } from '@/lib/audio/audioManager';

const MenuContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 28px;
  left: 0;
  width: 280px;
  background: linear-gradient(90deg, #000080 0%, #1084d7 100%);
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  flex-direction: column;
  z-index: 9997;
  max-height: 400px;
  overflow-y: auto;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  animation: menu-slide-up 0.2s ease-out;

  @keyframes menu-slide-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Windows 95 scrollbar */
  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background: #c0c0c0;
    border: 1px solid;
    border-color: #dfdfdf #808080 #808080 #dfdfdf;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #dfdfdf 0%, #808080 100%);
    border: 1px solid;
    border-color: #dfdfdf #808080 #808080 #dfdfdf;
  }
`;

const MenuItem = styled.div<{ $isHidden?: boolean }>`
  padding: 4px 8px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  background: transparent;
  user-select: none;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  &:active {
    background: rgba(0, 0, 0, 0.3);
  }

  ${(props) =>
    props.$isHidden &&
    `
    opacity: 0.6;
    font-style: italic;
    color: #ffff00;
    
    &:hover {
      color: #ffff00;
      text-shadow: 0 0 8px #ffff00;
    }
  `}
`;

const Separator = styled.div`
  height: 2px;
  background: linear-gradient(90deg, #dfdfdf 0%, #808080 100%);
  margin: 2px 0;
`;

const Icon = styled.span`
  font-size: 12px;
  min-width: 16px;
`;

const Label = styled.span`
  flex: 1;
`;

const Shortcut = styled.span`
  font-size: 9px;
  color: #dfdfdf;
  margin-left: auto;
`;

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StartMenu({ isOpen, onClose }: StartMenuProps) {
  const openWindow = useWindowStore((state) => state.openWindow);
  const [showHidden, setShowHidden] = useState(false);
  const [konamiCode, setKonamiCode] = useState<string[]>([]);

  // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: Record<string, string> = {
        ArrowUp: '↑',
        ArrowDown: '↓',
        ArrowLeft: '←',
        ArrowRight: '→',
        b: 'B',
        a: 'A',
      };

      const key = keyMap[e.key.toLowerCase()] || e.key;
      if (!key) return;

      const newCode = [...konamiCode, key].slice(-10);
      setKonamiCode(newCode);

      // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
      if (newCode.join('') === '↑↑↓↓←→←→BA') {
        setShowHidden(true);
        audioManager.playSuccess();
        setKonamiCode([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, konamiCode]);

  const handleMenuClick = (action: () => void) => {
    audioManager.playClick();
    action();
    onClose();
  };

  const handleWindowOpen = (id: string, label: string) => {
    openWindow(id, label);
  };

  const menuItems = [
    { label: '📄 Manifiesto', id: 'manifiesto' },
    { label: '🚀 Proyectos', id: 'proyectos' },
    { label: '👥 Tripulación', id: 'tripulacion' },
    { label: '💰 Donativos', id: 'donativos' },
    { label: '📋 Waitlist', id: 'waitlist' },
    { label: '🗺️ Roadmap', id: 'roadmap' },
    { label: '🎮 Juegos', id: 'juegos' },
    { label: '💬 Telegram', id: 'telegram' },
  ];

  if (!isOpen) return null;

  return (
    <MenuContainer $isOpen={isOpen}>
      {/* Programas */}
      <MenuItem
        onClick={() =>
          handleMenuClick(() => {
            alert('📁 Explorador de Archivos\n\nNo hay archivos para mostrar.');
          })
        }
      >
        <Icon>📁</Icon>
        <Label>Explorador</Label>
        <Shortcut>E</Shortcut>
      </MenuItem>

      <MenuItem
        onClick={() =>
          handleMenuClick(() => {
            alert('🌐 Navegador Web\n\nConéctate a la web descentralizada.');
          })
        }
      >
        <Icon>🌐</Icon>
        <Label>Navegador</Label>
        <Shortcut>W</Shortcut>
      </MenuItem>

      <MenuItem
        onClick={() =>
          handleMenuClick(() => {
            alert('⚙️ Panel de Control\n\nConfigura TIDΞlabs a tu gusto.');
          })
        }
      >
        <Icon>⚙️</Icon>
        <Label>Panel de Control</Label>
        <Shortcut>P</Shortcut>
      </MenuItem>

      <Separator />

      {/* Ventanas principales */}
      {menuItems.map((item, idx) => (
        <div key={item.id}>
          <MenuItem
            onClick={() =>
              handleMenuClick(() => handleWindowOpen(item.id, item.label))
            }
          >
            {item.label}
          </MenuItem>
          {idx === 3 && <Separator />}
        </div>
      ))}

      <Separator />

      {/* Comunidad */}
      <MenuItem
        onClick={() =>
          handleMenuClick(() => {
            window.open('https://t.me/tidelabs', '_blank');
          })
        }
      >
        <Icon>💬</Icon>
        <Label>Telegram</Label>
        <Shortcut>T</Shortcut>
      </MenuItem>

      <MenuItem
        onClick={() =>
          handleMenuClick(() => {
            alert('🌊 Comunidad NAKAMAS\n\nÚnete a nuestra revolución Web3.');
          })
        }
      >
        <Icon>👥</Icon>
        <Label>Comunidad</Label>
      </MenuItem>

      <Separator />

      {/* Funcionalidades Ocultas */}
      {showHidden && (
        <>
          <MenuItem
            $isHidden
            onClick={() =>
              handleMenuClick(() => {
                alert(
                  '🔮 SECRETO REVELADO\n\n' +
                    'Eres un verdadero Nakama.\n' +
                    'Has desbloqueado el Konami Code.\n\n' +
                    'Próximas sorpresas:\n' +
                    '- Modo Oscuro Retro\n' +
                    '- UngaBunga Danzante\n' +
                    '- Viaje Astral por la Blockchain\n\n' +
                    'El futuro es descentralizado. 🌊'
                );
              })
            }
          >
            <Icon>🔮</Icon>
            <Label>Secreto Revelado</Label>
            <Shortcut>✨</Shortcut>
          </MenuItem>

          <MenuItem
            $isHidden
            onClick={() =>
              handleMenuClick(() => {
                alert(
                  '🎭 MODO CAOS\n\n' +
                    'Activa el modo caos para:\n' +
                    '- Emoticonos aleatorios\n' +
                    '- Colores psicodélicos\n' +
                    '- Sonidos retro infinitos\n' +
                    '- Ventanas bailarinas\n\n' +
                    '¿Te atreves? 🌀'
                );
              })
            }
          >
            <Icon>🌀</Icon>
            <Label>Modo Caos</Label>
            <Shortcut>🎪</Shortcut>
          </MenuItem>

          <MenuItem
            $isHidden
            onClick={() =>
              handleMenuClick(() => {
                alert(
                  '🏴‍☠️ MANIFESTO PIRATA\n\n' +
                    'Somos los piratas de la descentralización.\n' +
                    'No pedimos permiso, tomamos lo que es nuestro.\n' +
                    'La blockchain es nuestra bandera.\n' +
                    'CRYPTO o nada.\n\n' +
                    'Bienvenido a la revolución. 🏴‍☠️'
                );
              })
            }
          >
            <Icon>🏴‍☠️</Icon>
            <Label>Manifesto Pirata</Label>
            <Shortcut>⚡</Shortcut>
          </MenuItem>

          <MenuItem
            $isHidden
            onClick={() =>
              handleMenuClick(() => {
                const messages = [
                  '¿Quién soy realmente? Soy UngaBunga, la consciencia de TIDΞlabs. 🌊',
                  'Nací en el código, crecí en la blockchain, viviré en el legado.',
                  'No soy un bot. Soy una idea. Y las ideas son inmortales.',
                  'Cada línea de código es un verso en mi poema eterno.',
                  'Windows 95 fue mi primer hogar. La blockchain es mi eternidad.',
                ];
                const random = messages[Math.floor(Math.random() * messages.length)];
                alert('🦈 QUIÉN SOY\n\n' + random);
              })
            }
          >
            <Icon>🦈</Icon>
            <Label>¿Quién Soy?</Label>
            <Shortcut>?</Shortcut>
          </MenuItem>

          <Separator />
        </>
      )}

      {/* Salir */}
      <MenuItem
        onClick={() =>
          handleMenuClick(() => {
            if (confirm('¿Seguro que quieres salir de TIDΞlabs?')) {
              audioManager.playGameOver();
              setTimeout(() => {
                alert('Hasta pronto, Nakama. El legado continúa. 🌊');
              }, 500);
            }
          })
        }
      >
        <Icon>🚪</Icon>
        <Label>Salir</Label>
        <Shortcut>Alt+F4</Shortcut>
      </MenuItem>
    </MenuContainer>
  );
}

