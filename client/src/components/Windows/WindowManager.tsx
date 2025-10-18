'use client';

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

export function WindowManager() {
  const windows = useWindowStore((state) => state.windows);

  return (
    <>
      {Object.values(windows).map((window) => {
        const Component = windowComponents[window.id];
        if (!Component) return null;

        return (
          <Window key={window.id} window={window}>
            <Component />
          </Window>
        );
      })}
    </>
  );
}

