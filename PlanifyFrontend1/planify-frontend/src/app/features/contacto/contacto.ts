import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {

  nombre = '';
  email = '';
  asunto = '';
  mensaje = '';

  enviado = false;

  enviar() {
    if (!this.nombre || !this.email || !this.asunto || !this.mensaje) {
      alert('Rellena todos los campos');
      return;
    }

    // Simulación de envío
    this.enviado = true;

    // Reset
    this.nombre = '';
    this.email = '';
    this.asunto = '';
    this.mensaje = '';
  }
}