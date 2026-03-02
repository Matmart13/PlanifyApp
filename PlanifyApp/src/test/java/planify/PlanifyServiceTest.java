package planify;
import static org.hamcrest.CoreMatchers.any;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import planify.model.entity.Categoria;
import planify.model.entity.Contacto;
import planify.model.repository.CategoriaRepository;
import planify.model.repository.ContactoRepository;
import planify.model.repository.EventoRepository;
import planify.model.service.CategoriaService;
import planify.model.service.CategoriaServiceImpl;
import planify.model.service.ContactoService;
import planify.model.service.ContactoServiceImpl;
import planify.model.service.EventoService;
import planify.model.service.EventoServiceImpl;
import planify.model.dtos.ReservaDTO;
import planify.model.entity.*;
import planify.model.repository.*;
import planify.model.service.*;
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

    }

