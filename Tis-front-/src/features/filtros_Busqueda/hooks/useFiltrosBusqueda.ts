import { useEffect, useState } from "react";

import {
  filtrosBusquedaIniciales,
  validarEmpresa,
  validarExperienciaMinima,
  validarSoloLetras,
  validarTecnologia,
  validarTextoGeneral,
  validarUbicacion,
} from "../models/filtros-busqueda.model";

import type {
  FiltrosBusqueda,
  OrdenarPor,
  PortafolioResultado,
} from "../models/filtros-busqueda.model";

import { buscarPortafoliosService } from "../services/filtros-busqueda.service";
import { useAuth } from "@/core/context/AuthContext";

export const useFiltrosBusqueda = () => {
  const { user: currentUser } = useAuth();

  const [filtros, setFiltros] = useState<FiltrosBusqueda>(
    filtrosBusquedaIniciales,
  );

  const [resultados, setResultados] = useState<PortafolioResultado[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarPortafolios = async (filtrosActuales = filtros) => {
    try {
      setCargando(true);
      setError(null);

      console.log("FILTROS ACTUALES",filtrosActuales)
      const response = await buscarPortafoliosService(filtrosActuales);
      // Remover usuario actual de los resultados
      const sinUsuarioActual = response.data.filter(
        (item) => String(item.id) !== String(currentUser?.id),
      );

      // Si hay texto de búsqueda general, aplicar un filtrado adicional
      // en cliente para que la búsqueda general solo coincida contra
      // nombreCompleto, profesion y ubicacion.
      let finalData = sinUsuarioActual;
      const termino = typeof filtrosActuales.buscar === "string" ? filtrosActuales.buscar.trim().toLowerCase() : "";

      if (termino) {
        finalData = sinUsuarioActual.filter((item) => {
          const nombre = String(item.nombreCompleto || "").toLowerCase();
          const profesion = String(item.profesion || "").toLowerCase();
          const ubicacion = String(item.ubicacion || "").toLowerCase();

          return (
            nombre.includes(termino) || profesion.includes(termino) || ubicacion.includes(termino)
          );
        });

        // Ajustar total y páginas localmente cuando se aplica el filtro cliente
        setResultados(finalData);
        setTotal(finalData.length);
        setTotalPaginas(1);
      } else {
        setResultados(finalData);

        const containsCurrentUser = response.data.some(
          (item) => String(item.id) === String(currentUser?.id),
        );

        setTotal(
          containsCurrentUser ? Math.max(0, response.total - 1) : response.total,
        );

        setTotalPaginas(response.totalPaginas || 1);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al buscar portafolios.",
      );
      setResultados([]);
      setTotal(0);
      setTotalPaginas(1);
    } finally {
      setCargando(false);
    }
  };

  const actualizarFiltro = (
    campo: keyof FiltrosBusqueda,
    valor: string | number | string[],
  ) => {
    setFiltros((prev) => {
      let valorValidado: string | number | string[] = valor;

      if (typeof valor === "string") {
        if (
          campo === "profesion" ||
          campo === "especializacion" ||
          campo === "formacionAcademica"
        ) {
          valorValidado = validarSoloLetras(valor);
        }

        if (campo === "buscar") {
          valorValidado = validarTextoGeneral(valor);
        }

        if (campo === "tecnologia") {
          valorValidado = validarTecnologia(valor);
        }

        if (campo === "empresa") {
          valorValidado = validarEmpresa(valor);
        }

        if (campo === "ubicacion") {
          valorValidado = validarUbicacion(valor);
        }

        if (campo === "experienciaMinima") {
          valorValidado = validarExperienciaMinima(valor);
        }
      }

      return {
        ...prev,
        [campo]: valorValidado,
        pagina: campo === "pagina" ? Number(valorValidado) : 1,
      };
    });
  };

  const cambiarOrden = (ordenarPor: OrdenarPor) => {
    const nuevosFiltros = {
      ...filtros,
      ordenarPor,
      pagina: 1,
    };

    setFiltros(nuevosFiltros);
    buscarPortafolios(nuevosFiltros);
  };

  const cambiarPagina = (pagina: number) => {
    const nuevaPagina = Math.max(1, Math.min(pagina, totalPaginas));

    const nuevosFiltros = {
      ...filtros,
      pagina: nuevaPagina,
    };

    setFiltros(nuevosFiltros);
    buscarPortafolios(nuevosFiltros);
  };

  /*const alternarIdioma = (idioma: string) => {
    setFiltros((prev) => {
      const existe = prev.idiomas.includes(idioma);

      return {
        ...prev,
        idiomas: existe
          ? prev.idiomas.filter((item) => item !== idioma)
          : [...prev.idiomas, idioma],
        pagina: 1,
      };
    });
  };*/

  // En useFiltrosBusqueda.ts
const aplicarFiltros = (filtrosDesdePanel?: FiltrosBusqueda) => {
  const nuevosFiltros = {
    ...(filtrosDesdePanel || filtros), // Si vienen del panel, usa esos; si no, el estado actual
    pagina: 1,
  };

  setFiltros(nuevosFiltros);
  buscarPortafolios(nuevosFiltros);
};

  const limpiarFiltros = () => {
    setFiltros(filtrosBusquedaIniciales);
    setResultados([]);
    setTotal(0);
    setTotalPaginas(1);
    setError(null);
  };

  useEffect(() => {
    buscarPortafolios(filtrosBusquedaIniciales);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return {
    filtros,
    resultados,
    total,
    totalPaginas,
    cargando,
    error,
    actualizarFiltro,
    cambiarOrden,
    cambiarPagina,
    //alternarIdioma,
    aplicarFiltros,
    limpiarFiltros,
    buscarPortafolios,
    setFiltros,
  };
};