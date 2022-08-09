/* eslint-disable prettier/prettier */
import {
  app,
  BrowserWindow,
  Tray,
  Menu,
  Notification,
  nativeImage,
} from 'electron'
import path from 'path'

const appIcon = path.dirname(__dirname) + '/src/assets/icon.png'

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Labs - Life.Vet',
    icon: appIcon,
  })
  win.loadURL('http://labs.staging.life.vet.br')
}

function notify() {
  const notification = new Notification({
    title: 'Life.Vet',
    subtitle: 'Uma nova notificação para você',
    body: 'Olá, seja bem-vindo ao Life.Vet',
    icon: appIcon,
  })
  notification.show()
}

let tray

app.whenReady().then(() => {
  createWindow()
  notify()

  const icon = nativeImage.createFromPath(appIcon)
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Abrir', type: 'normal', click: createWindow },
    {
      label: 'Nova solicitação', type: 'normal', click: () => {
      console.log('Nova solicitação')
    } },
    {
      label: 'Buscar',
      type: 'submenu',
      submenu: [
        {
          label: 'Solicitação', type: 'normal', click: () => {
          console.log('Solicitação')
        } },
        {
          label: 'Animal', type: 'normal', click: () => {
          console.log('Animal')
        } },
        {
          label: 'Cliente', type: 'normal', click: () => {
          console.log('Cliente')
        } },
      ],
    },
    { label: 'Sair', type: 'normal', click: app.quit },
  ])
  tray.setContextMenu(contextMenu)
  tray.setToolTip('Life.Vet - Labs')
  tray.setTitle('Life.Vet')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
