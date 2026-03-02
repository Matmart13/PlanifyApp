package planify.model.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import planify.model.entity.Evento;
import planify.model.service.EventoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping
    public List<Evento> listarEventos() {
        // Antes decía listarTodos(), ahora coincide con tu Interfaz
        return eventoService.listar(); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> obtenerEvento(@PathVariable Long id) {
        // Antes decía buscarPorId(), ahora coincide con tu Interfaz
        Evento evento = eventoService.obtenerPorId(id);
        return ResponseEntity.ok(evento);
    }

    @PostMapping
    public Evento guardarEvento(@RequestBody Evento evento) {
        // Antes decía guardar(), ahora coincide con tu Interfaz
        return eventoService.crear(evento);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEvento(@PathVariable Long id) {
        eventoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}