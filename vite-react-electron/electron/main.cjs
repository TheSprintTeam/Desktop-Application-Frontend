

const { app, BrowserWindow, EventSource, ipcMain } = require("electron")
const sudoPrompt = require('sudo-prompt');
const fs = require('fs');
const SERVER_URL = 'https://sprint-391123-vtxnqdaumq-uc.a.run.app/'
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1500,
        height: 1200,
        icon: path.join(app.getAppPath(), "public/sprint_logo.ico")
    })

    win.loadURL("http://localhost:3000")
    //win.loadFile(path.join(app.getAppPath(), "dist/index.html"))
}


function saveJsonToFile(data, filePath) {
    const jsonData = JSON.stringify(data, null, 2); // Convert JSON data to formatted string
    fs.writeFileSync(filePath, jsonData);
  }

async function runPlaybook(event) {
    const data = JSON.parse(event.data);
    saveJsonToFile(data, '/playbooks/payload.json');

    const command = `ansible-playbook /playbooks/playbook.yaml`;
    console.log(data)

    await sudoPrompt.exec(command, { name: 'Sprint' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Playbook error: ${error}`);
            // Update UI with error messages
          } else {
            console.log(`Playbook output: ${stdout}`);
            // Update UI with data from stdout
          }
          
    });
  }


app.whenReady().then(async () => {
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length() === 0) createWindow()
    })
    const id = '64d4334bff13464da868f3c4'
    try {
        const eventSource = await new EventSource(`${SERVER_URL}/sse/${id}`);
        // Listen to events from the event source
        eventSource.onmessage() = async (e) => {await runPlaybook(e);}
    } catch(err) {
        return err;
    }
    
    win.on('closed', () => {
        eventSource.close(); // Close the SSE connection when the app window is closed
    });
    
})

/*ipcMain.on('login-success', (event, clientId) => {
    // Create an event source instance for the user
    const eventSource = new EventSource(`${SERVER_URL}/sse/${clientId}`);
    // Listen to events from the event source
    eventSource.onmessage() = async (e)=>{
        try{
            await runPlaybook(e)
        }catch(err){
            return err
        }
    }
    // Store the event source instance
    userEventSources[clientId] = eventSource;

  });
// Handle user logout
ipcMain.on('user-logout', (event, clientId) => {
    if (userEventSources[clientId]) {
      userEventSources[clientId].close();
      delete userEventSources[clientId];
    }
  });
*/
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})