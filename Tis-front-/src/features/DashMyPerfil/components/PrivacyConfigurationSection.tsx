import { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, AlertCircle, Loader2, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { dashMyPerfilService } from '../services/privacy.service';

interface PrivacyConfigurationSectionProps {
  onBack: () => void;
}

interface VisibilityElement {
  id: number;
  nombre: string;
  esPublico: boolean;
}

interface VisibilityElementsData {
  experiencias?: VisibilityElement[];
  formaciones?: VisibilityElement[];
  habilidadesTecnicas?: VisibilityElement[];
  habilidadesBlandas?: VisibilityElement[];
  proyectos?: VisibilityElement[];
  redesSociales?: VisibilityElement[];
}

const SECTIONS: Record<string, string[]> = {
  "Información Personal": ["nombre", "profesion", "biografia"],
  "Información de Contacto": ["correo", "telefono", "direccion"],
  "Experiencia Laboral": ["experiencias"],
  "Formación Académica": ["formaciones"],
  "Habilidades Técnicas": ["habilidadesTecnicas"],
  "Habilidades Blandas": ["habilidadesBlandas"],
  "Proyectos": ["proyectos"],
  "Redes Sociales": ["redesSociales"],
};

// Mapeo de campos escalares (back -> front)
const SCALAR_BACKEND_TO_FRONT_MAP: Record<string, string> = {
  nombreUsr: 'nombre',
  correoUsr: 'correo',
  biografiaUsr: 'biografia',
  telefonoUsr: 'telefono',
  direccionUsr: 'direccion',
  profesionUsr: 'profesion',
};

// Mapeo de arrays (back -> front)
// Mapeo inverso para guardar (front -> back)
const ARRAY_FRONT_TO_BACK_MAP: Record<string, string> = {
  experienciasLaborales: 'experiencias',
  formacionesAcademica: 'formaciones',
  habilidadesTecnicas: 'habilidadesTecnicas',
  habilidadesBlandas: 'habilidadesBlandas',
  proyectos: 'proyectos',
  redesSociales: 'redesSociales',
};


const renderValue = (value: unknown): string => {
  if (value === null) return 'No especificado';
  if (typeof value === 'boolean') return value ? 'Sí' : 'No';
  if (typeof value === 'object') return '';
  return String(value);
};

const isScalar = (value: unknown) =>
  value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';

export const PrivacyConfigurationSection = ({ onBack }: PrivacyConfigurationSectionProps) => {
  const [portfolioData, setPortfolioData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  const [originalVisibility, setOriginalVisibility] = useState<Record<string, boolean>>({});
  const [elementIds, setElementIds] = useState<Record<string, number>>({});
  const [appliedMessage, setAppliedMessage] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [portfolio, visibilitySettings, visibilityElements] = await Promise.all([
        dashMyPerfilService.getPortfolioSummary(),
        dashMyPerfilService.getVisibilitySettings(),
        dashMyPerfilService.getVisibilityElements(),
      ]);

      const portfolioDataRaw = portfolio as Record<string, unknown>;
      const elementsData = visibilityElements as VisibilityElementsData;
      
      console.log('=== DATOS RECIBIDOS ===');
      console.log('Portfolio (mi-resumen):', portfolioDataRaw);
      console.log('Elementos (mis-elementos):', elementsData);
      
      // 1. Construir visibilidad para escalares
      const scalarVisibility: Record<string, boolean> = {};
      Object.values(SCALAR_BACKEND_TO_FRONT_MAP).forEach((frontKey) => {
        scalarVisibility[frontKey] = true;
      });
      
      Object.entries(SCALAR_BACKEND_TO_FRONT_MAP).forEach(([backendKey, frontKey]) => {
        if (visibilitySettings && visibilitySettings[backendKey] !== undefined) {
          scalarVisibility[frontKey] = visibilitySettings[backendKey];
        }
      });

      // 2. Enriquecer portfolioData
      const enrichedPortfolioData = { ...portfolioDataRaw };
      
      // Mapeo de cómo crear un elemento básico para cada tipo de sección
      const createBasicItem = (backendKey: string, item: VisibilityElement): Record<string, unknown> => {
        const baseItem: Record<string, unknown> = {
          id: item.id,
        };
        
        switch (backendKey) {
          case 'habilidadesTecnicas':
            return {
              ...baseItem,
              nombre: item.nombre,
              categoria: 'General',
              nivelDominio: 'BASICO',
              anosExperiencia: 0,
              descripcion: '',
              certificadoUrl: '',
            };
          case 'habilidadesBlandas':
            return {
              ...baseItem,
              nombre: item.nombre,
              categoria: 'General',
              descripcion: '',
              evidenciaUrl: '',
            };
          case 'experiencias':
            return {
              ...baseItem,
              nombreEmpresa: item.nombre,
              cargoPuesto: 'No especificado',
              areaProfesional: 'General',
              especializacion: 'General',
              fechaInicio: '',
              fechaFin: null,
              actualmenteTrabajoAqui: false,
              modalidadTrabajo: 'NO_ESPECIFICADO',
              ubicacion: '',
              tipoContrato: 'NO_ESPECIFICADO',
              descripcionProyecto: '',
              evidenciaLaboralPdfUrl: '',
              proyectoRelacionadoUrl: '',
              tecnologias: [],
            };
          case 'formaciones':
            return {
              ...baseItem,
              institucion: item.nombre,
              tituloObtenido: 'No especificado',
              nivel: 'NO_ESPECIFICADO',
              area: 'General',
              fechaInicio: '',
              fechaFin: '',
              descripcion: '',
              estado: 'NO_ESPECIFICADO',
              urlImagen: '',
            };
          case 'proyectos':
            return {
              ...baseItem,
              titulo: item.nombre,
              rolProyecto: 'No especificado',
              descripcion: '',
              urlsImagenes: [],
              urlsAdicionales: [],
              tecnologias: [],
              enlaceGithub: '',
              enlaceDemo: '',
              fechaInicio: '',
              fechaFinalizacion: '',
              estadoProyecto: 'NO_ESPECIFICADO',
              urlPdf: '',
              destacar: '',
            };
          case 'redesSociales':
            return {
              ...baseItem,
              nombreRed: item.nombre,
              urlPerfil: '#',
            };
          default:
            return {
              ...baseItem,
              nombre: item.nombre,
            };
        }
      };
      
      // Procesar cada sección
      const sectionsToProcess = [
        { backendKey: 'habilidadesTecnicas', frontKey: 'habilidadesTecnicas' },
        { backendKey: 'habilidadesBlandas', frontKey: 'habilidadesBlandas' },
        { backendKey: 'experiencias', frontKey: 'experienciasLaborales' },
        { backendKey: 'formaciones', frontKey: 'formacionesAcademica' },
        { backendKey: 'proyectos', frontKey: 'proyectos' },
        { backendKey: 'redesSociales', frontKey: 'redesSociales' }
      ];
      
      sectionsToProcess.forEach(({ backendKey, frontKey }) => {
        const backendItems = elementsData?.[backendKey as keyof VisibilityElementsData] || [];
        let localItems = (enrichedPortfolioData[frontKey] as Array<Record<string, unknown>>) || [];
        
        console.log(`\nProcesando ${frontKey}:`);
        console.log(`  Backend items (mis-elementos):`, backendItems);
        console.log(`  Local items actuales (mi-resumen):`, localItems);
        
        // Crear un Set de nombres que ya existen en localItems (para evitar duplicados)
        const existingNames = new Set(
          localItems.map(item => {
            const name = (item.nombre as string) || 
                        (item.nombreEmpresa as string) || 
                        (item.titulo as string) || 
                        (item.institucion as string) ||
                        (item.nombreRed as string);
            return name;
          }).filter(name => name !== undefined && name !== null)
        );
        
        console.log(`  Nombres existentes:`, Array.from(existingNames));
        
        // Agregar items del backend que no existen en localItems (por nombre)
        const itemsToAdd = backendItems
          .filter(backendItem => !existingNames.has(backendItem.nombre))
          .map(backendItem => {
            const newItem = createBasicItem(backendKey, backendItem);
            console.log(`  Creando item para ${backendItem.nombre} (ID: ${backendItem.id}) porque no existe en localItems`);
            return newItem;
          });
        
        // Combinar items existentes con los nuevos
        enrichedPortfolioData[frontKey] = [...localItems, ...itemsToAdd];
        
        const mergedItems = enrichedPortfolioData[frontKey];
        console.log(`  Total después de combinar: ${Array.isArray(mergedItems) ? mergedItems.length : 0} items`);
        console.log(`  Items finales:`, mergedItems);
      });
      
      console.log('\n=== PORTFOLIO ENRIQUECIDO FINAL ===');
      console.log(enrichedPortfolioData);
      
      // 3. Construir visibilidad para arrays
      const arrayVisibility: Record<string, boolean> = {};
      const arrayElementIds: Record<string, number> = {};
      
      sectionsToProcess.forEach(({ backendKey, frontKey }) => {
        const backendItems = elementsData?.[backendKey as keyof VisibilityElementsData] || [];
        const localItems = enrichedPortfolioData[frontKey] as Array<Record<string, unknown>>;
        
        console.log(`\nConstruyendo visibilidad para ${frontKey}:`);
        
        if (Array.isArray(localItems)) {
          localItems.forEach((localItem, index) => {
            const visibilityKey = `${frontKey}[${index}]`;
            const localName = (localItem.nombre as string) || 
                            (localItem.nombreEmpresa as string) || 
                            (localItem.titulo as string) || 
                            (localItem.institucion as string) ||
                            (localItem.nombreRed as string);
            
            // Buscar el item en backend por nombre (ya que los items de mi-resumen no tienen ID)
            const backendItem = backendItems.find((item) => item.nombre === localName);
            
            if (backendItem) {
              arrayVisibility[visibilityKey] = backendItem.esPublico;
              arrayElementIds[visibilityKey] = backendItem.id;
              console.log(`  ${visibilityKey}: nombre="${localName}", ID=${backendItem.id}, esPublico=${backendItem.esPublico}`);
            } else {
              arrayVisibility[visibilityKey] = true;
              console.log(`  ${visibilityKey}: nombre="${localName}" no encontrado en backend, por defecto true`);
            }
          });
        }
      });
      
      // 4. Guardar datos
      const newVisibility = {
        ...scalarVisibility,
        ...arrayVisibility,
      };
      
      console.log('\n=== VISIBILIDAD FINAL ===');
      console.log(newVisibility);
      
      setPortfolioData(enrichedPortfolioData);
      setVisibility(newVisibility);
      setOriginalVisibility(newVisibility);
      setElementIds(arrayElementIds);
      
    } catch (err) {
      console.error('Error al cargar configuración de privacidad:', err);
      setError('No se pudo obtener la configuración de privacidad. Verifica tu sesión y conexión.');
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);

  const handleToggleVisibility = (key: string) => {
    setVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleOpenConfirmModal = () => {
    if (!saving && portfolioData) {
      setShowConfirmModal(true);
    }
  };

  const handleCloseConfirmModal = () => {
    if (!saving) {
      setShowConfirmModal(false);
    }
  };

  const handleApplyChanges = async () => {
    if (!portfolioData) return;
    
    setSaving(true);
    setError(null);

    try {
      // 1. Guardar escalares (Información Personal y Contacto)
      const allScalarSettings: Record<string, boolean> = {
        nombreUsr: visibility['nombre'] ?? true,
        correoUsr: visibility['correo'] ?? true,
        biografiaUsr: visibility['biografia'] ?? true,
        telefonoUsr: visibility['telefono'] ?? true,
        direccionUsr: visibility['direccion'] ?? true,
        profesionUsr: visibility['profesion'] ?? true,
        universidadUsr: true,
      };
      
      await dashMyPerfilService.saveVisibilitySettings(allScalarSettings);
      
      // 2. Guardar elementos de arrays que cambiaron
      const changedArrays: Record<string, Array<{ id: number; esPublico: boolean }>> = {};
      
      Object.entries(ARRAY_FRONT_TO_BACK_MAP).forEach(([frontKey, backendKey]) => {
        const arrayData = portfolioData[frontKey] as Array<Record<string, unknown>> | undefined;
        
        if (Array.isArray(arrayData)) {
          const changedItems: Array<{ id: number; esPublico: boolean }> = [];
          
          arrayData.forEach((item, index) => {
            const visibilityKey = `${frontKey}[${index}]`;
            const currentVisibility = visibility[visibilityKey] ?? true;
            const originalValue = originalVisibility[visibilityKey] ?? true;
            const localId = item.id;
            const elementId = elementIds[visibilityKey] ?? (localId !== undefined && localId !== null ? Number(localId) : undefined);
            
            if (currentVisibility !== originalValue && elementId !== undefined) {
              changedItems.push({
                id: elementId,
                esPublico: currentVisibility,
              });
            }
          });
          
          if (changedItems.length > 0) {
            changedArrays[backendKey] = changedItems;
          }
        }
      });
      
      if (Object.keys(changedArrays).length > 0) {
        await dashMyPerfilService.saveVisibilityElements(changedArrays);
        setOriginalVisibility({ ...visibility });
      }

      setAppliedMessage('Cambios guardados correctamente.');
      setTimeout(() => setAppliedMessage(null), 2500);
      
    } catch (err) {
      console.error('Error al guardar:', err);
      setError('No se pudieron guardar los cambios. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  const renderData = (value: unknown, key: string, path: string) => {
    const visible = visibility[path] !== undefined ? visibility[path] : true;

    if (isScalar(value)) {
      return (
        <li
          key={path}
          className="flex items-center justify-between gap-4 px-4 py-3 rounded-2xl border border-card-border bg-card-bg/60"
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-primary capitalize">{key}</p>
            <p className="text-sm text-text-secondary break-words">
              {visible ? renderValue(value) : '•••••• Oculto'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleToggleVisibility(path)}
            className="text-brand-azul-brillante hover:text-brand-azul-brillante/80 transition-colors flex-shrink-0"
            aria-label={visible ? `Ocultar ${key}` : `Mostrar ${key}`}
          >
            {visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </li>
      );
    }

    if (Array.isArray(value)) {
  return (
    <li key={path} className="space-y-3 p-4 rounded-3xl border border-card-border bg-card-bg/40">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-text-primary capitalize">{key}</p>
          <p className="text-sm text-text-secondary">{value.length} elemento{value.length === 1 ? '' : 's'}</p>
        </div>
      </div>
      <ul className="space-y-3 pl-4 border-l border-card-border/50">
        {value.map((item, index) => {
          const itemPath = `${path}[${index}]`;
          const itemVisible = visibility[itemPath] !== undefined ? visibility[itemPath] : true;
          const itemObj = item as Record<string, unknown>;
          
          // Obtener el nombre del elemento
          const label = (itemObj.nombre as string) || 
                       (itemObj.tituloObtenido as string) || 
                       (itemObj.institucion as string) || 
                       (itemObj.nombreRed as string) ||
                       (itemObj.nombreEmpresa as string) ||
                       (itemObj.titulo as string) ||
                       `Elemento ${index + 1}`;
          
          return (
            <li
              key={itemPath}
              className="space-y-2 p-3 rounded-2xl border border-card-border bg-card-bg/60"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-text-primary">{label}</p>
                <button
                  type="button"
                  onClick={() => handleToggleVisibility(itemPath)}
                  className="text-brand-azul-brillante hover:text-brand-azul-brillante/80 transition-colors flex-shrink-0"
                  aria-label={itemVisible ? `Ocultar ${label}` : `Mostrar ${label}`}
                >
                  {itemVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
              {/* Mostrar detalles solo si el elemento tiene más propiedades que solo id y nombre */}
              {itemVisible && Object.keys(itemObj).some(key => !['id', 'nombre', 'nombreRed', 'nombreEmpresa', 'titulo'].includes(key)) && (
                <ul className="space-y-2 pl-4 border-l border-card-border/50">
                  {Object.entries(itemObj).map(([childKey, childValue]) => {
                    if (['id', 'nombre', 'nombreRed', 'nombreEmpresa', 'titulo'].includes(childKey)) return null;
                    if (childValue === '' || childValue === null) return null;
                    if (Array.isArray(childValue) && childValue.length === 0) return null;
                    return (
                      <li key={childKey} className="text-sm">
                        <span className="font-medium text-text-secondary capitalize">{childKey}: </span>
                        <span className="text-text-primary">
                          {Array.isArray(childValue) ? childValue.join(', ') : renderValue(childValue)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
              {!itemVisible && (
                <p className="text-sm text-text-secondary italic pl-4">Contenido del elemento oculto</p>
              )}
            </li>
          );
        })}
      </ul>
    </li>
  );
}

    if (typeof value === 'object' && value !== null) {
      const item = value as Record<string, unknown>;
      const label = (item.nombre as string) || (item.tituloObtenido as string) || (item.institucion as string) || (item.nombreRed as string) || 'Elemento';
      
      return (
        <li
          key={path}
          className="space-y-2 p-3 rounded-2xl border border-card-border bg-card-bg/60"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-text-primary">{label}</p>
            <button
              type="button"
              onClick={() => handleToggleVisibility(path)}
              className="text-brand-azul-brillante hover:text-brand-azul-brillante/80 transition-colors"
              aria-label={visible ? `Ocultar ${label}` : `Mostrar ${label}`}
            >
              {visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          {visible && (
            <ul className="space-y-2 pl-4 border-l border-card-border/50">
              {Object.entries(item).map(([childKey, childValue]) => {
                if (childKey === 'id') return null;
                return (
                  <li key={childKey} className="text-sm">
                    <span className="font-medium text-text-secondary capitalize">{childKey}: </span>
                    <span className="text-text-primary">{renderValue(childValue)}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    }

    return null;
  };

  const handleToggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderedSections = useMemo(() => {
    if (!portfolioData) return null;

    return Object.entries(SECTIONS).map(([sectionTitle, keys]) => {
      const sectionFields = keys
        .filter((key) => portfolioData[key] !== undefined)
        .map((key) => renderData(portfolioData[key], key, key));

      if (sectionFields.length === 0) return null;

      const isOpen = openSections[sectionTitle] ?? false;
      const alwaysOpen = sectionTitle === "Información Personal";

      return (
        <div key={sectionTitle} className="space-y-4 rounded-2xl border border-card-border bg-card-bg/40 p-4">
          <button
            type="button"
            onClick={() => !alwaysOpen && handleToggleSection(sectionTitle)}
            className="flex items-center justify-between w-full text-left"
          >
            <h2 className="text-xl font-bold text-text-primary">{sectionTitle}</h2>
            {!alwaysOpen && (
              <span className="text-sm text-text-secondary">
                {isOpen ? "Ocultar" : "Mostrar"}
              </span>
            )}
          </button>
          {(alwaysOpen || isOpen) && (
            <ul className="space-y-4 pl-2">{sectionFields}</ul>
          )}
        </div>
      );
    });
  }, [portfolioData, visibility, openSections]);

  const handleConfirmApplyChanges = async () => {
    setShowConfirmModal(false);
    await handleApplyChanges();
  };

  return (
    <>
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">CONFIGURACIÓN DE PRIVACIDAD</h1>
          <p className="text-text-secondary mt-1">
            Visualiza los datos y oculta el dato que no quieres que se vea en perfil público.
          </p>
          <p className="text-text-secondary mt-1">
            Con el icono de ojo puedes ocultar o mostrar. Recuerda aplicar los cambios para que se reflejen en tu perfil público.
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-card-border px-4 py-2 text-sm font-medium text-text-primary hover:bg-card-bg transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Volver
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-brand-azul-brillante animate-spin mb-4" />
          <p className="text-text-secondary">Cargando configuración de privacidad...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-3xl border border-red-500/30 bg-red-500/10">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-text-primary">Error al cargar los datos</p>
              <p className="text-text-secondary mt-1">{error}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="rounded-[32px] border border-card-border bg-card-bg/50 p-4">
              <p className="text-text-secondary">Haz clic en el icono de ojo para ocultar o mostrar cada campo.</p>
            </div>
            <div className="space-y-8">{renderedSections}</div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleOpenConfirmModal}
              disabled={saving}
              className="inline-flex items-center justify-center rounded-2xl bg-brand-azul-brillante px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-azul-brillante/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Aplicar cambios'
              )}
            </button>
            {appliedMessage && (
              <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> {appliedMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    {showConfirmModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4"
        onClick={handleCloseConfirmModal}
      >
        <div
          className="w-full max-w-md rounded-3xl border border-card-border bg-card-bg p-6 shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-azul-brillante/10 text-brand-azul-brillante">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-text-primary">Alerta - Se modificarán datos de visibilidad en tu perfil público</h2>
            <p className="text-sm text-text-secondary">
              Confirma si deseas guardar estos cambios y actualizar la visibilidad de tu perfil público.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleCloseConfirmModal}
              disabled={saving}
              className="inline-flex items-center justify-center rounded-2xl border border-card-border px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-card-bg/70 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmApplyChanges}
              disabled={saving}
              className="inline-flex items-center justify-center rounded-2xl bg-brand-azul-brillante px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-azul-brillante/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Aceptar'
              )}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};