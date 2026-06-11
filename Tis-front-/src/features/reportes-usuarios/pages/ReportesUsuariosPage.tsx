import { Lock } from 'lucide-react';
import { exportarReporteUsuariosPDF } from '../utils/exportarReporteUsuariosPDF';

import { ReportesUsuariosFilters } from '../components/ReportesUsuariosFilters';
import { ReportesUsuariosStats } from '../components/ReportesUsuariosStats';
import { ReportesUsuariosTable } from '../components/ReportesUsuariosTable';
import { useReportesUsuarios } from '../hooks/useReportesUsuarios';

export const ReportesUsuariosPage = () => {
  const {
    filtrosFormulario,
    setFiltrosFormulario,
    usuarios,
    totalUsuarios,
    usuariosActivos,
    usuariosInactivos,
    cargando,
    error,
    aplicarFiltros,
    limpiarFiltros,
  } = useReportesUsuarios();

  const exportarPdf = () => {
    exportarReporteUsuariosPDF({
      usuarios,
      filtros: filtrosFormulario,
      totalUsuarios,
      usuariosActivos,
      usuariosInactivos,
    });
  };

  return (
    <main className="min-h-screen bg-[#020817] px-6 py-8 text-white">
      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Reportes de Usuarios
            </h1>

            <p className="mt-2 max-w-3xl text-slate-400">
              Consulta la información general de los usuarios registrados y
              analiza su estado dentro del sistema.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
            <Lock size={16} />
            Acceso solo para administradores
          </div>
        </div>

        <ReportesUsuariosStats
          totalUsuarios={totalUsuarios}
          usuariosActivos={usuariosActivos}
          usuariosInactivos={usuariosInactivos}
        />

        <ReportesUsuariosFilters
          filtros={filtrosFormulario}
          setFiltros={setFiltrosFormulario}
          aplicarFiltros={aplicarFiltros}
          limpiarFiltros={limpiarFiltros}
          exportarPdf={exportarPdf}
        />

        <ReportesUsuariosTable
          usuarios={usuarios}
          cargando={cargando}
          error={error}
        />
      </section>
    </main>
  );
};