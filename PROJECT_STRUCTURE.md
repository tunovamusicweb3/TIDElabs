# 📁 Estructura del Proyecto TIDΞlabs

## Organización General

```
TIDElabs/
├── client/                    # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   │   ├── Desktop/      # Desktop Windows 95
│   │   │   ├── Windows/      # Sistema de ventanas
│   │   │   ├── AI/           # Chat UngaBunga
│   │   │   ├── Games/        # Minijuegos
│   │   │   └── Effects/      # Efectos visuales
│   │   ├── pages/            # Páginas
│   │   ├── lib/              # Utilidades
│   │   ├── contexts/         # React Contexts
│   │   ├── hooks/            # Custom Hooks
│   │   ├── App.tsx           # Componente principal
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Estilos globales
│   └── public/               # Assets estáticos
│
├── server/                    # Backend Express + tRPC
│   ├── _core/                # Framework core
│   ├── db.ts                 # Database queries
│   ├── routers.ts            # tRPC routers
│   └── mcp/                  # MCP Server
│
├── drizzle/                  # Database schema
│   ├── schema.ts             # Definiciones de tablas
│   └── migrations/           # Migraciones
│
├── shared/                   # Código compartido
│   ├── const.ts              # Constantes
│   └── types.ts              # Tipos TypeScript
│
├── docs/                     # Documentación
│   ├── guides/               # Guías de uso
│   ├── api/                  # Documentación API
│   └── README.md             # Índice de docs
│
├── README.md                 # Guía principal
├── AGENT.md                  # Base de conocimientos UngaBunga
├── CONTRIBUTING.md           # Guía de contribución
├── CHANGELOG.md              # Historial de cambios
├── HIDDEN_FEATURES.md        # Funcionalidades ocultas
├── PROJECT_STRUCTURE.md      # Este archivo
├── package.json              # Dependencias
├── tsconfig.json             # Configuración TypeScript
├── vite.config.ts            # Configuración Vite
└── drizzle.config.ts         # Configuración Drizzle ORM
```

## Descripción de Directorios

### `/client` - Frontend
- **components/Desktop**: Componentes del escritorio Windows 95
- **components/Windows**: Sistema de ventanas draggable
- **components/AI**: Chat MSN Messenger con UngaBunga
- **components/Games**: Minijuegos (FlappyShark, Snake, Memory)
- **components/Effects**: Efectos visuales (CRT, VHS, Boot Screen)
- **lib/**: Utilidades (Zustand store, audio manager, Groq client)
- **pages/**: Páginas principales (Home)
- **public/**: Assets estáticos

### `/server` - Backend
- **_core/**: Framework core (OAuth, context, tRPC setup)
- **db.ts**: Funciones de base de datos
- **routers.ts**: Definición de procedimientos tRPC
- **mcp/**: MCP Server para UngaBunga IA

### `/drizzle` - Database
- **schema.ts**: Definición de tablas y tipos
- **migrations/**: Scripts de migración

### `/shared` - Código Compartido
- **const.ts**: Constantes (APP_TITLE, APP_LOGO, etc.)
- **types.ts**: Tipos TypeScript compartidos

### `/docs` - Documentación
- **guides/**: Guías de uso y desarrollo
- **api/**: Documentación de API tRPC

## Stack Tecnológico

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Styled Components
- Tailwind CSS
- NES.css (componentes retro)
- Zustand (state management)
- react-rnd (ventanas draggable)

### Backend
- Express 4
- tRPC 11
- Drizzle ORM
- MongoDB

### Web3
- Wagmi
- RainbowKit

### IA
- Groq SDK
- MCP Server

## Características Principales

### 🖥️ Desktop Windows 95
- Interfaz nostálgica completamente funcional
- 8 ventanas draggable con maximizar/minimizar
- Taskbar con botón Start y reloj

### 💬 Chat MSN Messenger
- UngaBunga Avatar animado
- Emoticonos retro automáticos
- Efectos de sonido sintetizados
- Indicador de escritura

### 🎮 Minijuegos
- FlappyShark: Pez saltador
- SnakeGame: Serpiente retro
- MemoryGame: Cartas para emparejar

### 🤖 IA UngaBunga
- Base de conocimientos avanzada
- MCP Server con libre albedrío Web3
- Respuestas dinámicas personalizadas

### 📱 Responsive Design
- Desktop: Interfaz completa
- Tablet (768px): Adaptada
- Móvil (480px): Touch-friendly

## Cómo Contribuir

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para:
- Estándares de código
- Procesos de PR
- Debugging
- Checklist de contribución

## Documentación Adicional

- [README.md](./README.md) - Guía completa
- [AGENT.md](./AGENT.md) - Base de conocimientos de UngaBunga
- [HIDDEN_FEATURES.md](./HIDDEN_FEATURES.md) - Funcionalidades ocultas
- [CHANGELOG.md](./CHANGELOG.md) - Historial de versiones

