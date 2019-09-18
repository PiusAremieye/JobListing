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
                <td>${e[i].dept}</td>
                <td>${e[i].des}</td>
                <td><button id="del-${e[i].id}" type="button" class="btn btn-danger delete-btn">Delete</button></td>
                <td><button id="edit-${e[i].id}" type="button" class="btn btn-danger">Edit</button></td>
            </tr>`
        )
    }
    $(".delete-btn").on('click', e =>{
        e.preventDefault()
        let id = e.target.id.split('del-').join('')
        $.ajax({
            url: `http://localhost:3000/jobs/${id}`,
            method: 'delete'
        }).done(e =>{
            window.location = 'http://localhost:3000/admin.html'
        })
    })
})
$('#form').submit(e =>{
    e.preventDefault();
    let name = $('#name').val()
    let company = $('#cname').val()
    let state = $('#state').val()
    let dept = $('#dept').val()
    let des = $('#des').val()

    $.ajax({
        url: 'http://localhost:3000/jobs',
        method: 'post',
        data: {
            name,company,state,dept,des
        }
    }).done(e =>{
        $('#tbody').append(
            `<tr>
                <td>${e.id}</td>
                <td>${e.name}</td>
                <td>${e.company}</td> 
                <td>${e.state}</td>   
                <td>${e.dept}</td>
                <td>${e.des}</td>
                <td><button id="del-${e.id}" type="button" class="btn btn-danger delete-btn">Delete</button></td>
                <td><button id="edit-${e.id}" type="button" class="btn btn-danger">Edit</button></td>
            </tr>`
        )
        $(".delete-btn").on('click', e =>{
            e.preventDefault()
            let id = e.target.id.split('del-').join('')
            $.ajax({
                url: `http://localhost:3000/jobs/${id}`,
                method: 'delete'
            }).done(e =>{
                window.location = 'http://localhost:3000/admin.html'
            })
        })
        $('#name').val('')
        $('#cname').val('')
        $('#state').val('')
        $('#dept').val('')
        $('#des').val('')
    })
})
$(document).ready(function(){
    $.ajax({
        url: 'http://localhost:3000/states',
        method: 'get',
    }).done(e => {
        for(let i = 0; i < e.length; i++){
            $('#states').append(
                `<option>${e[i].name}</option>`
            )
        }
    })
})
$(document).ready(function(){
    $.ajax({
        url: 'http://localhost:3000/jobs',
        method: 'get',
    }).done(e => {
        for(let k = 0; k < e.length; k++){
            $('#display').append(
                `<div style="box-shadow:5px 5px grey;margin:10px;">
                    <h3>${e[k].name}</h3>
                    <h3>${e[k].company}</h3>
                    <h3>${e[k].state}</h3>
                    <h3>${e[k].dept}</h3>
                    <button id="job-${e[k].id}" class="btn btn-success pop" data-toggle="modal" data-target="#myModal">Read More</button>
                </div></a>`                
            )            
        }
        $(".pop").on('click', e =>{
            alert("")
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
                    <h3>${e.dept}</h3>
                    <p>${e.des}</p>`
                )                   
            })
        })
    })
})
