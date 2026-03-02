package planify.model.entity;



import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor @Builder @Data
@Entity 
@Table(name = "personas")
public class Persona {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_personas", nullable = false)
	private Long idPersonas;
	
	@Column(name = "nombre",nullable = false)
	private String nombre;
	
	@Column(name = "apellido",nullable = false)
	private String apellido;
	
	@Column(name = "correo", nullable = false, unique = true)
	private String correo;
	
	@Column(name = "contrasena",nullable = false)
	private String contrasena;
	
	@Column(name = "fecha_de_nacimiento")
    private LocalDate fechaDeNacimiento;
	
	@Column
	private String localidad;
	
	@Column
	private String telefono;
	
	
	@Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Rol rol = Rol.Usuario;

    @Column(name = "activo",nullable = false)
    @Builder.Default
    private Boolean activo = true;

    @Column(name = "fecha_creacion", insertable = false, updatable = false)
    private LocalDateTime fechaCreacion;

}
