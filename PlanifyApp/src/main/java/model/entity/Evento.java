package model.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor @Data @Builder
@Entity
@Table(name = "eventos")
public class Evento {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_eventos")
	private Long idEventos;
	
	@Column(nullable = false)
	private String nombre;
	
	@Column(columnDefinition = "TEXT")
	private String descripcion;
	
	@Column
	private String ubicacion;
	
	@Column(name = "fecha_de_inicio", nullable = false)
	private LocalDateTime fechaInicio;
	
	@Column(nullable = false)
	private Double precio;
	
	@Column(nullable = false)
	private Integer capacidad;
	
	@Column(name = "imagen_url")
	private String imagenUrl;
	
	@Column(name = "url_reserva")
    private String urlReserva;
	
	@Column(nullable = false)
    @Builder.Default
    private Boolean recomendado = false;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @Column(name = "fecha_creacion", insertable = false, updatable = false)
    private LocalDateTime fechaCreacion;
	
}
