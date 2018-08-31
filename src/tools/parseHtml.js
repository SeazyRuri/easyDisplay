(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.parseHtml = factory());
}(this, (function () {

// 匹配key="abc"
// const attr1 =/\s*([^\s\=]+)\s*(\=)\s*"([^"]*)"/
const attr1 = "\([^\\s\\=]+)\\s*(\\=)\\s*\"([^\"]*)\""
//匹配 key = 'abc'
// const attr2 =/\s*([^\s\=]+)\s*(\=)\s*'([^']*)'/
const attr2 = "\([^\\s\\=]+)\\s*(\\=)\\s*\'([^\']*)\'"
//匹配key = value
// const attr3 =/\s*([^\s\=]+)\s*(\=)\s*([^\s]*)/
const attr3 = "\([^\\s\\=]+)\\s*(\\=)\\s*([^\\s]*)"
//匹配 key
// const attr4 =/\s*([^\s\=]+)/
const attr4 = "\([^\\s\\=]+)"
const attr = `\\s*${attr1}|${attr2}|${attr3}|${attr4}`
const reAttr = new RegExp(attr);
const reStartTag = /<\s*([a-zA-Z]+)\s*([\s\S]*?)>/
const reCloseTag = /<\/\s*([a-zA-Z]+)\s*>/
const reTag = /([\s\S]*?)(<[^<>]+?>)/
const reCommentStart = /<!--/;
const reCommentEnd = /-->/;
class astNode {
    constructor(nodeName) {
        this.nodeName = new String(nodeName).toLowerCase();
        this.attributes = [];
        this.children = [];
        this.parent = null;
    }
    addAttr(key, value) {
        this.attributes.push({
            key: key, value: value
        });
        return this;
    }
    addChild(children) {
        children.setParent(this);
        this.children.push(children);
        return this;
    }
    setParent(parent) {
        this.parent = parent;
        return this;
    }
    addText(text) {
        let textNode = new TextNode(text);
        textNode.setParent(this);
        this.addChild(textNode);
        return this;
    }
}
class TextNode extends astNode {
    constructor(text) {
        super('text');
        this.textValue = new String(text);
    }
}
/**
 * 解析一个html，返回一个contentTagStack
 * @param {*} _html 
 */
function parser(_html) {
    let html = new String(_html);
    let ast = new astNode("root").setParent(null);
    let tagStack = [];
    let thisNode = ast;
    let rest = html;
    //处理注释
    while(reCommentStart.test(rest)){
        let start = rest.match(reCommentStart).index;
        let rest1;
        if(reCommentEnd.test(rest)){
            let end = rest.match(reCommentEnd).index;
            rest1 = rest.slice(0,start)+rest.slice(end+3);
        }else{
            rest1 = rest.slice(0,start)
        }
        rest = rest1;
    }    
    while (rest.length >= 0) {
        //检测标签
        if (!reTag.test(rest)) {
            if (rest.replace(/\s*/, "").length > 0) {
                thisNode.addText(rest);
            }
            rest = "";
            break;
        } else {
            if (thisNode == null) throw new Error("You may be set two root elements");
            let resTag = rest.match(reTag);
            // console.log(resTag);
            let matchLen = resTag[0].length + resTag.index;
            if (resTag[1].replace(/\s*/, "").length > 0) {
                console.log(resTag[1]);
                thisNode.addText(resTag[1]);
            }
            if (reStartTag.test(resTag[2])) {
                let cnode = parseStartTag(resTag[2]);
                // cnode.setParent(thisNode);
                tagStack.push(cnode.nodeName);
                thisNode.addChild(cnode);
                thisNode = cnode;
            } else if (reCloseTag.test(resTag[2])) {
                let nodeName = parseCloseTag(resTag[2]);
                if (nodeName == tagStack[tagStack.length-1]) {
                    thisNode = thisNode.parent;
                    tagStack.pop();
                }else {
                    if(tagStack.findIndex(e=>{
                        return e==nodeName;
                    })!=-1){
                        let popName;
                        while((popName=tagStack.pop())!=nodeName){
                            thisNode = thisNode.parent;
                        }
                        thisNode = thisNode.parent;
                    }
                }
            }
            rest = rest.slice(matchLen);
        }
    }
    return ast;
}
function parseCloseTag(closeTag) {
    let res = closeTag.match(reCloseTag);
    return res[1].toLowerCase();
}
function parseStartTag(startTag) {
    let res = startTag.match(reStartTag);
    let node = new astNode(res[1]);
    let attrs = parseAttr(res[2]);
    for (let i = 0; i < attrs.length; i++) {
        node.addAttr(attrs[i].key, attrs[i].value);
    };
    return node;
}
function parseAttr(_attrStr) {
    let attrs = [];
    let rest = new String(_attrStr);
    while (rest.length > 0) {
        // console.log(rest);
        let res = rest.match(reAttr);
        // console.log(res);
        if (res == null) {
            console.log("match fail");
            break;
        }
        let len = res[0].length;
        if (res[1]) {
            attrs.push({
                key: res[1],
                value: res[3]
            });
        } else if (res[4]) {
            attrs.push({
                key: res[4],
                value: res[6]
            });
        } else if (res[7]) {
            attrs.push({
                key: res[7],
                value: res[9]
            });
        } else if (res[10]) {
            attrs.push({
                key: res[10],
                value: ""
            });
        }
        rest = rest.slice(len + res.index);
    }
    return attrs;
}
return parser;
})))