package planify.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import planify.model.entity.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long>{
	
	 //listar eventos por categoría
    List<Evento> findByCategoria_IdCategorias(Long idCategoria);

    //buscar por nombre o ubicación (ignorando mayúsculas/minúsculas)
    List<Evento> findByNombreContainingIgnoreCaseOrUbicacionContainingIgnoreCase(String nombre, String ubicacion);
    
    //para msotrar los destacados en la home
    List<Evento> findByRecomendadoTrue();
    
    //para ordenar por fechas
    List<Evento> findAllByOrderByFechaInicioAsc();



}
