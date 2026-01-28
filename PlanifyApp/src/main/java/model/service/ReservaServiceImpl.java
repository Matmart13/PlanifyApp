package model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import model.entity.Reserva;
import model.repository.ReservaRepository;

@Service
@RequiredArgsConstructor
public class ReservaServiceImpl implements ReservaService{
	
    private final ReservaRepository reservaRepository;

    @Override
    public Reserva crear(Reserva reserva) {
        reserva.setEstado("PENDIENTE");
        return reservaRepository.save(reserva);
    }

    @Override
    public List<Reserva> listarPorPersona(Long idPersona) {
        return reservaRepository.findByPersona_IdPersonasOrderByFechaReservaDesc(idPersona);
    }

}
