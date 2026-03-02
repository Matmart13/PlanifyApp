package planify.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import planify.model.entity.Persona;

public interface PersonaRepository extends JpaRepository<Persona, Long>{
	
	Optional<Persona> findByCorreo(String correo);

    boolean existsByCorreo(String correo);

}
