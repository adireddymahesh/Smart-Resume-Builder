
const fs = require('fs');

try {
    const data = fs.readFileSync('models.json', 'utf16le');
    // The file might be UTF-16 from PowerShell redirection, let's try to handle that or just basic parsing if it worked.
    // Actually, earlier 'type' showed it correctly.
    // If it's real JSON:
    const json = JSON.parse(data.replace(/^\uFEFF/, ''));
    if (json.models) {
        console.log("Found models:");
        json.models.forEach(m => console.log(m.name));
    }
} catch (e) {
    console.error("Error parsing JSON:", e.message);
    // If strict parsing fails, just regex for names
    const data = fs.readFileSync('models.json', 'utf8'); // might need encoding
    const names = data.match(/"name":\s*"([^"]+)"/g);
    if (names) {
        names.forEach(n => console.log(n));
    }
}
