import styled from 'styled-components';

const ScanlineContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  animation: flicker 0.15s infinite;

  @keyframes flicker {
    0% {
      opacity: 0.97;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.97;
    }
  }
`;

export function CRTScanlines() {
  return <ScanlineContainer />;
}

