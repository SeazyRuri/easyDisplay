(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.render = factory());
}(this, (function () {
function render(el,ast,hash="easydisplay"){
    let fragment = document.createDocumentFragment();
    genChildren(fragment,ast.children);
    el.innerHTML="";
    el.appendChild(fragment);
    function genChildren(el,children){
        for(let i=0;i<children.length;i++){
            let child=children[i];
            if(child.nodeName=='text'){
                let childEl = document.createTextNode(child.textValue);
                el.appendChild(childEl);
            }else{
                let childEl = document.createElement(child.nodeName);
                let attrs = child.attributes;
                for(let j=0;j<attrs.length;j++){
                    try{
                        childEl.setAttribute(attrs[j].key,attrs[j].value);
                    }catch(e){
                        console.error(`${attrs[j].key} is not a valid value;`);
                    }
                }
                childEl.setAttribute(hash,"");
                genChildren(childEl,child.children);
                el.appendChild(childEl);
            }
        }
    }
}

return render;
})))