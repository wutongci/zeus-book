import { ipcMain } from 'electron'
import { books } from './downbook'

export default function () {
  ipcMain.on('download-start', (e, args) => {
    let url = 'response:' + args.url
    // console.log('download start' + url)
    books(url)
    // global.mainWindow.webContents.send('download-success', {
    //   title: 'test'
    // })
    console.log('send download msg')
  })
}
