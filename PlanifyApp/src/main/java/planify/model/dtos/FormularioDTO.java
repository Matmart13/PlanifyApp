package planify.model.dtos;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormularioDTO {
	private Integer idContacto;
    private String nombre;
    private String email;
    private String asunto;
    private String mensaje;
    private LocalDateTime fecha;
}
