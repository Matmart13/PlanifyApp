import { Component, OnInit } from '@angular/core'; // 1. Añadimos OnInit
import { CommonModule } from '@angular/common';
import { EventosService } from '../../core/services/evento.service';
import { Evento } from '../../core/models/evento.model';
import { FormsModule } from '@angular/forms';

type FormEvento = Omit<Evento, 'id'>;

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit { // 2. Implementamos OnInit
  eventos: Evento[] = [];
editingId: number | null | undefined = null;
  form: FormEvento = this.emptyForm();

  constructor(private eventosService: EventosService) {}

  // 3. Cargamos la lista al iniciar
  ngOnInit(): void {
    this.refresh();
  }

private emptyForm(): FormEvento {
  return {
    nombre: '',
    descripcion: '',
    idEventos: 1, // <--- AÑADIDO: Valor por defecto (1 suele ser Cine)
    categoria: { idCategorias: 1, nombre: 'Cine' }, // Ajustado para que sea un objeto
    fechaInicio: new Date().toISOString().slice(0, 10),
    ubicacion: '',
    precio: 0,
    imagenUrl: 'https://picsum.photos/600/300?new',
    urlReserva: 'https://example.com',
    capacidad: 0,
    recomendado: false
  };
}

  refresh() {
    // Suscribirse para obtener los eventos del Backend
    this.eventosService.getEventos().subscribe({
      next: (data) => (this.eventos = data),
      error: (err) => console.error('Error al leer eventos:', err)
    });
  }

  startCreate() {
    this.editingId = null;
    this.form = this.emptyForm();
  }

  startEdit(e: Evento) {
    this.editingId = e.idEventos;
    const { idEventos, ...rest } = e;
    this.form = { ...rest };
  }

save() {
  // Usamos 'any' aquí para que TypeScript no se queje de los nombres con guiones
  const f: any = this.form;
  
  if (!f.nombre?.trim() || !f.id_categoria || !f.fecha_de_inicio) {
    alert('Completa los campos obligatorios');
    return;
  }

  // Preparamos la fecha para que Java no la reciba como null
  const fechaCompleta = f.fecha_de_inicio.includes('T') 
    ? f.fecha_de_inicio 
    : `${f.fecha_de_inicio}T00:00:00`;

  // Mapeamos lo que hay en el formulario al formato que Java espera
  const eventoData: Evento = {
    nombre: f.nombre.trim(),
    descripcion: f.descripcion,
    ubicacion: f.ubicacion,
    precio: Number(f.precio),
    capacidad: Number(f.capacidad),
    recomendado: true,
    // Aquí es donde ocurre la "magia" para que Java lo acepte:
    imagenUrl: f.imagen_url,      
    urlReserva: f.url_reserva,    
    fechaInicio: fechaCompleta,   
    categoria: {
      idCategorias: Number(f.id_categoria)
    }
  };

  if (this.editingId) {
    this.eventosService.updateEvento(this.editingId, eventoData).subscribe({
      next: () => { alert('Actualizado ✅'); this.postSaveAction(); },
      error: (err) => alert('Error al actualizar')
    });
  } else {
    this.eventosService.createEvento(eventoData).subscribe({
      next: () => { alert('¡Creado en la base de datos! ✅'); this.postSaveAction(); },
      error: (err) => {
        console.error(err);
        alert('Error 500: Revisa la consola del navegador');
      }
    });
  }
}


// Método auxiliar para no repetir código tras guardar
  private postSaveAction() {
    this.startCreate();
    this.refresh();
  }

  remove(id: number | undefined) {
  // 1. Verificamos que el ID exista realmente
  if (!id) {
    alert('No se puede borrar un evento sin ID');
    return;
  }

  // 2. Confirmación y borrado
  if (confirm('¿Seguro que quieres borrar este evento?')) {
    this.eventosService.deleteEvento(id).subscribe({
      next: () => {
        alert('Evento eliminado');
        this.refresh(); // Refresca la lista
      },
      error: (err) => console.error('Error al borrar:', err)
    });
  }
}
}