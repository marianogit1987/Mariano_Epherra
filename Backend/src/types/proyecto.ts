// ==========================================================================
// SECCIÓN D: TypeScript - Definición de Modelos e Interfaces
// ==========================================================================

/**
 * Tipo Unión para representar los estados posibles de un proyecto
 */
export type EstadoProyecto = 'Borrador' | 'Publicado' | 'En Desarrollo';

/**
 * Interfaz que define la estructura y tipos de datos de un Proyecto
 */
export interface Proyecto {
    id?: number;                  // Opcional al crear (autoincremental en DB)
    nombre: string;               // Nombre del proyecto
    descripcion: string;          // Descripción general del proyecto
    tecnologias: string[];        // Lista de tecnologías utilizadas
    imagen: string;               // URL o ruta local de la imagen
    estado: EstadoProyecto;       // Estado restringido según la unión de tipos
    fecha_creacion?: Date;        // Fecha de registro en base de datos
}

/**
 * Tipo para colecciones de proyectos
 */
export type ListaProyectos = Proyecto[];