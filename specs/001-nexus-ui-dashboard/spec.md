# SPEC-001: Implementación del Frontend Modular - Nexus Production Intelligence Dashboard

## 1. Propósito y Contexto
Recrear las interfaces de producción industrial definidas en Google Stitch (`projects/17235279747636922349`) en el directorio `Frontend/` de Fabrica-nexus, utilizando una arquitectura modular de alto rendimiento con React 19, TypeScript, Tailwind CSS, Lucide Icons y React Router.

## 2. Requisitos Funcionales y Vistas
- **App Shell**: Layout industrial con Sidebar contextual (con indicadores de estado y conteo de alertas en tiempo real), Header con búsqueda rápida (⌘K), selector de plantas y perfil del usuario.
- **Módulo Dashboard (`/`)**:
  - Cluster instrumental de 6 KPIs: Producción Total, Eficiencia OEE, Órdenes Activas, Tiempo de Inactividad (Downtime), Tasa de Scrap y Consumo Energético.
  - Grilla de telemetría de líneas de producción (Líneas A, B, C, D) con estados en tiempo real (Operativa, Mantenimiento, Parada).
  - Feed de eventos e incidentes recientes.
- **Módulo Órdenes (`/orders`)**:
  - Listado de órdenes de producción con filtrado por estado (*In Progress*, *Pending*, *Completed*), prioridad y código de lote.
- **Módulo Detalle de Orden (`/orders/:id`)**:
  - Vista en profundidad de orden: desglose de lote, etapas de ensamblado/maquinado, BOM (lista de materiales) y métricas de calidad.
- **Módulo Inventario (`/inventory`)**:
  - Control de existencias de materias primas y partes críticas con alertas de reorden y métricas de rotación.
- **Módulo Analíticas (`/analytics`)**:
  - Desglose OEE (Disponibilidad, Desempeño, Calidad) y tendencias de throughput.
- **Módulo Alertas (`/alerts`)**:
  - Centro de notificaciones con severidades (*Critical*, *Warning*, *Info*) y botón de acuse de recibo.
- **Módulo Usuarios y Roles (`/users`)**:
  - Control de accesos de operadores, supervisores y administradores de planta.
- **Módulo Configuración (`/settings`)**:
  - Parámetros de umbral de sensores, turnos laborales y configuración de planta.

## 3. Arquitectura Técnica
- **Patrón**: Screaming Architecture / Feature-Based Modular Architecture.
- **Estructura**:
  - `Frontend/src/app/`: Enrutamiento global (`AppRoutes.tsx`).
  - `Frontend/src/shared/`: Componentes UI reutilizables (Button, Badge, Card, etc.), layouts y tipos transversales.
  - `Frontend/src/modules/<feature>/`: Submódulos independientes por dominio con sus respectivas páginas, componentes locales y tipos.
- **Design Tokens**: Tokens del tema Stitch integrados en Tailwind CSS (Primary `#006194`, Secondary `#006a63`, Surface `#faf8ff`, tipografía `Inter` y `JetBrains Mono`).

## 4. Verificación
- Compilación de TypeScript sin errores (`tsc -b`).
- Compilación de Vite (`vite build`).
- Navegación reactiva completa entre todas las rutas del dashboard.
