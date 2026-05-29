# Gestión de CV - Lógica y Arquitectura Backend

## 📋 Resumen Ejecutivo

Este documento describe la arquitectura y lógica de negocio propuesta para el módulo de "Gestión de CV" en la plataforma TIS. Incluye modelos de datos, endpoints REST, flujos de trabajo y consideraciones de implementación.

---

## 🗄️ Modelos de Datos

### CV (Curriculum Vitae)

```
CVId: UUID
UserId: UUID (Foreign Key → User)
Name: String (max 100)
Type: Enum ['generated', 'uploaded']
Template: String | Null (ID de plantilla si es generado)
FileUrl: String (URL del PDF en almacenamiento)
FileName: String (nombre del archivo)
IsOfficial: Boolean (indica si es el CV oficial del perfil)
CreatedAt: Timestamp
UpdatedAt: Timestamp
DeletedAt: Timestamp | Null (soft delete)
DownloadCount: Integer (contador de descargas)
Metadata: JSON {
  pageCount?: Integer,
  fileSize?: Integer,
  mimeType?: String
}
```

### CV Template (Plantilla)

```
TemplateId: UUID | String
Name: String
Description: String
ThumbnailUrl: String
PreviewUrl: String
IsActive: Boolean
CreatedAt: Timestamp
UpdatedAt: Timestamp
```

### Portfolio Data (Datos del Portafolio)

Los datos necesarios para generar un CV se extraen del perfil del usuario:

```
{
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    photo: String (URL),
    bio: String
  },
  
  professionalLinks: {
    portfolio: String (URL),
    github: String (URL),
    linkedin: String (URL),
    ...otros links
  },
  
  skills: {
    technical: [{
      name: String,
      level: Enum ['beginner', 'intermediate', 'advanced', 'expert'],
      yearsOfExperience: Integer
    }],
    soft: [{
      name: String,
      description: String
    }]
  },
  
  experience: [{
    id: UUID,
    title: String,
    company: String,
    description: String,
    startDate: Date,
    endDate: Date | Null,
    isCurrent: Boolean,
    technologies: String[]
  }],
  
  education: [{
    id: UUID,
    institution: String,
    degree: String,
    field: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  
  projects: [{
    id: UUID,
    title: String,
    description: String,
    technologies: String[],
    liveUrl: String | Null,
    repositoryUrl: String | Null,
    images: String[],
    startDate: Date,
    endDate: Date
  }],
  
  certifications: [{
    id: UUID,
    name: String,
    issuer: String,
    issueDate: Date,
    expirationDate: Date | Null,
    credentialUrl: String | Null
  }]
}
```

---

## 🔌 Endpoints REST

### 1. GENERAR CV DESDE PORTAFOLIO

#### POST `/api/v1/cv/generate`

**Descripción:** Genera un nuevo CV usando una plantilla y los datos del portafolio del usuario.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "templateId": "modern",
  "name": "Mi CV Moderno"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "cvId": "uuid-123",
    "name": "Mi CV Moderno",
    "type": "generated",
    "template": "modern",
    "fileUrl": "https://storage.example.com/cvs/uuid-123.pdf",
    "fileName": "cv_moderno.pdf",
    "isOfficial": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "downloadCount": 0
  }
}
```

**Errores:**
- 400: Template no válida
- 401: No autenticado
- 422: Datos insuficientes en el portafolio

**Lógica:**
1. Validar que el usuario esté autenticado
2. Validar que la plantilla exista y esté activa
3. Obtener datos del portafolio del usuario
4. Generar PDF usando la plantilla y datos
5. Guardar archivo en almacenamiento (S3, Azure Blob, etc.)
6. Crear registro CV en base de datos
7. Retornar información del CV creado

---

### 2. SUBIR CV PERSONALIZADO

#### POST `/api/v1/cv/upload`

**Descripción:** Sube un archivo PDF de CV personalizado.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Form Data:**
```
file: File (PDF, max 10MB)
name: String
makeOfficial: Boolean (opcional, default: false)
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "cvId": "uuid-456",
    "name": "Mi CV Personalizado",
    "type": "uploaded",
    "fileUrl": "https://storage.example.com/cvs/uuid-456.pdf",
    "fileName": "mi_cv.pdf",
    "isOfficial": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "downloadCount": 0
  }
}
```

**Errores:**
- 400: Archivo no válido o muy grande
- 401: No autenticado
- 413: Payload too large

**Lógica:**
1. Validar que el usuario esté autenticado
2. Validar archivo (tipo MIME, tamaño, integridad)
3. Si `makeOfficial` es true:
   - Quitar oficialidad de CVs anteriores: `UPDATE cvs SET is_official = false WHERE user_id = ? AND id != ?`
4. Guardar archivo en almacenamiento
5. Extraer metadata del PDF (páginas, tamaño)
6. Crear registro CV en base de datos
7. Retornar información del CV

---

### 3. OBTENER CV OFICIAL

#### GET `/api/v1/cv/official`

**Descripción:** Obtiene el CV oficial del perfil del usuario.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "cvId": "uuid-123",
    "name": "Mi CV Moderno",
    "type": "generated",
    "template": "modern",
    "fileUrl": "https://storage.example.com/cvs/uuid-123.pdf",
    "isOfficial": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "downloadCount": 42
  }
}
```

