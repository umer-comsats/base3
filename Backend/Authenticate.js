
const axios = require('axios');
const FormData = require('form-data');

async function authenticate(data) {
    var formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    var response = await axios.post("http://portal.bxtrack.com/api/verify", formData, {
        headers: formData.getHeaders()
    });
    console.log(response.data)

    if(response.data != false){
        return false;
    }else{
        return true;
    }
}

module.exports = authenticate;