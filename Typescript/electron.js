const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'src/electron/preload.js'),
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	if (process.env.NODE_ENV === 'development') {
		mainWindow.loadURL('http://localhost:5174');
	} else {
		mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
	}
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});