(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.parseCss = factory());
}(this, (function () {
    const reCss = /\s*([^\{\}\n]+?)\s*\{[\s]*([\s\S]*?)[\s]*\}/;
    // function parseCss(css) {
    //     if (!reCss.test(css)) return null;
    //     let res = css.match(reCss);
    //     let selector = res[1];
    //     let cssContent = res[2];
    //     return {
    //         selector: selector,
    //         content: cssContent
    //     }
    // }
    function parse(css) {
        let rest = css;
        let res = [];
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