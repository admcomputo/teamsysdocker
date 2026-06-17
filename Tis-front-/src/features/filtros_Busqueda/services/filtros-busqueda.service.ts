import {
  buscarPortafoliosResponseToModel,
  filtrosBusquedaToRequestDTO,
} from "./filtros-busqueda.adapter";

import type {
  FiltrosBusqueda,
  PortafolioResultado,
  RespuestaBusquedaPortafolios,
} from "../models/filtros-busqueda.model";

import type { BuscarPortafoliosResponseDTO } from "./filtros-busqueda.dto";

const API_URL = import.meta.env.VITE_API_URL ?? " https://teamsysback.apps.cs.umss.edu.bo";

const USAR_MOCK = false;


const MOCK_PORTAFOLIOS: PortafolioResultado[] = [
  {
    id: 1,
    nombreCompleto: "Gabriel Mamani",
    profesion: "Desarrollador de Software",
    especializacion: "Frontend",
    ubicacion: "Cochabamba, Bolivia",
    disponibilidad: "Disponible",
    modalidadTrabajo: "Remoto",
    tecnologias: ["React", "TypeScript", "Angular"],
    idiomas: ["Español", "Inglés"],
    experienciaAnios: 3,
    cantidadProyectos: 6,
    fotoPerfilUrl: "",
    urlPublica: "/portafolio/gabriel-mamani",
    resumen: "Desarrollador frontend con experiencia en interfaces web modernas.",
  },
  {
    id: 2,
    nombreCompleto: "María Quispe",
    profesion: "Diseñadora UI/UX",
    especializacion: "Diseño UI/UX",
    ubicacion: "La Paz, Bolivia",
    disponibilidad: "Disponible",
    modalidadTrabajo: "Híbrida",
    tecnologias: ["Figma", "React"],
    idiomas: ["Español"],
    experienciaAnios: 2,
    cantidadProyectos: 4,
    fotoPerfilUrl: "",
    urlPublica: "/portafolio/maria-quispe",
    resumen: "Diseñadora enfocada en experiencia de usuario y prototipado.",
  },
  {
    id: 3,
    nombreCompleto: "Carlos Rojas",
    profesion: "Desarrollador Backend",
    especializacion: "Backend",
    ubicacion: "Santa Cruz, Bolivia",
    disponibilidad: "No disponible",
    modalidadTrabajo: "Remoto",
    tecnologias: ["Spring Boot", "PostgreSQL", "Node.js"],
    idiomas: ["Español", "Inglés"],
    experienciaAnios: 5,
    cantidadProyectos: 10,
    fotoPerfilUrl: "",
    urlPublica: "/portafolio/carlos-rojas",
    resumen: "Backend developer especializado en APIs REST y bases de datos.",
  },
  {
  id: 4,
  nombreCompleto: "Valeria Roca",
  profesion: "Desarrollador de Software",
  especializacion: "Full Stack",
  ubicacion: "Cochabamba, Bolivia",
  disponibilidad: "Disponible",
  modalidadTrabajo: "Híbrida",
  tecnologias: ["React", "Node.js", "PostgreSQL", "Docker"],
  idiomas: ["Español", "Inglés"],
  experienciaAnios: 4,
  cantidadProyectos: 8,
  fotoPerfilUrl: "",
  urlPublica: "/portafolio/valeria-roca",
  resumen: "Desarrolladora full stack enfocada en sistemas web y APIs REST.",
},
{
  id: 5,
  nombreCompleto: "Diego Fernández",
  profesion: "Ingeniero DevOps",
  especializacion: "Cloud",
  ubicacion: "La Paz, Bolivia",
  disponibilidad: "Disponible",
  modalidadTrabajo: "Remoto",
  tecnologias: ["Docker", "Kubernetes", "AWS", "Linux"],
  idiomas: ["Español", "Inglés"],
  experienciaAnios: 6,
  cantidadProyectos: 12,
  fotoPerfilUrl: "",
  urlPublica: "/portafolio/diego-fernandez",
  resumen: "Especialista en despliegue, automatización y monitoreo de servicios cloud.",
},
{
  id: 6,
  nombreCompleto: "Ana Salazar",
  profesion: "Analista de Datos",
  especializacion: "Data Science",
  ubicacion: "Santa Cruz, Bolivia",
  disponibilidad: "No disponible",
  modalidadTrabajo: "Presencial",
  tecnologias: ["Python", "Power BI", "SQL", "Pandas"],
  idiomas: ["Español", "Portugués"],
  experienciaAnios: 3,
  cantidadProyectos: 5,
  fotoPerfilUrl: "",
  urlPublica: "/portafolio/ana-salazar",
  resumen: "Analista de datos con experiencia en dashboards, reportes y modelado predictivo.",
},
{
  id: 7,
  nombreCompleto: "Luis Arce",
  profesion: "Desarrollador Móvil",
  especializacion: "Mobile",
  ubicacion: "Oruro, Bolivia",
  disponibilidad: "Disponible",
  modalidadTrabajo: "Freelance",
  tecnologias: ["Flutter", "Dart", "Firebase"],
  idiomas: ["Español"],
  experienciaAnios: 2,
  cantidadProyectos: 7,
  fotoPerfilUrl: "",
  urlPublica: "/portafolio/luis-arce",
  resumen: "Desarrollador móvil especializado en aplicaciones multiplataforma con Flutter.",
},
{
  id: 8,
  nombreCompleto: "Camila Torres",
  profesion: "QA Tester",
  especializacion: "Testing",
  ubicacion: "Cochabamba, Bolivia",
  disponibilidad: "Disponible",
  modalidadTrabajo: "Remoto",
  tecnologias: ["Selenium", "Postman", "Jira", "Cypress"],
  idiomas: ["Español", "Inglés", "Francés"],
  experienciaAnios: 4,
  cantidadProyectos: 9,
  fotoPerfilUrl: "",
  urlPublica: "/portafolio/camila-torres",
  resumen: "QA con experiencia en pruebas funcionales, automatización y validación de APIs.",
},
];

