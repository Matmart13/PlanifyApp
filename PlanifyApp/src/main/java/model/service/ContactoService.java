package model.service;

import java.util.List;

import model.entity.Contacto;

public interface ContactoService {

	Contacto crear(Contacto contacto);
    List<Contacto> listar();
	
}
