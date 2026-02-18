const pdf = require("pdf-parse");
console.log("Type of require('pdf-parse'):", typeof pdf);
console.log("Is it a function?", typeof pdf === 'function');
console.log("Keys:", Object.keys(pdf));
if (typeof pdf === 'object') {
    console.log("Has default?", 'default' in pdf);
    console.log("Type of default:", typeof pdf.default);
}
