import { useState } from "react";
import { RichTextEditor } from "@/shared/components/ui/RichTextEditor";

import {
  ShieldCheck,
  Link,
  Image,
  Calendar,
  UploadCloud,
  Save,
  Plus,
  Trash2,
  X,
  FileText,
} from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import type { ProjectResponseDTO } from "../services/project.dto";
import "../styles/projects.css";

interface Props {
  projectToEdit?: ProjectResponseDTO | null;
  onCancel?: () => void;
  onSaved?: () => void;
}

export function ProjectForm({
  projectToEdit = null,
  onCancel,
  onSaved,
}: Props) {
  
  const [newTechnologyInput, setNewTechnologyInput] = useState("");

  const {
    form,
    technologies,
    loadingTechnologies,
    loading,
    message,
    isEditMode,
    updateField,
    addTechnology,
    removeTechnology,
    addNewTechnology,
    removeNewTechnology,
    addAdditionalUrl,
    updateAdditionalUrl,
    removeAdditionalUrl,
    addImages,
    removeImage,
    addPdfs,
    removePdf,
    saveProject,
  } = useProjects({
    projectToEdit,
    onSaved,
  });

  const minDate = "1970-01-01";
  const today = new Date().toISOString().split("T")[0];

  const isFinalizado = form.estadoProyecto === "FINALIZADO";

  function handleCancel() {
    onCancel?.();
  }

  function handleAddNewTechnology() {
    addNewTechnology(newTechnologyInput);
    setNewTechnologyInput("");
  }

  return (
    <div className="project-form-container">
      <section className="project-card">
        <h2>
          <ShieldCheck size={20} />
          {isEditMode ? "Editar proyecto" : "Información principal"}
        </h2>

        <div className="project-grid-2">
          <div className="project-field">
            <label>
              Nombre del proyecto <span>*</span>
            </label>
            <input
              value={form.nombreProyecto}
              onChange={(e) => updateField("nombreProyecto", e.target.value)}
              placeholder="Sistema de Gestión de Inventario"
              disabled={loading}
            />
          </div>

          <div className="project-field">
            <label>
              Rol en el proyecto <span>*</span>
            </label>
            <select
              value={form.rolProyecto}
              onChange={(e) => updateField("rolProyecto", e.target.value)}
              disabled={loading}
            >
              <option>Full Stack Developer</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>QA Tester</option>
              <option>Diseñador UX/UI</option>
              <option>Líder de Proyecto</option>
            </select>
          </div>
        </div>

        <div className="project-field">
          <label>
            Descripción del proyecto <span>*</span>
          </label>

<RichTextEditor
  value={form.descripcionProyecto || ""}
  onChange={(value) =>
    updateField("descripcionProyecto", value)
  }
  placeholder="Describe tu proyecto..."
/>

          <small>{form.descripcionProyecto.length}/1000</small>
        </div>

        <div className="project-field">
          <label>
            Tecnologías usadas <span>*</span>
          </label>

          <select
            value=""
            onChange={(e) => {
              const selectedId = Number(e.target.value);

              if (!selectedId) return;

              addTechnology(selectedId);

              setTimeout(() => {
                e.target.value = "";
              }, 0);
            }}
            disabled={loading || loadingTechnologies}
          >
            <option value="">
              {loadingTechnologies
                ? "Cargando tecnologías..."
                : "Selecciona tecnología"}
            </option>

            {technologies.map((tech) => (
              <option key={tech.id} value={tech.id}>
                {tech.nombre}
              </option>
            ))}
          </select>

          <div className="project-chips" style={{ marginTop: "12px" }}>
            {form.tecnologiasIds.map((techId, index) => (
              <span className="project-chip" key={techId}>
                {form.tecnologiasHerramientas[index] ||
                  technologies.find((tech) => tech.id === techId)?.nombre ||
                  `Tecnología ${techId}`}

                <button
                  type="button"
                  onClick={() => removeTechnology(techId)}
                  disabled={loading}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="project-field">
          <label>Nuevas tecnologías</label>

          <div className="project-url-row">
            <input
              value={newTechnologyInput}
              onChange={(e) => setNewTechnologyInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddNewTechnology();
                }
              }}
              placeholder="Ej. NestJS, Docker, Prisma"
              disabled={loading}
            />

            <button
              type="button"
              onClick={handleAddNewTechnology}
              disabled={loading}
              title="Agregar nueva tecnología"
            >
              <Plus size={17} />
            </button>
          </div>

          <div className="project-chips" style={{ marginTop: "12px" }}>
            {form.nuevasTecnologias.map((tech, index) => (
              <span className="project-chip" key={`${tech}-${index}`}>
                {tech}

                <button
                  type="button"
                  onClick={() => removeNewTechnology(index)}
                  disabled={loading}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="project-card">
        <h2>
          <Link size={20} />
          Enlaces del proyecto
        </h2>

        <div className="project-grid-2">
          <div className="project-field">
            <label>Repositorio</label>
            <input
              value={form.urlRepositorio}
              onChange={(e) => updateField("urlRepositorio", e.target.value)}
              placeholder="https://github.com/usuario/proyecto"
              disabled={loading}
            />
          </div>

          <div className="project-field">
            <label>Demo / Sitio web / Deploy</label>
            <input
              value={form.urlDemo}
              onChange={(e) => updateField("urlDemo", e.target.value)}
              placeholder="https://inventario-app.vercel.app"
              disabled={loading}
            />
          </div>
        </div>

        <div className="project-field">
          <label>URLs adicionales</label>

          {form.urlsAdicionales.map((url, index) => (
            <div className="project-url-row" key={index}>
              <input
                value={url}
                onChange={(e) => updateAdditionalUrl(index, e.target.value)}
                placeholder="https://documentacion-inventario.com/api"
                disabled={loading}
              />

              <button
                type="button"
                onClick={() => removeAdditionalUrl(index)}
                disabled={loading}
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}

          <button
            type="button"
            className="project-outline-btn"
            onClick={addAdditionalUrl}
            disabled={loading}
          >
            <Plus size={17} />
            Agregar otra URL
          </button>
        </div>
      </section>

      <section className="project-card">
        <h2>
          <Image size={20} />
          Evidencia multimedia
        </h2>

        <div className="project-field">
          <label>Imágenes del proyecto</label>

          <div className="project-image-grid">
            <label className="project-upload-box">
              <UploadCloud size={32} />
              <strong>Subir imagen</strong>
              <span>PNG, JPG, WEBP</span>
              <small>Se subirá a Cloudinary al guardar</small>

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                multiple
                onChange={(e) => {
                  addImages(e.target.files);
                  e.target.value = "";
                }}
                disabled={loading}
              />
            </label>

            {form.imagenes.map((img, index) => (
              <div className="project-image-preview" key={`${img.url}-${index}`}>
                <img
                  src={img.url}
                  alt={img.descripcion || "Imagen del proyecto"}
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  disabled={loading}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="project-field">
          <label>Archivos PDF del proyecto</label>

          <div className="project-image-grid">
            <label className="project-upload-box">
              <FileText size={32} />
              <strong>Subir PDF</strong>
              <span>Archivo PDF</span>
              <small>Se subirá a Cloudinary al guardar</small>

              <input
                type="file"
                accept="application/pdf"
                multiple
                onChange={(e) => {
                  addPdfs(e.target.files);
                  e.target.value = "";
                }}
                disabled={loading}
              />
            </label>

            {form.pdfs.map((pdf, index) => (
              <div className="project-pdf-preview" key={`${pdf.url}-${index}`}>
                <FileText size={34} />
                <strong>{pdf.nombre}</strong>
                <a href={pdf.url} target="_blank" rel="noreferrer">
                  Ver PDF
                </a>

                <button
                  type="button"
                  onClick={() => removePdf(index)}
                  disabled={loading}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
      </section>

      <section className="project-card">
        <h2>
          <Calendar size={20} />
          Información adicional
        </h2>

        <div className="project-field">
          <label>Estado del proyecto</label>
          <select
            value={form.estadoProyecto}
            onChange={(e) =>
              updateField(
                "estadoProyecto",
                e.target.value as typeof form.estadoProyecto
              )
            }
            disabled={loading}
          >
            <option value="FINALIZADO">Finalizado</option>
            <option value="EN_DESARROLLO">En desarrollo</option>
            <option value="PAUSADO">Pausado</option>
          </select>
        </div>

        <div className="project-grid-4">
          <div className="project-field">
            <label>Fecha de inicio</label>
            <input
              type="date"
              value={form.fechaInicio}
              min={minDate}
              max={today}
              onChange={(e) => updateField("fechaInicio", e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="project-field">
            <label>Fecha de finalización</label>
            <input
              type="date"
              value={form.fechaFinalizacion}
              min={minDate}
              max={today}
              onChange={(e) => updateField("fechaFinalizacion", e.target.value)}
              disabled={loading || !isFinalizado}
            />
            {!isFinalizado && (
              <small>
                Solo se puede poner fecha fin si el proyecto está finalizado.
              </small>
            )}
          </div>

          <div className="project-field">
            <label>Privacidad</label>
            <select
              value={form.privacidad}
              onChange={(e) =>
                updateField("privacidad", e.target.value as typeof form.privacidad)
              }
              disabled={loading}
            >
              <option value="PUBLICO">Público</option>
              <option value="PRIVADO">Privado</option>
            </select>
          </div>
        </div>
      </section>

      {message && <p className="project-message">{message}</p>}

      <div className="project-form-actions">
        <button
          type="button"
          className="project-cancel-btn"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancelar
        </button>

        <button
          type="button"
          className="project-save-btn"
          onClick={saveProject}
          disabled={loading}
        >
          <Save size={18} />
          {loading
            ? message || "Guardando..."
            : isEditMode
              ? "Guardar cambios"
              : "Guardar proyecto"}
        </button>
      </div>
    </div>
  );
}
