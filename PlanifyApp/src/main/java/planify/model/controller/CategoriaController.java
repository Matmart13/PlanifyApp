package planify.model.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import planify.model.dtos.CategoriaDTO;
import planify.model.repository.CategoriaRepository;
@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    // 1. Aquí declaramos la instancia (el objeto real)
    @Autowired
    private CategoriaRepository categoriaRepository; 

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerUna(@PathVariable Long id) {
        
        return categoriaRepository.findById(id)
            .map(cat -> new CategoriaDTO(
                cat.getIdCategorias(),
                cat.getNombre(),
                cat.getDescripcion(),
                cat.getEstado()
            ))
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}

