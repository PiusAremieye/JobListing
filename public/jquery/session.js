$(document).ready(function(){
    if(sessionStorage.getItem("loginId")){
        let admin = sessionStorage.getItem("loginId")
        $.ajax({
            url: `http://localhost:3000/admin/${admin}`,
            method: 'get'
        }).done(e =>{
            $('#wel').prepend(
                `<h3 style="text-transform:uppercase;">Welcome Admin : ${e.name}</h3>`
            )
        })        
    }
    else{
        window.location = "/login.html"
    }
}) 


       