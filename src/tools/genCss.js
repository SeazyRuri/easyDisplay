(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.genCss = factory());
}(this, (function () {
    function genCss(css,hash="easydisplay") {
        let style="";
        for(let i=0;i<css.length;i++){
            let c=css[i];
            style+=`${c.selector}[${hash}]{${c.content}}`;
        }
        return style;
    }
    return genCss;
})))