package planify.model.service;

import java.util.List;

import planify.model.entity.Favorito;

public interface FavoritoService {

	Favorito agregar(Favorito favorito);
    void eliminar(Long idPersona, Long idEvento);
    List<Favorito> listarPorPersona(Long idPersona);
	
}
