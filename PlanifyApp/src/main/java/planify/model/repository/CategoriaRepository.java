package planify.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import planify.model.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

	boolean existsByNombreIgnoreCase(String nombre);
	
}
