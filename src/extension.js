// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const {StatusBar,LiveServer} = require('./handlers');
const {LaradumpPanel} = require('./laradumppanel');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */


var statusbar;
var server;
var panel;
async function activate(context) {
	if((await vscode.workspace.findFiles('**/artisan')).length < 1) return
	
	statusbar = new StatusBar();
	server = new LiveServer();

	console.log('Laradump activated');

	let startServerDisposable = vscode.commands.registerCommand('laradump.startServer', function () {
		vscode.window.showInformationMessage('Laradump server started');
		statusbar.serverOff();
		server.serverOn();
		panel = LaradumpPanel.createOrShow(context,server.getPort())
	});

	let stopServerDisposable = vscode.commands.registerCommand('laradump.stopServer', function () {
		vscode.window.showInformationMessage('Laradump server stoped');
		statusbar.serverOn();
		server.serverOff();
		panel.dispose(true)
	});

	context.subscriptions.push(startServerDisposable);
	context.subscriptions.push(stopServerDisposable);
	context.subscriptions.push(server);
	context.subscriptions.push(statusbar);
}

// this method is called when your extension is deactivated
function deactivate() {

}

module.exports = {
	activate,
	deactivate
}
