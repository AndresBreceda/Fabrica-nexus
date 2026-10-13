# SPEC-003: Backend Authentication & PostgreSQL Database

## 1. Objetivo
Implementar la infraestructura del backend en Python (`backend/`) utilizando FastAPI y la capa de base de datos relacional PostgreSQL (`database/`), permitiendo el flujo de autenticación seguro basado en credenciales (email y contraseña con hash) para el acceso a la plataforma Fabrica-nexus, retornando tokens JWT (Bearer) y protegiendo los accesos del sistema.

## 2. Contexto
Actualmente, el frontend cuenta con la vista de login (`/login`) especificada en `SPEC-002`, pero opera con validaciones locales mockeadas. Para dar soporte a la seguridad industrial de Fabrica-nexus (regla: frontend nunca accede directo a DB y la lógica de negocio/autorización reside en backend), se creará el servicio de backend con FastAPI, SQLAlchemy 2.x, Pydantic v2, Alembic para migraciones y PostgreSQL como motor de base de datos orquestado vía Docker Compose.

## 3. Decisiones Técnicas y Arquitectura

### 3.1 Stack Tecnológico
- **Lenguaje:** Python 3.11+
- **Framework Web:** FastAPI
- **Servidor ASGI:** Uvicorn
- **ORM / Conexión:** SQLAlchemy 2.0 (con asyncpg / psycopg)
- **Migraciones:** Alembic
- **Validación y Esquemas:** Pydantic v2 / pydantic-settings
- **Seguridad / Hashing:** Passlib (bcrypt / argon2) o pwdlib, PyJWT (o python-jose)
- **Base de datos:** PostgreSQL 16 (contenedor oficial en Docker Compose)
- **Gestor de entorno:** Archivo de requerimientos estándar (`backend/requirements.txt`) y `.env` para credenciales seguras.

### 3.2 Estructura de Directorios

```
Fabrica-nexus/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── deps.py             # Inyección de dependencias (get_db, get_current_user)
│   │   │   └── v1/
│   │   │       ├── api.py          # Enrutador principal v1
│   │   │       └── endpoints/
│   │   │           ├── auth.py     # Endpoints de login, refresh, me
│   │   │           └── users.py    # Gestión de usuarios
│   │   ├── core/
│   │   │   ├── config.py           # Configuración con pydantic-settings (.env)
│   │   │   └── security.py         # Hashing de passwords y generación/verificación JWT
│   │   ├── db/
│   │   │   ├── base.py             # Base declarativa de SQLAlchemy
│   │   │   └── session.py          # SessionFactory y conexión a PostgreSQL
│   │   ├── models/
│   │   │   └── user.py             # Modelo User (id, email, hashed_password, is_active, role, etc.)
│   │   ├── schemas/
│   │   │   ├── auth.py             # Token, TokenPayload, LoginRequest
│   │   │   └── user.py             # UserRead, UserCreate, UserUpdate
│   │   ├── services/
│   │   │   └── auth_service.py     # Lógica de verificación de credenciales
│   │   └── main.py                 # Instancia principal FastAPI y configuración de CORS
│   ├── tests/
│   │   ├── conftest.py
│   │   └── test_auth.py
│   ├── Dockerfile
│   └── requirements.txt
├── database/
│   ├── alembic/                    # Entorno de migraciones Alembic
│   │   ├── versions/
│   │   └── env.py
│   ├── alembic.ini
│   ├── seeds/
│   │   └── seed_initial_data.py    # Creación del usuario admin / operador inicial
│   └── docker-entrypoint-initdb.d/ # Opcional para scripts SQL iniciales
├── docker-compose.yml              # Orquestación de backend + postgres
└── .env.example                    # Plantilla de variables de entorno (DB credentials, SECRET_KEY)
```

## 4. Requisitos Funcionales

1. **Persistencia de Usuarios (`users` table):**
   - Campos: `id` (UUID o BigInt autoincremental), `email` (único, no nulo, indexado), `hashed_password` (string no nulo), `full_name` (string opcional), `role` (enum/string: e.g. `admin`, `operator`), `is_active` (boolean, default true), `created_at`, `updated_at`.
2. **Autenticación Estricta (`/api/v1/auth/login`):**
   - Recibe credenciales (`email` y `password`).
   - Verifica existencia del usuario activo y validez del password con `bcrypt`.
   - Si no coincide, retorna HTTP `401 Unauthorized` con mensaje genérico ("Credenciales inválidas").
   - Si coincide, genera y devuelve:
     - `access_token` (JWT con tiempo de vida corto, ej. 30 o 60 min).
     - `refresh_token` (JWT con tiempo de vida extendido, ej. 7 días).
     - `token_type`: "bearer".
3. **Consulta de Perfil Actual (`/api/v1/auth/me`):**
   - Endpoint protegido vía dependencia Bearer Token.
   - Decodifica y valida JWT; si es expirado o inválido retorna HTTP 401.
   - Retorna la información del usuario autenticado (sin el hash del password).
4. **Renovación de Token (`/api/v1/auth/refresh`):**
   - Permite obtener un nuevo access token utilizando el refresh token válido.
5. **Poblado Inicial de Datos (Seed):**
   - Script seguro que crea el usuario administrador por defecto si no existe ninguno en la base de datos (usando variables definidas en `.env`).
6. **Manejo de Errores y Seguridad:**
   - Contraseñas almacenadas exclusivamente como hashes (`bcrypt`).
   - Variables sensibles (secret key, salt, contraseñas de BD) inyectadas únicamente por `.env`.
   - Protección contra fuerza bruta mediante códigos de respuesta 401 unificados.
   - Headers CORS configurados para permitir peticiones desde el frontend de desarrollo (`http://localhost:5173`).

## 5. Requisitos No Funcionales
- **Compatibilidad de Plataforma:** Ejecución comprobada tanto en Docker (Docker Compose) como nativo con entorno virtual Python en Windows.
- **Migraciones Versionadas:** Toda tabla se crea y versiona a través de Alembic en `database/`.
- **Rendimiento:** Conexión agrupada (connection pooling) con SQLAlchemy.

## 6. Criterios de Aceptación
- [ ] La estructura de directorios `backend/` y `database/` está creada con separación clara de capas.
- [ ] Docker Compose levanta el contenedor de PostgreSQL y la aplicación FastAPI.
- [ ] Las migraciones de Alembic aplican correctamente la creación de la tabla `users`.
- [ ] El script de seed permite sembrar un usuario inicial de prueba/administrador.
- [ ] El endpoint `POST /api/v1/auth/login` rechaza contraseñas inválidas con HTTP 401 y responde exitosamente con tokens JWT cuando son válidas.
- [ ] El endpoint `GET /api/v1/auth/me` exige cabecera `Authorization: Bearer <token>` y responde con los datos del usuario logueado.
- [ ] Existen pruebas automatizadas unitarias/integración en `backend/tests/` que validan el ciclo de login y hashing.
