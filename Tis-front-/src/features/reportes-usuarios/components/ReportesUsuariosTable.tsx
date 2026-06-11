import type { ReporteUsuario } from '../models/reporte-usuario.model';

interface Props {
  usuarios: ReporteUsuario[];
  cargando: boolean;
  error: string | null;
}

const formatearFecha = (fechaRegistro: string) => {
  const fecha = new Date(`${fechaRegistro}T00:00:00`);

  if (Number.isNaN(fecha.getTime())) {
    return fechaRegistro;
  }

  return fecha.toLocaleDateString('es-BO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const ReportesUsuariosTable = ({ usuarios, cargando, error }: Props) => {
  return (
    <div className="rounded-2xl border border-blue-900/70 bg-[#071426] p-4 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-blue-900/70 text-sm text-slate-400">
              <th className="px-4 py-4">Nombre completo</th>
              <th className="px-4 py-4">Correo</th>
              <th className="px-4 py-4">Profesión</th>
              <th className="px-4 py-4">Fecha de registro</th>
              <th className="px-4 py-4">Estado</th>
            </tr>
          </thead>

          <tbody>
            {cargando && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                  Cargando reporte de usuarios...
                </td>
              </tr>
            )}

            {!cargando && error && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-red-400">
                  {error}
                </td>
              </tr>
            )}

            {!cargando && !error && usuarios.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                  No se encontraron usuarios con los filtros aplicados.
                </td>
              </tr>
            )}

            {!cargando &&
              !error &&
              usuarios.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="border-b border-blue-950 text-slate-200 transition hover:bg-blue-950/40"
                >
                  <td className="px-4 py-4 font-medium">
                    {usuario.nombreCompleto}
                  </td>

                  <td className="px-4 py-4">{usuario.correo}</td>

                  <td className="px-4 py-4">{usuario.profesion}</td>

                  <td className="px-4 py-4">
                    {formatearFecha(usuario.fechaRegistro)}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={
                        usuario.estado === 'ACTIVO'
                          ? 'rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-400'
                          : 'rounded-full bg-slate-500/15 px-3 py-1 text-sm font-semibold text-slate-400'
                      }
                    >
                      {usuario.estado === 'ACTIVO' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Mostrando {usuarios.length} resultado{usuarios.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
};