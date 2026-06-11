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

import { ToastMessage } from "@/shared/components/ui/ToastMessage";
import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";

export const HabilidadesBlandasPage = () => {
  const [skills, setSkills] = useState<HabilidadBlanda[]>([]);
  const [selected, setSelected] = useState<HabilidadBlanda | null>(null);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const load = async () => {
    try {
      setLoading(true);
      const data = await getMisHabilidadesBlandas();
      setSkills(data);
    } catch (error) {
      console.error(error);
      showToast("Error al cargar las habilidades blandas", "error");
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
        showToast("Habilidad blanda actualizada correctamente", "success");
      } else {
        await crearHabilidadBlanda(data);
        showToast("Habilidad blanda registrada correctamente", "success");
      }

      setSelected(null);
      await load();
    } catch (error) {
      console.error(error);
      showToast("Error al guardar la habilidad blanda", "error");
    }
  };

  const onDelete = async (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await eliminarHabilidadBlanda(deleteId);
      showToast("Habilidad blanda eliminada correctamente", "success");
      await load();
    } catch (error) {
      console.error(error);
      showToast("Error al eliminar la habilidad blanda", "error");
    } finally {
      setDeleteId(null);
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

      {toast && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ConfirmModal
        open={deleteId !== null}
        title="Eliminar habilidad"
        message="¿Seguro que deseas eliminar esta habilidad blanda?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </section>
  );
};