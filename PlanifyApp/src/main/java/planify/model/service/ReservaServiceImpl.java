package planify.model.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import planify.model.dtos.ReservaDTO;
import planify.model.entity.Evento;
import planify.model.entity.Persona;
import planify.model.entity.Reserva;
import planify.model.repository.EventoRepository;
import planify.model.repository.PersonaRepository;
import planify.model.repository.ReservaRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservaServiceImpl implements ReservaService {

    private final ReservaRepository reservaRepository;
    private final PersonaRepository personaRepository;
    private final EventoRepository eventoRepository;

    @Override
    public ReservaDTO realizarReserva(ReservaDTO dto) {
        Persona persona = personaRepository.findById(dto.getIdPersona())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Evento evento = eventoRepository.findById(dto.getIdEvento())
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        Reserva reserva = new Reserva();
        reserva.setPersona(persona);
        reserva.setEvento(evento);
        
        // 1. Manejo de cantidad
        int cant = (dto.getCantidad() != null) ? dto.getCantidad() : 1;
        reserva.setCantidad(cant);
        
        // 2. Cálculo con BigDecimal: precioEvento * cantidad
        BigDecimal precioUnitario = (evento.getPrecio() != null) ? evento.getPrecio() : BigDecimal.ZERO;
        reserva.setPrecioTotal(precioUnitario.multiply(new BigDecimal(cant)));
        
        // 3. Datos por defecto
        reserva.setEstado("CONFIRMADA"); 
        reserva.setFechaReserva(LocalDateTime.now());

        Reserva guardada = reservaRepository.save(reserva);
        return convertirADTO(guardada);
    }

    @Override
    public List<ReservaDTO> listarPorPersona(Long idPersona) {
        return reservaRepository.findByPersona_IdPersonasOrderByFechaReservaDesc(idPersona)
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Override
    public void cancelarReserva(Long id) {
        Reserva r = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
        r.setEstado("CANCELADA");
        reservaRepository.save(r);
    }

    private ReservaDTO convertirADTO(Reserva r) {
        return new ReservaDTO(
                r.getIdReservas(), 
                r.getPersona().getIdPersonas(), // En Persona.java es idPersonas
                r.getPersona().getNombre(),
                r.getEvento().getIdEventos(),   // En Evento.java es idEventos
                r.getEvento().getNombre(),
                r.getCantidad(),
                r.getPrecioTotal(),
                r.getEstado(),
                r.getFechaReserva()
        );
    }    }