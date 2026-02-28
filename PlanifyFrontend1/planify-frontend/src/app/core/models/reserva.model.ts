export type EstadoReserva = 'confirmada' | 'pendiente' | 'cancelada';

export interface Reserva {
  id: string;
  eventId: string;
  eventTitulo: string;
  fechaISO: string;     // fecha del evento o del recordatorio
  estado: EstadoReserva;
}