package com.example.demo;

import org.springframework.data.repository.CrudRepository;

public interface CustomerRepo extends CrudRepository<Customer, Long> {

	Customer findByEmail(String email);
	Customer findByPhone(String phone);

}
