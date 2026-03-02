package planify.model.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor @Data @Builder
@Entity
@Table(name = "formulario")
public class Contacto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nombre",nullable = false)
	private String nombre;

	@Column(name = "email", nullable = false)
	private String email;

	@Column
	private String asunto;

	@Column(name = "mensaje",nullable = false, columnDefinition = "TEXT")
	private String mensaje;

	@Column(name = "fecha", insertable = false, updatable = false)
	private LocalDateTime fechaCreacion;

}
