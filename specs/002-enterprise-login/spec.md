# SPEC-002: Enterprise Login — Variante Minimal (Tarjeta Centrada)

## 1. Objetivo
Implementar la interfaz de inicio de sesión de Fabrica-nexus basada en el mockup Stitch **"Enterprise Login - Minimal"** (screen ID: `a64a649178c542bf98b3ad26b3f03d65`, proyecto `17235279747636922349`). Es una tarjeta de login simple, centrada, limpia — sin panel lateral de telemetría — con fidelidad estética exacta al diseño Stitch.

## 2. Contexto
El mockup es la variante compacta del login: una sola tarjeta blanca sobre el fondo `surface-container-low` de Stitch (`#f2f3ff`). El usuario ve únicamente el formulario de acceso más el botón de SSO corporativo. Sin sidebar, sin header del dashboard.

## 3. Diseño de Referencia (Stitch Screen a64a649178c542bf98b3ad26b3f03d65)

### Layout General
- Fondo de pantalla completa: `#f2f3ff` (surface-container-low)
- Tarjeta centrada en página: fondo blanco (`#ffffff`), borde `1px solid #e2e8f0`, `border-radius: 8px`, sombra suave `0 1px 3px rgba(15,23,42,0.08)`, padding `32px`, ancho ~400px, centrada vertical y horizontal.

### Header de Aplicación (barra superior)
- Izquierda: Ícono cuadrado azul con "N" + texto **"Nexus"** en bold + subtexto **"ENTERPRISE PORTAL"** en `JetBrains Mono` uppercase pequeño.
- Derecha: Links de texto: **"Ayuda · Soporte IT · Seguridad"** en `#475569`, `font-size: 12px`.

### Contenido de la Tarjeta
1. **Logo**: Ícono cuadrado azul (Factory/Building icon de Lucide) con fondo `#006194`, blanco, `border-radius: 8px`, 40×40px centrado.
2. **Título**: `"Iniciar Sesión"` — `Inter`, 20px, `font-weight: 600`, `#131b2e` (on-surface).
3. **Subtítulo**: `"Accede a tu cuenta de Nexus Manufacturing"` — 13px, `#3f4850` (on-surface-variant).
4. **Campo Email/ID** (label: `"Correo electrónico o ID de usuario"`):
   - Input height 36px, border `1px solid #bfc7d2`, focus `1px solid #006194` + ring, `border-radius: 4px`.
   - Placeholder: `ej. carlos.mendoza@nexusmfg.com` en `#94A3B8`.
5. **Campo Contraseña** (label: `"Contraseña"`):
   - Link "¿Olvidaste la contraseña?" alineado a la derecha, `#006194`, `font-size: 12px`.
   - Input igual al campo de email + botón toggle Eye/EyeOff de Lucide a la derecha (ícono `16px`, `#475569`).
6. **Checkbox**: `"Recordar sesión"` — checkbox pequeño + label `12px`, `#475569`.
7. **Botón Primario** `"Acceder →"`:
   - Fondo `#006194`, texto blanco, width 100%, height 36px, `border-radius: 4px`, `font-weight: 500`, `font-size: 14px`.
   - Hover: `#004b73`.
   - Ícono flecha derecha de Lucide (`ArrowRight`, 16px) al final del texto.
8. **Divisor**: punto `•` centrado con líneas horizontales `#e2e8f0`.
9. **Botón SSO Corporativo** `"Continuar con SSO Corporativo"`:
   - Fondo blanco, borde `1px solid #bfc7d2`, texto `#131b2e`, width 100%, height 36px, `border-radius: 4px`.
   - Ícono `LayoutGrid` de Lucide (16px, `#475569`) a la izquierda del texto.
   - Hover: fondo `#f2f3ff`.
   - Al hacer clic: toast/notificación visible "SSO en configuración — contacta a IT para activar."
10. **Link de soporte**: `"¿Necesitas acceso o asistencia? Contactar a Soporte"` — `12px`, `#475569`, centrado. "Contactar a Soporte" en `#006194`.

### Footer de Aplicación (barra inferior)
- Izquierda: `"© 2025 Nexus Manufacturing · Enterprise Portal"` — `11px`, `#707881`.
- Derecha: links `"Términos de Servicio · Privacidad · Soporte de TI · Estado del Sistema"` — `11px`, `#707881`.

## 4. Requisitos Funcionales
- **Ruta:** `/login`, accesible sin el `MainLayout` (sidebar/header del dashboard).
- **Navegación:**
  - Al enviar el formulario con email y contraseña no vacíos → redirige a `/`.
  - Al hacer clic en SSO → muestra notificación de mock.
  - Desde el Header del dashboard → botón "Cerrar Sesión" (ícono `LogOut`) redirige a `/login`.
- **Validaciones:** email y contraseña requeridos; mensaje de error inline si están vacíos al enviar.
- **Toggle contraseña:** alterna entre `type="password"` y `type="text"`.
- **Checkbox recordar:** estado local, no afecta lógica real.

## 5. Arquitectura y Archivos Afectados
- `frontend/src/modules/auth/pages/LoginPage.tsx` — Contenedor completo: header app, tarjeta centrada, footer app.
- `frontend/src/modules/auth/components/LoginForm.tsx` — Formulario interno de la tarjeta.
- `frontend/src/modules/auth/types/index.ts` — Tipos del módulo auth.
- `frontend/src/app/routes/AppRoutes.tsx` — Ruta `/login` fuera de `<MainLayout>`.
- `frontend/src/shared/layouts/Header.tsx` — Botón logout hacia `/login`.

## 6. Tokens de Diseño a Usar (Stitch Design System "Nexus Precision Industrial")
```
primary:        #006194
on-surface:     #131b2e
on-surface-var: #3f4850
outline:        #707881
outline-variant:#bfc7d2
surface:        #faf8ff
surface-cl-low: #f2f3ff
font-primary:   Inter
font-mono:      JetBrains Mono
border-radius:  4px (inputs/botones), 8px (tarjeta)
```

## 7. Criterios de Aceptación
- [ ] `/login` renderiza la tarjeta centrada sobre fondo `#f2f3ff`.
- [ ] Header de app con logo Nexus y links de navegación superiores.
- [ ] Footer con copyright y links legales.
- [ ] Campos email y contraseña con sus labels, placeholder, y estilo correcto.
- [ ] Toggle Eye/EyeOff funcional.
- [ ] Link "¿Olvidaste la contraseña?" visible.
- [ ] Checkbox "Recordar sesión" funcional.
- [ ] Botón "Acceder →" (con ícono) redirige a `/` si los campos no están vacíos.
- [ ] Botón SSO muestra notificación mock.
- [ ] Botón logout en Header del dashboard redirige a `/login`.
- [ ] `tsc -b && vite build` compila sin errores ni warnings.