**Errores:**
- 401: No autenticado
- 404: No hay CV oficial asignado

**Lógica:**
1. Validar que el usuario esté autenticado
2. Consultar: `SELECT * FROM cvs WHERE user_id = ? AND is_official = true`
3. Incrementar contador de descargas
4. Retornar CV oficial

---

### 4. LISTAR CVs DEL USUARIO

#### GET `/api/v1/cv`

**Descripción:** Lista todos los CVs del usuario con paginación y filtros.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
```
page: Integer (default: 1)
limit: Integer (default: 10, max: 50)
type: String (opcional: 'generated', 'uploaded')
sort: String (default: 'createdAt', opciones: 'createdAt', 'name', 'updatedAt')
order: String (default: 'desc', opciones: 'asc', 'desc')
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "cvId": "uuid-123",
        "name": "Mi CV Moderno",
        "type": "generated",
        "template": "modern",
        "fileUrl": "https://storage.example.com/cvs/uuid-123.pdf",
        "isOfficial": true,
        "createdAt": "2024-01-15T10:30:00Z",
        "downloadCount": 42
      },
      ...
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 3,
      "totalPages": 1
    }
  }
}
```

**Lógica:**
1. Validar autenticación
2. Construir query base: `SELECT * FROM cvs WHERE user_id = ? AND deleted_at IS NULL`
3. Aplicar filtros si existen
4. Aplicar ordenamiento
5. Aplicar paginación (offset = (page - 1) * limit)
6. Retornar resultados con información de paginación

---

### 5. MARCAR CV COMO OFICIAL

#### PATCH `/api/v1/cv/{cvId}/set-official`

**Descripción:** Establece un CV como el CV oficial del perfil.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "CV establecido como oficial",
  "data": {
    "cvId": "uuid-123",
    "isOfficial": true
  }
}
```

**Errores:**
- 401: No autenticado
- 404: CV no encontrado
- 403: No tienes permisos para modificar este CV

**Lógica:**
1. Validar autenticación
2. Validar que el CV pertenece al usuario
3. Dentro de una transacción:
   - `UPDATE cvs SET is_official = false WHERE user_id = ? AND id != ?`
   - `UPDATE cvs SET is_official = true WHERE id = ?`
4. Retornar respuesta de éxito

---

### 6. QUITAR CV COMO OFICIAL

#### PATCH `/api/v1/cv/{cvId}/unset-official`

**Descripción:** Quita la oficialidad de un CV.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "CV retirado como oficial",
  "data": {
    "cvId": "uuid-123",
    "isOfficial": false
  }
}
```

**Lógica:**
1. Validar autenticación
2. Validar que el CV pertenece al usuario
3. `UPDATE cvs SET is_official = false WHERE id = ?`
4. Retornar respuesta

---

### 7. CAMBIAR NOMBRE DEL CV

#### PATCH `/api/v1/cv/{cvId}`

