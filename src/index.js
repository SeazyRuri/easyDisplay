import "./css/index.css"
import ace from "./lib/ace"
import {Range, EditSession} from "./lib/ace"
import "./lib/ace/src-noconflict/mode-html";
import "./lib/ace/src-noconflict/mode-css";
import "./lib/ace/webpack-resolver";
import "./lib/ace/src-noconflict/ext-language_tools"
const parseHtml = require("./tools/parseHtml");
// const parseCss = require("./tools/parseCss");
const render = require("./tools/render");
// import "./lib/ace/src-noconflict/theme-ambiance"
ace.require("ace/ext/language_tools");
ace.require("ace/theme/ambiance");

let htmlEditor = ace.edit("htmlEditor",{
    // maxLines: 20,
    // minLines: 20,
    value: "<!-- 编辑html -->\n",
    mode: "ace/mode/html",
    // bug: 1,
});
htmlEditor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});
// htmlEditor.selection.setRange(new Range(0,0,0,3));
htmlEditor.gotoLine(2);
let cssEditor = ace.edit("cssEditor",{
    value:"\/* 编辑css *\/ \n",
    mode:"ace/mode/css"
});
cssEditor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});
cssEditor.gotoLine(2);
const debounce = function(func,wait = 300){
    let timer = 0;
    return function(immediate = false,...args){
        if(timer)clearInterval(timer);
        if(immediate){
            func.apply(this,args);
        } else{
            timer = setTimeout(function(){
                func.apply(this,args);
            },wait);
        }
    }
}

//检测html的改变
const renderPanel = document.getElementById("renderPanel");
const responseHtml = debounce(function(){
    let html = htmlEditor.getValue();
    localStorage.setItem("html",html);
    let ast = parseHtml(html);
    // console.log(ast);
    render(renderPanel,ast);
});
htmlEditor.on("change",function(){
    responseHtml();
});
//检测css的改变
const styleNode = document.getElementById("css");
const responseCss = debounce(function(){
    let css = cssEditor.getValue();
    localStorage.setItem("css",css);
    styleNode.innerHTML = css;
    // styleNode.appendChild(document.createTextNode(css));
})
cssEditor.on("change",function(){
    responseCss();
});
let localHtml = localStorage.getItem("html");
if(localHtml){
    htmlEditor.setValue(localHtml,1)
}
let localCss = localStorage.getItem("css");
if(localCss){
    cssEditor.setValue(localCss,1);
}