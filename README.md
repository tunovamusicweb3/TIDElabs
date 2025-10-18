# 🌊 TIDΞlabs - Web3 Landing Page

> **La primera landing Web3 nostálgica con experiencia de escritorio Windows 95 completamente funcional**

Una experiencia inmersiva que combina la estética retro de Windows 95 con la tecnología Web3 moderna. TIDΞlabs es más que una landing page: es un viaje poético hacia el futuro descentralizado.

## 🎯 Visión

Construir la primera landing Web3 que sea una experiencia de escritorio Windows 95 completamente funcional, donde cada píxel respira nostalgia y cada línea de código es un verso hacia el futuro descentralizado.

**Aquí no buscamos usuarios. Buscamos NAKAMAS.**
**Aquí no vendemos productos. Construimos LEGADO.**
**Aquí no aceptamos dinero fiat. Solo CRYPTO.**

## ✨ Características Principales

### 🖥️ Desktop Windows 95 Auténtico
- Grid de 8 iconos draggable en el escritorio
- Taskbar retro con reloj y botón Start
- StartMenu funcional
- Efectos visuales CRT Scanlines y VHS Noise
- Pantalla de Boot animada con estilo retro

### 🪟 Sistema de Ventanas Avanzado
- **8 Ventanas de Contenido:**
  1. **Manifiesto** - Misión, objetivos y pilares de TIDΞlabs
  2. **Proyectos** - TUNOVA, TRB, RAZA/AZAR, DAO, Academy, Chalets
  3. **Tripulación** - Web3Sh4rK, UngaBunga, Poseidón y comunidad
  4. **Donativos** - Dual path Web3 + opciones tradicionales
  5. **Waitlist** - Registro para early supporters
  6. **Roadmap** - Timeline 2018-2027+ con hitos clave
  7. **Juegos** - Arcade retro con minijuegos funcionales
  8. **Telegram** - Chat directo con la comunidad

- Ventanas draggable con Zustand
- Minimizar, maximizar, cerrar funcional
- Animaciones suaves de entrada/salida

### 🎮 Minijuegos Arcade Retro
- **FlappyShark** - Evita obstáculos con tu pez dorado
- **Memory Nakama** - Encuentra pares de cartas retro
- **Crypto Snake** - Come tokens y crece
- Sistema de puntuación y top scores
- Canvas-based para máximo rendimiento

### 🤖 UngaBunga AI Chat
- Chat MSN Messenger nostálgico
- Respuestas dinámicas con IA (Groq SDK)
- Indicador de Online con pulsación
- Timestamps en cada mensaje
- Efectos de zumbido (vibración)
- Animaciones de escritura
- Interfaz retro auténtica

### 💰 Sistema de Donativos Dual
- **Camino Web3 (Preferido):**
  - Conectar wallet con RainbowKit
  - Transacciones en blockchain
  - Beneficios exclusivos para donantes Web3
  
- **Camino Tradicional:**
  - Opciones de pago convencionales
  - Beneficios reducidos (incentivando Web3)

### 🎨 Diseño Visual Premium
- Colores retro auténticos (Windows 95 palette)
- Tipografía MS Sans Serif
- Bordes inset/outset 3D
- Gradientes retro elegantes
- Efectos de sombra y profundidad
- Animaciones suaves sin glitch

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - UI library
- **Next.js 14** - Framework
- **TypeScript** - Type safety
- **Styled Components** - CSS-in-JS retro styling
- **Zustand** - State management
- **react-rnd** - Draggable windows
- **Wagmi** - Web3 interactions
- **RainbowKit** - Wallet connection

### Backend
- **Express.js** - Server
- **tRPC** - Type-safe API
- **MongoDB** - Database
- **Drizzle ORM** - Database layer

### IA & APIs
- **Groq SDK** - LLM para UngaBunga AI
- **Alchemy** - Web3 infrastructure
- **WalletConnect** - Wallet connectivity

### Utilidades
- **Tailwind CSS** - Utility styling
- **Vite** - Build tool
- **pnpm** - Package manager

## 📦 Instalación

