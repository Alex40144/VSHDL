'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as config from './config'
import * as Formatter from './Formatter/Formatter'

function getRange(document: vscode.TextDocument) {
	var start = new vscode.Position(0, 0);
	var lastLine = document.lineCount - 1;
	var end = new vscode.Position(lastLine, document.lineAt(lastLine).text.length);
	return new vscode.Range(start, end);
}

export function activate(ctx: vscode.ExtensionContext): void {
    vscode.languages.registerDocumentFormattingEditProvider('vhdl', {
        provideDocumentFormattingEdits(document: vscode.TextDocument, options: vscode.FormattingOptions): vscode.TextEdit[] {
			var range = getRange(document)
			var content = document.getText(range)
			var result: vscode.TextEdit[] = []
			var settings = config.getConfig(options)
			var formatted = Formatter.format(content, settings)
			if(formatted){
				result.push(new vscode.TextEdit(range, formatted))
			}
			return result;
        }
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}