import { Users, UserCheck, UserX } from 'lucide-react';

interface Props {
  totalUsuarios: number;
  usuariosActivos: number;
  usuariosInactivos: number;
}

export const ReportesUsuariosStats = ({
  totalUsuarios,
  usuariosActivos,
  usuariosInactivos,
}: Props) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <div className="rounded-2xl border border-blue-900/70 bg-[#071426] p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-blue-600/20 p-4 text-blue-400">
            <Users size={32} />
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Total de usuarios registrados
            </p>
            <h3 className="text-4xl font-bold text-white">{totalUsuarios}</h3>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-900/70 bg-[#071426] p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-emerald-600/20 p-4 text-emerald-400">
            <UserCheck size={32} />
          </div>

          <div>
            <p className="text-sm text-slate-400">Usuarios activos</p>
            <h3 className="text-4xl font-bold text-white">{usuariosActivos}</h3>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-[#071426] p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-slate-600/20 p-4 text-slate-400">
            <UserX size={32} />
          </div>

          <div>
            <p className="text-sm text-slate-400">Usuarios inactivos</p>
            <h3 className="text-4xl font-bold text-white">
              {usuariosInactivos}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};