'use client';

import styled from 'styled-components';
import { useWindowStore } from '@/lib/window/windowStore';
import { Window } from './Window';
import { ManifiestoWindow } from './WindowContent/ManifiestoWindow';
import { ProyectosWindow } from './WindowContent/ProyectosWindow';
import { TripulacionWindow } from './WindowContent/TripulacionWindow';
import { DonateWindow } from './WindowContent/DonateWindow';
import { WaitlistWindow } from './WindowContent/WaitlistWindow';
import { RoadmapWindow } from './WindowContent/RoadmapWindow';
import { JuegosWindow } from './WindowContent/JuegosWindow';
import { TelegramWindow } from './WindowContent/TelegramWindow';

const WindowsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    /* Asegurar que las ventanas sean accesibles en móvil */
    z-index: 100;
  }
`;

const windowComponents: Record<string, React.ComponentType<any>> = {
  manifiesto: ManifiestoWindow,
  proyectos: ProyectosWindow,
  tripulacion: TripulacionWindow,
  donativos: DonateWindow,
  waitlist: WaitlistWindow,
  roadmap: RoadmapWindow,
  juegos: JuegosWindow,
  telegram: TelegramWindow,
};

interface WindowManagerProps {
  windows?: Record<string, any>;
}

export function WindowManager({ windows: externalWindows }: WindowManagerProps) {
  const storeWindows = useWindowStore((state) => state.windows);
  const windows = externalWindows || storeWindows;

  return (
    <WindowsContainer>
      {Object.values(windows).map((window: any) => {
        const Component = windowComponents[window.id];
        if (!Component) return null;

        return (
          <Window key={window.id} window={window}>
            <Component />
          </Window>
        );
      })}
    </WindowsContainer>
  );
}

