package planify.model.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import planify.model.entity.Persona;
import planify.model.service.AuthService;
import java.util.Map;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
	@Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String correo = credentials.get("correo");
        String password = credentials.get("password");

        Persona persona = authService.login(correo, password);

        if (persona != null) {
            return ResponseEntity.ok(persona); // Login exitoso
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas"); // Error
        }
    }
}
