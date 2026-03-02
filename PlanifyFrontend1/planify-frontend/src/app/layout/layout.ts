import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FiltroService } from '../core/services/filtro.service';
import { AuthService } from '../core/services/auth.services';
import { EventosService } from '../core/services/evento.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit { 
  menuCategoriasAbierto = false;
  categorias: string[] = [];

  constructor(
    private eventosService: EventosService,
    public filtro: FiltroService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  private cargarCategorias(): void {
    this.eventosService.getEventos().subscribe({
      next: (eventos: any[]) => {
        const set = new Set<string>();
        
        for (const e of eventos) {
          // Accedemos a .nombre porque la categoría ahora es un objeto de Java
          const c = (e.categoria?.nombre ?? '').trim(); 
          if (c) set.add(c);
        }
        
        // Convertimos el Set a Array y lo ordenamos alfabéticamente
        this.categorias = Array.from(set).sort((a, b) => a.localeCompare(b));
      },
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  // --- Métodos de UI ---

  toggleCategorias() {
    this.menuCategoriasAbierto = !this.menuCategoriasAbierto;
  }

  abrirCategorias() {
    this.menuCategoriasAbierto = true;
  }

  cerrarCategorias() {
    this.menuCategoriasAbierto = false;
  }

  seleccionarCategoria(cat: string | null) {
    this.filtro.categoria = cat;
    this.cerrarCategorias();
  }

  noop(ev: Event) {
    ev.preventDefault();
  }

  thumb(cat: string): string {
    const c = cat.toLowerCase();
    if (c.includes('cine')) return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=200&q=60';
    if (c.includes('teatr')) return 'https://images.unsplash.com/photo-1523697752433-60fc29e2fddb?auto=format&fit=crop&w=200&q=60';
    if (c.includes('mús') || c.includes('music')) return 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=200&q=60';
    if (c.includes('video') || c.includes('juego')) return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=200&q=60';
    if (c.includes('deport')) return 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=200&q=60';
    return 'https://images.unsplash.com/photo-1520975958225-2d84b6f1a1fa?auto=format&fit=crop&w=200&q=60';
  }
}