### Requisitos
- Node.js 18+
- pnpm 8+
- MongoDB (local o Atlas)

### Pasos

```bash
# Clonar repositorio
git clone <repo-url>
cd tidelabs-landing

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local

# Llenar las claves API necesarias en .env.local:
# - GROQ_API_KEY
# - NEXT_PUBLIC_ALCHEMY_KEY
# - NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
# - MONGODB_URI
# - JWT_SECRET

# Ejecutar servidor de desarrollo
pnpm dev

# Abrir en navegador
# http://localhost:3000
```

## 🚀 Uso

### Desarrollo
```bash
# Servidor de desarrollo con hot reload
pnpm dev

# Build para producción
pnpm build

# Ejecutar build de producción
pnpm start

# Linting
pnpm lint
```

### Base de Datos
```bash
# Generar y ejecutar migraciones
pnpm db:push

# Abrir Drizzle Studio
pnpm db:studio
```

## 📁 Estructura del Proyecto

```
tidelabs-landing/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Desktop/
│   │   │   │   ├── Desktop.tsx          # Componente principal del escritorio
│   │   │   │   ├── DesktopIcon.tsx      # Iconos draggable
│   │   │   │   ├── Taskbar.tsx          # Barra de tareas
│   │   │   │   └── StartMenu.tsx        # Menú de inicio
│   │   │   ├── Windows/
│   │   │   │   ├── Window.tsx           # Componente base de ventana
│   │   │   │   ├── WindowManager.tsx    # Gestor de ventanas
│   │   │   │   └── WindowContent/
│   │   │   │       ├── ManifiestoWindow.tsx
│   │   │   │       ├── ProyectosWindow.tsx
│   │   │   │       ├── TripulacionWindow.tsx
│   │   │   │       ├── DonateWindow.tsx
│   │   │   │       ├── WaitlistWindow.tsx
│   │   │   │       ├── RoadmapWindow.tsx
│   │   │   │       ├── JuegosWindow.tsx
│   │   │   │       └── TelegramWindow.tsx
│   │   │   ├── Games/
│   │   │   │   ├── FlappyShark.tsx      # Minijuego FlappyShark
│   │   │   │   ├── MemoryGame.tsx       # Minijuego Memory
│   │   │   │   └── SnakeGame.tsx        # Minijuego Snake
│   │   │   ├── AI/
│   │   │   │   └── UngaBungaChatMSN.tsx # Chat IA nostálgico
│   │   │   └── Effects/
│   │   │       ├── BootScreen.tsx       # Pantalla de boot
│   │   │       ├── CRTScanlines.tsx     # Efecto CRT
│   │   │       └── VHSNoise.tsx         # Efecto VHS
│   │   ├── lib/
│   │   │   ├── window/
│   │   │   │   └── windowStore.ts       # Zustand store
│   │   │   ├── audio/
│   │   │   │   └── audioManager.ts      # Gestor de audio
│   │   │   ├── ai/
│   │   │   │   └── groqClient.ts        # Cliente Groq
│   │   │   └── trpc.ts                  # Cliente tRPC
│   │   ├── pages/
│   │   │   └── Home.tsx                 # Página principal
│   │   ├── App.tsx                      # Componente raíz
│   │   ├── main.tsx                     # Entry point
│   │   └── index.css                    # Estilos globales
│   └── public/                          # Assets estáticos
├── server/
│   ├── routers.ts                       # Rutas tRPC
│   ├── db.ts                            # Helpers de BD
│   └── _core/                           # Framework core
├── drizzle/
│   └── schema.ts                        # Esquema de BD
├── .env.example                         # Variables de entorno
├── README.md                            # Este archivo
└── package.json
```

## 🎮 Cómo Jugar

### FlappyShark
1. Abre la ventana de Juegos
2. Haz clic en "FlappyShark"
3. Haz clic para saltar y evita los obstáculos
4. Acumula puntos

### Memory Nakama
1. Abre la ventana de Juegos
2. Haz clic en "Memory Nakama"
3. Encuentra pares de cartas iguales
4. Completa el juego en el menor tiempo posible