**Descripción:** Actualiza el nombre de un CV.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Mi nuevo nombre"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "CV actualizado",
  "data": {
    "cvId": "uuid-123",
    "name": "Mi nuevo nombre",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

**Validaciones:**
- Nombre no vacío
- Nombre max 100 caracteres

---

### 8. DESCARGAR CV

#### GET `/api/v1/cv/{cvId}/download`

**Descripción:** Descarga el archivo PDF del CV.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
- Content-Type: application/pdf
- Content-Disposition: attachment; filename="cv_moderno.pdf"
- (archivo PDF binario)

**Lógica:**
1. Validar autenticación
2. Validar que el CV pertenece al usuario
3. Incrementar contador de descargas: `UPDATE cvs SET download_count = download_count + 1 WHERE id = ?`
4. Obtener URL del almacenamiento y redirigir (302) o descargar directamente

---

### 9. ELIMINAR CV

#### DELETE `/api/v1/cv/{cvId}`

**Descripción:** Elimina un CV (soft delete).

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "CV eliminado"
}
```

**Errores:**
- 400: No puedes eliminar el CV oficial (debe haber otro CV o quitarle la oficialidad primero)
- 401: No autenticado
- 404: CV no encontrado
- 403: No tienes permisos

**Lógica:**
1. Validar autenticación
2. Validar que el CV pertenece al usuario
3. Si `is_official = true`:
   - Contar CVs no eliminados: si solo hay 1, retornar error 400
   - O permitir eliminación pero quitar oficialidad
4. Soft delete: `UPDATE cvs SET deleted_at = NOW() WHERE id = ?`
5. Retornar respuesta de éxito

---

### 10. OBTENER PLANTILLAS

#### GET `/api/v1/cv/templates`

**Descripción:** Obtiene la lista de plantillas disponibles.

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "templateId": "modern",
      "name": "Moderno",
      "description": "Diseño contemporáneo con colores vibrantes",
      "thumbnailUrl": "https://example.com/templates/modern-thumb.jpg",
      "previewUrl": "https://example.com/templates/modern-preview.pdf"
    },
    {
      "templateId": "classic",
      "name": "Clásico",
      "description": "Formato tradicional y profesional",
      "thumbnailUrl": "https://example.com/templates/classic-thumb.jpg",
      "previewUrl": "https://example.com/templates/classic-preview.pdf"
    },
    ...
  ]
}
```

**Lógica:**
1. Consultar: `SELECT * FROM cv_templates WHERE is_active = true ORDER BY name`
2. Retornar lista de plantillas

---

## 🔄 Flujos de Trabajo

### Flujo 1: Generar CV desde Portafolio

```
Usuario hace clic en "Generar CV desde mi portafolio"
    ↓
Sistema obtiene plantillas disponibles y las muestra
    ↓
Usuario selecciona una plantilla
    ↓
Usuario hace clic en "Generar CV"
    ↓
Sistema muestra diálogo de confirmación
    ↓
Usuario confirma
    ↓
Sistema:
  1. Obtiene datos del portafolio del usuario
  2. Llama a servicio de generación de PDF
  3. Genera PDF usando la plantilla
  4. Sube archivo a almacenamiento
  5. Crea registro en base de datos
  6. Retorna CV creado
    ↓
Sistema muestra mensaje de éxito
    ↓
Usuario vuelve al menú principal
```

### Flujo 2: Subir CV Personalizado

```
Usuario hace clic en "Subir CV propio"
    ↓
Sistema muestra zona de carga (drag & drop)
    ↓
Usuario selecciona o arrastra archivo PDF
    ↓
Sistema valida archivo (tipo, tamaño)
    ↓
Sistema muestra archivo seleccionado
    ↓
Usuario marca/desmarca "Establecer como oficial"
    ↓
Usuario hace clic en "Subir CV al perfil"
    ↓
Sistema muestra diálogo de confirmación
    ↓
Usuario confirma
    ↓
Sistema:
  1. Sube archivo a almacenamiento
  2. Extrae metadata del PDF
  3. Si makeOfficial: quita oficialidad de otros CVs
  4. Crea registro en base de datos
  5. Retorna CV creado
    ↓
Sistema muestra mensaje de éxito
    ↓
Usuario vuelve al menú principal
```

### Flujo 3: Ver CV Oficial

```
Usuario hace clic en "Ver CV oficial"
    ↓
Sistema obtiene CV oficial del usuario
    ↓
Sistema muestra visor PDF del CV
    ↓
Usuario puede navegar por el PDF (anterior/siguiente página)
    ↓
Usuario puede hacer clic en "Seleccionar otro CV" → ir a sección 4
    ↓
O hacer clic en "Volver a Gestión de CV" → volver al menú
```

### Flujo 4: Administrar CVs

```
Usuario hace clic en "Administrar mis CVs"
    ↓
Sistema obtiene todos los CVs del usuario
    ↓
Sistema muestra lista de CVs con acciones
    ↓
Para cada CV, usuario puede:
  - Marcar como CV oficial (si no lo es)
  - Quitar como oficial (si lo es)
  - Descargar
  - Cambiar nombre (inline edit)
  - Eliminar (con confirmación)
    ↓
CVs oficiales se resaltan con fondo verde
```

---

## 💾 Almacenamiento de Archivos

### Estrategia Propuesta: AWS S3

**Estructura de carpetas:**
```
s3://portafolios-tis-cvs/
├── {userId}/
│   ├── generated/
│   │   ├── uuid-123.pdf
│   │   ├── uuid-124.pdf
│   │   └── ...
│   └── uploaded/
│       ├── uuid-456.pdf
│       ├── uuid-457.pdf
│       └── ...
```

