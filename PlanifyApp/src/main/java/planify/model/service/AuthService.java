package planify.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import planify.model.entity.Persona;
import planify.model.repository.PersonaRepository;

@Service
public class AuthService {
	@Autowired
    private PersonaRepository personaRepository;

    public Persona login(String correo, String password) {
    	System.out.println("DEBUG -> Intentando entrar con correo: [" + correo + "]");
        System.out.println("DEBUG -> Intentando entrar con password: [" + password + "]");
        return personaRepository.findByCorreo(correo)
                .filter(p -> {
                    System.out.println("DEBUG -> Password en BBDD para este usuario: [" + p.getContrasena() + "]");
                    return p.getContrasena().equals(password);
                })
                .orElse(null);
    }
    
}
