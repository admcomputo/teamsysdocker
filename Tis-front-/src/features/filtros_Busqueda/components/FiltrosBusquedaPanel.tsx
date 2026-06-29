import { useState } from "react";
import type {
  FiltrosBusqueda,
  ExperienciaLaboral,
  HabilidadTecnica,
  HabilidadBlanda,
  Proyecto,
  FormacionAcademica,
} from "../models/filtros-busqueda.model";

interface FiltrosBusquedaPanelProps {
  filtros: FiltrosBusqueda;
  cargando: boolean;
  onAplicarFiltros: (filtrosCompletos: FiltrosBusqueda) => void;
  onLimpiarFiltros: () => void;
}

export const FiltrosBusquedaPanel = ({
  filtros,
  cargando,
  onAplicarFiltros,
  onLimpiarFiltros,
}: FiltrosBusquedaPanelProps) => {
  // Estado para controlar qué secciones están expandidas
  const [seccionesExpandidas, setSeccionesExpandidas] = useState({
    experienciasLaborales: false,
    habilidadesTecnicas: false,
    habilidadesBlandas: false,
    proyectos: false,
    formacionAcademica: false,
  });

  const toggleSeccion = (seccion: keyof typeof seccionesExpandidas) => {
    setSeccionesExpandidas((prev) => ({
      ...prev,
      [seccion]: !prev[seccion],
    }));
  };

  // --- Estados locales para los filtros avanzados ---
  const [experienciaLaboral, setExperienciaLaboral] = useState<ExperienciaLaboral>({
    nombreEmpresa: "",
    cargo: "",
    anosExperiencia: 0,
    ciudad: "",
    tecnologias: [],
  });

  const [habilidadTecnica, setHabilidadTecnica] = useState<HabilidadTecnica>({
    nombre: "",
    nivel: "TODOS",
    anosExperiencia: 0,
  });

  const [habilidadBlanda, setHabilidadBlanda] = useState<HabilidadBlanda>({
    nombre: "",
  });

  const [proyecto, setProyecto] = useState<Proyecto>({
    nombre: "",
    tecnologias: [],
    duracion: "",
    rol: "",
  });

  const [formacionAcademica, setFormacionAcademica] = useState<FormacionAcademica>({
    institucion: "",
    titulo: "",
    nivel: "TODOS",
    duracion: 0,
    estado: "TODOS",
  });

  // Helper para convertir string de tecnologías separadas por coma a array
  const parseTecnologias = (text: string): string[] => {
    return text.split(",").map((t) => t.trim()).filter(Boolean);
  };

  // --- Manejadores para aplicar filtros ---
  const handleAplicar = () => {
    // Construir el objeto de filtros completo
    const filtrosCompletos: FiltrosBusqueda = {
      ...filtros,
      pagina: 1, // Reiniciar página al aplicar
      // Avanzados: solo enviar si el campo principal tiene valor
      //experienciasLaborales: experienciaLaboral.nombreEmpresa.trim() ? [experienciaLaboral] : null,
      //habilidadesTecnicas: habilidadTecnica.nombre.trim() ? [habilidadTecnica] : null,
      //habilidadesBlandas: habilidadBlanda.nombre.trim() ? [habilidadBlanda] : null,
      //proyectos: proyecto.nombre.trim() ? [proyecto] : null,
      //formacionAcademica: formacionAcademica.institucion.trim() ? [formacionAcademica] : null,
      experienciaLaboral: experienciaLaboral ? experienciaLaboral : null,
    habilidadTecnica: habilidadTecnica ? habilidadTecnica : null,
    habilidadBlanda: habilidadBlanda ? habilidadBlanda : null,
    proyecto: proyecto ? proyecto : null,
    formacionAcademica: formacionAcademica ? formacionAcademica : null,
    };
    console.log("📦 Filtros a aplicar:", filtrosCompletos);
    onAplicarFiltros(filtrosCompletos);
  };

  const handleLimpiar = () => {
    // Resetear estados locales
    setExperienciaLaboral({
      nombreEmpresa: "",
      cargo: "",
      anosExperiencia: 0,
      ciudad: "",
      tecnologias: [],
    });
    setHabilidadTecnica({
      nombre: "",
      nivel: "TODOS",
      anosExperiencia: 0,
    });
    setHabilidadBlanda({ nombre: "" });
    setProyecto({
      nombre: "",
      tecnologias: [],
      duracion: "",
      rol: "",
    });
    setFormacionAcademica({
      institucion: "",
      titulo: "",
      nivel: "TODOS",
      duracion: 0,
      estado: "TODOS",
    });
    onLimpiarFiltros();
  };

  // Iconos (sin cambios)
  const IconoExpandir = () => (
    <svg className="w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
  const IconoContraer = () => (
    <svg className="w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );

  return (
    <aside className="rounded-2xl border border-card-border bg-[#0B1F3A]/80 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-[#E2F0FF]">Filtros avanzados</h2>
        <p className="text-sm text-gray-400">Refina la búsqueda de portafolios profesionales.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* ======== FILTROS BÁSICOS (siempre visibles) ======== */}
        {/*
        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">Profesión</label>
          <input
            type="text"
            value={filtros.profesion}
            maxLength={60}
            placeholder="Ej: Desarrollador de Software"
            onChange={(e) => onActualizarFiltro("profesion", e.target.value)}
            className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
          />
          <p className="mt-1 text-xs text-gray-400">Solo letras y espacios.</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">Especialización</label>
          <input
            type="text"
            value={filtros.especializacion}
            maxLength={60}
            placeholder="Ej: Frontend, Desarrollo móvil"
            onChange={(e) => onActualizarFiltro("especializacion", e.target.value)}
            className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
          />
          <p className="mt-1 text-xs text-gray-400">No permite números ni caracteres especiales.</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">Tecnología</label>
          <input
            type="text"
            value={filtros.tecnologia}
            maxLength={50}
            placeholder="Ej: React, Angular, C#, Node.js"
            onChange={(e) => onActualizarFiltro("tecnologia", e.target.value)}
            className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
          />
          <p className="mt-1 text-xs text-gray-400">Permite letras, números, punto, guion, +, # y /.</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">Institución académica</label>
          <input
            type="text"
            value={filtros.formacionAcademica}
            maxLength={80}
            placeholder="Ej: Universidad Mayor de San Simón"
            onChange={(e) => onActualizarFiltro("formacionAcademica", e.target.value)}
            className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
          />
          <p className="mt-1 text-xs text-gray-400">Busca por universidad, instituto o centro de estudios.</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">Empresa / experiencia laboral</label>
          <input
            type="text"
            value={filtros.empresa}
            maxLength={80}
            placeholder="Ej: COMTECO, Tigo, ENTEL"
            onChange={(e) => onActualizarFiltro("empresa", e.target.value)}
            className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
          />
          <p className="mt-1 text-xs text-gray-400">Busca por empresas donde trabajó o tiene experiencia.</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">Ubicación</label>
          <input
            type="text"
            value={filtros.ubicacion}
            maxLength={80}
            placeholder="Ej: Cochabamba, Bolivia"
            onChange={(e) => onActualizarFiltro("ubicacion", e.target.value)}
            className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
          />
          <p className="mt-1 text-xs text-gray-400">Permite letras, coma, punto y guion.</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">Disponibilidad</label>
          <select
            value={filtros.disponibilidad}
            onChange={(e) => onActualizarFiltro("disponibilidad", e.target.value)}
            className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
          >
            {opcionesDisponibilidad.map((opcion) => (
              <option key={opcion || "todas"} value={opcion}>
                {opcion || "Todas"}
              </option>
            ))}
          </select>
        </div>
        */}

        {/* ======== SECCIONES AVANZADAS (colapsables) ======== */}

        {/* Experiencias Laborales */}
        <div className="col-span-full">
          <button
            onClick={() => toggleSeccion("experienciasLaborales")}
            className="w-full flex items-center justify-between rounded-2xl border border-card-border bg-[#061327]/80 p-4 hover:bg-[#061327] transition-colors"
          >
            <h3 className="text-base font-semibold text-[#E2F0FF]">Experiencias Laborales</h3>
            <span className="text-[#E2F0FF]">
              {seccionesExpandidas.experienciasLaborales ? <IconoContraer /> : <IconoExpandir />}
            </span>
          </button>
          {seccionesExpandidas.experienciasLaborales && (
            <div className="mt-3 rounded-2xl border border-card-border bg-[#061327]/80 p-4 animate-fadeIn">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Nombre Empresa</label>
                  <input
                    type="text"
                    value={experienciaLaboral.nombreEmpresa}
                    onChange={(e) =>
                      setExperienciaLaboral((prev) => ({ ...prev, nombreEmpresa: e.target.value }))
                    }
                    placeholder="Ej: COMTECO"
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Cargo / Puesto</label>
                  <input
                    type="text"
                    value={experienciaLaboral.cargo}
                    onChange={(e) =>
                      setExperienciaLaboral((prev) => ({ ...prev, cargo: e.target.value }))
                    }
                    placeholder="Ej: Desarrollador Frontend"
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Años Experiencia</label>
                  <input
                    type="number"
                    value={experienciaLaboral.anosExperiencia || ""}
                    onChange={(e) =>
                      setExperienciaLaboral((prev) => ({
                        ...prev,
                        anosExperiencia: Number(e.target.value) || 0,
                      }))
                    }
                    placeholder="Ej: 3"
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Ciudad</label>
                  <input
                    type="text"
                    value={experienciaLaboral.ciudad}
                    onChange={(e) =>
                      setExperienciaLaboral((prev) => ({ ...prev, ciudad: e.target.value }))
                    }
                    placeholder="Ej: Cochabamba"
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  />
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="mb-1 block text-sm font-medium text-text-primary">Tecnologías</label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      value={experienciaLaboral.tecnologias.join(", ")}
                      onChange={(e) =>
                        setExperienciaLaboral((prev) => ({
                          ...prev,
                          tecnologias: parseTecnologias(e.target.value),
                        }))
                      }
                      placeholder="Ej: React, Node.js"
                      className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                    />
              
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Habilidades Técnicas */}
        <div className="col-span-full">
          <button
            onClick={() => toggleSeccion("habilidadesTecnicas")}
            className="w-full flex items-center justify-between rounded-2xl border border-card-border bg-[#061327]/80 p-4 hover:bg-[#061327] transition-colors"
          >
            <h3 className="text-base font-semibold text-[#E2F0FF]">Habilidades Técnicas</h3>
            <span className="text-[#E2F0FF]">
              {seccionesExpandidas.habilidadesTecnicas ? <IconoContraer /> : <IconoExpandir />}
            </span>
          </button>
          {seccionesExpandidas.habilidadesTecnicas && (
            <div className="mt-3 rounded-2xl border border-card-border bg-[#061327]/80 p-4 animate-fadeIn">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Nombre Habilidad</label>
                  <input
                    type="text"
                    value={habilidadTecnica.nombre}
                    onChange={(e) =>
                      setHabilidadTecnica((prev) => ({ ...prev, nombre: e.target.value }))
                    }
                    placeholder="Ej: JavaScript"
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Nivel de Dominio</label>
                  <select
                    value={habilidadTecnica.nivel}
                    onChange={(e) =>
                      setHabilidadTecnica((prev) => ({
                        ...prev,
                        nivel: e.target.value as "TODOS"|"BASICO" | "INTERMEDIO" | "AVANZADO" | "EXPERTO",
                      }))
                    }
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  >
                    <option value="TODOS">TODOS</option>
                    <option value="BASICO">BÁSICO</option>
                    <option value="INTERMEDIO">INTERMEDIO</option>
                    <option value="AVANZADO">AVANZADO</option>
                    <option value="EXPERTO">EXPERTO</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Años de Experiencia</label>
                  <input
                    type="number"
                    value={habilidadTecnica.anosExperiencia || ""}
                    onChange={(e) =>
                      setHabilidadTecnica((prev) => ({
                        ...prev,
                        anosExperiencia: Number(e.target.value) || 0,
                      }))
                    }
                    placeholder="Ej: 2"
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Habilidades Blandas */}
        <div className="col-span-full">
          <button
            onClick={() => toggleSeccion("habilidadesBlandas")}
            className="w-full flex items-center justify-between rounded-2xl border border-card-border bg-[#061327]/80 p-4 hover:bg-[#061327] transition-colors"
          >
            <h3 className="text-base font-semibold text-[#E2F0FF]">Habilidades Blandas</h3>
            <span className="text-[#E2F0FF]">
              {seccionesExpandidas.habilidadesBlandas ? <IconoContraer /> : <IconoExpandir />}
            </span>
          </button>
          {seccionesExpandidas.habilidadesBlandas && (
            <div className="mt-3 rounded-2xl border border-card-border bg-[#061327]/80 p-4 animate-fadeIn">
              <div>
                <label className="mb-1 block text-sm font-medium text-text-primary">Nombre Habilidad</label>
                <input
                  type="text"
                  value={habilidadBlanda.nombre}
                  onChange={(e) =>
                    setHabilidadBlanda((prev) => ({ ...prev, nombre: e.target.value }))
                  }
                  placeholder="Ej: Comunicación"
                  className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                />
              </div>
            </div>
          )}
        </div>

        {/* Proyectos */}
        <div className="col-span-full">
          <button
            onClick={() => toggleSeccion("proyectos")}
            className="w-full flex items-center justify-between rounded-2xl border border-card-border bg-[#061327]/80 p-4 hover:bg-[#061327] transition-colors"
          >
            <h3 className="text-base font-semibold text-[#E2F0FF]">Proyectos</h3>
            <span className="text-[#E2F0FF]">
              {seccionesExpandidas.proyectos ? <IconoContraer /> : <IconoExpandir />}
            </span>
          </button>
          {seccionesExpandidas.proyectos && (
            <div className="mt-3 rounded-2xl border border-card-border bg-[#061327]/80 p-4 animate-fadeIn">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Nombre Proyecto</label>
                  <input
                    type="text"
                    value={proyecto.nombre}
                    onChange={(e) =>
                      setProyecto((prev) => ({ ...prev, nombre: e.target.value }))
                    }
                    placeholder="Ej: Plataforma de Ventas"
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Tecnologías</label>
                  <input
                    type="text"
                    value={proyecto.tecnologias.join(", ")}
                    onChange={(e) =>
                      setProyecto((prev) => ({
                        ...prev,
                        tecnologias: parseTecnologias(e.target.value),
                      }))
                    }
                    placeholder="Ej: React, Node.js"
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Duración del Proyecto</label>
                  <input
                    type="text"
                    value={proyecto.duracion}
                    onChange={(e) =>
                      setProyecto((prev) => ({ ...prev, duracion: e.target.value }))
                    }
                    placeholder="Ej: 6 meses"
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  />
                </div>
                <div className="lg:col-span-3">
                  <label className="mb-1 block text-sm font-medium text-text-primary">Rol en Proyecto</label>
                  <input
                    type="text"
                    value={proyecto.rol}
                    onChange={(e) =>
                      setProyecto((prev) => ({ ...prev, rol: e.target.value }))
                    }
                    placeholder="Ej: Líder Técnico"
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Formación Académica */}
        <div className="col-span-full">
          <button
            onClick={() => toggleSeccion("formacionAcademica")}
            className="w-full flex items-center justify-between rounded-2xl border border-card-border bg-[#061327]/80 p-4 hover:bg-[#061327] transition-colors"
          >
            <h3 className="text-base font-semibold text-[#E2F0FF]">Formación Académica</h3>
            <span className="text-[#E2F0FF]">
              {seccionesExpandidas.formacionAcademica ? <IconoContraer /> : <IconoExpandir />}
            </span>
          </button>
          {seccionesExpandidas.formacionAcademica && (
            <div className="mt-3 rounded-2xl border border-card-border bg-[#061327]/80 p-4 animate-fadeIn">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Institución</label>
                  <input
                    type="text"
                    value={formacionAcademica.institucion}
                    onChange={(e) =>
                      setFormacionAcademica((prev) => ({ ...prev, institucion: e.target.value }))
                    }
                    placeholder="Ej: Universidad Mayor"
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Título Obtenido</label>
                  <input
                    type="text"
                    value={formacionAcademica.titulo}
                    onChange={(e) =>
                      setFormacionAcademica((prev) => ({ ...prev, titulo: e.target.value }))
                    }
                    placeholder="Ej: Ingeniería de Sistemas"
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Nivel Académico</label>
                  <select
                    value={formacionAcademica.nivel}
                    onChange={(e) =>
                      setFormacionAcademica((prev) => ({
                        ...prev,
                        nivel: e.target.value as
                          |"TODOS"
                          | "PRIMARIA"
                          | "SECUNDARIA"
                          | "TECNICO"
                          | "LICENCIATURA"
                          | "MAESTRIA"
                          | "DOCTORADO"
                          | "DIPLOMADO"
                          | "CURSOS",
                      }))
                    }
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  >
                    <option value="TODOS">TODOS</option>
                    <option value="PRIMARIA">PRIMARIA</option>
                    <option value="SECUNDARIA">SECUNDARIA</option>
                    <option value="TECNICO">TECNICO</option>
                    <option value="LICENCIATURA">LICENCIATURA</option>
                    <option value="MAESTRIA">MAESTRIA</option>
                    <option value="DOCTORADO">DOCTORADO</option>
                    <option value="DIPLOMADO">DIPLOMADO</option>
                    <option value="CURSOS">CURSOS</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Duración (en años)</label>
                  <input
                    type="number"
                    value={formacionAcademica.duracion || ""}
                    onChange={(e) =>
                      setFormacionAcademica((prev) => ({
                        ...prev,
                        duracion: Number(e.target.value) || 0,
                      }))
                    }
                    placeholder="Ej: 4"
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-text-primary">Estado Formación</label>
                  <select
                    value={formacionAcademica.estado}
                    onChange={(e) =>
                      setFormacionAcademica((prev) => ({
                        ...prev,
                        estado: e.target.value as "TODOS"|"EN CURSO" | "FINALIZADO" | "INCOMPLETO",
                      }))
                    }
                    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
                  >
                    <option value="TODOS">TODOS</option>
                    <option value="EN_CURSO">EN CURSO</option>
                    <option value="FINALIZADO">FINALIZADO</option>
                    <option value="INCOMPLETO">INCOMPLETO</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-end">
        <button
          type="button"
          disabled={cargando}
          onClick={handleAplicar}
          className="rounded-xl bg-brand-azul-brillante px-8 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {cargando ? "Aplicando..." : "Aplicar filtros"}
        </button>
        <button
          type="button"
          disabled={cargando}
          onClick={handleLimpiar}
          className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-text-primary transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
        >
          Limpiar filtros
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </aside>
  );
};