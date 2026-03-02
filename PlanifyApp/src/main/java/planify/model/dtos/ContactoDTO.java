package planify.model.dtos;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactoDTO {
	private Long id;
    private String nombre;
    private String email;
    private String asunto;
    private String mensaje;
}
