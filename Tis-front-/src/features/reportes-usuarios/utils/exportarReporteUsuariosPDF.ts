import jsPDF from 'jspdf';
import type {
  FiltrosReporteUsuario,
  ReporteUsuario,
} from '../models/reporte-usuario.model';

interface ExportarReporteUsuariosPDFParams {
  usuarios: ReporteUsuario[];
  filtros: FiltrosReporteUsuario;
  totalUsuarios: number;
  usuariosActivos: number;
  usuariosInactivos: number;
}

const formatearFecha = (fecha: string) => {
  if (!fecha) return 'Sin fecha';

  const fechaObj = new Date(`${fecha}T00:00:00`);

  if (Number.isNaN(fechaObj.getTime())) {
    return fecha;
  }

  return fechaObj.toLocaleDateString('es-BO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const obtenerTextoEstado = (estado: string) => {
  return estado === 'ACTIVO' ? 'Activo' : 'Inactivo';
};

const obtenerTextoFiltroEstado = (estado: string) => {
  if (!estado) return 'Todos';
  return estado === 'ACTIVO' ? 'Activo' : 'Inactivo';
};

export const exportarReporteUsuariosPDF = ({
  usuarios,
  filtros,
  totalUsuarios,
  usuariosActivos,
  usuariosInactivos,
}: ExportarReporteUsuariosPDFParams) => {
  if (!usuarios.length) {
    alert('No hay usuarios para exportar.');
    return;
  }

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const fechaActual = new Date().toLocaleDateString('es-BO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const margenX = 14;
  let y = 16;

  const dibujarEncabezado = () => {
    doc.setFillColor(2, 8, 23);
    doc.rect(0, 0, pageWidth, 32, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Reporte de Usuarios Registrados', margenX, 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225);
    doc.text('Sistema Generador de Portafolios', margenX, 23);

    doc.setFontSize(9);
    doc.text(`Fecha de generación: ${fechaActual}`, pageWidth - 70, 15);
    doc.text(`Usuarios exportados: ${usuarios.length}`, pageWidth - 70, 23);
  };

  const dibujarTarjeta = (
    x: number,
    yTarjeta: number,
    titulo: string,
    valor: number,
    color: [number, number, number]
  ) => {
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(x, yTarjeta, 82, 20, 3, 3, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(titulo, x + 5, yTarjeta + 7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(15, 23, 42);
    doc.text(String(valor), x + 5, yTarjeta + 16);
  };

  const dibujarFiltros = () => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('Filtros aplicados', margenX, 68);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);

    doc.text(`Fecha inicio: ${filtros.fechaInicio || 'Todos'}`, margenX, 77);
    doc.text(`Fecha fin: ${filtros.fechaFin || 'Todos'}`, margenX + 55, 77);
    doc.text(`Estado: ${obtenerTextoFiltroEstado(filtros.estado)}`, margenX + 105, 77);
    doc.text(`Profesión: ${filtros.profesion || 'Todas'}`, margenX + 150, 77);
    doc.text(`Búsqueda: ${filtros.busqueda || 'Sin búsqueda'}`, margenX + 210, 77);
  };

  const columnas = [
    { titulo: 'Nombre completo', x: 14, ancho: 55 },
    { titulo: 'Correo', x: 72, ancho: 60 },
    { titulo: 'Profesión', x: 135, ancho: 58 },
    { titulo: 'Fecha registro', x: 196, ancho: 35 },
    { titulo: 'Estado', x: 235, ancho: 28 },
  ];

  const dibujarEncabezadoTabla = () => {
    doc.setFillColor(15, 23, 42);
    doc.rect(14, y, 260, 10, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);

    columnas.forEach((columna) => {
      doc.text(columna.titulo, columna.x + 2, y + 6.5);
    });

    y += 12;
  };

  const dibujarPiePagina = (paginaActual: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `Página ${paginaActual}`,
      pageWidth - 30,
      pageHeight - 8
    );
  };

  dibujarEncabezado();

  y = 42;

  dibujarTarjeta(14, y, 'Total de usuarios registrados', totalUsuarios, [37, 99, 235]);
  dibujarTarjeta(107, y, 'Usuarios activos', usuariosActivos, [16, 185, 129]);
  dibujarTarjeta(200, y, 'Usuarios inactivos', usuariosInactivos, [100, 116, 139]);

  dibujarFiltros();

  y = 88;
  dibujarEncabezadoTabla();

  let pagina = 1;

  usuarios.forEach((usuario, index) => {
    if (y > 185) {
      dibujarPiePagina(pagina);
      doc.addPage();
      pagina += 1;

      dibujarEncabezado();
      y = 42;
      dibujarEncabezadoTabla();
    }

    const fondoFila = index % 2 === 0 ? 248 : 241;
    doc.setFillColor(fondoFila, 245, 249);
    doc.rect(14, y - 5, 260, 11, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);

    const nombre = doc.splitTextToSize(usuario.nombreCompleto || 'Sin nombre', columnas[0].ancho);
    const correo = doc.splitTextToSize(usuario.correo || 'Sin correo', columnas[1].ancho);
    const profesion = doc.splitTextToSize(usuario.profesion || 'Sin profesión', columnas[2].ancho);
    const fecha = formatearFecha(usuario.fechaRegistro);
    const estado = obtenerTextoEstado(usuario.estado);

    doc.text(nombre, columnas[0].x + 2, y);
    doc.text(correo, columnas[1].x + 2, y);
    doc.text(profesion, columnas[2].x + 2, y);
    doc.text(fecha, columnas[3].x + 2, y);

    if (usuario.estado === 'ACTIVO') {
      doc.setTextColor(5, 150, 105);
    } else {
      doc.setTextColor(100, 116, 139);
    }

    doc.setFont('helvetica', 'bold');
    doc.text(estado, columnas[4].x + 2, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);

    const alturaFila = Math.max(
      nombre.length,
      correo.length,
      profesion.length,
      1
    ) * 4;

    y += Math.max(11, alturaFila + 4);
  });

  dibujarPiePagina(pagina);

  const nombreArchivo = `reporte_usuarios_${fechaActual.replace(/\//g, '-')}.pdf`;
  doc.save(nombreArchivo);
};