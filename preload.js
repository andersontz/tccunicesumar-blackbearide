const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  createProject: () => ipcRenderer.invoke('createProject'),
  listFiles: (arg) => ipcRenderer.invoke('listFiles', arg),
  createFile: (arg1, arg2) => ipcRenderer.invoke('createFile', arg1, arg2),
  createFolder: (arg) => ipcRenderer.invoke('createFolder', arg),
})