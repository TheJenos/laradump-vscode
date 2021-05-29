const vscode = require('vscode');
const ejs = require('ejs');

const fs = require('fs')
const cp = require('child_process')


module.exports.LaradumpPanel = class LaradumpPanel {
    /**
     * @param {vscode.ExtensionContext} ctx
     */
    constructor(panel, extensionUri, port, ctx) {
        var _this = this;
        this._disposables = [];
        this._ctx = ctx;
        this._panel = panel;
        this._extensionUri = extensionUri;
        this._panel.webview.html = this.getHtmlForWebview(this._panel.webview, port);
        this._panel.onDidDispose(function () { return _this.dispose(); }, null, this._disposables);
        this._panel.webview.onDidReceiveMessage(function (message) {
            switch (message.command) {
                case 'code':
                    _this.openCode(message.code.codePath, message.code.line)
                    return;
                case 'theme':
                    ctx.globalState.update('theme', message.text);
                    return;
            }
        }, null, this._disposables);
    }

    static createOrShow(context, port) {
        var column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        var panel = vscode.window.createWebviewPanel('laradump', 'Laravel Dumps', column || vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')]
        });
        return new LaradumpPanel(panel, context.extensionUri, port, context);
    }

    dispose(command = false) {
        if (!command) vscode.commands.executeCommand('laradump.stopServer');
        this._panel.dispose();
        while (this._disposables.length) {
            var x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    async openCode(path, line) {
        var setting = vscode.Uri.parse(path);
        vscode.workspace.openTextDocument(setting).then((a) => {
            vscode.window.showTextDocument(a, 1, false).then(editor => {
                let range = editor.document.lineAt(line - 1).range;
                editor.selection = new vscode.Selection(range.start, range.end);
                editor.revealRange(range);
            });
        }, (error) => {
            console.error(error);
        });
    }

    getNonce() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    getMediaFile(webview, filename) {
        var tailwindPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', filename);
        return webview.asWebviewUri(tailwindPathOnDisk);
    }

    getHtmlForWebview(webview, port) {
        var tailwindtUri = this.getMediaFile(webview, 'tailwind.css');
        var scriptUri = this.getMediaFile(webview, 'main.js');
        var stylesResetUri = this.getMediaFile(webview, 'reset.css');
        var stylesMainUri = this.getMediaFile(webview, 'vscode.css');
        var logo = this.getMediaFile(webview, 'logo.png');
        var nonce = this.getNonce();
        const filePath = vscode.Uri.file(vscode.Uri.joinPath(this._extensionUri, 'src', 'pages', 'index.html').path);
        return ejs.render(fs.readFileSync(filePath.fsPath, 'utf8'), {
            nonce, stylesResetUri, stylesMainUri, scriptUri, tailwindtUri, port, logo, theme: this._ctx.globalState.get('theme') || 'dark'
        });
    }
}