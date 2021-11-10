const electron = require('electron');
const User = require('./Model/User');
const axios = require('axios');
const FormData = require('form-data');
const Automate = require('./Backend/Automate');
const {machineIdSync} = require('node-machine-id');
const updater = require('./updater');
const browser = new Automate;
browser.init();

let id = machineIdSync({original: true})
const { app, BrowserWindow } = electron;
const { ipcMain } = electron;
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        icon: __dirname+'/Frontend/assets/img/favicon.ico',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
        show: false,
        backgroundColor: '#312450',
    });
    mainWindow.loadURL(`file://${__dirname}/Frontend/login.html`);
    
    mainWindow.once('ready-to-show', () => {
        mainWindow.maximize();
        mainWindow.show()
    })

    setTimeout(() => {
        updater.check(mainWindow)
    }, 2000);
});


/* Re-usable routes */
ipcMain.on('bot:login', async (event, data) => {
    var formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    // formData.append("bot-id", '1');
    // formData.append("machine_id", id);
    var response = await axios.post("http://portal.bxtrack.com/api/verify", formData, {
        headers: formData.getHeaders()
    });
    console.log(response.data)

    if(response.data != false){
        global.user = {id: response.data};
        mainWindow.loadURL(`file://${__dirname}/Frontend/index.html`)
        // mainWindow.webContents.send('login:success', res[0]);
    }else{
        mainWindow.webContents.send('login:response', 'Wrong credentials or software expired.')
    }
});

/* End re-use route */