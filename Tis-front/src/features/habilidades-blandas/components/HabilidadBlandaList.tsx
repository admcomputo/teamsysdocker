import type { HabilidadBlanda } from "../services/habilidades-blandas.service";

interface Props {
  skills: HabilidadBlanda[];
  onEdit: (skill: HabilidadBlanda) => void;
  onDelete: (id: number) => void;
}

export const HabilidadBlandaList = ({ skills, onEdit, onDelete }: Props) => {
  return (
    <div className="bg-slate-900 p-5 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-blue-300 mb-4">
        Mis habilidades blandas
      </h2>

      {skills.length === 0 && (
        <p className="text-gray-400">
          Todavía no registraste habilidades blandas.
        </p>
      )}

      <div className="space-y-3">
        {skills.map((s) => (
          <div
            key={s.id}
            className="bg-slate-800 p-4 rounded-lg flex flex-col md:flex-row md:justify-between gap-4 border border-slate-700"
          >
            <div>
              <h3 className="font-bold text-white text-lg">{s.nombre}</h3>

              <p className="text-sm text-gray-400">
                Categoría / contexto: {s.categoria?.nombre || "Sin categoría"}
              </p>

              {s.descripcion && (
                <p className="text-sm text-gray-300 mt-2">
                  {s.descripcion}
                </p>
              )}

              {s.evidenciaUrl && (
                <a
                  href={s.evidenciaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-400 underline mt-2 inline-block"
                >
                  Ver evidencia
                </a>
              )}
            </div>

            <div className="flex md:flex-col gap-2">
              <button
                onClick={() => onEdit(s)}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
              >
                Editar
              </button>

              <button
                onClick={() => onDelete(s.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};