package model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import model.entity.Categoria;
import model.repository.CategoriaRepository;

@Service
@RequiredArgsConstructor
public class CategoriaServiceImpl implements CategoriaService{

	private final CategoriaRepository categoriaRepository;
	
	@Override
	public Categoria crear(Categoria categoria) {
		// TODO Auto-generated method stub
		if (categoriaRepository.existsByNombreIgnoreCase(categoria.getNombre())) {
            throw new RuntimeException("La categoría ya existe");
        }
        return categoriaRepository.save(categoria);
	}

	@Override
	public List<Categoria> listar() {
		// TODO Auto-generated method stub
		return categoriaRepository.findAll();
	}

	@Override
	public Categoria obtenerPorId(Long id) {
		// TODO Auto-generated method stub
		return categoriaRepository.findById(id).orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
	}

	@Override
	public Categoria actualizar(Long id, Categoria categoria) {
		// TODO Auto-generated method stub
		Categoria existente = obtenerPorId(id);
        existente.setNombre(categoria.getNombre());
        existente.setDescripcion(categoria.getDescripcion());
        existente.setEstado(categoria.getEstado());
        return categoriaRepository.save(existente);
	}

	@Override
	public void eliminar(Long id) {
		// TODO Auto-generated method stub
		categoriaRepository.deleteById(id);
	}

}
