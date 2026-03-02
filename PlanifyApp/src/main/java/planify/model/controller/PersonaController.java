package planify.model.controller;
import planify.model.entity.Persona;
import planify.model.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/personas")
@CrossOrigin(origins = "http://localhost:4200")
public class PersonaController {

    @Autowired
    private PersonaService personaService;

    @GetMapping
    public List<Persona> listarTodas() {
        return personaService.listar();
    }

    @PostMapping("/registro")
    public ResponseEntity<Persona> registrar(@RequestBody Persona persona) {
        return ResponseEntity.ok(personaService.registrar(persona));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Persona> obtenerPerfil(@PathVariable Long id) {
        return ResponseEntity.ok(personaService.obtenerPorId(id));
    }
}