### Crypto Snake
1. Abre la ventana de Juegos
2. Haz clic en "Crypto Snake"
3. Come los tokens (cuadrados verdes)
4. No choques con las paredes ni contigo mismo

## 💬 Chat con UngaBunga

1. Haz clic en el botón de chat (esquina inferior derecha)
2. Escribe tu pregunta
3. Presiona Enter o haz clic en "→"
4. UngaBunga responderá con sabiduría poética

**Efectos especiales:**
- 🔔 Botón de zumbido para vibraciones nostálgicas
- ⏰ Timestamps en cada mensaje
- 💬 Indicador de escritura cuando UngaBunga responde

## 🌐 Variables de Entorno

```env
# Base de datos
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/tidelabs

# Autenticación
JWT_SECRET=your-secret-key-here

# Groq AI
GROQ_API_KEY=your-groq-api-key

# Web3 - Alchemy
NEXT_PUBLIC_ALCHEMY_KEY=your-alchemy-key

# Web3 - WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-walletconnect-id

# OAuth (Manus)
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_APP_ID=your-app-id

# Propietario
OWNER_NAME=Web3Sh4rK
OWNER_OPEN_ID=your-owner-id

# Branding
VITE_APP_TITLE=TIDΞlabs
VITE_APP_LOGO=https://your-logo-url.png
```

## 🎨 Personalización

### Colores Retro
Edita `client/src/index.css` para cambiar la paleta de colores:
```css
:root {
  --primary: #000080;      /* Azul Windows 95 */
  --secondary: #c0c0c0;    /* Gris claro */
  --accent: #0000ff;       /* Azul brillante */
  --success: #00ff00;      /* Verde retro */
}
```

### Contenido de Ventanas
Cada ventana tiene su propio componente en `client/src/components/Windows/WindowContent/`:
- Edita el contenido directamente en los archivos `.tsx`
- Los cambios se reflejan inmediatamente en desarrollo

### Respuestas de UngaBunga
Edita el array `UNGABUNYA_RESPONSES` en `UngaBungaChatMSN.tsx`:
```typescript
const UNGABUNYA_RESPONSES = [
  'Tu respuesta personalizada 🌊',
  // Más respuestas...
];
```

## 🚀 Despliegue

### Opción 1: Vercel (Recomendado)
```bash
# Conectar repositorio a Vercel
# Las variables de entorno se configuran en el dashboard
# Deploy automático en cada push a main
```

### Opción 2: Docker
```bash
# Construir imagen
docker build -t tidelabs .

# Ejecutar contenedor
docker run -p 3000:3000 tidelabs
```

### Opción 3: Manual
```bash
# Build
pnpm build

# Ejecutar
pnpm start
```

## 📊 Estadísticas del Proyecto

- **Componentes React:** 25+
- **Minijuegos:** 3 (FlappyShark, Memory, Snake)
- **Ventanas:** 8
- **Líneas de código:** 5000+
- **Animaciones CSS:** 15+
- **Efectos visuales:** CRT, VHS, Scanlines, Glitch

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Equipo

- **Web3Sh4rK** - Visión y dirección
- **UngaBunga** - IA y asistencia
- **Poseidón** - Desarrollo técnico
- **Comunidad Nakama** - Soporte y feedback

## 🌊 Filosofía

> "En la intersección del pasado nostálgico y el futuro descentralizado, construimos un legado eterno."

TIDΞlabs no es solo código. Es una declaración de intenciones. Es nostalgia con propósito. Es Web3 con alma.

**NAKAMAS > Usuarios**
**LEGADO > Capital**
**CRYPTO > FIAT**

## 📞 Contacto

- **Telegram:** [@Web3Sh4rK](https://t.me/Web3Sh4rK)
- **Twitter:** [@TIDElabs](https://twitter.com/TIDElabs)
- **Discord:** [TIDΞlabs Community](https://discord.gg/tidelabs)

## 🙏 Agradecimientos

Gracias a todos los Nakamas que creen en esta visión. Este proyecto es para ustedes.

---

**Hecho con ❤️ y nostalgia por TIDΞlabs**

*"El futuro es descentralizado. El pasado es retro. Nosotros somos ambos."*

