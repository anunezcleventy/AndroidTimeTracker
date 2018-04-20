const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const dialog = electron.dialog

app.showExitPrompt = true



let mainWindow


function createWindow(){

	mainWindow = new BrowserWindow({width:1200, height:800});
	mainWindow.maximize();

	mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.webContents.openDevTools();

    mainWindow.on('close', (e) => {
        if (app.showExitPrompt) {
            e.preventDefault() // Prevents the window from closing 
            dialog.showMessageBox({
                type: 'question',
                buttons: ['Yes', 'No'],
                title: 'Confirm',
                message: 'Unsaved data will be lost. Are you sure you want to quit?'
            }, function (response) {
                if (response === 0) { // Runs the following if 'Yes' is clicked
                    app.showExitPrompt = false
                mainWindow.close()
            }
        })
        }

    })

    mainWindow.on('closed', function(){
      mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function(){

	if(process.platform !== 'darwin'){
		app.quit();
	}
});

app.on('activate', function(){
	if(mainWindow === null){
		createWindow();
	}
});
