$(document).ready(function(){
    // append the details in a table (admin.html)
    $.ajax({
        url: 'http://localhost:3000/jobs',
        method: 'get',
    }).done(e => {
        for(let i = 0; i < e.length; i++){
            $('#tbody').append(
                `<tr>
                    <td>${(i + 1)}</td>
                    <td>${e[i].name}</td>
                    <td>${e[i].company}</td>
                    <td>${e[i].state}</td>
                    <td>${e[i].category}</td>
                    <td>${e[i].des}</td>
                    <td><button id="del-${e[i].id}" type="button" class="btn btn-danger delete-btn">Delete</button></td>
                    <td><button id="edit-${e[i].id}" type="button" class="btn btn-danger edit-btn" data-toggle="modal" data-target="#myModal">Edit</button></td>
                </tr>`
            )
        }
        // delete a record in a table (admin.html)
        $(".delete-btn").on('click', e =>{
            e.preventDefault()
            let id = e.target.id.split('del-').join('')
            $.ajax({
                url: `http://localhost:3000/jobs/${id}`,
                method: 'delete'
            }).done(e =>{
                alert('Deleted successfully')
                window.location = 'http://localhost:3000/admin.html'
            })
        })
        // click an edit button for madal pop up(admin.html)
        $(".edit-btn").on('click', e =>{
            e.preventDefault()
            let id = e.target.id.split('edit-').join('')
            $.ajax({
                url: `http://localhost:3000/jobs/${id}`,
                method: 'get'
            }).done(e =>{
                $('.update').html(                    
                    `<form class="form" id="updateform">
                        <div class="form-group">
                            <label>Job Title</label>
                            <input type="text" class="form-control" id="edit-name" value= "${e.name}" />
                        </div>
                        <div class="form-group">
                            <label>Comapany Name</label>
                            <input type="text" class="form-control" id="edit-cname" value="${e.company}"/>
                        </div>
                        <div class="form-group">
                            <label>Location</label>
                            <input type="text" class="form-control" id="edit-states" value="${e.state}"/>                                
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <input type="text" class="form-control" id="edit-category" value="${e.category}"/>                        
                        </div>    
                        <div class="form-group">
                            <label>Description</label>
                            <textarea class="form-control" id="edit-des">${e.des}</textarea>
                        </div>        
                        <button class="btn btn-primary updatebtn" type="submit">Send</button>
                    </form>`
                )                  
            }).done(e => {
                // update the record in the modal box (admin.html)
                $('#updateform').on("submit", e => {
                    // console.log("Yes");
                    e.preventDefault()
                    let name = $('#edit-name').val()
                    let company = $('#edit-cname').val()
                    let state = $('#edit-states').val();
                    let category = $('#edit-category').val()
                    let des = $('#edit-des').val()
                    if(name !="" && company !="" && state !="" && category !="" && des !=""){
                        $.ajax({
                            url: `http://localhost:3000/jobs/${id}`,
                            method: 'put',
                            data:{name,company,state,category,des}
                        }).done(e =>{
                            alert('Details has been updated');
                            window.location.assign("admin.html");
                        })
                    }else{
                        alert('Details must be updated') 
                    }
                })
            })            
        }) 
    })
// post a record to the database (admin.html) 
    $('#form').submit(e =>{
        e.preventDefault();
        let name = $('#name').val()
        let company = $('#cname').val()
        let state = $('#states').val()
        let category = $('#category').val()
        let des = $('#des').val()
        console.log({name, company, state, category, des})
        $.ajax({
            url: 'http://localhost:3000/jobs',
            method: 'post',
            data: {
                name,company,state,category,des
            },
            error: (jqr, txt) => {
                console.log({jqr, txt})
            }
        }).done(e =>{
            $('#tbody').append(
                `<tr>
                    <td>${e.id}</td>
                    <td>${e.name}</td>
                    <td>${e.company}</td> 
                    <td>${e.state}</td>   
                    <td>${e.category}</td>
                    <td>${e.des}</td>
                    <td><button id="del-${e.id}" type="button" class="btn btn-danger delete-btn">Delete</button></td>
                    <td><button id="edit-${e.id}" type="button" class="btn btn-danger">Edit</button></td>
                </tr>`
            )
            $('#name').val('')
            $('#cname').val('')
            $('#des').val('')

            alert("Added successfully")
        })
    })
    //All the categories
    let categories = "All";
    let states = "All";

    // append the states from the database into the select field (admin.html)
    $.ajax({
        url: 'http://localhost:3000/states',
        method: 'get',
    }).done(e => {
        let r = []
        for(let x = 0; x < e.length; x++) {
            r.push(e[x].name)
            // console.log(e[x])
        }
        r.sort()
        // console.log(r)
        for(let i = 0; i < r.length; i++){
            console.log(r[i])
            $('#states').append(
                `<option class="loc-states" value=${r[i]}>${r[i]}</option>`
            )
        }
    }).done(e => {
        //Event when any of the options is selected in the all category select tag
      $("#states").on("change", () => {
        let category = $("#jobFunction").val();
        let state = $("#states").val() || null; 
          //call the function to populate the top jobs
          populateTopJobs(category, state);
      })
    })

    // append the categories from the database into the select field (admin.html)
    $.ajax({
        url: 'http://localhost:3000/category',
        method: 'get',
    }).done(e => {
        let r = []
        for(let j = 0; j < e.length; j++){
            r.push(e[j].name)
        }
        r.sort()
        for(let i = 0; i < r.length; i++){
            $('#category').append(
                `<option value="${r[i]}">${r[i]}</option>`
            )
        }
    })

    // append the category from the database into the select field (index.html)
    $.ajax({
        url: 'http://localhost:3000/category',
        method: 'get',
    }).done(e => {
        let r = []
        for(let j = 0; j < e.length; j++){
            r.push(e[j].name)
        }
        r.sort()
        for(let i = 0; i < r.length; i++){
            $('#jobFunction').append(
                `<option class="jobFunction" value="${r[i]}">${r[i]}</option>`
            )
        }
    }).done(e => {

          //Event when any of the options is selected in the all category select tag (index.html)
        $("#jobFunction").on("change", () => {
            let category = $("#jobFunction").val();
            let state = $("#states").val() || null;

            //call the function to populate the top jobs
            populateTopJobs(category, state);
        })
    })

    //function to populate top jobs div (index.html)
    function populateTopJobs(category, state){
        $.ajax({
            url: 'http://localhost:3000/jobs',
            method: 'get',
        }).done(e => {
            $('#display').html("");
            for(let k = 0; k < e.length; k++){
                let first = e[k].category;
                let second = e[k].state;

                state = (state == null)? states : state;
                category = (category == null)? categories : category;

                if((first == category || category == categories) && (second == state || state == states)){
                    $('#display').append(
                        `<div class="col-md-3" style="box-shadow:0px 6px 8px 0px grey;margin:10px 10px;padding:10px;">
                            <h3>${e[k].name}</h3>
                            <h3>${e[k].company}</h3>
                            <h3>${e[k].state}</h3>
                            <h3>${e[k].category}</h3>
                            <button id="job-${e[k].id}" class="btn btn-success pop" data-toggle="modal" data-target="#myModal">Read More</button>
                        </div>`                
                    )
                }            
            } 
            // click a button to display a modal box (index.html)
            $(".pop").on('click', e =>{
                e.preventDefault()
                let id = e.target.id.split('job-').join('')
                $.ajax({
                    url: `http://localhost:3000/jobs/${id}`,
                    method: 'get'
                }).done(e =>{
                    $('.mod').html(                    
                        `<h3>${e.name}</h3>
                        <h3>${e.company}</h3>
                        <h3>${e.state}</h3>
                        <h3>${e.category}</h3>
                        <p>${e.des}</p>`
                    )       
                })
            })      
        })
    }   
    //populate top jobs div
    populateTopJobs(categories, states);
})