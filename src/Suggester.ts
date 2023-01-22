'use strict';

import vscode = require('vscode');
import { guessScope, VhdlScopeKind } from './ScopeGuesser';

let kwLibrary = createCompletionKeyword('library');
let kwUse = createCompletionKeyword('use');
let kwPackage = createCompletionKeyword('package');
let kwArchitecture = createCompletionKeyword('architecture');
let kwEntity = createCompletionKeyword('entity');
let kwConfiguration = createCompletionKeyword('configuration');
let kwIs = createCompletionKeyword('is');
let kwBegin = createCompletionKeyword('begin');
let kwEnd = createCompletionKeyword('end');
let kwMap = createCompletionKeyword('map');
let kwOf = createCompletionKeyword('of');
let kwFor = createCompletionKeyword('for');
let kwAll = createCompletionKeyword('all');

let operatorOptions = [
    createCompletionOption('abs'),
    createCompletionOption('and'),
    createCompletionOption('mod'),
    createCompletionOption('nand'),
    createCompletionOption('nor'),
    createCompletionOption('not'),
    createCompletionOption('or'),
    createCompletionOption('rem'),
    createCompletionOption('rol'),
    createCompletionOption('ror'),
    createCompletionOption('sla'),
    createCompletionOption('sll'),
    createCompletionOption('sra'),
    createCompletionOption('srl'),
    createCompletionOption('xnor'),
    createCompletionOption('xor'),
];

let archTypeOptions = [
    createCompletionOption('array'),
    createCompletionOption('type'),
    createCompletionOption('component'),
    createCompletionOption('constant'),
    createCompletionOption('signal'),
    createCompletionOption('subtype'),
    createCompletionOption('variable'),
    createCompletionOption('assert'),
    createCompletionOption('severity'),
    createCompletionOption('report'),
    createCompletionOption('process'),
    createCompletionOption('with'),
    createCompletionOption('select'),
    createCompletionOption('when'),
    createCompletionOption('others'),
    createCompletionOption('block'),
    createCompletionOption('function'),
    createCompletionOption('procedure'),
    createCompletionOption('case'),
    createCompletionOption('else'),
    createCompletionOption('elsif'),
    createCompletionOption('for'),
    createCompletionOption('generate'),
    createCompletionOption('if'),
    createCompletionOption('loop'),
    createCompletionOption('map'),
    createCompletionOption('next'),
    createCompletionOption('others'),
    createCompletionOption('return'),
    createCompletionOption('wait'),
    createCompletionOption('then'),
    createCompletionOption('return'),
    createCompletionOption('when'),
    createCompletionOption('while'),
];

let portTypeOptions = [
    createCompletionOption('in'),
    createCompletionOption('out'),
    createCompletionOption('inout'),
    createCompletionOption('buffer'),
    createCompletionOption('linkage'),
]

let entityOptions = [
    createCompletionOption('generic'),
    createCompletionOption('port'),
];

let libraryOptions = [
    createCompletionOption('ieee'),
];

let ieeePackages = [
    createCompletionOption('std_logic_1164'),
    createCompletionOption('numeric_std'),
    createCompletionOption('std_logic_signed'),
    createCompletionOption('std_logic_unsigned'),
    createCompletionOption('std_logic_arith'),
    createCompletionOption('std_logic_misc'),
];

let scalaTypes = [
    createCompletionKeyword('bit', `The bit data type can only have the value 0 or 1.`),
    createCompletionKeyword('bit_vector', `
The bit_vector data type is the vector version of the bit type consisting of two or more bits. Each bit in a bit_vector can only have the value 0 or 1.`
    ),
    createCompletionKeyword('boolean', `
True or false  
    `),
    createCompletionKeyword('integer', `32-bit	integers.`),
    createCompletionKeyword('natural', `non	negative integer.`),
     createCompletionKeyword('positive', `positive	integer.`),
    createCompletionKeyword('real', `
floating point number. 
    `),
    createCompletionKeyword('time', `
Time in fs,	ps,	ns,	us,	ms,	sec, min, hr  
    `),
    createCompletionKeyword('character', ``),
    createCompletionKeyword('string', `
String for VHDL.  
    `),
    createCompletionOption('downto'),
    createCompletionOption('std_logic'),
];

