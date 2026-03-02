package planify.model.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventoDTO {
	private Long id;
    private String nombre;
    private String descripcion;
    private String ubicacion;
    private LocalDateTime fechaInicio;
    private BigDecimal precio;
    private Integer capacidad;
    private String imagenUrl;
    private String urlReserva;
    private Boolean recomendado;
    
    // Simplificamos la relación con Categoría para el Frontend
    private Long idCategoria;
    private String nombreCategoria;
}
