const pdfLib = require("pdf-parse");
console.log("Is pdfLib.PDFParse a function?", typeof pdfLib.PDFParse === 'function');

// Mock buffer
const buffer = Buffer.from("test");
try {
    const result = pdfLib.PDFParse(buffer);
    console.log("Result promise?", result instanceof Promise);
} catch (e) {
    console.log("Error calling PDFParse:", e.message);
}
