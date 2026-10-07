# AGENTS.md — Fabrica-nexus

Fabrica-nexus is a manufacturing management and production intelligence
platform built as a monorepo. This file contains development rules,
conventions, constraints, and verification instructions for AI agents
working on the project.

## Stack y estructura

- Frontend: React + Vite
- Backend: Python + FastAPI
- Database: PostgreSQL
- Background processing: Python worker
- Containerization: Docker + Docker Compose
- CI/CD: GitHub Actions

### Estructura principal

- `frontend/` → React application
- `backend/` → FastAPI application
- `worker/` → background processing
- `database/` → migrations and seed data
- `docs/` → technical documentation
- `specs/` → feature specifications
- `.github/` → CI/CD workflows

Do not move responsibilities between these directories without a
clear reason.

## Comandos

Run the complete development environment:

Use the commands documented in the project before inventing alternatives.

## Convenciones
-Follow the existing code style before introducing new patterns.
-Use descriptive names.
-Avoid unnecessary abstractions.
-Reuse existing components and utilities.
-Do not duplicate business logic.
-Keep comments focused on explaining non-obvious decisions.
-Code, variable names, and technical documentation should use English.

Before creating a new pattern, search the repository for an existing
implementation that should be reused.

## Reglas de dominio / trampas conocidas
-Lee `docs/constitution.md` y la spec activa (`spec/NNN-*/`) antes de tocar el codigo 
-The frontend must never access PostgreSQL directly.
-Business logic belongs in the backend, not in React components.
-Authorization must always be enforced by the backend.
-Hiding a UI element is not considered authorization.
-KPI values must come from application data and must not be hardcoded.
-Database schema changes must use migrations.

Never assume that frontend validation is sufficient.

## Forma de trabajar

Before modifying code:

-Read this file.
-Read relevant project documentation.
-Inspect the existing implementation.
-Check whether the feature already has an associated specification.
-Create a short implementation plan before making significant changes.

Prefer small, focused changes.

Do not refactor unrelated code while implementing a feature.

Do not change architecture, database structure, or public APIs without
first explaining the impact.

When requirements are ambiguous, ask before making assumptions.

## Memoria
-Al empezar, lee "MEMORY.md" para conocer el estado del proyecto y las desiciones tomadas.
-Al terminar cualquier tatea, actualiza, el estado actual, las desiciones importantes y porque y errores a evitar
-Mantelo breve, de máximo 50 lienas: resume o elimina todo lo que ya no aporte
-Si algo se convierte en una regla permanente muevelo a "AGENTS.md" en lugar de dejarlo en la memoria
-No guardes datos sensibles ahí (Claves, Token o datos personales)

## Reglas
-Lee `docs/constituion.md` y la spec activa (`specs/NNN-*/`) antes de tocar el codigo

## Límites
-✅ Siempre: Follow repository conventions.
-✅ Siempre: Reuse existing patterns.
-✅ Siempre: Run relevant tests after changes.
-✅ Siempre: Keep documentation synchronized with implementation when required.
-✅ Siempre:Review the final diff before finishing.
-✅ Siempre: Actualiza la memoria del proyecto en "MEMORY.md"
-⚠️ Pregunta antes: Adding a new dependency.
-⚠️ Pregunta antes: Changing the database schema.
-⚠️ Pregunta antes: Changing an existing API contract.
-⚠️ Pregunta antes: Changing authentication or authorization behavior.
-⚠️ Pregunta antes: Changing Docker or deployment architecture.
-⚠️ Pregunta antes: Introducing a new architectural pattern.
-⛔ Nunca: Commit secrets or credentials.
-⛔ Nunca: Delete functionality without explicit instruction.
-⛔ Nunca: Modify unrelated files.
-⛔ Nunca: Bypass authentication or authorization.
-⛔ Nunca: Access PostgreSQL directly from the frontend.
-⛔ Nunca: Claim that a task is complete without verification.

## Verificación

Before marking a task as complete:

-Run the relevant tests.
-Run linting and formatting when configured.
-Verify the application builds successfully.
-Check for unintended file changes.
-Review the implementation against the applicable specification.
-Report what was changed and what was verified.

Never report a change as complete if verification was not performed.