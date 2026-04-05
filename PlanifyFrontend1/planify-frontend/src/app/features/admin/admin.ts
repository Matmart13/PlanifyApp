import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { EventosService } from '../../core/services/evento.service';
import { Evento } from '../../core/models/evento.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit { 
  eventos: Evento[] = [];
  editingId: number | null | undefined = null;
  
  // Usamos 'any' para que el formulario acepte la propiedad plana idCategorias
  form: any = this.emptyForm();

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.refresh();
  }

  private emptyForm() {
    return {
      nombre: '',
      descripcion: '',
      idCategorias: 1, // Valor inicial: 1 (Cine)
      fechaInicio: new Date().toISOString().slice(0, 10),
      ubicacion: '',
      precio: 0,
      imagenUrl: 'https://picsum.photos/600/300?new',
      urlReserva: 'https://example.com',
      capacidad: 100,
      recomendado: true
    };
  }

  refresh() {
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
    // Al editar, sacamos el ID de la categoría al nivel superior para el formulario
    this.form = { 
      ...e, 
      idCategorias: e.categoria?.idCategorias || 1 
    };
  }

  save() {
    const f = this.form;
    
    // Validación: Ahora f.idCategorias existe y no fallará si el cliente lo selecciona
    if (!f.nombre?.trim() || !f.idCategorias || !f.fechaInicio) {
      alert('Completa los campos obligatorios: Nombre, Categoría y Fecha');
      return; 
    }

    // Formateo de fecha para que Java no reciba un nulo
    const fechaCompleta = f.fechaInicio.includes('T') 
      ? f.fechaInicio 
      : `${f.fechaInicio}T00:00:00`;

    // MAPEO: Aquí es donde se "ingesta" lo que el cliente puso en la web
    const eventoData: any = {
      nombre: f.nombre.trim(),
      descripcion: f.descripcion,
      ubicacion: f.ubicacion,
      precio: Number(f.precio),
      capacidad: Number(f.capacidad),
      recomendado: f.recomendado,
      imagenUrl: f.imagenUrl,      
      urlReserva: f.urlReserva,    
      fechaInicio: fechaCompleta,   
      categoria: {
        idCategorias: Number(f.idCategorias) // Captura el ID seleccionado por el cliente
      }
    };

    if (this.editingId) {
      this.eventosService.updateEvento(this.editingId, eventoData).subscribe({
        next: () => { alert('Actualizado ✅'); this.postSaveAction(); },
        error: () => alert('Error al actualizar')
      });
    } else {
      this.eventosService.createEvento(eventoData).subscribe({
        next: () => { alert('¡Evento ingestado con éxito! ✅'); this.postSaveAction(); },
        error: (err) => {
          console.error(err);
          alert('Error: Revisa la conexión con el servidor MySQL.');
        }
      });
    }
  }

  private postSaveAction() {
    this.startCreate();
    this.refresh();
  }

  remove(id: number | undefined) {
    if (!id) return;
    if (confirm('¿Seguro que quieres borrar este evento?')) {
      this.eventosService.deleteEvento(id).subscribe({
        next: () => { alert('Evento eliminado'); this.refresh(); },
        error: (err) => console.error('Error al borrar:', err)
      });
    }
  }
}