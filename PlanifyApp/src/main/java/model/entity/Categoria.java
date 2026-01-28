package model.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor @Data @Builder
@Entity
@Table(name = "categorias")
public class Categoria {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_categorias")
	private Long idCategorias;
	
	@Column(nullable = false, unique = true)
	private String nombre;
	
	@Column(columnDefinition = "TEXT")
	private String descripcion;
	
	@Column(nullable = false)
	private String estado; //activo/incativo
	
	@Column(name = "fecha_creacion", nullable = false, insertable = false, updatable = false)
	private LocalDateTime fechaCreacion;
	
	//Relaciones
	@OneToMany(mappedBy = "categoria")
	private List<Evento> eventos;
	
}
