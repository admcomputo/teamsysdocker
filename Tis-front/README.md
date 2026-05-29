# Sistema Generador de Portafolios Digitales (Portafolit)

[![TIS](https://img.shields.io/badge/TIS-CPTIS--2302--2026-blue)](https://github.com/Diego-Armando/Portafolio)
[![Architecture](https://img.shields.io/badge/Architecture-Modular_Monolith-brightgreen)](#arquitectura)

## Información del Proyecto

- **Empresa**: TEAMSYS S.R.L.
- **Correo de Contacto**: [TEAMSYS2020@GMAIL.COM](mailto:TEAMSYS2020@GMAIL.COM)
- **Especificación**: Pliego CPTIS-2302-2026 - Taller de Ingeniería de Software
- **Fecha**: 2 de marzo de 2026

---

## Descripción del Proyecto

En la actualidad, la informática es ubicua. Mostrar la diferencia entre un profesional de grado de licenciatura y un entusiasta del área requiere un proceso fino de diseño e implementación. Este sistema nace con el objetivo de resolver la necesidad de los profesionales de software de contar con un **Portafolio Digital** organizado y profesional.

El **Sistema Generador de Portafolios Digitales** permite a los desarrolladores reunir en un solo lugar su documentación, proyectos (con enlaces), logros, habilidades y experiencia académica/laboral, fortaleciendo su marca personal como una pieza estratégica de su currículum vitae.

### Requerimientos Principales

- **Registro de Usuarios**: Creación de perfiles profesionales.
- **Información Básica**: Gestión de nombre, profesión y biografía.
- **Seguridad**: Manejo seguro de la información y privacidad de datos.
- **Gestión de Proyectos**: Registro y presentación de proyectos de software.
- **Gestión de Habilidades**: Control de habilidades técnicas (con nivel de dominio) y blandas.
- **Experiencia**: Publicación de trayectoria laboral y académica.
- **Integración**: Enlaces a redes profesionales como LinkedIn y GitHub.
- **Responsive Design**: Adaptabilidad total a dispositivos móviles y escritorio.

---

## Arquitectura: Monolito Modular

Este proyecto utiliza una arquitectura de **Monolito Modular** en el Frontend. Esta decisión de diseño permite mantener la simplicidad de un solo despliegue mientras se garantiza una separación clara de responsabilidades y alta cohesión por módulo.

### Estructura de Carpetas

```text
src/
├── core/               # Núcleo del Sistema
│   ├── api/            # Configuración de Axios e interceptores
│   ├── router/         # Configuración central de rutas (React Router)
│   └── layouts/        # Componentes de estructura global (Navbar, Footer)
├── features/           # Módulos de Negocio (Monolitos dentro del Monolito)
│   ├── landing/        # Módulo de la página de inicio
│   ├── login/          # Módulo de autenticación - Login
│   └── register/       # Módulo de registro de usuarios
├── shared/             # Recursos Compartidos
│   ├── components/     # UI Kit (Botones, Inputs, Cards de alta fidelidad)
│   ├── hooks/          # Hooks globales (Toast, Auth context)
│   └── styles/         # Variables globales y configuración de Tailwind CSS
└── apps/               # (Opcional) Configuraciones por entorno o subclases de app
```

### Ventajas de este enfoque:

1.  **Aislamiento**: Cada feature (módulo) es independiente, lo que facilita el mantenimiento.
2.  **Escalabilidad**: Es fácil añadir nuevos módulos sin afectar el núcleo del sistema.
3.  **Clean Code**: Fomenta el uso de adapters y DTOs específicos por módulo.

---

## Herramientas y Tecnologías

El stack tecnológico ha sido seleccionado para garantizar un rendimiento óptimo y una experiencia de desarrollo moderna:

- **Vite**: Next Generation Frontend Tooling para un desarrollo ultrarrápido.
- **React**: Biblioteca central para la construcción de interfaces declarativas.
- **Tailwind CSS**: Framework de CSS utility-first para un diseño de alta fidelidad y responsive.
- **Zod**: Validación de esquemas y tipos de datos en tiempo de ejecución.
- **Axios**: Cliente HTTP para la comunicación con el backend (API centralizada).
- **Lucide React**: Set de iconos profesionales y minimalistas.

---

## Guía de Instalación y Ejecución

Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

### 1. Clonar el repositorio

```bash
git clone https://github.com/DIEGOARMANDOALVAREZ/Portafolio.git
cd Portafolio
```

### 2. Instalar dependencias

Asegúrate de tener [Node.js](https://nodejs.org/) instalado.

```bash
npm install
```

### 3. Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```bash
VITE_API_URL=https://api.example.com
```

### 4. Ejecución en desarrollo

Inicia el servidor de desarrollo de Vite:

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`.

### 5. Construcción para producción

Para generar los archivos estáticos optimizados:

```bash
npm run build
```

---

## Equipo de Desarrollo

**TEAMSYS S.R.L.**

- **Diego Armando Alvarez** - Frontend Developer - [EMAIL_ADDRESS]
- **Jhoel Olivera Antezana** - Frontend Developer - [EMAIL_ADDRESS]
- **Gaston Garcia Escobar** - Developer - [EMAIL_ADDRESS]
- **Integrante #4** - Developer - [EMAIL_ADDRESS]

**Contacto General**: [TEAMSYS2020@GMAIL.COM](mailto:TEAMSYS2020@GMAIL.COM)

---

© 2026 TEAMSYS S.R.L. - Todos los derechos reservados.
