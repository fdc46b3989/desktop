"use strict";

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var Menu = require('menu');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var willAppQuit = false;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// For win32, auto-hide menu bar.
app.on('browser-window-created', function(event, window){
  if(process.platform === 'win32'){
    window.setAutoHideMenuBar(true);
    window.setMenuBarVisibility(false);
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the DevTools.
  // mainWindow.openDevTools();

  mainWindow.on('close', function(event){
    // Minimize the window for close button.
    if(process.platform==='win32'){
      if(!willAppQuit){ // for Ctrl+Q
        event.preventDefault();
        mainWindow.minimize();
      }
    }
  });

  if(process.platform==='win32'){
    var menu = Menu.buildFromTemplate([
      {
        label: 'Menu',
        submenu: [
          {
            label: 'Settings',
            click: function(item, focusedWindow){
              mainWindow.loadUrl(__dirname + '/settings.html');
            }
          },
          {
            label: 'Quit',
            accelerator: 'Ctrl + Q',
            click: function(item, focusedWindow){
              willAppQuit = true;
              app.quit();
            }
          }
        ]
      }
    ]);
    Menu.setApplicationMenu(menu);
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
