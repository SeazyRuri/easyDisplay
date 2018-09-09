const parseCss = require("../parseCss");
const genCss = require("../genCss");
// import { getOptions } from 'loader-utils';
const getOptions = require('loader-utils').getOptions;
module.exports= function loader(source){
    const options = getOptions(this);
    let css = source;
    let hash = options.hash;
    if(hash==undefined)hash=row;
    css = genCss(parseCss(css),hash);
    return css;
}