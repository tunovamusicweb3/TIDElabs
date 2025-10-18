# 🤝 Guía de Contribución - TIDΞlabs

Gracias por tu interés en contribuir a TIDΞlabs. Este documento proporciona directrices y procesos para contribuir al proyecto.

## 📋 Código de Conducta

Todos los contribuyentes deben respetar nuestro código de conducta basado en:
- **Respeto mutuo** entre la comunidad
- **Inclusión** de todas las voces
- **Transparencia** en las decisiones
- **Enfoque en NAKAMAS**, no en capital

## 🚀 Cómo Contribuir

### 1. Reportar Bugs

Si encuentras un bug:

1. Verifica que no haya sido reportado ya
2. Crea un issue con:
   - Título descriptivo
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si es relevante

### 2. Sugerir Features

Para sugerir nuevas características:

1. Abre un issue con el tag `enhancement`
2. Describe claramente la feature
3. Explica por qué sería útil
4. Proporciona ejemplos de uso

### 3. Enviar Pull Requests

#### Preparación
```bash
# Fork el repositorio
git clone https://github.com/tu-usuario/tidelabs-landing.git
cd tidelabs-landing

# Crear rama para tu feature
git checkout -b feature/nombre-descriptivo

# Instalar dependencias
pnpm install
```

#### Desarrollo
```bash
# Ejecutar servidor de desarrollo
pnpm dev

# Ejecutar linting
pnpm lint

# Ejecutar tests (cuando estén disponibles)
pnpm test
```

#### Commit
```bash
# Commits claros y descriptivos
git commit -m "feat: agregar nueva funcionalidad"
git commit -m "fix: corregir bug en componente X"
git commit -m "docs: actualizar README"
```

#### Push y Pull Request
```bash
# Push a tu fork
git push origin feature/nombre-descriptivo

# Crear PR en GitHub con:
# - Descripción clara de cambios
# - Referencias a issues relacionados
# - Screenshots si es UI
# - Checklist de testing
```

## 📐 Estándares de Código

### TypeScript
- Usar tipos explícitos
- Evitar `any`
- Comentar tipos complejos

```typescript
// ✅ Bien
interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// ❌ Evitar
const message: any = { ... };
```

### React Components
- Usar functional components
- Hooks en lugar de class components
- Nombres descriptivos

```typescript
// ✅ Bien
export function UngaBungaChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  return <div>...</div>;
}

// ❌ Evitar
export const chat = () => { ... };
```

### Styled Components
- Usar props transientes con `$` prefix
- Evitar props no-estilizadas en DOM

```typescript
// ✅ Bien
const MessageBubble = styled.div<{ $isUser?: boolean }>`
  background: ${props => props.$isUser ? '#0000ff' : '#dfdfdf'};
`;

// ❌ Evitar
const MessageBubble = styled.div<{ isUser?: boolean }>`
  background: ${props => props.isUser ? '#0000ff' : '#dfdfdf'};
`;
```

### CSS/Styling
- Mantener consistencia con paleta retro
- Usar variables CSS
- Comentar efectos complejos

```css
/* ✅ Bien */
.button {
  background: var(--primary);
  border: 2px solid var(--border);
  transition: all 0.2s ease;
}

/* ❌ Evitar */
.button {
  background: #000080;
  border: 2px solid #808080;
}
```

## 📁 Estructura de Carpetas

Mantener la estructura consistente:

```
components/
├── Desktop/           # Componentes de escritorio
├── Windows/           # Sistema de ventanas
├── Games/             # Minijuegos
├── AI/                # Componentes de IA
└── Effects/           # Efectos visuales

lib/
├── window/            # Lógica de ventanas
├── audio/             # Gestor de audio
├── ai/                # Cliente de IA
└── trpc.ts            # Cliente tRPC
```

## 🧪 Testing

Cuando agregues features nuevas:

1. Prueba manualmente en desarrollo
2. Verifica en diferentes navegadores
3. Prueba responsividad
4. Valida accesibilidad

```bash
# Ejecutar tests (cuando estén disponibles)
pnpm test

# Tests con coverage
pnpm test:coverage
```

## 📝 Documentación

Actualizar documentación para:
- Nuevas features
- Cambios en API
- Nuevos componentes
- Instrucciones de setup

```markdown
# Nuevo Feature

## Descripción
Qué hace y por qué

## Uso
Ejemplo de código

## Configuración
Variables de entorno necesarias
```

## 🎨 Cambios de UI/UX

Para cambios visuales:

1. Mantener estética retro Windows 95
2. Usar paleta de colores consistente
3. Proporcionar screenshots before/after
4. Asegurar accesibilidad

## 🔄 Proceso de Review

1. **Automated Checks**
   - Linting
   - Type checking
   - Build validation

2. **Code Review**
   - Mínimo 1 reviewer
   - Feedback constructivo
   - Aprobación requerida

3. **Testing**
   - Pruebas manuales
   - Verificación en staging
   - Aprobación final

## 📦 Release Process

1. Actualizar `package.json` version
2. Actualizar `CHANGELOG.md`
3. Crear git tag
4. Crear release en GitHub
5. Deploy a producción

## 🐛 Debugging

### Desarrollo
```bash
# Logs detallados
DEBUG=* pnpm dev

# DevTools de React
# Instalar React DevTools extension

# Drizzle Studio
pnpm db:studio
```

### Producción
```bash
# Logs de servidor
pnpm start --verbose

# Monitoreo
# Ver logs en plataforma de deployment
```

## 📚 Recursos

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Styled Components Docs](https://styled-components.com)
- [tRPC Docs](https://trpc.io)
- [Zustand Docs](https://github.com/pmndrs/zustand)

## 🎯 Prioridades

Contribuciones prioritarias:
1. Bug fixes críticos
2. Performance improvements
3. Nuevos minijuegos
4. Mejoras de UI/UX
5. Documentación

## 💬 Comunicación

- **Issues:** Para bugs y features
- **Discussions:** Para preguntas
- **Telegram:** Para chat en vivo
- **Discord:** Para comunidad

## ✅ Checklist para PR

Antes de enviar un PR:

- [ ] Código sigue estándares del proyecto
- [ ] Tests pasan (si existen)
- [ ] Linting sin errores
- [ ] TypeScript sin errores
- [ ] Documentación actualizada
- [ ] Screenshots para cambios UI
- [ ] Commits limpios y descriptivos
- [ ] Branch actualizada con main

## 🙏 Agradecimiento

Todos los contribuyentes son valorados. Tu trabajo ayuda a construir el futuro descentralizado.

**¡Gracias por ser parte de TIDΞlabs!**

---

*"Juntos construimos legado, no dinero."*

