package com.example.demo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CustomerService {

	@Autowired
	private CustomerRepo customerRepo;
	
	
	
	public String save(Customer customer) {
		String str;
		if( customerRepo.findByEmail(customer.getEmail()) != null) {
			str = "Email already exist, Please choose another one";
		}
		else if( customerRepo.findByPhone(customer.getPhone()) != null) {
			str = "Phone number already exist, Please choose another one";
		}
		else {
			str = "";
		}
		
		if(str == "")
			customerRepo.save(customer);
		
		return str;
	}
	public Map<String,String[]> getCustomers(){
		ArrayList<Customer> customer = (ArrayList<Customer>) customerRepo.findAll();
		int n =customer.size();
		HashMap<String, String[]> map = new HashMap<>();
		for(int i = 0; i < n; i++) {
			map.put("key"+i, new String[] {
					customer.get(i).getFname(),
					customer.get(i).getLname(),
					customer.get(i).getEmail(),
					customer.get(i).getPhone(),
					customer.get(i).getGender(),
					customer.get(i).getAddress(),
					customer.get(i).getId()+"",
					});
		}
		
		
		return map;
	}
	public Customer getCustomerById(Long Id) {
		
		Optional<Customer> customer =  customerRepo.findById(Id);

		return customer.get();
	}
	public void deleteCustomerById(Long id) {
		customerRepo.deleteById(id);
	}
	
	public String update(Customer customer) {
		 String str = "";
		ArrayList<Customer> list = (ArrayList<Customer>) customerRepo.findAll();
	
		list.remove(customer);
		String phone = customer.getPhone();
		String email = customer.getEmail();
		for(Customer c : list){
			if(c.getPhone().equals(phone)) {
				str = "Phone number already exist, Please choose another one";
				break;
			
			}
			else if(c.getEmail().equals(email)) {
				str ="Email already exist, Please choose another one";
				break;
			}
			
			
		}
		
		if(str.equals("")) {
			customerRepo.save(customer);
		}

		
		return str;
	}
	
	
}
