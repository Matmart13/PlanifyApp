package model.service;

import java.util.List;

import model.entity.Evento;

public interface EventoService {

	Evento crear(Evento evento);
    List<Evento> listar();
    Evento obtenerPorId(Long id);
    Evento actualizar(Long id, Evento evento);
    void eliminar(Long id);
    List<Evento> listarPorCategoria(Long idCategoria);
    List<Evento> buscar(String texto);
    List<Evento> listarRecomendados();
    
}
