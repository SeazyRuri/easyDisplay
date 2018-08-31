import "./css/index.css"
import ace from "./lib/ace"
import {Range, EditSession} from "./lib/ace"
import "./lib/ace/src-noconflict/mode-html";
import "./lib/ace/src-noconflict/mode-css";
import "./lib/ace/webpack-resolver";
import "./lib/ace/src-noconflict/ext-language_tools"
// import "./lib/ace/src-noconflict/theme-ambiance"
ace.require("ace/ext/language_tools");
ace.require("ace/theme/ambiance");
let htmlEditor = ace.edit("htmlEditor",{
    // maxLines: 20,
    // minLines: 20,
    value: "<!-- 编辑html -->",
    mode: "ace/mode/html",
    // bug: 1,
});
htmlEditor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});
// htmlEditor.selection.setRange(new Range(0,0,0,3));

let cssEditor = ace.edit("cssEditor",{
    value:"\/* 编辑css *\/",
    mode:"ace/mode/css"
});
cssEditor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});