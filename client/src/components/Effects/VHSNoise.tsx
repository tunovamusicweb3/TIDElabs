import styled from 'styled-components';

const NoiseContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" seed="2" /></filter><rect width="100" height="100" fill="rgba(0,0,0,0.02)" filter="url(%23noise)" /></svg>');
  animation: vhsGlitch 0.3s infinite;
  opacity: 0.03;

  @keyframes vhsGlitch {
    0% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(-2px);
    }
    40% {
      transform: translateX(2px);
    }
    60% {
      transform: translateX(-1px);
    }
    80% {
      transform: translateX(1px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export function VHSNoise() {
  return <NoiseContainer />;
}

