'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require("vscode");
var VhdlSuggest_1 = require("./VhdlSuggest");
var VHDL_MODE = {
    language: 'vhdl',
    scheme: 'file'
};
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(ctx) {
    //console.log('Congratulations, your extension "awesome-vhdl" is now active!');
    ctx.subscriptions.push(vscode.languages.registerCompletionItemProvider(VHDL_MODE, new VhdlSuggest_1.VhdlCompletionItemProvider(), '.', '\"'));
    vscode.languages.setLanguageConfiguration(VHDL_MODE.language, {
        indentationRules: {
            // ^(.*\*/)?\s*\}.*$
            decreaseIndentPattern: /^end\s+\w*$/,
            // ^.*\{[^}'']*$
            increaseIndentPattern: /^.*(begin|then|loop|is)$/
        },
        wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
        comments: {
            lineComment: '--',
        },
        brackets: [
            ['(', ')'],
        ],
        __electricCharacterSupport: {
            brackets: [
                { tokenType: 'delimiter.curly.ts', open: '{', close: '}', isElectric: true },
                { tokenType: 'delimiter.square.ts', open: '[', close: ']', isElectric: true },
                { tokenType: 'delimiter.paren.ts', open: '(', close: ')', isElectric: true }
            ]
        },
        __characterPairSupport: {
            autoClosingPairs: [
                { open: '(', close: ')' },
                { open: '`', close: '`', notIn: ['string'] },
                { open: '"', close: '"', notIn: ['string'] },
            ]
        }
    });
    if (vscode.window.activeTextEditor) {
    }
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=vhdlMain.js.map