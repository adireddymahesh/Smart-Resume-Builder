
export interface ATSAnalysis {
    score: number;
    breakdown: {
        parsing: number;
        keywords: number;
        impact: number;
    };
    issues: {
        type: "critical" | "warning";
        message: string;
        section: string;
    }[];
    positive: string[];
}

export function scoreResumeText(text: string, isFresher: boolean = false): ATSAnalysis {
    const issues: any[] = [];
    const positive: string[] = [];

    let score = 0;
    const lowerText = text.toLowerCase();

    // --- 1. Parsing & Structure (40 Points) ---

    // Contact Info Check
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
    const hasLinkedIn = /linkedin\.com\/in\/[\w-]+/.test(lowerText);

    if (hasEmail) {
        score += 10;
        positive.push("Email address detected.");
    } else {
        issues.push({ type: "critical", message: "No email address found.", section: "Contact Info" });
    }

    if (hasLinkedIn) {
        score += 5;
        positive.push("LinkedIn profile detected.");
    } else {
        issues.push({ type: "warning", message: "Adding a LinkedIn URL helps recruiters verify your profile.", section: "Contact Info" });
    }

    // Section Headers Check
    const essentialSections = isFresher ? ["education", "skills", "projects"] : ["experience", "education", "skills"];
    let missingSections = 0;

    essentialSections.forEach(section => {
        if (lowerText.includes(section)) {
            score += 5;
            positive.push(`${section.charAt(0).toUpperCase() + section.slice(1)} section found.`);
        } else {
            missingSections++;
            issues.push({ type: "critical", message: `Missing '${section}' section header.`, section: "Structure" });
        }
    });


    // --- 2. Keywords & Content (30 Points) ---

    // Action Verbs
    const actionVerbs = [
        "led", "developed", "managed", "created", "designed", "implemented",
        "increased", "reduced", "improved", "launched", "optimized", "built",
        "engineered", "collaborated", "analyzed"
    ];

    let verbCount = 0;
    actionVerbs.forEach(verb => {
        if (new RegExp(`\\b${verb}\\b`, 'i').test(text)) verbCount++;
    });

    if (verbCount >= (isFresher ? 3 : 5)) {
        score += 15;
        positive.push("Strong use of action verbs.");
    } else if (verbCount > 0) {
        score += 5;
        issues.push({ type: "warning", message: `Try to use more strong action verbs (Found: ${verbCount}).`, section: "Impact" });
    } else {
        issues.push({ type: "critical", message: "No strong action verbs found. Start bullets with words like 'Led', 'Created'.", section: "Impact" });
    }

    // Quantifiable Results (Numbers/Percentages)
    const hasNumbers = /\d+%|\$\d+|\d+ (users|clients|customers|projects|students|members)/.test(text);
    if (hasNumbers) {
        score += 15;
        positive.push("Contains quantifiable results (numbers/metrics).");
    } else {
        if (isFresher) {
            score += 10; // Don't penalize as heavily for freshers
            issues.push({ type: "warning", message: "Try to add numbers even to academic projects (e.g., 'Led a team of 4', 'Analyzed 500+ rows of data').", section: "Impact" });
        } else {
            issues.push({ type: "warning", message: "Add numbers or percentages to your experience (e.g., 'Increased sales by 20%').", section: "Impact" });
        }
    }


    // --- 3. Length & Formatting (30 Points) ---

    // Word Count
    const wordCount = text.split(/\s+/).length;
    const minWords = isFresher ? 100 : 200;

    if (wordCount >= minWords && wordCount <= 1000) {
        score += 15;
    } else if (wordCount < minWords) {
        issues.push({ type: "critical", message: "Resume is too short. Add more detailed content.", section: "Length" });
    } else {
        issues.push({ type: "warning", message: "Resume might be too long. Keep it concise.", section: "Length" });
    }

    // File Readable Check (Basic)
    if (text.length > 50) {
        score += 15;
    } else {
        issues.push({ type: "critical", message: "Could not read text. Avoid scanning resumes as images.", section: "Parsing" });
    }


    // Breakdown Calculation
    const parsingScore = Math.min(100, (hasEmail ? 60 : 0) + (hasLinkedIn ? 20 : 0) + (text.length > 50 ? 20 : 0));
    const keywordScore = Math.min(100, (30 * (3 - missingSections) / 3) + (verbCount > 3 ? 50 : 20));
    const impactScore = Math.min(100, (hasNumbers ? 50 : 0) + (verbCount >= 5 ? 50 : 30));

    return {
        score: Math.min(100, score),
        breakdown: {
            parsing: parsingScore,
            keywords: keywordScore,
            impact: impactScore
        },
        issues,
        positive
    };
}
