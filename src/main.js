const { app, BrowserWindow, ipcMain } = require('electron');
const { extractProjectCode } = require('./extractor');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    win.loadFile('src/index.html');
}

app.whenReady().then(() => {
    createWindow();

    ipcMain.handle('extract-project-code', async (event, projectPath) => {
        const outputFilePath = path.join(projectPath, 'project_code.txt');
        await extractProjectCode(projectPath, outputFilePath, (message) => {
            win.webContents.send('log-message', message);
        });
        return outputFilePath;
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
