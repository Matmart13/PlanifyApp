package planify.model.controller;
import planify.model.dtos.ReservaDTO;
import planify.model.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping
    public ResponseEntity<ReservaDTO> crear(@RequestBody ReservaDTO reservaDTO) {
        return ResponseEntity.ok(reservaService.realizarReserva(reservaDTO));
    }

    @GetMapping("/persona/{id}")
    public List<ReservaDTO> misReservas(@PathVariable Long id) {
        return reservaService.listarPorPersona(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        reservaService.cancelarReserva(id);
        return ResponseEntity.noContent().build();
    }
}