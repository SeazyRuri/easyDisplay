var parseHtml = require("../src/tools/parseHtml");
var html = `
<<div id="app" data-id="data-f" data-a='3' data-k data-e=2>
        {{test}};
    </div>
`
console.log(parseHtml(html));