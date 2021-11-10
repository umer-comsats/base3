const { ipcRenderer } = require('electron');

$('form').on('submit', (e) => {
    e.preventDefault();
    if( $('.alert-danger').length ){
        $('.alert-danger').remove();
    }
    const email = $('input[type="email"]').val();
    const password = $('input[type="password"]').val();

    ipcRenderer.send('user:set-authenticate', { email: email, password: password });
    $("form button").append('  <div class="spinner-grow spinner-grow-sm"></div>')
    $("form button").attr('disabled', 'disabled')

});

ipcRenderer.on('user:get-authenticate', (event, data) => {
    var response = $('<div></div>').addClass("alert alert-danger mt-3").attr('role', 'alert');
    response.text(data.message);
    response.insertAfter('form button');
    
    $("form button").removeAttr("disabled");
    $(".spinner-grow").remove();
    $('input[type="password"]').val('')
});

$('input[type="email"]').focus(() => {
    if( $('.alert-danger').length ){
        $('.alert-danger').remove();
    }
})

$('input[type="password"]').focus(() => {
    if( $('.alert-danger').length ){
        $('.alert-danger').remove();
    }
})