(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.parseCss = factory());
}(this, (function () {
    const reCss = /\s*([^\{\}\n]+?)\s*\{[\s]*([\s\S]*?)[\s]*\}/;
    const reCommentStart = /\/\*/;
    const reCommentEnd  = /\*\//;
    function parse(css) {
        let rest = css;
        let res = [];
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
        while (reCss.test(rest)) {
            let matches = rest.match(reCss);
            let selector = matches[1];
            let cssContent = matches[2];
            res.push({
                selector,
                content:cssContent
            });
            rest = rest.slice(matches.index+matches[0].length);
        }
        return res;
    }
    return parse;
})))