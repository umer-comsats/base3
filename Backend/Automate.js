const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core");
const {BrowserWindow, app} = require("electron");

class Automate {
    async init() {
        await pie.initialize(app);
    }

    async openBrowser(url){
        const browser = await pie.connect(app, puppeteer);
        this.window = new BrowserWindow();
        this.window.maximize();
        this.window.setAppDetails({
            appId: "separateWindow"
        });
        const ses = this.window.webContents.session;
        ses.clearStorageData();
        await this.window.loadURL(url);

        this.page = await pie.getPage(browser, this.window);
    }

    delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
    }


}

module.exports = Automate;