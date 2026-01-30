package planify;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import model.entity.Categoria;
import model.entity.Contacto;
import model.repository.CategoriaRepository;
import model.repository.ContactoRepository;
import model.repository.EventoRepository;
import model.service.CategoriaService;
import model.service.CategoriaServiceImpl;
import model.service.ContactoService;
import model.service.ContactoServiceImpl;
import model.service.EventoService;
import model.service.EventoServiceImpl;
import model.entity.*;
import model.repository.*;
import model.service.*;
public class PlanifyServiceTest {
	CategoriaRepository repo = Mockito.mock(CategoriaRepository.class);
	@Test
    void testCrearCategoria() {
        // 1. PREPARACIÓN (Arrange)
        // Creamos un simulacro del repositorio
        CategoriaRepository repoMock = Mockito.mock(CategoriaRepository.class);
        
        // Inyectamos el repo falso en la IMPLEMENTACIÓN del servicio
        CategoriaService service = new CategoriaServiceImpl(repoMock);
        
        String nombre = "Estudiar Tests";
        Categoria nuevaCat = new Categoria(); 
        nuevaCat.setNombre(nombre); // O usa tu constructor si lo tienes

        // Programamos el simulacro: cuando el servicio llame a save(), devuelve la categoría
        Mockito.when(repoMock.save(Mockito.any(Categoria.class))).thenReturn(nuevaCat);

        // 2. EJECUCIÓN (Act)
        Categoria resultado = service.crear(nuevaCat);

        // 3. VERIFICACIÓN (Assert)
        assertNotNull(resultado, "El resultado no debería ser nulo");
        assertEquals(nombre, resultado.getNombre(), "El nombre de la categoría debe coincidir");
    }
	@Test
    void testCrearContacto() {
        // 1. PREPARACIÓN (Arrange)
        // Creamos un simulacro del repositorio
        ContactoRepository repoMock = Mockito.mock(ContactoRepository.class);
        
        // Inyectamos el repo falso en la IMPLEMENTACIÓN del servicio
        ContactoService service = new ContactoServiceImpl(repoMock);
        
        String nombre = "Estudiar Tests";
        Contacto nuevaCont = new Contacto(); 
        nuevaCont.setNombre(nombre); // O usa tu constructor si lo tienes

        // Programamos el simulacro: cuando el servicio llame a save(), devuelve la categoría
        Mockito.when(repoMock.save(Mockito.any(Contacto.class))).thenReturn(nuevaCont);

        // 2. EJECUCIÓN (Act)
        Contacto resultado = service.crear(nuevaCont);

        // 3. VERIFICACIÓN (Assert)
        assertNotNull(resultado, "El resultado no debería ser nulo");
        assertEquals(nombre, resultado.getNombre(), "El nombre de la categoría debe coincidir");
    }
	@Test
    void testCrearEvento() {
        // 1. PREPARACIÓN (Arrange)
        // Creamos un simulacro del repositorio
        EventoRepository repoMock = Mockito.mock(EventoRepository.class);
        
        // Inyectamos el repo falso en la IMPLEMENTACIÓN del servicio
        EventoService service = new EventoServiceImpl(repoMock);
        
        String nombre = "Estudiar Tests";
        Evento nuevaEvent = new Evento(); 
        nuevaEvent.setNombre(nombre); // O usa tu constructor si lo tienes

        // Programamos el simulacro: cuando el servicio llame a save(), devuelve la categoría
        Mockito.when(repoMock.save(Mockito.any(Evento.class))).thenReturn(nuevaEvent);

        // 2. EJECUCIÓN (Act)
        Evento resultado = service.crear(nuevaEvent);

        // 3. VERIFICACIÓN (Assert)
        assertNotNull(resultado, "El resultado no debería ser nulo");
        assertEquals(nombre, resultado.getNombre(), "El nombre de la categoría debe coincidir");
    }
	@Test
	void testCrearFavorito() {
	    // 1. PREPARACIÓN (Arrange)
	    FavoritoRepository repoMock = Mockito.mock(FavoritoRepository.class);
	    FavoritoService service = new FavoritoServiceImpl(repoMock);

	    // Create the Persona dependency
	    Persona personaMock = new Persona();
	    personaMock.setIdPersonas(1L);

	    // NEW: Create the Evento dependency to satisfy line 21 of your service
	    Evento eventoMock = new Evento();
	    eventoMock.setIdEventos(100L); 

	    // Create the Favorito and link BOTH dependencies
	    Favorito nuevaFav = new Favorito(); 
	    nuevaFav.setIdFavorito(2L);
	    nuevaFav.setPersona(personaMock);
	    nuevaFav.setEvento(eventoMock); // <--- This prevents the NPE on line 21

	    Mockito.when(repoMock.save(Mockito.any(Favorito.class))).thenReturn(nuevaFav);

	    // 2. EJECUCIÓN (Act)
	    Favorito resultado = service.agregar(nuevaFav);

	    // 3. VERIFICACIÓN (Assert)
	    assertNotNull(resultado, "El resultado no debería ser nulo");
	    assertEquals(2L, resultado.getIdFavorito());
	}
	
	@Test
    void testCrearReserva() {
        // 1. PREPARACIÓN (Arrange)
        // Creamos un simulacro del repositorio
        ReservaRepository repoMock = Mockito.mock(ReservaRepository.class);
        
        // Inyectamos el repo falso en la IMPLEMENTACIÓN del servicio
        ReservaService service = new ReservaServiceImpl(repoMock);
        
        Long id = 2L;
        Reserva nuevaReserva = new Reserva(); 
        nuevaReserva.setIdReservas(2L); // O usa tu constructor si lo tienes

        // Programamos el simulacro: cuando el servicio llame a save(), devuelve la categoría
        Mockito.when(repoMock.save(Mockito.any(Reserva.class))).thenReturn(nuevaReserva);

        // 2. EJECUCIÓN (Act)
        Reserva resultado = service.crear(nuevaReserva);

        // 3. VERIFICACIÓN (Assert)
        assertNotNull(resultado, "El resultado no debería ser nulo");
        assertEquals(id, resultado.getIdReservas(), "El id de la reserva tiene que coincidir");
    }
	
	
	
}

