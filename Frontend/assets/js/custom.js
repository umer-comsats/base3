/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 * 
 */

"use strict";

//login page
const electron = require('electron');
const { ipcRenderer } = electron;

$("#login").click((e) => {
    e.preventDefault();
    console.log("G")
    var email = $("#email").val();
    var password = $("#password").val();
    
    
    if(email && password){
        
        $("#login").attr("disabled", "disabled");
        $("#login").append('  <div class="spinner-grow spinner-grow-sm"></div>')
        ipcRenderer.send("bot:login", {email, password});
    }else{
        var response = $('<div></div>').addClass("alert alert-danger mt-3").attr('role', 'alert');
        response.text("Enter email and password");
        response.insertAfter('button');
    }
})

ipcRenderer.on('login:response', (event, data) => {
    var response = $('<div></div>').addClass("alert alert-danger mt-3").attr('role', 'alert');
    response.text(data);
    response.insertAfter('button');
    
    $("#login").removeAttr("disabled");
    $(".spinner-grow").remove();
    $('#password').val('')
});

//update related
$("#update-message").hide();

ipcRenderer.on('update-message', (e, d) => {
    $("#update-message").show();
    let bar = $("#bar")
    bar.attr('data-width', `${d}%`);
    bar.attr('aria-valuenow', `${d}`);
    bar.attr('style', `width: ${d}%;`);
})
