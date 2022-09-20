const { app, BrowserWindow } = require('electron');
const path = require("path");
const { ipcMain } = require('electron')
const { dialog } = require('electron')
const dirTree = require("directory-tree");
var fs = require('fs');

var mainWindow = null;
async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 980,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
  });

 // mainWindow.webContents.openDevTools();

  function readDir(path) {
    const tree = dirTree(path);
    return tree;
  }

  // create new project 
  ipcMain.handle('createProject', async () => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
    return result;
  });

  // list files on folder
  ipcMain.handle('listFiles', async (event, arg) => {
    const result = readDir(arg)
    return result;
  });

  // create files on folder
  ipcMain.handle('createFile', async (event, arg, arg2) => {
    fs.writeFile(arg, arg2, (err) => {
    });
    return true;
  });

  // create folder
  ipcMain.handle('createFolder', async (event, arg) => {
    fs.mkdir("C:/ProjetoTeste/php", arg, (err) => {
    });
    return true;
  });

  await mainWindow.loadFile('index.html')

}

app.whenReady().then(createWindow);

app.on('activate', () => {

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/* const { app, BrowserWindow } = require("electron");
let mainWindow;


app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minHeight: 600,
    minWidth: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  function salvar() {
      var file;
      mainWindow.webContents.send('set-file', file)
  }

  //const { dialog } = require('electron')
  //console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  salvar();


});
*/

