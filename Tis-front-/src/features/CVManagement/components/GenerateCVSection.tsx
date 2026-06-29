import { useState, useEffect } from 'react';
import { useCVManagement } from '../hooks/useCVManagement';
import { CVLoadingState } from '../models/cv.model';
import { AlertCircle, Eye, Check, Loader2 } from 'lucide-react';
import { cvManagementService } from '../services/cv.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface GenerateCVSectionProps {
  onBack: () => void;
  onSuccess?: () => void;
}

// ============================================================
// FUNCIÓN PARA GENERAR HTML DEL CV CON PLANTILLAS
// ============================================================
const generateCVHTML = (data: any, templateId: string): string => {
  let styleTheme = '';

  switch (templateId) {
    case 'modern':
      styleTheme = `
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f2f5; padding: 20px; color: #333; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        h1 { margin: 0; font-size: 2.5em; font-weight: 700; }
        .profession { font-size: 1.2em; opacity: 0.9; margin-top: 10px; font-weight: 300; letter-spacing: 1px; }
        .section { margin-bottom: 30px; }
        .section-title { color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 5px; margin-bottom: 15px; font-size: 1.4em; text-transform: uppercase; }
        .contact-info { display: flex; gap: 20px; flex-wrap: wrap; margin-top: 15px; justify-content: center; font-size: 0.9em; opacity: 0.9; }
        .skill-tag { display: inline-block; background: #f0f2f5; color: #4a5568; padding: 6px 12px; margin: 4px; border-radius: 20px; font-size: 0.9em; font-weight: 500; }
        .item { margin-bottom: 15px; }
        .item-header { display: flex; justify-content: space-between; font-weight: bold; color: #2d3748; }
        .item-sub { color: #718096; font-style: italic; font-size: 0.9em; }
      `;
      break;
    case 'classic':
      styleTheme = `
  /* Configuración General y Fondo de contraste */
  body { font-family: 'Times New Roman', serif; background: #f5f5f5; padding: 40px; color: #2c3e50; }
  .container { max-width: 800px; margin: 0 auto; background: white; border: 1px solid #ddd; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
  
  /* Cabecera Oscura Impecable */
  .header { background: #2c3e50; color: #ffffff; padding: 35px 30px; text-align: center; }
  .header h1 { margin: 0; font-size: 2.6em; text-transform: uppercase; letter-spacing: 1px; color: #ffffff; }
  .header .profession { font-size: 1.25em; font-style: italic; color: #bdc3c7; margin-top: 8px; font-weight: 300; }
  
  /* Información de Contacto dentro del Header */
  .contact-info { display: flex; gap: 20px; flex-wrap: wrap; margin-top: 15px; justify-content: center; font-size: 0.9em; color: #ecf0f1; opacity: 0.9; }
  
  /* Contenido del Folio */
  .content { padding: 40px; }
  .section { margin-bottom: 25px; }
  
  /* Títulos de Sección que combinan con el Header */
  .section-title { color: #2c3e50; border-bottom: 2px solid #2c3e50; padding-bottom: 4px; margin-bottom: 18px; font-size: 1.2em; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
  
  /* Estructura de Experiencia y Educación */
  .item { margin-bottom: 15px; }
  .item-header { display: flex; justify-content: space-between; font-weight: bold; color: #2c3e50; font-size: 1.05em; }
  .item-sub { color: #7f8c8d; font-style: italic; font-size: 0.95em; margin-top: 2px; }
  .item p { color: #34495e; font-size: 0.95em; line-height: 1.5; margin-top: 6px; }
  
  /* Etiquetas de Habilidades en sintonía clásica */
  .skill-tag { display: inline-block; background: #f4f6f7; color: #2c3e50; border: 1px solid #d5dbdb; padding: 4px 12px; margin: 4px; border-radius: 3px; font-size: 0.9em; font-weight: bold; }
`;
      break;
    case 'minimalist':
      styleTheme = `
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #fdfbf7; padding: 40px; color: #2c2a29; }
        .container { max-width: 800px; margin: 0 auto; background: #fdfbf7; }
        .header { text-align: left; padding-bottom: 30px; margin-bottom: 35px; border-bottom: 1px solid #e6e1da; }
        .content { padding: 0; }
        h1 { margin: 0; font-size: 2.4em; font-weight: 300; letter-spacing: -0.5px; color: #1a1919; }
        .profession { font-size: 1.1em; color: #7c756e; margin-top: 4px; font-weight: 400; text-transform: uppercase; letter-spacing: 1.5px; }
        .section { margin-bottom: 35px; }
        .section-title { color: #7c756e; font-size: 0.95em; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 18px; }
        .contact-info { display: flex; gap: 20px; flex-wrap: wrap; margin-top: 15px; justify-content: flex-start; font-size: 0.85em; color: #7c756e; }
        .skill-tag { display: inline-block; background: #e6e1da; color: #4a4643; padding: 4px 10px; margin: 4px; border-radius: 4px; font-size: 0.85em; }
        .item { margin-bottom: 20px; }
        .item-header { display: flex; justify-content: space-between; font-weight: 500; color: #1a1919; font-size: 1em; }
        .item-sub { color: #7c756e; font-size: 0.9em; margin-top: 2px; }
      `;
      break;

    case 'professional':
      styleTheme = `
        body { font-family: 'Arial', sans-serif; background: #f4f5f7; padding: 20px; color: #333333; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; }
        .header { background: linear-gradient(135deg, #111111 0%, #2c3e50 100%); color: #ffffff; padding: 45px 40px; text-align: left; position: relative; }
        .header::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 4px; bg: #34495e; }
        .content { padding: 40px; }
        h1 { margin: 0; font-size: 2.6em; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }
        .profession { font-size: 1.25em; color: #3498db; margin-top: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .section { margin-bottom: 32px; }
        .section-title { color: #111111; border-left: 4px solid #2c3e50; padding-left: 12px; margin-bottom: 16px; font-size: 1.25em; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        .contact-info { display: flex; gap: 20px; flex-wrap: wrap; margin-top: 20px; justify-content: flex-start; font-size: 0.9em; opacity: 0.85; }
        .skill-tag { display: inline-block; background: #2c3e50; color: #ffffff; padding: 5px 12px; margin: 4px; border-radius: 3px; font-size: 0.85em; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .item { margin-bottom: 18px; }
        .item-header { display: flex; justify-content: space-between; font-weight: 700; color: #111111; }
        .item-sub { color: #3498db; font-weight: 600; font-size: 0.9em; margin-top: 1px; }
      `;
      break;
    default:
      styleTheme = `
        body { font-family: Arial, sans-serif; background: #fff; padding: 30px; color: #333; }
        .container { max-width: 800px; margin: 0 auto; }
        .header { background: #3498db; color: white; padding: 30px; border-radius: 8px; text-align: center; }
        .content { padding: 20px 0; }
        h1 { margin: 0; font-size: 2.2em; }
        .profession { font-size: 1.1em; opacity: 0.9; margin-top: 5px; }
        .section { margin-bottom: 25px; }
        .section-title { color: #3498db; border-bottom: 2px solid #3498db; margin-bottom: 15px; font-size: 1.3em; }
        .contact-info { display: flex; gap: 20px; flex-wrap: wrap; margin-top: 12px; justify-content: center; }
        .skill-tag { display: inline-block; background: #e8f4fd; color: #2980b9; padding: 5px 10px; margin: 4px; border-radius: 4px; font-size: 0.9em; }
        .item { margin-bottom: 15px; }
        .item-header { display: flex; justify-content: space-between; font-weight: bold; }
        .item-sub { color: #666; font-size: 0.9em; }
      `;
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>CV - ${data.nombre || 'Usuario'}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
      body,
      .container,
      .content,
      .section,
      .section p,
      .section div,
      .education-item,
      .education-item div,
      .job-item,
      .job-item div {
      color: #1f2937 !important;
      }
      
      .header,
      .header *,
      .contact-info,
      .contact-info * {
      color: inherit;
      }
        ${styleTheme}
        .job-item, .education-item { margin-bottom: 20px; }
        .job-title { font-weight: bold; font-size: 1.1em; }
        .job-company { color: #666; margin-bottom: 5px; }
        hr { margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${data.nombre || 'Nombre no disponible'}</h1>
          <div class="profession">${data.profesion || 'Profesional'}</div>
          <div class="contact-info">
            <span> ${data.correo || 'No especificado'}</span>
            <span> ${data.telefono || 'No especificado'}</span>
            <span> ${data.direccion || 'No especificada'}</span>
          </div>
        </div>
        
        <div class="content">
          ${data.biografia ? `
            <div class="section">
              <h2 class="section-title"> Sobre mí</h2>
              <p>${data.biografia}</p>
            </div>
          ` : ''}
          
          ${data.experienciasLaborales?.length ? `
            <div class="section">
              <h2 class="section-title"> Experiencia Laboral</h2>
              ${data.experienciasLaborales.map((exp: any) => `
                <div class="job-item">
                  <div class="job-title">${exp.cargoPuesto || 'Cargo no especificado'}</div>
                  <div class="job-company">${exp.nombreEmpresa || 'Empresa no especificada'}</div>
                  <div>${exp.fechaInicio ? new Date(exp.fechaInicio).getFullYear() : ''} - ${exp.actualmenteTrabajoAqui ? 'Actualidad' : (exp.fechaFin ? new Date(exp.fechaFin).getFullYear() : '')}</div>
                  <div>${exp.descripcionProyecto || ''}</div>
                  <div>
                    ${exp.tecnologias?.map((tech: string) => `<span class="skill-tag">${tech}</span>`).join('') || ''}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${data.formacionesAcademica?.length ? `
            <div class="section">
              <h2 class="section-title"> Formación Académica</h2>
              ${data.formacionesAcademica.map((edu: any) => `
                <div class="education-item">
                  <div class="job-title">${edu.tituloObtenido || 'Título no especificado'}</div>
                  <div>${edu.institucion || 'Institución no especificada'}</div>
                  <div>${edu.fechaInicio ? new Date(edu.fechaInicio).getFullYear() : ''} - ${edu.fechaFin ? new Date(edu.fechaFin).getFullYear() : ''}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${data.habilidadesTecnicas?.length ? `
            <div class="section">
              <h2 class="section-title"> Habilidades Técnicas</h2>
              <div>
                ${data.habilidadesTecnicas.map((skill: any) => `
                  <span class="skill-tag">${skill.nombre || ''} ${skill.nivelDominio ? `(${skill.nivelDominio})` : ''}</span>
                `).join('')}
              </div>
            </div>
          ` : ''}
          ${data.habilidadesBlandas?.length ? `
            <div class="section">
              <h2 class="section-title"> Habilidades Blandas</h2>
              <div>
                ${data.habilidadesBlandas.map((skill: any) => `
                  <span class="skill-tag">${skill.nombre || ''} ${skill.nivelDominio ? `(${skill.nivelDominio})` : ''}</span>
                `).join('')}
              </div>
            </div>
          ` : ''}
          ${data.proyectos?.length ? `
            <div class="section">
              <h2 class="section-title"> Proyectos</h2>
              ${data.proyectos.map((proj: any) => `
                <div class="job-item">
                  <div class="job-title">${proj.titulo || 'Proyecto sin título'}
                  ${proj.destacar ? `<span class="skill-tag">Destacado</span>` : ''}
                  </div>
                  <div>${proj.descripcion || ''}</div>
                  <div>Tecnologías: ${proj.tecnologias?.join(', ') || 'No especificadas'}</div>
                  ${proj.fechaInicio || proj.fechaFinalizacion ? `
                  <div>${proj.fechaInicio ? new Date(proj.fechaInicio).getFullYear() : ''} - ${proj.fechaFinalizacion ? new Date(proj.fechaFinalizacion).getFullYear() : ''}</div>
                  ` : ''}
                  ${proj.estadoProyecto ? `<div>Estado del proyecto: ${proj.estadoProyecto}</div>` : ''}
                  ${proj.enlaceDemo ? `
                    <div> <a href="${proj.enlaceDemo}">Demo</a></div> ` : ''}
                  ${proj.urlPdf ? `
                    div> <a href="${proj.urlPdf}">Ver PDF del proyecto</a></div> ` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
};

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
export const GenerateCVSection = ({ onBack, onSuccess }: GenerateCVSectionProps) => {
  const { getTemplates, selectedTemplate, setSelectedTemplate, generateCV, loadingState, error } = useCVManagement();
  const [showPreview, setShowPreview] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const [portfolioError, setPortfolioError] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const templates = getTemplates();

  // Cargar datos del portafolio al montar el componente
  useEffect(() => {
    const loadPortfolio = async () => {
      setLoadingPortfolio(true);
      setPortfolioError(null);
      try {
        const data = await cvManagementService.getPortfolioSummary();
        setPortfolioData(data);
      } catch (err) {
        console.error('Error cargando portafolio:', err);
        setPortfolioError('No se pudieron cargar los datos de tu portafolio. Verifica tu conexión.');
      } finally {
        setLoadingPortfolio(false);
      }
    };

    loadPortfolio();
  }, []);

  const handleGenerateCV = async () => {
    if (!selectedTemplate || !portfolioData) return;

    setIsGeneratingPDF(true);

    try {
      // 1. Generar HTML
      const htmlContent = generateCVHTML(portfolioData, selectedTemplate);

      // 2. Crear un contenedor temporal
      const container = document.createElement('div');
      container.innerHTML = htmlContent;
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = '800px';
      container.style.backgroundColor = 'white';
      container.style.padding = '20px';
      document.body.appendChild(container);

      // 3. Esperar a que se renderice
      await new Promise(resolve => setTimeout(resolve, 300));

      // 4. Convertir a canvas
      const canvas = await html2canvas(container, {
        scale: 1.2, //bajamos de 2 a 1.2 reducir calidad
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      // 5. Crear PDF: comprimiendo el JPEG en lugar de usar PNG
      // Cambiamos 'image/png' por 'image/jpeg' y añadimos compresión del 70% (0.7)
      const imgData = canvas.toDataURL('image/jpeg', 0.7);
      const pdf = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      });

      const imgWidth = 210; // mm (A4 width)
      const pageHeight = 297; // mm (A4 height)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // 6. Generar PDF blob
      const pdfBlob = pdf.output('blob');
      const pdfFile = new File([pdfBlob], `CV_${portfolioData.nombre}.pdf`, { type: 'application/pdf' });

      // 7. Limpiar
      document.body.removeChild(container);

      // 8. Subir a Cloudinary
      const pdfUrl = await cvManagementService.uploadPdfToCloudinary(pdfFile);

      // 9. Registrar
      await generateCV(selectedTemplate, pdfUrl);

      setShowConfirmDialog(false);
      setShowPreview(false);
      onSuccess?.();

    } catch (err) {
      console.error('Error:', err);
      alert('Error al generar el PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Mostrar estado de carga del portafolio
  if (loadingPortfolio) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-brand-azul-brillante animate-spin mb-4" />
        <p className="text-text-secondary">Cargando datos de tu portafolio...</p>
      </div>
    );
  }

  // Mostrar error si no se pudo cargar el portafolio
  if (portfolioError) {
    return (
      <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="font-semibold text-text-primary mb-2">Error al cargar el portafolio</h3>
        <p className="text-text-secondary mb-6">{portfolioError}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-lg bg-brand-azul-brillante text-white"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Encabezado con botón atrás */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-card-border rounded-lg transition-colors"
          title="Volver"
        >
          <svg
            className="w-6 h-6 text-text-secondary hover:text-text-primary transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            Selecciona una plantilla para tu CV
          </h2>
          <p className="text-text-secondary mt-1">
            Elige una plantilla para generar automáticamente tu CV con los datos registrados en tu portafolio.
          </p>
        </div>
      </div>

      {/* Grid de plantillas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            onDoubleClick={() => {
              setSelectedTemplate(template.id);
              setShowPreview(true);
            }}
            className={`relative cursor-pointer group rounded-xl overflow-hidden transition-all duration-300 ${selectedTemplate === template.id
              ? 'ring-2 ring-brand-azul-brillante shadow-lg'
              : 'hover:shadow-lg'
              }`}
          >
            <div className="aspect-video bg-card-border overflow-hidden">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
              <div />
              <div>
                <h3 className="font-semibold text-white text-sm">{template.name}</h3>
                <p className="text-white/80 text-xs mt-1">{template.description}</p>
              </div>
            </div>
            {selectedTemplate === template.id && (
              <div className="absolute top-3 right-3 bg-brand-azul-brillante rounded-full p-1">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="bg-card-bg/80 backdrop-blur-sm p-3">
              <p className="text-sm font-medium text-text-primary">{template.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de acción */}
      {selectedTemplate && (
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setShowPreview(true)}
            disabled={loadingState === CVLoadingState.LOADING || isGeneratingPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card-border hover:bg-card-border/80 text-text-primary disabled:opacity-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Vista Previa
          </button>
          <button
            onClick={() => setShowConfirmDialog(true)}
            disabled={loadingState === CVLoadingState.LOADING || isGeneratingPDF || !portfolioData}
            className="flex-1 px-6 py-2 rounded-lg bg-brand-azul-brillante hover:bg-brand-azul-brillante/90 text-white font-medium disabled:opacity-50 transition-colors"
          >
            {isGeneratingPDF ? 'Generando PDF...' :
              loadingState === CVLoadingState.LOADING ? 'Generando CV...' :
                'Generar CV'}
          </button>
        </div>
      )}

      {/* Diálogo de confirmación */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-card-bg border border-card-border rounded-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-azul-brillante/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-brand-azul-brillante" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Confirmar generación de CV
              </h3>
            </div>

            <p className="text-text-secondary">
              ¿Deseas generar tu CV usando la plantilla <strong>{templates.find(t => t.id === selectedTemplate)?.name}</strong> y los datos de tu portafolio?
            </p>

            <div className="bg-card-border/30 p-3 rounded-lg">
              <p className="text-sm text-text-secondary">
                <strong>Datos disponibles:</strong> {portfolioData?.nombre} • {portfolioData?.profesion} • {portfolioData?.experienciasLaborales?.length || 0} experiencias
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                disabled={loadingState === CVLoadingState.LOADING}
                className="flex-1 px-4 py-2 rounded-lg border border-card-border hover:bg-card-border/30 text-text-primary font-medium disabled:opacity-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleGenerateCV}
                disabled={loadingState === CVLoadingState.LOADING || isGeneratingPDF}
                className="flex-1 px-4 py-2 rounded-lg bg-brand-azul-brillante hover:bg-brand-azul-brillante/90 text-white font-medium disabled:opacity-50 transition-colors"
              >
                {isGeneratingPDF ? 'Generando PDF...' : 'Generar CV'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diálogo de vista previa */}
      {showPreview && selectedTemplate && portfolioData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-card-bg border border-card-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 animate-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-text-primary">
                Vista Previa - {templates.find((t) => t.id === selectedTemplate)?.name}
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                ✕
              </button>
            </div>

            <div className="bg-white rounded-lg overflow-hidden border border-card-border">
              <div
                className="w-full max-h-[70vh] overflow-auto p-4"
                dangerouslySetInnerHTML={{
                  __html: generateCVHTML(portfolioData, selectedTemplate)
                }}
              />
            </div>

            <button
              onClick={() => {
                setShowPreview(false);
                setShowConfirmDialog(true);
              }}
              className="w-full px-4 py-2 rounded-lg bg-brand-azul-brillante hover:bg-brand-azul-brillante/90 text-white font-medium transition-colors"
            >
              Generar con esta plantilla
            </button>
          </div>
        </div>
      )}

      {/* Mensaje de carga global */}
      {(loadingState === CVLoadingState.LOADING || isGeneratingPDF) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card-bg border border-card-border rounded-2xl p-8 text-center space-y-4 animate-in zoom-in duration-300">
            <div className="w-12 h-12 rounded-full border-4 border-card-border border-t-brand-azul-brillante animate-spin mx-auto" />
            <p className="text-text-primary font-medium">
              {isGeneratingPDF ? 'Generando PDF...' : 'Guardando CV en tu perfil...'}
            </p>
          </div>
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-red-600">Error</h4>
            <p className="text-red-500/80 text-sm">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};