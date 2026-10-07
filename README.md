# 🏭 Fabrica-nexus
> **Production Intelligence Platform**
> Plataforma para la gestión, análisis y visualización de información relacionada con procesos de producción industrial.

Fabrica-nexus es un proyecto de desarrollo enfocado en explorar cómo **software, datos e inteligencia artificial** pueden integrarse para mejorar la gestión y el análisis de procesos industriales.

El proyecto se desarrolla como un entorno de aprendizaje y experimentación para poner en práctica tecnologías modernas de desarrollo **Frontend, Backend, bases de datos, contenedores, CI/CD y desarrollo asistido por IA**.

🚧 **Estado:** En desarrollo

## 🎯 Objetivo

Fabrica-nexus busca construir una plataforma capaz de centralizar información relacionada con la producción y transformarla en información útil para la toma de decisiones.

## 🧠 Enfoque de desarrollo

El proyecto utiliza un enfoque de **Spec-Driven Development (SDD)** para definir y organizar el desarrollo antes de implementar nuevas funcionalidades.

La idea es utilizar especificaciones claras como punto de partida para que las decisiones técnicas, la implementación y las pruebas estén alineadas.

## 🛠️ Tecnologías

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* Python
* API REST

### Database

* SQL

### DevOps

* Docker
* Git
* GitHub
* CI/CD

### AI-assisted Development

* Spec-Driven Development
* AI Agents
* `AGENTS.md`
* `MEMORY.md`

> El stack puede evolucionar durante el desarrollo del proyecto.

## 🏗️ Arquitectura

El proyecto está organizado como un monorepo:

```text
Fabrica-nexus/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
├── Backend/
│   ├── ...
│   └── ...
│
├── specs/
│   └── ...
│
├── .opencode/
│   └── ...
│
├── AGENTS.md
├── MEMORY.md
├── constitution.md
└── README.md
```

La estructura está diseñada para mantener separadas las responsabilidades del frontend, backend y documentación del proceso de desarrollo.

## 📊 Funcionalidades previstas

### Dashboard

* Resumen de producción.
* Indicadores clave de rendimiento.
* Gráficas de productividad.
* Evolución de producción.
* Alertas importantes.

### Órdenes de producción

* Creación y seguimiento de órdenes.
* Estado de producción.
* Prioridades.
* Fechas y cantidades.

### Inventario

* Consulta de materiales.
* Existencias.
* Movimientos.
* Alertas de stock.

### Análisis

* Métricas de producción.
* Productividad.
* Comparación de períodos.
* Identificación de tendencias.

### Usuarios

* Autenticación.
* Roles y permisos.
* Diferentes interfaces según el tipo de usuario.


## 🗺️ Roadmap

* [x] Definición inicial del proyecto
* [x] Definición de principios de desarrollo
* [x] Configuración inicial del repositorio
* [x] Documentación inicial
* [x] Arquitectura del sistema
* [x] Diseño inicial de interfaces
* [ ] Implementación del frontend
* [ ] Implementación del backend
* [ ] Diseño de la base de datos
* [ ] Integración Frontend ↔ Backend
* [ ] Dockerización
* [ ] CI/CD
* [ ] Sistema de autenticación
* [ ] Dashboard de producción
* [ ] Módulo de inventario
* [ ] Módulo de órdenes de producción
* [ ] Sistema de alertas
* [ ] Análisis de datos
* [ ] Funcionalidades de IA
* [ ] MVP

## 📚 Documentación

La documentación del proyecto se encuentra dentro del repositorio:

| Archivo           | Descripción                                    |
| ----------------- | ---------------------------------------------- |
| `constitution.md` | Principios no negociables del proyecto         |
| `AGENTS.md`       | Instrucciones y contexto para agentes de IA    |
| `MEMORY.md`       | Estado, decisiones y aprendizajes del proyecto |
| `specs/`          | Especificaciones de las funcionalidades        |


## 🤖 Desarrollo asistido por IA

Fabrica-nexus también funciona como un laboratorio para experimentar con nuevas formas de desarrollo asistido por inteligencia artificial.

El objetivo no es simplemente generar código con IA, sino establecer un proceso donde:

```text
Idea
  ↓
Specification
  ↓
Planning
  ↓
AI-assisted implementation
  ↓
Testing
  ↓
Review
  ↓
Iteration
```

Esto permite experimentar con agentes, subagentes y herramientas de IA manteniendo una estructura y unos criterios técnicos definidos.

## 👨‍💻 Autor

**Andrés Esquivel**

Software Developer interesado en **Frontend, Backend, automatización, DevOps y desarrollo asistido por IA**.


## 📄 License

Este proyecto se encuentra actualmente en desarrollo. La licencia definitiva será definida posteriormente.