**Configuración:**
- Versioning: habilitado
- Encryption: AES-256 (SSE-S3)
- Lifecycle policy: Archivas a Glacier después de 1 año
- Public access: bloqueado (solo acceso autenticado vía presigned URLs)
- CORS: configurado para descargas desde el frontend

**URLs Presigned:**
- Generadas con expiración de 15 minutos
- Reutilizables mientras sean válidas
- Útiles para descargas y visualización

---

## 🔐 Seguridad

### Autenticación
- JWT Bearer token requerido en todos los endpoints
- Token incluido en header `Authorization: Bearer {token}`

### Autorización
- Validar que el usuario solo acceda a sus propios CVs
- Query siempre filtra por `user_id = authenticated_user_id`

### Validación de Archivos
- Validar tipo MIME (application/pdf)
- Validar tamaño máximo (10MB)
- Validar que el archivo es PDF válido (no solo extensión)
- Antivirus scan opcional (CLAMAV)

### Protección de Datos
- Encripción en tránsito (HTTPS)
- Encripción en reposo (S3 encryption)
- Datos sensibles no se guardan en metadata
- Soft deletes para auditoría

---

## 📊 Base de Datos - Esquemas SQL

### Tabla: `cvs`

```sql
CREATE TABLE cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('generated', 'uploaded')),
  template VARCHAR(50),
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  is_official BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  download_count INTEGER NOT NULL DEFAULT 0,
  metadata JSONB,
  
  UNIQUE(user_id, name),
  INDEX idx_user_id_official (user_id, is_official),
  INDEX idx_user_id_created (user_id, created_at DESC),
  INDEX idx_deleted_at (deleted_at)
);
```

### Tabla: `cv_templates`

```sql
CREATE TABLE cv_templates (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  thumbnail_url TEXT NOT NULL,
  preview_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_active (is_active)
);
```

### Tabla: `cv_generation_logs` (Auditoría)

```sql
CREATE TABLE cv_generation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cv_id UUID NOT NULL REFERENCES cvs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL,
  error_message TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at DESC)
);
```

---

## 🔧 Generación de PDF

### Opciones de Tecnología

1. **PDFKit (Node.js)**
   - Generación desde cero
   - Mayor control
   - Ligero pero requiere más código

2. **ReportLab (Python)**
   - Excelente calidad
   - Fácil de integrar

3. **Puppeteer/Headless Chrome**
   - Genera PDF desde HTML
   - Ideal si las plantillas son HTML/CSS
   - **RECOMENDADO**: mejor resultado visual

4. **Microservicio externo (Rendercloud, PDFRender)**
   - Outsource de complejidad
   - Escalable
   - Costo adicional

### Enfoque Propuesto: Puppeteer

```javascript
// Pseudocódigo
async function generateCVPDF(templateId, portfolioData) {
  // 1. Obtener HTML de la plantilla
  const template = getTemplate(templateId);
  
  // 2. Renderizar HTML con datos del portafolio
  const html = renderTemplate(template, portfolioData);
  
  // 3. Generar PDF con Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();
  
  // 4. Subir a S3
  const fileUrl = await uploadToS3(pdf, `${userId}/generated/`);
  
  return fileUrl;
}
```

---

## 📈 Consideraciones de Rendimiento

### Caché
- Cachear lista de plantillas (10 minutos)
- Cachear CV oficial por usuario (5 minutos)
- Cachear URLs presigned (reutilizables por 15 min)

### Async/Background Jobs
- Generación de PDF como tarea asíncrona (Celery, Bull)
- Webhook al frontend cuando está listo
- Notificación por email opcional

### Índices de Base de Datos
```sql
-- Optimizar consultas frecuentes
CREATE INDEX idx_cvs_user_official ON cvs(user_id, is_official) WHERE deleted_at IS NULL;
CREATE INDEX idx_cvs_user_created ON cvs(user_id, created_at DESC) WHERE deleted_at IS NULL;
```

---

## 🧪 Casos de Prueba

### Pruebas Unitarias
- Validación de archivos
- Lógica de cambio de oficialidad
- Cálculo de paginación

### Pruebas de Integración
- Generación de PDF con datos reales
- Carga de archivos a S3
- Consultas a base de datos

### Pruebas E2E
- Flujo completo: generar CV + descargar
- Flujo: subir CV + establecer como oficial
- Flujo: cambiar CV oficial + verificar en perfil público

---

## 📚 Recursos Adicionales

- **PDF Generation:** https://github.com/puppeteer/puppeteer
- **AWS S3 Docs:** https://docs.aws.amazon.com/s3/
- **Node.js File Upload:** https://github.com/expressjs/multer
- **JWT Authentication:** https://jwt.io/

---

**Última actualización:** 15 de Enero, 2024
**Versión:** 1.0
