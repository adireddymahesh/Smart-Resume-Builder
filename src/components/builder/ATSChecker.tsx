import React, { useMemo } from "react";
import { ResumeData } from "@/types/resume";
import { CircleCheck, AlertCircle, TrendingUp, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface ATSCheckerProps {
    data: ResumeData;
}

interface Suggestion {
    id: string;
    type: "critical" | "warning" | "success";
    message: string;
    section: string;
}

export function ATSChecker({ data }: ATSCheckerProps) {
    const analysis = useMemo(() => {
        let score = 0;
        const suggestions: Suggestion[] = [];
        const maxScore = 100;

        // 1. Completeness Checks (Weight: 40)
        // ------------------------------------

        // Profile (10 pts)
        if (data.profile.fullName && data.profile.email && data.profile.phone) {
            score += 10;
        } else {
            suggestions.push({
                id: "profile-missing",
                type: "critical",
                message: "Add Full Name, Email, and Phone Number.",
                section: "Profile"
            });
        }

        if (!data.profile.linkedin) {
            suggestions.push({
                id: "linkedin-missing",
                type: "warning",
                message: "Adding a LinkedIn profile allows recruiters to verify your background.",
                section: "Profile"
            });
        } else {
            score += 2; // Bonus
        }

        // Summary (10 pts)
        const summaryWords = data.profile.summary ? data.profile.summary.split(/\s+/).length : 0;
        if (summaryWords > 10 && summaryWords < 200) {
            score += 10;
        } else if (summaryWords === 0) {
            suggestions.push({
                id: "summary-missing",
                type: "critical",
                message: "Add a Professional Summary to introduce yourself.",
                section: "Summary"
            });
        } else if (summaryWords < 10) {
            suggestions.push({
                id: "summary-short",
                type: "warning",
                message: "Your summary is too short. Aim for 2-3 sentences.",
                section: "Summary"
            });
        } else {
            suggestions.push({
                id: "summary-long",
                type: "warning",
                message: "Your summary is too long. Keep it concise (under 200 words).",
                section: "Summary"
            });
        }

        // Experience (15 pts)
        if (data.experience.length > 0) {
            score += 15;
        } else {
            suggestions.push({
                id: "exp-missing",
                type: "critical",
                message: "Add at least one Work Experience entry.",
                section: "Experience"
            });
        }

        // Skills (5 pts)
        if (data.skills.length >= 5) {
            score += 5;
        } else if (data.skills.length > 0) {
            score += 2;
            suggestions.push({
                id: "skills-low",
                type: "warning",
                message: "Add more Skills (target at least 5 relevant skills).",
                section: "Skills"
            });
        } else {
            suggestions.push({
                id: "skills-missing",
                type: "critical",
                message: "Add a Skills section. This is crucial for ATS filtering.",
                section: "Skills"
            });
        }


        // 2. Content Quality (Weight: 30)
        // ------------------------------------

        // Bullet Points Check
        const hasBullets = data.experience.every(exp =>
            exp.description.includes("•") ||
            exp.description.includes("- ") ||
            exp.description.includes("* ") ||
            exp.description.split("\n").length > 1
        );

        if (data.experience.length > 0) {
            if (hasBullets) {
                score += 15;
            } else {
                suggestions.push({
                    id: "exp-format",
                    type: "warning",
                    message: "Use bullet points or separate lines for experience descriptions.",
                    section: "Experience"
                });
            }

            // Description Length
            const shortDescriptions = data.experience.filter(exp => exp.description.length < 50);
            if (shortDescriptions.length === 0) {
                score += 15;
            } else {
                score += 5;
                suggestions.push({
                    id: "exp-detail",
                    type: "warning",
                    message: "Some experience descriptions are very short. Elaborate on your achievements.",
                    section: "Experience"
                });
            }
        }


        // 3. Keywords & Impact (Weight: 30)
        // ------------------------------------
        const actionVerbs = ["developed", "led", "managed", "created", "designed", "implemented", "increased", "reduced", "improved", "launched", "optimized", "built", "engineered", "collaborated", "analyzed"];
        const allText = JSON.stringify(data).toLowerCase();

        let verbCount = 0;
        actionVerbs.forEach(verb => {
            if (allText.includes(verb)) verbCount++;
        });

        if (verbCount >= 3) {
            score += 30; // Good usage of action verbs
        } else if (verbCount > 0) {
            score += 15;
            suggestions.push({
                id: "verbs-low",
                type: "warning",
                message: `Try using strong action verbs like 'Led', 'Developed', 'Optimized'. Found: ${verbCount}.`,
                section: "General"
            });
        } else {
            suggestions.push({
                id: "verbs-missing",
                type: "warning",
                message: "Use strong action verbs (e.g., Developed, Managed) to start your bullet points.",
                section: "General"
            });
        }

        return { score: Math.min(score, maxScore), suggestions };
    }, [data]);

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500";
        if (score >= 50) return "text-yellow-500";
        return "text-red-500";
    };

    const getProgressColor = (score: number) => {
        if (score >= 80) return "bg-green-500";
        if (score >= 50) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <Card className="w-full h-full border-0 shadow-none bg-transparent">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    ATS Score & Insights
                </CardTitle>
                <CardDescription>
                    Optimize your resume for Applicant Tracking Systems.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-6 mb-8">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                className="stroke-muted fill-none"
                                strokeWidth="8"
                            />
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                className={`fill-none transition-all duration-1000 ease-out ${getScoreColor(analysis.score)}`}
                                strokeWidth="8"
                                strokeLinecap="round"
                                stroke="currentColor"
                                strokeDasharray={251.2}
                                strokeDashoffset={251.2 - (251.2 * analysis.score) / 100}
                            />
                        </svg>
                        <span className={`absolute text-2xl font-bold ${getScoreColor(analysis.score)}`}>
                            {analysis.score}
                        </span>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between mb-1">
                            <span className="font-medium text-sm">Optimization Level</span>
                            <span className="text-sm text-muted-foreground">{analysis.score}/100</span>
                        </div>
                        <Progress value={analysis.score} className="h-2" indicatorClassName={getProgressColor(analysis.score)} />
                        <p className="text-xs text-muted-foreground mt-2">
                            {analysis.score >= 80 ? "Excellent! Your resume is well-optimized." :
                                analysis.score >= 50 ? "Good start, but there's room for improvement." :
                                    "Needs attention. Add more content to improve readability."}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Actionable Improvements
                    </h3>
                    <ScrollArea className="h-[300px] pr-4">
                        {analysis.suggestions.length === 0 ? (
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 text-green-700 border border-green-200">
                                <CircleCheck className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">Great job! No major issues found.</span>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {analysis.suggestions.map((suggestion) => (
                                    <div
                                        key={suggestion.id}
                                        className={`p-3 rounded-lg border flex gap-3 items-start ${suggestion.type === 'critical' ? 'bg-red-500/5 border-red-200' :
                                                suggestion.type === 'warning' ? 'bg-yellow-500/5 border-yellow-200' :
                                                    'bg-green-500/5 border-green-200'
                                            }`}>
                                        {suggestion.type === 'critical' ? (
                                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        ) : suggestion.type === 'warning' ? (
                                            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <CircleCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        )}
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="outline" className="text-[10px] h-5 px-1.5 uppercase tracking-wider">{suggestion.section}</Badge>
                                                {suggestion.type === 'critical' && <span className="text-[10px] font-bold text-red-500">CRITICAL</span>}
                                            </div>
                                            <p className="text-sm text-foreground/80">{suggestion.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </CardContent>
        </Card>
    );
}
