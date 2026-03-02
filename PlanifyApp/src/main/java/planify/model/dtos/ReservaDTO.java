package planify.model.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservaDTO {
	private Long idReserva;
private Long idPersona;
private String nombrePersona; 
private Long idEvento;
private String tituloEvento;   
private Integer cantidad;
private BigDecimal precioTotal; // Cambiado a BigDecimal
private String estado;
private LocalDateTime fechaReserva;
}
