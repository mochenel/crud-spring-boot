<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri = "http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<!-- <link rel="stylesheet" href="css/home.css"> -->

	<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6900628053557254"
     crossorigin="anonymous"></script>
</head>
<body>

	<div class="container">
		<h3 class = "text-center">Add customer</h3>
		<div class="row row-cols-auto">
			
		  <div class="col-12">
			<form class="row g-3 needs-validation" novalidate>
				<div class="col-md-4 position-relative">
				  <label for="fname" class="form-label">First Name</label>
				  <input type="text" class="form-control" id="fname" value="" required>
				  <div id="fname-error" class="invalid-feedback">
					Please provide a valid Name.
				  </div>
				</div>
				<div class="col-md-4 position-relative">
				  <label for="lname" class="form-label">Last name</label>
				  <input type="text" class="form-control" id="lname" value="" required>
				  <div id="lname-error" class="invalid-feedback">
					Please provide a valid Name.
				  </div>
				</div>
				<div class="col-md-4 position-relative">
				  <label for="email" class="form-label">Email</label>
				  <div class="input-group has-validation">
					<span class="input-group-text" >@</span>
					<input type="email" pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}" class="form-control" id="email" data-toggle="tooltip" data-placement="right" title=""  required>
					<div id="email-error" class="invalid-feedback">
						Please provide a valid Email.
					  </div>
				  </div>
				</div>
				
							
				<div class="col-md-4 position-relative">
					<label for="phone" class="form-label">Phone Number</label>
					<input minlength="10"  maxlength="10" type="tel" class="form-control" id="phone" required>
					<div id="phone-error" class="invalid-feedback">
						Please provide a valid Phone Number.
					  </div>  
				</div>
				  <div class="col-md-4 position-relative">
					<label for="gender" class="form-label">Gender</label>
					<select id="gender" class="form-select form-select-md form-control" required >
						<option value="">select gender</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					  </select>
					  <div id="gender-error" class="invalid-feedback">
						Please select gender.
					  </div>
				  </div>
				  <div class="col-md-4 position-relative">
					<label for="address" class="form-label">Address</label>
					<input type="text" class="form-control" id="address" required>
					<div id="address-error" class="invalid-feedback">
						Please provide a valid Address.
					  </div>
				  </div>
				  <div class="row">
				</div>
				<div class="col-4 mt-4">
				  <button class="btn btn-primary" type="button" id="save" >Save</button>
				</div>
				
				<div id="alert" class="col-md-4 mt-4">
				
				</div>

			  </form>
		  </div>
		  </div>
		  <h3 class = "text-center">customers</h3>
		  <div class="row">
			
		   </div>
		  <div class="row">
		  <div class="col-12">
			<table class="table mt-4 table table-hover">
				<thead>
				  <tr>
					<th scope="col">First Name</th>
					<th scope="col">Last Name</th>
					<th scope="col">Email</th>
					<th scope="col">Phone Number</th>
					<th scope="col">Gender</th>
					<th scope="col">Address</th>
					<th scope="col"></th>
					<th scope="col"></th>
				  </tr>
				</thead>
				<tbody>
				  
				 
				</tbody>
			  </table>
		  </div>
		  </div>
		</div>
<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
	<div class="modal-dialog">
	  <div class="modal-content">
		<div class="modal-header">
		  <h5 class="modal-title" id="staticBackdropLabel">Confirmation Box</h5>
		  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" id="x-btn">&times;</button>
		</div>
		<div class="modal-body">
		 <strong> Are you sure you want to delete this record?</strong>
		</div>
		<div class="modal-footer">
		  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close-btn">Close</button>
		  <button type="button" class="btn btn-danger" id="delete-btn">Delete</button>
		</div>
	  </div>
	</div>
  </div>
	  <script src="js/jquery.min.js"></script>
	  <script src="js/bootstrap.bundle.min.js"></script>
	  <script src="js/ajax.js"></script>
</body>
</html>
