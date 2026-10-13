# MEMORY.md - Fabrica-nexus

Memoria del proyecto entre sesiones. Máximo 50 líneas, resume o elimina lo que ya no aporte.

## Estado actual
- Frontend modular verificado en `frontend/` (React 19 + TypeScript + Vite + Tailwind CSS v4).
- Backend implementado en `backend/` con FastAPI, SQLAlchemy 2.0, bcrypt y PyJWT (SPEC-003).
- Capa de base de datos en `database/` con Alembic (migración de `users`) y script de seed.
- Orquestación lista con `docker-compose.yml` (PostgreSQL 16 + FastAPI).
- Suite de pruebas de autenticación y seguridad pasando al 100% (15/15 tests en `backend/tests/`).

## Decisiones (y por qué)
- **Bcrypt nativo y PyJWT**: Garantiza compatibilidad robusta en Python 3.13 sin dependencias obsoletas (`passlib`/`crypt`).
- **Esquema de Tokens Dual**: Access token (60 min) y Refresh token (7 días) con validación estricta de claims (`type`).
- **Modelos e índices**: Tabla `users` indexada en `email` (único) y `id` (autoincremental).
- **SQLite en memoria para pruebas**: Aislamiento rápido y sin dependencias externas para CI/CD y tests locales.
- **Alembic con path relativo `%(here)s`**: Permite ejecutar migraciones tanto desde la raíz como desde `database/` o dentro de Docker.

## Aprendizajes y errores a evitar
- Pydantic `EmailStr` requiere explícitamente `email-validator` en requirements.
- SQLite en memoria exige tipo `Integer` en primary key para mapear con `ROWID` autoincremental sin colisiones.
- Ejecutar `pytest` y `tsc -b && vite build` tras cambios para prevenir regresiones.

## Próximos pasos
- Conexión del frontend (`/login`) con el endpoint `POST /api/v1/auth/login`.
- Almacenamiento seguro de tokens y manejo del estado de sesión en React.
