const { app, BrowserWindow, globalShortcut, Tray, Menu, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let tray;
let isQuiting = false;

function createWindow() {
  app.commandLine.appendSwitch('ignore-gpu-blacklist');
  app.commandLine.appendSwitch('enable-gpu-rasterization');
  app.commandLine.appendSwitch('enable-zero-copy');
  app.commandLine.appendSwitch('disable-features', 'MediaSessionService');  // <--- disable media session

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#181818',
    titleBarStyle: 'customButtonsOnHover',
    vibrancy: 'dark',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  mainWindow.loadURL('https://music.youtube.com/');

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('close', (e) => {
    if (!isQuiting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });
}

function createTray() {
  tray = new Tray(path.join(__dirname, 'icon.png'));

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Play/Pause', click: () => mainWindow.webContents.send('media-play-pause') },
    { label: 'Next', click: () => mainWindow.webContents.send('media-next') },
    { label: 'Previous', click: () => mainWindow.webContents.send('media-previous') },
    { type: 'separator' },
    {
      label: 'Back',
      click: () => {
        const nav = mainWindow.webContents.navigationHistory;
        if (nav.canGoBack) nav.goBack();
      }
    },
    { label: 'Show App', click: () => mainWindow.show() },
    {
      label: 'Quit',
      click: () => {
        isQuiting = true;
        if (mainWindow) {
          mainWindow.destroy();
        }
        app.exit(0);
      }
    }
  ]);

  tray.setToolTip('YTM-Wrapper');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => mainWindow.show());
}

function registerMediaKeys() {
  globalShortcut.register('MediaPlayPause', () => mainWindow.webContents.send('media-play-pause'));
  globalShortcut.register('MediaNextTrack', () => mainWindow.webContents.send('media-next'));
  globalShortcut.register('MediaPreviousTrack', () => mainWindow.webContents.send('media-previous'));
}

function registerBackShortcut() {
  globalShortcut.register('CommandOrControl+Left', () => {
    const nav = mainWindow.webContents.navigationHistory;
    if (nav.canGoBack) nav.goBack();
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
  registerMediaKeys();
  registerBackShortcut();

  ipcMain.on('go-back', () => {
    const nav = mainWindow.webContents.navigationHistory;
    if (nav.canGoBack) nav.goBack();
  });
});

app.on('before-quit', () => {
  isQuiting = true;
  if (mainWindow) {
    mainWindow.destroy();
  }
});

app.on('activate', () => {
  if (mainWindow) mainWindow.show();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
