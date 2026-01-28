package model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import model.entity.Evento;
import model.repository.EventoRepository;

@Service
@RequiredArgsConstructor
public class EventoServiceImpl implements EventoService{
	
	private final EventoRepository eventoRepository;

	@Override
    public Evento crear(Evento evento) {
        return eventoRepository.save(evento);
    }

    @Override
    public List<Evento> listar() {
        return eventoRepository.findAll();
    }

    @Override
    public Evento obtenerPorId(Long id) {
        return eventoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));
    }

    @Override
    public Evento actualizar(Long id, Evento evento) {
        Evento existente = obtenerPorId(id);

        existente.setNombre(evento.getNombre());
        existente.setDescripcion(evento.getDescripcion());
        existente.setUbicacion(evento.getUbicacion());
        existente.setFechaInicio(evento.getFechaInicio());
        existente.setPrecio(evento.getPrecio());
        existente.setCapacidad(evento.getCapacidad());
        existente.setImagenUrl(evento.getImagenUrl());
        existente.setUrlReserva(evento.getUrlReserva());
        existente.setRecomendado(evento.getRecomendado());
        existente.setCategoria(evento.getCategoria());

        return eventoRepository.save(existente);
    }

    @Override
    public void eliminar(Long id) {
        eventoRepository.deleteById(id);
    }

    @Override
    public List<Evento> listarPorCategoria(Long idCategoria) {
        return eventoRepository.findByCategoria_IdCategorias(idCategoria);
    }

    @Override
    public List<Evento> buscar(String texto) {
        return eventoRepository
                .findByNombreContainingIgnoreCaseOrUbicacionContainingIgnoreCase(texto, texto);
    }

    @Override
    public List<Evento> listarRecomendados() {
        return eventoRepository.findByRecomendadoTrue();
    }

}
