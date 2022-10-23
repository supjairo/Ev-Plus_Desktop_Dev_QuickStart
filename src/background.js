'use strict'

import {app, protocol, BrowserWindow, Menu} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'
import {Tray} from 'electron'

const isDevelopment = process.env.NODE_ENV !== 'production'
let tray = null
app.whenReady().then(() => {
    tray = new Tray(isDevelopment ? './public/icon.png' : __dirname + '/icon.png')
    let trayMenuTemplate = [
        {
            label: '退出',
            click: function () {
                app.quit();
            }
        }];
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
    tray.setToolTip('正在后台运行')
    tray.setContextMenu(contextMenu)

})

protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

async function createWindow() {
    let iconPath = isDevelopment ? './public/icon.png' : __dirname + '/icon.png'

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: (iconPath),
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            enableRemoteModule: true,
        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        win.loadURL('app://./index.html')
    }
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS3_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }

    createWindow()
})

if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
