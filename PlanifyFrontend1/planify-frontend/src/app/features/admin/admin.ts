import { Component } from '@angular/core';
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
export class Admin {
  eventos: Evento[] = [];

  editingId: string | null = null;

  form: FormEvento = this.emptyForm();

  constructor(private eventosService: EventosService) {
    this.refresh();
  }

  private emptyForm(): FormEvento {
    return {
      titulo: '',
      descripcion: '',
      categoria: 'Cine',
      fechaISO: new Date().toISOString().slice(0, 10),
      ubicacion: '',
      precio: 0,
      imagenUrl: 'https://picsum.photos/600/300?new',
      webOficial: 'https://example.com',
    };
  }

  refresh() {
    this.eventos = this.eventosService.getEventos();
  }

  startCreate() {
    this.editingId = null;
    this.form = this.emptyForm();
  }

  startEdit(e: Evento) {
    this.editingId = e.id;
    const { id, ...rest } = e;
    this.form = { ...rest };
  }

  save() {
    const f = this.form;

    if (!f.titulo.trim() || !f.categoria.trim() || !f.fechaISO.trim()) {
      alert('Completa al menos título, categoría y fecha');
      return;
    }

    if (this.editingId) {
      this.eventosService.updateEvento(this.editingId, f);
      alert('Evento actualizado ✅');
    } else {
      this.eventosService.createEvento(f);
      alert('Evento creado ✅');
    }

    this.startCreate();
    this.refresh();
  }

  remove(id: string) {
    if (!confirm('¿Borrar este evento?')) return;
    this.eventosService.deleteEvento(id);
    this.refresh();
  }
}