const parseHtml = require("../parseHtml.js");
const genHtml = require("../genHtml.js");
// import { getOptions } from 'loader-utils';
const getOptions = require('loader-utils').getOptions;
module.exports= function loader(source){
    const options = getOptions(this);
    let html = source;
    let hash = options.hash;
    if(hash==undefined)hash=row;
    html = genHtml(parseHtml(html),hash);
    html =`${html}`
    return 'module.exports = ' + JSON.stringify(html);
}