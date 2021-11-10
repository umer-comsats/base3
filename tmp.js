const { app, BrowserWindow } = require('electron')

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 400,
        height: 200
    })

    //use bytenode to convert js files to jsc
    const bytenode = require("bytenode");
    let compiledFilename = bytenode.compileFile({
        filename: './Backend/Automate.js',
        output: './Backend/Automate.jsc'
    });
    let compiledFilename2 = bytenode.compileFile({
        filename: './index.js',
        output: './index.jsc'
    });
    //convert other Node.js files as required
}

app.whenReady().then(() => {
    createWindow()
})