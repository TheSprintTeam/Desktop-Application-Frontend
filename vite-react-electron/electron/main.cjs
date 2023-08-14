const { app, BrowserWindow } = require("electron")
const path = require("path")

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1500,
        height: 1200,
        icon: path.join(app.getAppPath(), "public/sprint_logo.ico")
    })

    win.loadURL("http://localhost:3000")
    //win.loadFile(path.join(app.getAppPath(), "dist/index.html"))
}

app.whenReady().then(() => {
    createWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length() === 0) createWindow()
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})