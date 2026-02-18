
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testModels() {
    // Hardcoded key for testing since we know it works
    const apiKey = "AIzaSyBmPkZSJ1z_BByCapm7WsyLztSrJFB1USI";
    const genAI = new GoogleGenerativeAI(apiKey);

    const candidates = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-001",
        "gemini-1.5-pro",
        "gemini-2.0-flash-exp",
        "gemini-2.0-flash",
        "gemini-pro"
    ];

    console.log("Testing models...");

    for (const modelName of candidates) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            // Just try to generate a tiny string
            await model.generateContent("Test");
            console.log(`✅ SUCCESS: ${modelName}`);
            // If one works, we can stop or keep going to see all options
        } catch (error) {
            if (error.status === 404 || error.message.includes("not found")) {
                console.log(`❌ FAILED (404): ${modelName}`);
            } else {
                console.log(`❌ FAILED (Other): ${modelName} - ${error.message.split('\n')[0]}`);
            }
        }
    }
}

testModels();
