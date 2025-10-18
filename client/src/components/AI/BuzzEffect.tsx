import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import { audioManager } from '@/lib/audio/audioManager';

const buzzAnimation = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  10% { transform: translate(-2px, -2px) rotate(-1deg); }
  20% { transform: translate(2px, 2px) rotate(1deg); }
  30% { transform: translate(-2px, 2px) rotate(-1deg); }
  40% { transform: translate(2px, -2px) rotate(1deg); }
  50% { transform: translate(-3px, 0) rotate(-2deg); }
  60% { transform: translate(3px, 0) rotate(2deg); }
  70% { transform: translate(-2px, -2px) rotate(-1deg); }
  80% { transform: translate(2px, 2px) rotate(1deg); }
  90% { transform: translate(-1px, 1px) rotate(-0.5deg); }
`;

const BuzzContainer = styled.div<{ $intensity: number }>`
  animation: ${buzzAnimation} ${(props) => 0.5 / props.$intensity}s ease-in-out;
`;

const BuzzParticle = styled.div<{ $delay: number }>`
  position: fixed;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, #ffff00, #ff8800);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  animation: buzz-particle 0.6s ease-out forwards;
  animation-delay: ${(props) => props.$delay}s;

  @keyframes buzz-particle {
    0% {
      opacity: 1;
      transform: translate(0, 0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(var(--tx), var(--ty)) scale(0);
    }
  }
`;

interface BuzzEffectProps {
  intensity?: number; // 1-5
  duration?: number; // ms
  onComplete?: () => void;
}

export function BuzzEffect({
  intensity = 3,
  duration = 500,
  onComplete,
}: BuzzEffectProps) {
  const [particles, setParticles] = useState<Array<{ id: string; delay: number }>>([]);

  useEffect(() => {
    // Reproducir sonido de zumbido
    audioManager.playBuzz();

    // Crear partículas
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: `particle-${i}`,
      delay: (i * 0.1) / intensity,
    }));
    setParticles(newParticles);

    // Limpiar después de la duración
    const timer = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, intensity, onComplete]);

  return (
    <>
      <BuzzContainer $intensity={intensity} />
      {particles.map((particle) => (
        <BuzzParticle
          key={particle.id}
          $delay={particle.delay}
          style={{
            left: `${Math.random() * window.innerWidth}px`,
            top: `${Math.random() * window.innerHeight}px`,
            '--tx': `${(Math.random() - 0.5) * 100}px`,
            '--ty': `${(Math.random() - 0.5) * 100}px`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

