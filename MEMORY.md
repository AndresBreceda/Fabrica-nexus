# MEMORY.md - Fabrica-nexus

Memoria del proyecto entre sesiones. Maximo 50 lineas, resume o elimina lo que ya no aporte.

## Estado actual
- Frontend modular implementado y verificado en `Frontend/` (SPEC-001).
- Vistas activas: Dashboard (6 KPIs + Telemetría), Orders, Order Details, Inventory, Analytics (OEE), Alerts, Users, Settings.
- Stack: React 19 + TypeScript + Vite + Tailwind CSS v4 + React Router v7 + Lucide Icons.

## Decisiones (y por qué)
- **Feature-Based Modular Architecture (`src/modules/*`)**: Separa dominios industriales para facilitar el crecimiento sin acoplamiento.
- **Tokens de Google Stitch integrados**: Paleta `#006194` (primary), `#006a63` (secondary), `#faf8ff` (surface) y fuentes `Inter` / `JetBrains Mono` con soporte `tnum` (tabular-nums).
- **TypeScript strict con `verbatimModuleSyntax`**: Todos los tipos importados explícitamente mediante `import type { ... }`.
- **Aprobación previa de dependencias y SPEC-001**: Conforme a la Constitución (Principio 1) y `AGENTS.md`.

## Aprendizajes y errores a evitar
- `verbatimModuleSyntax` requiere `import type` para evitar errores de compilación TS1484.
- `noUnusedLocals` activo en TS: limpiar imports antes de enviar a build.
- Verificar siempre compilación local antes de marcar tarea como finalizada (`tsc -b && vite build`).

## Próximos pasos
- Conexión con los endpoints de API en FastAPI (`backend/`).
- Integración de WebSocket / SSE para telemetría en tiempo real de sensores.