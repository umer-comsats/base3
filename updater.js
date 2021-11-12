const { autoUpdater } = require('electron-updater');
const {dialog} = require('electron')
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';


exports.check = (mainWindow) => {

    autoUpdater.autoDownload = false;
    
    autoUpdater.checkForUpdates();


    autoUpdater.on('update-available', (info) => {

        dialog.showMessageBox({
            type: 'info',
            title: 'Update Available',
            message: 'Do you want to download update?',
            buttons: ['Download', 'Cancel']
        }).then((result)=> {
            if(result.response !== 0) return;

            autoUpdater.downloadUpdate(); 
        })

    })
    
    autoUpdater.on('download-progress', (d) => {
        downloadProgress = d.percent;
        mainWindow.webContents.send('update-message', Math.ceil(downloadProgress));

        log.info(downloadProgress)
    })


    autoUpdater.on('update-downloaded', (info) => {

        dialog.showMessageBox({
            type: 'info',
            title: 'Update Downloaded',
            message: 'Do you want to install update?',
            buttons: ['Install', 'Cancel']
        }).then((result)=> {
            if(result.response !== 0) return;

            autoUpdater.quitAndInstall();  
        })

    })

}