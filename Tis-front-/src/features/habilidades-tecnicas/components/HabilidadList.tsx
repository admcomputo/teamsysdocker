import type { HabilidadTecnica } from "../services/habilidades.service";

interface Props {
  skills: HabilidadTecnica[];
  onEdit: (skill: HabilidadTecnica) => void;
  onDelete: (id: number) => void;
}

export const HabilidadList = ({ skills, onEdit, onDelete }: Props) => {
  return (
    <div className="bg-slate-900 p-5 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-blue-300 mb-4">
        Mis habilidades técnicas
      </h2>

      {skills.length === 0 && (
        <p className="text-gray-400">
          Todavía no registraste habilidades técnicas.
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
                Nivel: {s.nivelDominio || "No definido"}
              </p>

              <p className="text-sm text-gray-400">
                Experiencia: {s.anosExperiencia ?? 0} años
              </p>

              <p className="text-sm text-gray-400">
                Categoría: {s.categoria?.nombre || "Sin categoría"}
              </p>

              {s.descripcion && (
  <div
    className="text-sm text-gray-300 mt-2"
    dangerouslySetInnerHTML={{ __html: s.descripcion }}
  />
)}

              {s.certificadoUrl && (
                <a
                  href={s.certificadoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-400 underline mt-2 inline-block"
                >
                  Ver certificado
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