package model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import model.entity.Contacto;

public interface ContactoRepository extends JpaRepository<Contacto, Long>{

}
