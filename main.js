const { app, Tray, Menu, BrowserWindow } = require('electron/main')
const path = require('node:path')

const electronReload = require('electron-reload');
electronReload(__dirname);

let win; 
let tray; 
function createWindow () {
  win = new BrowserWindow({
    width: 500,
    height: 500,
    autoHideMenuBar: true,
    resizable: false,
    transparent: true,
    frame: false,
    minWidth: 300,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
    },
    alwaysOnTop: true,
  })

  win.loadFile('index.html')
  
  win.on('minimize', function (event) {
    event.preventDefault();
    win.hide();
  });

  win.on('close', function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      win.hide();
    }

    return false;
  });

  createTray();
}

function createTray() {
  tray = new Tray(path.join(__dirname, 'icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        win.show();
      }
    },
    {
      label: 'Quit', click: function () {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('My Electron App');
  tray.setContextMenu(contextMenu);

  tray.on('click', function () {
    win.show();
  });
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})