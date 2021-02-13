package com.example.demo;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class Controller {
	
	@Autowired
	CustomerService customerService; 
	
		// GET Request, to get jsp file. 
	
		@RequestMapping(method = RequestMethod.GET,path = "/")
		private ModelAndView getHome(ModelAndView modelAndView,HttpServletRequest httpServletRequest ) {

			modelAndView.setViewName("home");
			return modelAndView;
		}
		// GET Request
		@RequestMapping(method = RequestMethod.GET,path = "/get")
		private Map<String,Object> getRoute(){
			HashMap<String, Object> map = new HashMap<>();
			map.put("data", customerService.getCustomers());
			return map;
		}

		// POST Request 
		@RequestMapping(method = RequestMethod.POST,path = "/add")
		private Map<String,Object> addRoute(@RequestBody Customer customer, @RequestParam("mode") String mode, @RequestParam("id") Long id){
			HashMap<String, Object> map = new HashMap<>();
		
			if(mode.equals("update")) {
				// store json data from client into some temp var
				String fname = customer.getFname();
				String lname = customer.getLname();
				String email = customer.getEmail();
				String phone = customer.getPhone();
				String gender = customer.getGender();
				String address = customer.getAddress();
				
				//get hibernate object from database
				customer = customerService.getCustomerById(id);
				
				// store hibernate object from database into some temp var 
				String Fname = customer.getFname();
				String Lname = customer.getLname();
				String Email = customer.getEmail();
				String Phone = customer.getPhone();
				String Gender = customer.getGender();
				String Address = customer.getAddress();
				
				// modify hibernate object in a database
				customer.setFname(fname);
				customer.setLname(lname);
				customer.setEmail(email);
				customer.setPhone(phone);
				customer.setGender(gender);
				customer.setAddress(address);
				map.put("response", customerService.update(customer));
				if(!map.get("response").equals("")) {
					// duplicates detected, reverse hibernate object modification applied earlier 
					customer.setFname(Fname);
					customer.setLname(Lname);
					customer.setEmail(Email);
					customer.setPhone(Phone);
					customer.setGender(Gender);
					customer.setAddress(Address);
				}
			}
			else {
				map.put("response", customerService.save(customer));	
			}
			
			map.put("data", customerService.getCustomers());
			return map;
		}
		
		// PUT Request
		@RequestMapping(method = RequestMethod.GET,path = "/getById")
		private Map<String,String> getByIdRoute(@RequestParam("Id") Long Id ) {
			HashMap<String, String> map = new HashMap<>();
			Customer customer = customerService.getCustomerById(Id);

			map.put("fname", customer.getFname());
			map.put("lname", customer.getLname());
			map.put("email", customer.getEmail());
			map.put("phone", customer.getPhone());
			map.put("gender", customer.getGender());
			map.put("address", customer.getAddress());
			
			return map;
		}
		// DELETE Request
		@RequestMapping(method = RequestMethod.POST,path = "/delete")
		private Map<String,Object> deleteRoute(@RequestParam("Id") Long Id){
			HashMap<String, Object> map = new HashMap<>();
			customerService.deleteCustomerById(Id);
			map.put("data", customerService.getCustomers());
			return map;
		}
	
		
		
		
}
