package planify.model.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoritoDTO {

    private Long idFavorito;
    
    // Solo necesitamos los IDs para las relaciones
    private Long idPersona;
    private Long idEvento;
    
    // Añadimos datos extra del Evento para mostrarlos en la lista sin hacer más peticiones
    private String nombreEvento;
    private String imagenEventoUrl;
    private String ubicacionEvento;
    
    private LocalDateTime fechaFavorito;
}