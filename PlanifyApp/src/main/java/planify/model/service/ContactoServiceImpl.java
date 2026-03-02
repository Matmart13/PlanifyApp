package planify.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import planify.model.entity.Contacto;
import planify.model.repository.ContactoRepository;

@Service
@RequiredArgsConstructor
public class ContactoServiceImpl implements ContactoService{
	
	private final ContactoRepository contactoRepository;
	
	@Override
	public Contacto crear(Contacto contacto) {
		// TODO Auto-generated method stub
		return contactoRepository.save(contacto);
	}

	@Override
	public List<Contacto> listar() {
		// TODO Auto-generated method stub
		return contactoRepository.findAll();
	}

}
