package planify.model.service;

import java.util.List;

import planify.model.dtos.ReservaDTO;

public interface ReservaService {
    ReservaDTO realizarReserva(ReservaDTO reservaDTO);
    List<ReservaDTO> listarPorPersona(Long idPersona);
    void cancelarReserva(Long id);
}
