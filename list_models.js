
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_AI_API_KEY;
    if (!apiKey) {
        console.error("No API Key found in .env.local");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).apiKey;
        // Accessing the model manager via a cleaner way if possible, but the SDK structure is typically:
        // verify current SDK usage. 
        // Actually, for listing models, we typically need to check documentation or just try generic.
        // There isn't a direct 'listModels' on the client instance in some versions, but let's try assuming standard REST or a known specific method if available or just infer.
        // Wait, the error message literally says "Call ListModels".
        // In the node SDK, it might not be exposed directly on the `genAI` object in all versions.

        // Let's use the fetch directly to be sure, as it's cleaner than guessing SDK method signatures which change.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => console.log(`- ${m.name} (${m.supportedGenerationMethods.join(', ')})`));
        } else {
            console.error("Failed to list models:", data);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
