import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeData } from "@/types/resume";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_AI_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

// Helper for retry logic
async function generateWithRetry(model: any, args: any, retries = 3, delay = 2000): Promise<any> {
    for (let i = 0; i < retries; i++) {
        try {
            return await model.generateContent(args);
        } catch (error: any) {
            const isOverloaded = error.message?.includes("503") || error.message?.includes("overloaded");
            if (isOverloaded && i < retries - 1) {
                console.warn(`Model overloaded. Retrying in ${delay}ms... (Attempt ${i + 1}/${retries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff
            } else {
                throw error;
            }
        }
    }
}

export async function enhanceResumeContent(currentData: ResumeData): Promise<ResumeData> {
    if (!API_KEY) {
        console.error("Gemini API Key is missing");
        throw new Error("API Key missing");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
    You are an expert Resume Writer and ATS Optimizer.
    I will provide you with a resume in JSON format.
    Your task is to ENHANCE the content to be more professional, impact-driven, and ATS-friendly.

    Rules:
    1. Professional Summary: Rewrite to be punchy, highlighting key strengths.
    2. Experience: 
       - Convert descriptions into strong bullet points.
       - Start each bullet with a strong action verb (e.g., Led, Engineered, Optimized).
       - Add quantifiable metrics where possible (e.g., "Increased X by Y%").
    3. Skills: Group them logically if mixed, ensuring standard naming.
    4. Do REMOVE any data. Only polish and enhance existing information.
    5. Return ONLY the valid JSON with the exact same structure. Do not add markdown code blocks.

    Input Data:
    ${JSON.stringify(currentData)}
    `;

    try {
        const result = await generateWithRetry(model, prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const enhancedData = JSON.parse(jsonString);
        return { ...currentData, ...enhancedData }; // Merge to be safe, keeping IDs
    } catch (error) {
        console.error("AI Enhancement Failed:", error);
        throw error;
    }
}

export async function analyzeATS(fileBase64: string, mimeType: string, jobDescription?: string): Promise<any> {
    if (!API_KEY) {
        throw new Error("API Key missing");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
    You are an advanced Applicant Tracking System (ATS) Expert.
    Analyze the attached resume file strictly as an ATS robot would.
    
    ${jobDescription ? `
    IMPORTANT: You have also been provided with the Target Job Description below. 
    You MUST evaluate the resume against this specific JD, checking for matching keywords, required skills, and overall fit.
    
    TARGET JOB DESCRIPTION:
    """
    ${jobDescription.slice(0, 5000)}
    """
    ` : ""}

    Evaluate 3 key areas:
    1. Parsing / Readability (Can an ATS extract the text? Are there bad columns/graphics?)
    2. Keywords / Content (Does it use strong verbs? Is it quantifiable? ${jobDescription ? "Does it contain the essential keywords from the Job Description?" : ""})
    3. Completeness (Contact info, education, etc.)

    Return a JSON object with this exact structure:
    {
        "score": number (0-100),
        "summary": "Short 1-sentence overall verdict",
        "breakdown": {
            "parsing": number (0-100),
            "keywords": number (0-100),
            "impact": number (0-100)
        },
        "issues": [
            { "type": "critical" | "warning", "message": "specific issue", "section": "section name" }
        ],
        "positive": ["list of good things found"]
    }
    
    IMPORTANT: Return ONLY valid JSON.
    `;

    try {
        const result = await generateWithRetry(model, [
            prompt,
            {
                inlineData: {
                    data: fileBase64,
                    mimeType: mimeType
                }
            }
        ]);
        const response = await result.response;
        const text = response.text();
        const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("ATS Analysis Failed:", error);
        throw error;
    }
}

export async function extractSkillsFromText(text: string, type: 'resume' | 'jd'): Promise<any> {
    if (!API_KEY) {
        throw new Error("API Key missing");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const context = type === 'resume'
        ? "You are an expert Resume Analyze. Extract the top hard skills, soft skills, and keywords from this resume."
        : "You are an expert Job Description Scanner. Extract the top required technical skills, qualifications, and important keywords from this JD.";

    const prompt = `
    ${context}

    TEXT TO ANALYZE:
    "${text.slice(0, 10000)}"

    Return JSON strictly:
    {
        "hard_skills": ["skill1", "skill2"],
        "soft_skills": ["soft1", "soft2"],
        "keywords": ["key1", "key2"]
    }
    `;

    try {
        const result = await generateWithRetry(model, prompt);
        const response = await result.response;
        const responseText = response.text();
        const jsonString = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Keyword Extraction Failed:", error);
        throw error;
    }
}


export async function generateCoverLetter(resumeText: string, jobDescription: string, tone: string): Promise<string> {
    if (!API_KEY) {
        throw new Error("API Key missing");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
    You are an expert career coach and professional writer. Write a compelling cover letter based on the following Resume and Job Description.
    
    TONE: ${tone || "Professional"}

    RESUME CONTENT:
    ${resumeText.substring(0, 10000)}

    JOB DESCRIPTION:
    ${jobDescription.substring(0, 5000)}

    INSTRUCTIONS:
    1. Start with a strong hook suitable for the tone.
    2. Highlight matching skills from the resume that fit the job description.
    3. Explain why the candidate is a great fit.
    4. End with a call to action.
    5. Do NOT include placeholders like "[Your Name]" if possible, try to infer from resume, otherwise use brackets.
    6. Return *only* the body of the letter (Markdown formatted).
    `;

    try {
        const result = await generateWithRetry(model, prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Cover Letter Generation Failed:", error);
        throw error;
    }
}

export async function optimizeText(text: string): Promise<string> {
    if (!API_KEY) {
        throw new Error("API Key missing");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
    You are an expert Resume Writer.
    Rewrite the following text to be more professional, impactful, and concise.
    Use strong action verbs and active voice.
    Keep the same meaning but improve the quality.
    
    TEXT: "${text}"

    Return ONLY the rewritten text.
    `;

    try {
        const result = await generateWithRetry(model, prompt);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("Text Optimization Failed:", error);
        throw error;
    }
}
