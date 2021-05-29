const {Disposable,StatusBarAlignment,window} = require('vscode');
const {LiveServer} = require('laradump-server');

module.exports.StatusBar = class StatusBar extends Disposable {
    constructor() {
        super(() => this.item.dispose());
        this.item = window.createStatusBarItem(StatusBarAlignment.Right,10)
        this.serverOn();
    }

    serverOff() {
        this.item.command = 'laradump.stopServer'
        this.item.text = '$(debug) Stop Laradump'
        this.item.show();
    }

    serverOn() {
        this.item.command = 'laradump.startServer'
        this.item.text = '$(bug) Start Laradump'
        this.item.show();
    }
}

module.exports.LiveServer = class LiveServerHandler extends Disposable {
    constructor() {
        super(() => this.server.stopServer());
        this.server = new LiveServer();
    }

    getPort() {
        return this.server.port;
    }

    serverOff() {
        this.server.stopServer()
    }

    serverOn() {
        this.server.startServer();
    }
}