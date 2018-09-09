(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.genHtml = factory());
}(this, (function () {
    const emptyElt=['area','base','br','col','clogroup','command','embed','hr','img','input','keygen','link','meta','param','source','track','wbr']
    function genHtml(html,hash="row") {
        let htmlText="";
        r(html.children);
        function r(children){
            for(let i=0;i<children.length;i++){
                if(children[i].nodeName=="text"){
                    htmlText+=children[i].textValue;
                }else{
                    let child=children[i];
                    let emptyEltIndex = emptyElt.findIndex((e)=>{
                        return e==child.nodeName;
                    });
                    child.addAttr(hash,"");
                    let attrText = genAttr(child.attributes);
                    htmlText+=`<${child.nodeName} ${attrText} ${emptyEltIndex<0?"":"\/"}>`;
                    if(emptyEltIndex<0){
                        r(child.children);
                        htmlText+=`<\/${child.nodeName}>`
                    }
                }
            }
        }
        return htmlText;
    }
    function genAttr(attrs){
        let attrText=[];
        for(let i=0;i<attrs.length;i++){
            let attr=attrs[i];
            attrText.push(`${attr.key}${(attr.value===undefined ||attr.value==="")?"":`="${attr.value}"`}`);
        }
        return attrText.join(" ");
    }
    return genHtml;
})))