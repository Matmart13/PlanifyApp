package planify.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import planify.model.entity.Favorito;

public interface FavoritoRepository extends JpaRepository<Favorito, Long>{

	//listar favoritos de una persona
    List<Favorito> findByPersona_IdPersonas(Long idPersona);

    //saber si un favorito ya existe para no duplicar
    boolean existsByPersona_IdPersonasAndEvento_IdEventos(Long idPersona, Long idEvento);

    //buscar un favorito concreto por persona + evento
    Optional<Favorito> findByPersona_IdPersonasAndEvento_IdEventos(Long idPersona, Long idEvento);
	
}
