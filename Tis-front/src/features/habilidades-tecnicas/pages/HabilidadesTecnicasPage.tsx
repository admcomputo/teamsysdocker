import { useEffect, useState } from "react";

import {
  getMisHabilidades,
  crearHabilidad,
  actualizarHabilidad,
  eliminarHabilidad,
} from "../services/habilidades.service";

import type {
  HabilidadTecnica,
  HabilidadTecnicaPayload,
} from "../services/habilidades.service";

import { HabilidadList } from "../components/HabilidadList";
import { HabilidadForm } from "../components/HabilidadForm";

export const HabilidadesTecnicasPage = () => {
  const [skills, setSkills] = useState<HabilidadTecnica[]>([]);
  const [selected, setSelected] = useState<HabilidadTecnica | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getMisHabilidades();
      setSkills(data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar las habilidades técnicas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onSave = async (data: HabilidadTecnicaPayload) => {
    try {
      if (data.id) {
        await actualizarHabilidad(data);
        alert("Habilidad actualizada correctamente");
      } else {
        await crearHabilidad(data);
        alert("Habilidad registrada correctamente");
      }

      setSelected(null);
      await load();
    } catch (error) {
      console.error(error);
      alert("Error al guardar la habilidad técnica");
    }
  };

  const onDelete = async (id: number) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar esta habilidad técnica?"
    );

    if (!confirmar) return;

    try {
      await eliminarHabilidad(id);
      alert("Habilidad eliminada correctamente");
      await load();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la habilidad técnica");
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-400">
            Gestión de habilidades técnicas
          </h1>
          <p className="text-gray-400 mt-1">
            Registra, edita y elimina tus habilidades técnicas.
          </p>
        </div>

        {loading && (
          <p className="mb-4 text-gray-400">
            Cargando habilidades técnicas...
          </p>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <HabilidadList
            skills={skills}
            onEdit={setSelected}
            onDelete={onDelete}
          />

          <HabilidadForm
            selected={selected}
            onSave={onSave}
            onCancel={() => setSelected(null)}
          />
        </div>
      </div>
    </section>
  );
};