const buscarPortafoliosMock = async (
  filtros: FiltrosBusqueda,
): Promise<RespuestaBusquedaPortafolios> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let resultados = [...MOCK_PORTAFOLIOS];

  const buscar = filtros.buscar.trim().toLowerCase();

  if (buscar) {
    resultados = resultados.filter((item) =>
      [
        item.nombreCompleto,
        item.profesion,
        item.especializacion ?? "",
        item.ubicacion,
        item.resumen ?? "",
        ...item.tecnologias,
        ...item.idiomas,
      ]
        .join(" ")
        .toLowerCase()
        .includes(buscar),
    );
  }

  if (filtros.profesion.trim()) {
    resultados = resultados.filter((item) =>
      item.profesion.toLowerCase().includes(filtros.profesion.toLowerCase()),
    );
  }

  if (filtros.especializacion.trim()) {
    resultados = resultados.filter((item) =>
      (item.especializacion ?? "")
        .toLowerCase()
        .includes(filtros.especializacion.toLowerCase()),
    );
  }

  if (filtros.tecnologia.trim()) {
    resultados = resultados.filter((item) =>
      item.tecnologias.some((tech) =>
        tech.toLowerCase().includes(filtros.tecnologia.toLowerCase()),
      ),
    );
  }

  if (filtros.ubicacion.trim()) {
    resultados = resultados.filter((item) =>
      item.ubicacion.toLowerCase().includes(filtros.ubicacion.toLowerCase()),
    );
  }

  if (filtros.disponibilidad) {
    resultados = resultados.filter(
      (item) => item.disponibilidad === filtros.disponibilidad,
    );
  }

  if (filtros.modalidadTrabajo) {
    resultados = resultados.filter(
      (item) => item.modalidadTrabajo === filtros.modalidadTrabajo,
    );
  }

  if (filtros.experienciaMinima !== "") {
    resultados = resultados.filter(
      (item) => item.experienciaAnios >= Number(filtros.experienciaMinima),
    );
  }

  if (filtros.idiomas.length > 0) {
    resultados = resultados.filter((item) =>
      filtros.idiomas.every((idioma) => item.idiomas.includes(idioma)),
    );
  }

  if (filtros.ordenarPor === "experiencia") {
    resultados.sort((a, b) => b.experienciaAnios - a.experienciaAnios);
  }

  if (filtros.ordenarPor === "proyectos") {
    resultados.sort((a, b) => b.cantidadProyectos - a.cantidadProyectos);
  }

  if (filtros.ordenarPor === "recientes") {
    resultados.sort((a, b) => b.id - a.id);
  }

  const total = resultados.length;
  const pagina = filtros.pagina;
  const limite = filtros.limite;
  const totalPaginas = Math.max(1, Math.ceil(total / limite));
  const inicio = (pagina - 1) * limite;

  return {
    total,
    pagina,
    limite,
    totalPaginas,
    data: resultados.slice(inicio, inicio + limite),
  };
};
const buscarPortafoliosBackend = async (
  filtros: FiltrosBusqueda,
): Promise<RespuestaBusquedaPortafolios> => {
  const requestDTO = filtrosBusquedaToRequestDTO(filtros);

  const response = await fetch(`${API_URL}/api/portafolios/buscar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(requestDTO),
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener los portafolios.");
  }

  const data: BuscarPortafoliosResponseDTO = await response.json();

  return buscarPortafoliosResponseToModel(data);
};

export const buscarPortafoliosService = async (
  filtros: FiltrosBusqueda,
): Promise<RespuestaBusquedaPortafolios> => {
  if (USAR_MOCK) {
    return buscarPortafoliosMock(filtros);
  }

  return buscarPortafoliosBackend(filtros);
};