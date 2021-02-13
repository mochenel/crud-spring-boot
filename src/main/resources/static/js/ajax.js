let valid = true;
$(document).ready(function() { 


	getData();
	function getData() { 

        return $.ajax({
            url: 'https://crud-spring-boot-app.herokuapp.com/get',
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            // data: JSON.stringify(person),
            success: function (person) {
                clearTable();
                createTable(person);
                
            	
            }
            
        });
	
} 

$('#save').click((e)=>postData(e.target.id));
function postData(mode) { 
    if(isValidated() == false){
        return;
    }
    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let gender = document.getElementById("gender").value.trim();
    let address = document.getElementById("address").value.trim();
   

    let customer = {
        "fname":fname,
        "lname":lname,
        "email":email,
        "phone":phone,
        "gender":gender,
        "address":address
        
        }
    
    document.getElementById("alert").innerHTML = 
            `<div id="spinner" class="">
            <div class="spinner-border" role="status">
                <span class="visually-hidden"></span>
            </div>
            </div>`;
    return $.ajax({
        url: 'https://crud-spring-boot-app.herokuapp.com/add?mode='+mode+"&&id="+currId,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(customer),
        success: function (person) {
            let res = person.response;
            clearTable();
            createTable(person);
            if(res == "Phone number already exist, Please choose another one"){
                document.getElementById("alert").innerHTML= 
                `<div  class=" alert alert-danger alert-dismissible fade show" role="alert">
                Phone number already exist, Please choose another one.
                <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">&times;</button>
                </div>`;
              
            }
            else if(res == "Email already exist, Please choose another one"){
                document.getElementById("alert").innerHTML= 
                `<div  class=" alert alert-danger alert-dismissible fade show" role="alert">
                Email already exist, Please choose another one.
                <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">&times;</button>
                </div>`;
                
            }
            else{
                if(mode == "save"){
                    document.getElementById("alert").innerHTML= 
                `<div  class=" alert alert-success alert-dismissible fade show" role="alert">
                Customer has been added successfully.
                <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">&times;</button>
                </div>`; 
                }
                else{
                    document.getElementById("alert").innerHTML= 
                `<div  class=" alert alert-success alert-dismissible fade show" role="alert">
                Customer has been updated successfully.
                <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">&times;</button>
                </div>`;
                }
               clearForm();
               saveMode();
            }

           
            
           
        }
        
    });

} 




})
function openModal(id){
    $('#staticBackdrop').modal('show');
    $('#delete-btn').attr("onclick",`deleteRecord(${id})`);
}

function deleteRecord(id){
    $('#staticBackdrop').modal('hide');
    return $.ajax({
        url: `https://crud-spring-boot-app.herokuapp.com/delete?Id=${id}`,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        // data: JSON.stringify(person),
        success: function (person) {
            clearTable();
            createTable(person);
                clearForm();
                saveMode();
            
            
            
        }
        
    });
}
let prevId = null;
let currId = 0;
function updateRecord(id){
    currId = id;
    // when cancel get clicked :1 clear form data, 2 change form button text to save, exit the function
    let update = document.getElementById(`u${id}`);
    if(update != null && update.innerText == "cancel"){
        
        update.innerText = "update";
        clearForm();
        saveMode();
        
        return;
    }
    // change cancel to update for previously updated record
    if(prevId != null){
        let prevNode = document.getElementById(`u${prevId}`)
        if(prevNode != null){
            prevNode.innerText = "update";
        }
       
    }
   
    // reserve current to prev id for remembering previously updated record
    prevId = id;
    
   
    update.innerText = "cancel";
    updateMode();
   
    let tr = document.getElementById(`d${id}`).parentElement.parentElement;
    let tdArray = tr.children;
    document.getElementById("fname").value = tdArray[0].innerHTML;
    document.getElementById("lname").value = tdArray[1].innerHTML;
    document.getElementById("email").value = tdArray[2].innerHTML;
    document.getElementById("phone").value = tdArray[3].innerHTML;
    document.getElementById("gender").value = tdArray[4].innerHTML;
    document.getElementById("address").value = tdArray[5].innerHTML;
}
function clearTable(){
    let tbl = document.getElementsByTagName("table")[0];
    let body = tbl.children[1];
    body.innerHTML = "";
}
function createTable(person){
    let list = person.data;
    let tbl = document.getElementsByTagName("table")[0];
    let body = tbl.children[1];
    let innerElements = "";
    let i = 0;
    let key;
    while(true){
        key = "key"+i;
        console.log(innerElements)
        if(list[key] == undefined || list[key][0] == undefined){
            break;
        }
        
        if(i == 0){
        
            innerElements =
            `<tr> 
            <td>${list[key][0]}</td> <td>${list[key][1]}</td> <td>${list[key][2]}</td> 
            <td>${list[key][3]}</td> <td>${list[key][4]}</td> <td>${list[key][5]}</td>
            <td><button id='d${list[key][6]}' onclick='openModal("${list[key][6]}")' class='btn btn-danger'>delete</button></td>
            <td><button id='u${list[key][6]}' onclick='updateRecord("${list[key][6]}")' class='btn btn-success'>update</button></td>
            </tr>`
        }
        else{
            innerElements = innerElements +
            `<tr> 
            <td>${list[key][0]}</td> <td>${list[key][1]}</td> <td>${list[key][2]}</td> 
            <td>${list[key][3]}</td> <td>${list[key][4]}</td> <td>${list[key][5]}</td>
            <td><button id='d${list[key][6]}' onclick='openModal("${list[key][6]}")' class='btn btn-danger'>delete</button></td>
            <td><button id='u${list[key][6]}' onclick='updateRecord("${list[key][6]}")' class='btn btn-success'>update</button></td>
            </tr>`
        }

        i++;
    }
    
    body.innerHTML = innerElements;
}
function saveMode(){
    let update = document.getElementById("update");
    if(update != null){
        update.innerText = "save";
        update.id = "save";
    }
}
function updateMode(){
    let save = document.getElementById("save");
    if(save != null){
        save.innerText = "update";
        save.id = "update";
    }
}
function clearForm(){
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("address").value = "";
}
function isValidated(){
   let fname =  document.getElementById("fname").value.trim() == "";
   let lname = document.getElementById("lname").value.trim() == "";
   let email = document.getElementById("email").value.trim() == "";
   let phone = document.getElementById("phone").value.trim() == "";
   let gender = document.getElementById("gender").value.trim() == "";
   let address = document.getElementById("address").value.trim() == "";
   let tel = document.getElementById("phone").value.trim();
   let mail = document.getElementById("email").value.trim()
   // validate first name

     // starter JavaScript for disabling form submissions if there are invalid fields
    
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation')
    let pattern = /[a-zA-Z0-9._]{1,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/;
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('click', function () {
          form.classList.add('was-validated')
        })
      })
      if(fname || lname || email || phone || gender || address || tel.length != 10  ){
        
        return false;
          
      } 
      else if(!pattern.test(mail)){
        return false;
      }
      
      
      return true;
}