function createCompletionKeyword(label: string, doc?: string): vscode.CompletionItem {
    let item = new vscode.CompletionItem(label);
    item.kind = vscode.CompletionItemKind.Keyword;
    if (doc) {
        item.documentation = doc;
    }
    return item
}

function createCompletionOption(option: string, doc?: string): vscode.CompletionItem {
    let item = new vscode.CompletionItem(option);
    item.kind = vscode.CompletionItemKind.Value;
    item.documentation = doc;
    return item
}


export class VhdlCompletionItemProvider implements vscode.CompletionItemProvider {

    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) : Thenable<vscode.CompletionItem[]> {
        let VSHDL = vscode.window.createOutputChannel("VSHDL");
        return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
            let lineText = document.lineAt(position.line).text;
            if (lineText.match(/^\s*\-\-/)) { //ignore comments
                return resolve([]);
            }

            if ((lineText.substring(0, position.character).match(/\"/g) || []).length % 2 === 1) { //ignore string
                return resolve([]);
            }

            let suggestions = [];

            let textBeforeCursor = lineText.substring(0, position.character)
            let scope = guessScope(document, position.line);

            switch (scope.kind) {
                case VhdlScopeKind.Vhdl: {
                    
                    if (textBeforeCursor.match(/(library|use)\s*$/)){
                        suggestions.push(...libraryOptions)
                    } else if (textBeforeCursor.match(/ieee\.$/)){
                        suggestions.push(...ieeePackages)
                    } else if (textBeforeCursor.match(/\.$/)){
                        suggestions.push(kwAll)
                    } else if (textBeforeCursor.match(/^n/) == null){
                        suggestions.push(kwArchitecture);
                        suggestions.push(kwBegin);
                        suggestions.push(kwConfiguration);
                        suggestions.push(kwEnd);
                        suggestions.push(kwEntity);
                        suggestions.push(kwIs);
                        suggestions.push(kwPackage);
                        suggestions.push(kwUse);
                        suggestions.push(kwLibrary);
                    }
                    break;
                }
                case VhdlScopeKind.Entity: {
                    if (textBeforeCursor.match(/^\s*\w*/)) {
                        suggestions.push(...entityOptions);
                        suggestions.push(...portTypeOptions);
                        suggestions.push(kwBegin);
                        suggestions.push(kwEnd);
                    } else if (textBeforeCursor.match(/(in|out|inout|buffer|linkage)\s*$/)) {
                        suggestions.push(...scalaTypes);
                    }
                    break;
                } 
                case VhdlScopeKind.Architecture: {
                    if (textBeforeCursor.match(/^\s*\w*$/)) {
                        suggestions.push(...archTypeOptions);
                        suggestions.push(kwBegin);
                        suggestions.push(kwEnd);
                        suggestions.push(kwIs);
                        suggestions.push(kwOf);
                    } else if (textBeforeCursor.match(/(in|out|inout|buffer|linkage)\s*$/)) {
                        suggestions.push(...scalaTypes);
                    } else if (textBeforeCursor.match(/(signal|variable|constant|subtype|type|array)\s*\w*:\s*$/)) {
                        suggestions.push(...scalaTypes);
                    } else if (textBeforeCursor.match(/(<=|:=)\s*\w*\s*$/)) {
                        suggestions.push(...operatorOptions);
                    }
                    break;
                }
                case VhdlScopeKind.Configuration: {
                    suggestions.push(kwFor);
                    break;
                }
            }
            return resolve(suggestions);
        });
    }

}
