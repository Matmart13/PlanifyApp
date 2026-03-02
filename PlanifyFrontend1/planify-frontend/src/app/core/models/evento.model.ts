export interface Evento {
idEventos?: number;   // Antes id_eventos
  nombre: string;
  descripcion: string;
  ubicacion: string;
  precio: number;
  capacidad: number;
  imagenUrl: string;    // Antes imagen_url
  urlReserva: string;   // Antes url_reserva
  fechaInicio: string;  // Antes fecha_de_inicio
  recomendado: boolean;
  categoria: {
    idCategorias: number; // Antes id_categorias
    nombre?: string;
  };}