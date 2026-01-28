package planify;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import model.entity.Categoria;
import model.repository.CategoriaRepository;
import model.service.CategoriaService;
import model.service.CategoriaServiceImpl;
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
}

