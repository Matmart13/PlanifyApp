package planify.model.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import planify.model.entity.Persona;
import planify.model.repository.PersonaRepository;
import planify.model.service.PersonaService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonaServiceImpl implements PersonaService {

    private final PersonaRepository personaRepository;

    @Override
    public Persona registrar(Persona persona) {
        // Validación: ¿Ya existe una persona con este email?
        Optional<Persona> existente = personaRepository.findByCorreo(persona.getCorreo());
        if (existente.isPresent()) {
            throw new RuntimeException("El email ya está registrado en el sistema.");
        }
        return personaRepository.save(persona);
    }

    @Override
    public List<Persona> listar() {
        return personaRepository.findAll();
    }

    @Override
    public Persona obtenerPorId(Long id) {
        return personaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada con ID: " + id));
    }

    @Override
    public Persona obtenerPorEmail(String email) {
        return personaRepository.findByCorreo(email)
                .orElseThrow(() -> new RuntimeException("No se encontró ninguna persona con el email: " + email));
    }

    @Override
    public void eliminar(Long id) {
        if (!personaRepository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar: Persona no encontrada");
        }
        personaRepository.deleteById(id);
    }
}