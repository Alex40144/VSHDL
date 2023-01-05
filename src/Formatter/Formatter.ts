let isTesting = false;
const ILEscape = "@@";
const ILCommentPrefix = ILEscape + "comments";
const ILIndentedReturnPrefix = ILEscape;
const ILQuote = "⨵";
const ILSingleQuote = "⦼";
const ILBackslash = "⨸";
const ILSemicolon = "⨴";

enum FormatMode {
    Default,
    EndsWithSemicolon,
    CaseWhen,
    IfElse,
    PortGeneric,
}

let Mode: FormatMode = FormatMode.Default;

export class NewLineSettings {
    newLineAfter: Array<string>;
    noNewLineAfter: Array<string>;
    constructor() {
        this.newLineAfter = [];
        this.noNewLineAfter = [];
    }

    newLineAfterPush(keyword: string) {
        this.newLineAfter.push(keyword);
    }

    noNewLineAfterPush(keyword: string) {
        this.noNewLineAfter.push(keyword);
    }

    push(keyword: string, addNewLine: string) {
        let str = addNewLine.toLowerCase();
        if (str == "none") {
            return;
        }
        else if (!str.startsWith("no")) {
            this.newLineAfterPush(keyword);
        }
        else {
            this.noNewLineAfterPush(keyword);
        }
    }
}


function ToLowerCases(arr: Array<string>) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].toLowerCase();
    }
}

function ToUpperCases(arr: Array<string>) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].toUpperCase();
    }
}

function ToCamelCases(arr: Array<string>) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0) + arr[i].slice(1).toLowerCase();
    }
}


export class signAlignSettings {
    isRegional: boolean;
    isAll: boolean;
    mode: string;
    keyWords: Array<string>;
    constructor(isRegional: boolean, isAll: boolean, mode: string, keyWords: Array<string>) {
        this.isRegional = isRegional;
        this.isAll = isAll;
        this.mode = mode;
        this.keyWords = keyWords;
    }
}

export class settings {
    RemoveComments: boolean;
    RemoveAsserts: boolean;
    CheckAlias: boolean;
    SignAlignSettings: signAlignSettings;
    KeywordCase: string;
    TypeNameCase: string;
    Indentation: string;
    NewLineSettings: NewLineSettings;
    EndOfLine: string;
    AddNewLine: boolean;
    constructor(removeComments: boolean, removeReport: boolean, checkAlias: boolean,
        signAlignSettings: signAlignSettings, keywordCase: string, typeNameCase: string, indentation: string,
        newLineSettings: NewLineSettings, endOfLine: string, addNewLine: boolean) {
        this.RemoveComments = removeComments;
        this.RemoveAsserts = removeReport;
        this.CheckAlias = checkAlias;
        this.SignAlignSettings = signAlignSettings;
        this.KeywordCase = keywordCase;
        this.TypeNameCase = typeNameCase;
        this.Indentation = indentation;
        this.NewLineSettings = newLineSettings;
        this.EndOfLine = endOfLine;
        this.AddNewLine = addNewLine;
    }
}

let KeyWords: Array<string> = ["abs", "access", "after", "alias", "all", "and", "architecture", "array", "assert", "attribute", "begin", "block", "body", "buffer", "bus", "case", "component", "configuration", "constant", "context", "cover", "disconnect", "downto", "default", "else", "elsif", "end", "entity", "exit", "fairness", "file", "for", "force", "function", "generate", "generic", "group", "guarded", "if", "impure", "in", "inertial", "inout", "is", "label", "library", "linkage", "literal", "loop", "map", "mod", "nand", "new", "next", "nor", "not", "null", "of", "on", "open", "or", "others", "out", "package", "port", "postponed", "procedure", "process", "property", "protected", "pure", "range", "record", "register", "reject", "release", "rem", "report", "restrict", "restrict_guarantee", "return", "rol", "ror", "select", "sequence", "severity", "shared", "signal", "sla", "sll", "sra", "srl", "strong", "subtype", "then", "to", "transport", "type", "unaffected", "units", "until", "use", "variable", "vmode", "vprop", "vunit", "wait", "when", "while", "with", "xnor", "xor"];
let TypeNames: Array<string> = ["boolean", "bit", "character", "integer", "time", "natural", "positive", "std_logic", "std_logic_vector", "std_ulogic", "std_ulogic_vector", "string"];

export function format(input: string, settings: settings) {
    console.log("i am working")
    return(input)
}