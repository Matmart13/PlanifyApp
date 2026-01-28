package model.service;

import java.util.List;

import model.entity.Reserva;

public interface ReservaService {

	Reserva crear(Reserva reserva);
    List<Reserva> listarPorPersona(Long idPersona);
	
}
