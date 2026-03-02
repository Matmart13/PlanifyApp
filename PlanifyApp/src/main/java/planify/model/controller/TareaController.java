package planify.model.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
public class TareaController {

    @GetMapping("/tareas")
    public List<Map<String, String>> devolverTareas() {
        return List.of(
            Map.of("id", "1", "titulo", "Conexión establecida", "descripcion", "El backend ya responde"),
            Map.of("id", "2", "titulo", "Siguiente paso", "descripcion", "Mostrar esto en Angular")
        );
    }
}