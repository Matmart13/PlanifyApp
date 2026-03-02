package planify.model.dtos;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoriaDTO {
	private Long idCategorias;
    private String nombre;
    private String descripcion;
    private String estado;
}
