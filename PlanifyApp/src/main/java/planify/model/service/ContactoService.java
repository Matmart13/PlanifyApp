package planify.model.service;

import java.util.List;

import planify.model.entity.Contacto;

public interface ContactoService {

	Contacto crear(Contacto contacto);
    List<Contacto> listar();
	
}
