# Sistema de Portafolios Digitales - TIS

Proyecto desarrollado para la materia Taller de Ingeniería de Software (TIS).

## Tecnologías utilizadas

- Frontend: React + Vite
- Backend: Spring Boot
- Base de Datos: MySQL
- Contenedores: Docker y Docker Compose

---

# Requisitos

- Docker Desktop instalado
- Docker Compose habilitado

---

# Estructura del proyecto

```text
mi-proyecto/
├── docker-compose.yml
├── .env.example
├── README.md
├── database/
├── Tis-back/
└── Tis-front/

Ejecuta:

docker compose down
docker compose up -d --build
docker ps

Debe salir:

teamsys_db
tis-back
tis-front

# Luego abre

http://localhost:5173

Accesos

Frontend:

http://localhost:5173

Backend:

https://teamsys.apps.cs.umss.edu.bo/api

Base de datos:

localhost:3307

Detener el proyecto
docker compose down