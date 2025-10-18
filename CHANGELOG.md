# Changelog - TIDΞlabs

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto sigue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-18

### ✨ Added (Agregado)

#### Interfaz Desktop Windows 95
- Desktop completamente funcional con grid de iconos
- Sistema de ventanas draggable con Zustand
- Taskbar retro con reloj y botón Start
- StartMenu con opciones
- Efectos visuales CRT Scanlines
- Efectos visuales VHS Noise
- Pantalla de Boot animada con estilo retro

#### Sistema de Ventanas
- 8 ventanas de contenido funcionales:
  - Manifiesto - Misión, objetivos y pilares
  - Proyectos - Información de 6 proyectos Web3
  - Tripulación - Perfiles del equipo
  - Donativos - Sistema dual Web3 + tradicional
  - Waitlist - Registro de early supporters
  - Roadmap - Timeline 2018-2027+
  - Juegos - Arcade retro
  - Telegram - Chat con comunidad

- Ventanas con controles:
  - Minimizar, maximizar, cerrar
  - Draggable por header
  - Animaciones suaves
  - Z-index management

#### Minijuegos Arcade
- **FlappyShark**
  - Canvas-based gameplay
  - Sistema de puntuación
  - Obstáculos dinámicos
  - Colisión detection

- **Memory Nakama**
  - Grid de cartas retro
  - Lógica de pares
  - Timer
  - Contador de movimientos

- **Crypto Snake**
  - Movimiento en grid
  - Colisión con paredes
  - Colisión consigo mismo
  - Tokens para comer
  - Crecimiento dinámico

- Sistema de Top Scores compartido

#### Chat UngaBunga AI
- Interfaz MSN Messenger nostálgica
- Integración con Groq LLM
- Respuestas dinámicas y poéticas
- Indicador de Online con pulsación
- Timestamps en mensajes
- Efectos de zumbido (vibración)
- Animaciones de escritura
- Soporte para múltiples idiomas

#### Web3 Integration
- Preparación para RainbowKit
- Preparación para Wagmi
- Estructura para conectar wallets
- Sistema de donativos Web3-ready

#### Styling & Effects
- Paleta de colores Windows 95 auténtica
- Tipografía MS Sans Serif
- Bordes inset/outset 3D
- Gradientes retro elegantes
- Animaciones CSS suaves:
  - slideInUp, slideInDown
  - fadeInScale
  - bounce-soft
  - glow effects

#### Backend
- Express.js server
- tRPC API setup
- MongoDB integration
- Drizzle ORM schema
- JWT authentication ready

#### Documentación
- README.md completo
- CONTRIBUTING.md
- CHANGELOG.md
- .env.example con todas las variables

### 🐛 Fixed (Corregido)

- Corregido error de React con props transientes en styled-components
- Reemplazado componentes con props dinámicas por componentes separados
- Eliminado glitch effect feo, reemplazado por efectos retro elegantes

### ⚙️ Changed (Cambiado)

- Mejorada UI/UX con animaciones más suaves
- Optimizadas transiciones CSS
- Mejorado feedback visual en interacciones
- Refactorizado UngaBungaChatMSN para mejor mantenibilidad

## [0.1.0] - 2025-10-18

### ✨ Added

- Inicialización del proyecto con Next.js 14
- Setup de TypeScript
- Configuración de Tailwind CSS
- Setup de styled-components
- Instalación de dependencias Web3
- Instalación de dependencias de IA
- Setup de MongoDB
- Setup de tRPC

---

## Roadmap Futuro

### v1.1.0
- [ ] Integración completa de RainbowKit
- [ ] Sistema de transacciones Web3
- [ ] Persistencia de scores en BD
- [ ] Notificaciones push
- [ ] Modo oscuro/claro

### v1.2.0
- [ ] Más minijuegos
- [ ] Leaderboard global
- [ ] Sistema de logros
- [ ] Integración de redes sociales
- [ ] Analytics

### v2.0.0
- [ ] Versión mobile
- [ ] PWA support
- [ ] Offline mode
- [ ] Multiplayer games
- [ ] NFT integration

---

## Notas de Versión

### v1.0.0 - Lanzamiento Inicial

Esta es la versión inicial de TIDΞlabs. Incluye toda la funcionalidad core:

✅ **Completado:**
- Desktop Windows 95 funcional
- 8 ventanas de contenido
- 3 minijuegos arcade
- Chat UngaBunga AI
- Sistema de donativos preparado
- Documentación completa

⚠️ **En Desarrollo:**
- Integración Web3 completa
- Persistencia de datos
- Sistema de usuarios

🔄 **Próximas Versiones:**
- Más minijuegos
- Leaderboards
- Integración NFT

---

## Cómo Reportar Cambios

Para reportar cambios o bugs:
1. Abre un issue en GitHub
2. Usa labels apropiados (bug, feature, enhancement)
3. Proporciona descripción detallada
4. Incluye pasos para reproducir (si es bug)

---

**Última actualización:** 2025-10-18
**Versión actual:** 1.0.0
**Estado:** Estable

