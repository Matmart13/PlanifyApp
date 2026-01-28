package model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import model.entity.Favorito;
import model.repository.FavoritoRepository;

@Service
@RequiredArgsConstructor
public class FavoritoServiceImpl implements FavoritoService{

	private final FavoritoRepository favoritoRepository;

    @Override
    public Favorito agregar(Favorito favorito) {
        boolean existe = favoritoRepository.existsByPersona_IdPersonasAndEvento_IdEventos(
                favorito.getPersona().getIdPersonas(),
                favorito.getEvento().getIdEventos());

        if (existe) {
            throw new RuntimeException("El evento ya está en favoritos");
        }
        return favoritoRepository.save(favorito);
    }

    @Override
    public void eliminar(Long idPersona, Long idEvento) {
        Favorito favorito = favoritoRepository
                .findByPersona_IdPersonasAndEvento_IdEventos(idPersona, idEvento)
                .orElseThrow(() -> new RuntimeException("Favorito no encontrado"));

        favoritoRepository.delete(favorito);
    }

    @Override
    public List<Favorito> listarPorPersona(Long idPersona) {
        return favoritoRepository.findByPersona_IdPersonas(idPersona);
    }

	
}
