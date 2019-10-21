'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, window, commands, Selection } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    let disposable = commands.registerCommand('indent-line.indentLine', indentLine);
    context.subscriptions.push(disposable);

    disposable = commands.registerCommand('indent-line.indentLineNextLine', indentLine.bind(null, false));
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function indentLine(stayOnLine = true) {
    const activeEditor = window.activeTextEditor;
    commands.executeCommand("cursorUp")
    .then(() => { return commands.executeCommand("expandLineSelection"); })
    .then(() => { return commands.executeCommand("expandLineSelection"); })
    .then(() => { return commands.executeCommand("editor.action.formatSelection"); })
    .then(() => {
        activeEditor.selection = new Selection(activeEditor.selection.end, activeEditor.selection.end);
            if (stayOnLine) {
                commands.executeCommand("cursorUp");
            }
        }
    );
}
