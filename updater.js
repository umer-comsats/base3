const { autoUpdater } = require('electron-updater');
const {dialog} = require('electron')
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.autoDownload = false;

exports.check = (mainWindow) => {

    autoUpdater.checkForUpdates();

    autoUpdater.on('update-not-available', (info) => {
        mainWindow.webContents.send('update-message', 'Update not available');
    })

    autoUpdater.on('update-available', () => {
        let downloadProgress = 0;

        dialog.showMessageBox({
            type: 'info',
            title: 'Update Available',
            message: 'Do you want to download new version?',
            buttons: ['Update', 'Cancel']
        }).then((result)=> {
            if(result.response !== 0) return;

            autoUpdater.downloadUpdate();

            autoUpdater.on('download-progress', (d) => {
                downloadProgress = d.percent;
                mainWindow.webContents.send('update-message', downloadProgress);

                log.info(downloadProgress)
            })
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
    });

}