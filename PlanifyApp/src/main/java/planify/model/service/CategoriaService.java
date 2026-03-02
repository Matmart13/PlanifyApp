package planify.model.service;

import java.util.List;

import planify.model.entity.Categoria;

public interface CategoriaService {
	
	Categoria crear(Categoria categoria);
    List<Categoria> listar();
    Categoria obtenerPorId(Long id);
    Categoria actualizar(Long id, Categoria categoria);
    void eliminar(Long id);
}
