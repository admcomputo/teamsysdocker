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

import { ToastMessage } from "@/shared/components/ui/ToastMessage";
import { ConfirmModal } from "@/shared/components/ui/ConfirmModal";

export const HabilidadesTecnicasPage = () => {
  const [skills, setSkills] = useState<HabilidadTecnica[]>([]);
  const [selected, setSelected] = useState<HabilidadTecnica | null>(null);
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
      const data = await getMisHabilidades();
      setSkills(data);
    } catch (error) {
      console.error(error);
      showToast("Error al cargar las habilidades técnicas", "error");
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
        showToast("Habilidad actualizada correctamente", "success");
      } else {
        await crearHabilidad(data);
        showToast("Habilidad registrada correctamente", "success");
      }

      setSelected(null);
      await load();
    } catch (error) {
      console.error(error);
      showToast("Error al guardar la habilidad técnica", "error");
    }
  };

  const onDelete = async (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await eliminarHabilidad(deleteId);
      showToast("Habilidad eliminada correctamente", "success");
      await load();
    } catch (error) {
      console.error(error);
      showToast("Error al eliminar la habilidad técnica", "error");
    } finally {
      setDeleteId(null);
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
        message="¿Seguro que deseas eliminar esta habilidad técnica?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </section>
  );
};