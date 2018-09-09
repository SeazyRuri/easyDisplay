var parseHtml = require("../src/tools/parseHtml");
var genHtml = require("../src/tools/genHtml");
var html = `
<<div id="app" data-id="data-f" data-a=''3'' data-k data-e=2>
        {{test}};
    </div>
`
var hash=undefined;
awt=parseHtml(html);
console.log(genHtml(awt,hash));