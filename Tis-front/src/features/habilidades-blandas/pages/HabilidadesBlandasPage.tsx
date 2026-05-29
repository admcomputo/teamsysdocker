import { useEffect, useState } from "react";

import {
  getMisHabilidadesBlandas,
  crearHabilidadBlanda,
  actualizarHabilidadBlanda,
  eliminarHabilidadBlanda,
} from "../services/habilidades-blandas.service";

import type {
  HabilidadBlanda,
  HabilidadBlandaPayload,
} from "../services/habilidades-blandas.service";

import { HabilidadBlandaList } from "../components/HabilidadBlandaList";
import { HabilidadBlandaForm } from "../components/HabilidadBlandaForm";

export const HabilidadesBlandasPage = () => {
  const [skills, setSkills] = useState<HabilidadBlanda[]>([]);
  const [selected, setSelected] = useState<HabilidadBlanda | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getMisHabilidadesBlandas();
      setSkills(data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar las habilidades blandas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onSave = async (data: HabilidadBlandaPayload) => {
    try {
      if (data.id) {
        await actualizarHabilidadBlanda(data);
        alert("Habilidad blanda actualizada correctamente");
      } else {
        await crearHabilidadBlanda(data);
        alert("Habilidad blanda registrada correctamente");
      }

      setSelected(null);
      await load();
    } catch (error) {
      console.error(error);
      alert("Error al guardar la habilidad blanda");
    }
  };

  const onDelete = async (id: number) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar esta habilidad blanda?"
    );

    if (!confirmar) return;

    try {
      await eliminarHabilidadBlanda(id);
      alert("Habilidad blanda eliminada correctamente");
      await load();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la habilidad blanda");
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-400">
            Gestión de habilidades blandas
          </h1>
          <p className="text-gray-400 mt-1">
            Registra, edita y elimina tus habilidades blandas.
          </p>
        </div>

        {loading && (
          <p className="mb-4 text-gray-400">
            Cargando habilidades blandas...
          </p>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <HabilidadBlandaList
            skills={skills}
            onEdit={setSelected}
            onDelete={onDelete}
          />

          <HabilidadBlandaForm
            selected={selected}
            onSave={onSave}
            onCancel={() => setSelected(null)}
          />
        </div>
      </div>
    </section>
  );
};