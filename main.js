const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height:800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('signup.html');
}

app.whenReady().then(createWindow);

