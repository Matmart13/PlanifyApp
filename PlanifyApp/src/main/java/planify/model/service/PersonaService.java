package planify.model.service;

import java.util.List;

import planify.model.entity.Persona;

public interface PersonaService {
    Persona registrar(Persona persona);
    List<Persona> listar();
    Persona obtenerPorId(Long id);
    Persona obtenerPorEmail(String email); // Vital para el Login
    void eliminar(Long id);
}