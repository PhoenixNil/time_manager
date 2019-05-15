// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const ipcMain = require('electron').ipcMain
const electron = require('electron')
const Menu = electron.Menu
const exec = require('child_process').exec
const fs = require('fs')
const execFile = require('child_process').execFile;
const readline = require('readline');
const path = require('path')
const { host, user, password, database } = require('../config');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let SetWindow
var K, flag = 0;
process.env
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900, height: 690, frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  SetWindow = new BrowserWindow({
    width: 900, height: 790, webPreferences: {
      nodeIntegration: true
    }, resizable: false
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  SetWindow.loadFile('SetWindow.html')
  SetWindow.hide()
  Menu.setApplicationMenu(null)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    app.quit()
  })
  SetWindow.on('closed', function () {
    exec('close.bat')
    app.quit();
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})
ipcMain.on('window-all-closed', () => {
  mainWindow.close();
});
ipcMain.on('hide-window', () => {
  mainWindow.minimize();
});
ipcMain.on('two-show', function () {
  mainWindow.hide();
  SetWindow.show();
})
ipcMain.on('BackSet', function () {
  SetWindow.loadFile('SetWindow.html')
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// 监听渲染进程发送的消息
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: host,//远程MySQL数据库的ip地址,你需要自己建立一个config.json文件
  user: user,
  password: password,
  database: database
})
connection.connect(function (err) {
  if (err) {
    throw err;
  }
  else {
    console.log('Connected');
    console.log(host)
    console.log(password)
  }
});
ipcMain.on('create', (event, arg1, arg2) => {
  var addSql = 'INSERT INTO user_information(user,password) VALUES(?,?)';
  var addSqlParams = [arg1, arg2];
  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      event.sender.send('error');
      console.log('[INSERT ERROR] - ', err.message);

      return;
    }
    // console.log('--------------------------INSERT----------------------------');
    //console.log('INSERT ID:',result.insertId);    
    event.sender.send('OK');
    console.log('INSERT ID:', result);

    // console.log('-----------------------------------------------------------------\n\n');
  });
})
ipcMain.on('find', (event, arg1, arg2) => {
  var sql = 'select * from user_information WHERE user=?AND password=?';
  connection.query(sql, [arg1, arg2], function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    if (!result.length) {
      console.log("password error");
      event.sender.send('fail')
      return;
    }
    K = arg1;
    flag = 1;
    console.log('--------------------------SELECT----------------------------');
    console.log(result[0]);
    var temp = JSON.stringify(result)
    var temp = JSON.parse(temp)
    console.log(temp);
    event.sender.send('success', temp[0].count);
    console.log('------------------------------------------------------------\n\n');
  });
})
ipcMain.on('achieve', function () {
  if (flag == 0)
    return;
  else {
    var modSql = 'UPDATE user_information SET count = count+1  WHERE user = ?';
    var modSqlParams = K;
    connection.query(modSql, modSqlParams, function (err, result) {
      if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
      }
      console.log('--------------------------UPDATE----------------------------');
      console.log('UPDATE affectedRows', result.affectedRows);
      console.log('-----------------------------------------------------------------\n\n');
    });
  }
}
)
ipcMain.on('exeDisable', (event, arg) => {
  fs.writeFile(path.join(__dirname, '../other/temp.txt'), arg, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log("success")
  })
  execFile(path.join(__dirname, '../other/my.bat'), (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
})
process.on('uncaughtException', function (err) {
  console.log(err.stack);
  console.log('NOT exit...');
});
console.log(require.resolve('electron'))