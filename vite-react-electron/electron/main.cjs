

const { app, BrowserWindow,dialog, EventSource, ipcMain } = require("electron")
const sudo = require('sudo-prompt');
const fs = require('fs');
const socket = require('socket.io-client')('http://localhost:5000');
const SERVER_URL = 'https://sprint-391123-vtxnqdaumq-uc.a.run.app/'
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1500,
        height: 1200,
    })

    win.loadURL("http://localhost:3000")
    //win.loadFile(path.join(app.getAppPath(), "dist/index.html"))
}
async function promptForSudoPassword() {
    try {
        // Send a request to the FastAPI endpoint
        try {
            // Use Electron's dialog module to prompt the user for the password
            
            var options = {
            name: 'Electron',
            };
            const command = 'python install.py';
            sudo.exec(command, options,
            function(error, stdout, stderr) {
                if (error) throw error;
                console.log('stdout: ' + stdout);
            }
            );
            /*
            const result = await axios.post('http://localhost:8000/execute_sudo_command', {
                password,
                command
              });
            console.log(result);
            */
          } catch (error) {
            console.error(error);
          }
    } catch (error) {
        console.error(error);
    }
}

function saveJsonToFile(data, filePath) {
    const jsonData = JSON.stringify(data, null, 2); // Convert JSON data to formatted string
    fs.writeFileSync(filePath, jsonData);
  }

async function runPlaybook(event) {
    const data = JSON.parse(event);
    saveJsonToFile(data, '/playbooks/payload.json');

    const command = `ansible-playbook /playbooks/playbook.yaml`;
    console.log(data)
    
    post
  }


app.whenReady().then(async () => {
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length() === 0) createWindow()
        
    })
    await promptForSudoPassword()
    const id = '64d4334bff13464da868f3c4'
    socket.emit('join', { room: id }); // Join a room
    /*
    try {
        const eventSource = await new EventSource(`${SERVER_URL}/sse/${id}`);
        // Listen to events from the event source
        eventSource.onmessage() = async (e) => {await runPlaybook(e);}
    } catch(err) {
        return err;
    }
    */
    socket.on('electron_event', async (data) => {
       await runPlaybook(data);
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