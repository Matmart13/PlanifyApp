package model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import model.entity.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva,Long>{

	 List<Reserva> findByPersona_IdPersonasOrderByFechaReservaDesc(Long idPersona);
	
}
