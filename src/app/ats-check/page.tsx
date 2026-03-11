"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertCircle, ArrowLeft, Loader2, RefreshCw, AlertTriangle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AtsCheckPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [fileName, setFileName] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [isFresher, setIsFresher] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!fileInputRef.current?.files?.[0]) return;

        const file = fileInputRef.current.files[0];
        if (file.size > 5 * 1024 * 1024) {
            alert("File size too large. Max 5MB.");
            return;
        }

        if (file.type !== "application/pdf") {
            alert("Please upload a PDF file.");
            return;
        }

        setFileName(file.name);
        setIsAnalyzing(true);
        setResults(null);

        try {
            // Import dynamically to avoid server-side issues during build if any
            const { extractTextFromPDF } = await import("@/lib/pdf-utils");
            const { scoreResumeText } = await import("@/lib/ats-scorer");
            const { analyzeATS } = await import("@/lib/gemini");

            // 1. Extract Text
            const text = await extractTextFromPDF(file);

            // 2. Local Rule-Based Score
            const localAnalysis = scoreResumeText(text, isFresher);

            // 3. AI Analysis (Qualitative Feedback)
            let aiAnalysis = null;
            try {
                // Convert file to base64 for Gemini
                const base64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const result = reader.result as string;
                        // Remove data URL prefix (e.g., "data:application/pdf;base64,")
                        const base64String = result.split(',')[1];
                        resolve(base64String);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });

                const finalJobDescContext = isFresher ? `(Note: The candidate is an Entry-Level/Fresher. Adjust expectations accordingly.)\n\n${jobDescription}` : jobDescription;
                aiAnalysis = await analyzeATS(base64, file.type, finalJobDescContext || (isFresher ? "(Note: The candidate is an Entry-Level/Fresher. Adjust expectations accordingly.)" : undefined));
            } catch (error) {
                console.error("AI Analysis Failed (Soft Fail):", error);
            }

            // 4. Merge Results
            const finalResult = {
                score: localAnalysis.score,
                summary: aiAnalysis?.summary || "Analysis based on automated rule checks.",
                breakdown: localAnalysis.breakdown,
                issues: [
                    ...localAnalysis.issues,
                    ...(aiAnalysis?.issues || [])
                ],
                positive: [
                    ...localAnalysis.positive,
                    ...(aiAnalysis?.positive || [])
                ]
            };

            setResults(finalResult);
            setIsAnalyzing(false);
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Analysis failed. Please try again.");
            setIsAnalyzing(false);
        }
    };

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
        <ProtectedRoute>
            <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
                </div>


                <main className="container mx-auto px-6 py-8 flex-1 flex flex-col items-center">
                    <AnimatePresence mode="wait">
                        {!results && !isAnalyzing ? (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="w-full flex flex-col items-center"
                            >
                                {/* Back Button */}
                                <div className="w-full max-w-2xl mb-6">
                                    <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                                        Back to Home
                                    </Link>
                                </div>

                                <div className="text-center max-w-2xl mb-12">
                                    <h1 className="text-4xl font-bold mb-4">Optimize for Application Robots</h1>
                                    <p className="text-muted-foreground text-lg">Upload your resume to see how well it parses against Applicant Tracking Systems (ATS). Get a score and actionable feedback.</p>
                                </div>

                                <div className="w-full max-w-xl mb-6">
                                    <Card className="p-4 bg-primary/5 backdrop-blur-sm border-primary/20 flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="fresher-mode" className="text-base font-semibold text-primary">I am a Fresher / Entry-Level</Label>
                                            <p className="text-sm text-muted-foreground">Adapts the ATS scoring algorithm to not penalize for missing work experience.</p>
                                        </div>
                                        <Switch
                                            id="fresher-mode"
                                            checked={isFresher}
                                            onCheckedChange={setIsFresher}
                                        />
                                    </Card>
                                </div>

                                <div className="w-full max-w-xl">
                                    <Card
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-12 border-2 border-dashed border-muted-foreground/25 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-accent/5 transition-colors cursor-pointer group bg-card/50 backdrop-blur-sm"
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept=".pdf,.docx"
                                            onChange={handleFileSelect}
                                        />
                                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <Upload className="w-10 h-10 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">Upload your resume</h3>
                                        <p className="text-muted-foreground mb-8">Click to browse (PDF only for best results)</p>
                                        <Button variant="default" size="lg" className="rounded-full px-8 pointer-events-none">
                                            Select File
                                        </Button>
                                    </Card>
                                </div>

                                <div className="w-full max-w-xl mt-6">
                                    <Card className="p-6 bg-card/50 backdrop-blur-sm border-muted-foreground/15">
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="jd" className="text-base font-semibold">Target Job Description <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                                                <p className="text-sm text-muted-foreground">Paste the job description to get a tailored ATS compatibility score against specific requirements.</p>
                                            </div>
                                            <Textarea
                                                id="jd"
                                                placeholder="e.g. We are looking for a Senior React Developer with 5+ years of experience..."
                                                className="min-h-[120px] resize-y bg-background/50"
                                                value={jobDescription}
                                                onChange={(e) => setJobDescription(e.target.value)}
                                            />
                                        </div>
                                    </Card>
                                </div>

                                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                                    <FeatureItem icon={<FileText className="w-6 h-6 text-blue-400" />} title="Keyword Analysis" desc="Check if you're missing critical keywords for your industry." />
                                    <FeatureItem icon={<CheckCircle className="w-6 h-6 text-green-400" />} title="Formatting Check" desc="Ensure your layout is readable by automated parsers." />
                                    <FeatureItem icon={<AlertCircle className="w-6 h-6 text-orange-400" />} title="Actionable Fixes" desc="Get specific recommendations to improve your score." />
                                </div>
                            </motion.div>
                        ) : isAnalyzing ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="flex flex-col items-center justify-center h-[50vh]"
                            >
                                <div className="relative mb-8">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                                    <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
                                </div>
                                <h2 className="text-2xl font-semibold mb-2">Analyzing Resume...</h2>
                                <p className="text-muted-foreground">Checking keywords, formatting, and readability</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full max-w-5xl"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold flex items-center gap-3">
                                            Analysis Result
                                            <Badge variant="outline" className="text-base font-normal py-1">{fileName}</Badge>
                                        </h2>
                                        <p className="text-muted-foreground">{results.summary}</p>
                                    </div>
                                    <Button onClick={() => setResults(null)} variant="outline">
                                        <RefreshCw className="w-4 h-4 mr-2" /> Upload Another
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Score Card */}
                                    <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm">
                                        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
                                            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle cx="80" cy="80" r="70" className="stroke-muted/20 fill-none" strokeWidth="12" />
                                                    <circle
                                                        cx="80"
                                                        cy="80"
                                                        r="70"
                                                        className={`fill-none transition-all duration-1000 ease-out ${getScoreColor(results.score)}`}
                                                        strokeWidth="12"
                                                        strokeLinecap="round"
                                                        stroke="currentColor"
                                                        strokeDasharray={439.8}
                                                        strokeDashoffset={439.8 - (439.8 * results.score) / 100}
                                                    />
                                                </svg>
                                                <div className="absolute flex flex-col items-center">
                                                    <span className={`text-4xl font-bold ${getScoreColor(results.score)}`}>{results.score}</span>
                                                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Score</span>
                                                </div>
                                            </div>
                                            <div className="w-full space-y-4">
                                                <ScoreBreakdown label="Parsing" value={results.breakdown.parsing} />
                                                <ScoreBreakdown label="Keywords" value={results.breakdown.keywords} />
                                                <ScoreBreakdown label="Impact" value={results.breakdown.impact} />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Issues & Improvements */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Card className="bg-red-500/5 border-red-200/20">
                                                <CardContent className="pt-6">
                                                    <h3 className="text-red-500 font-semibold mb-4 flex items-center gap-2">
                                                        <AlertCircle className="w-5 h-5" /> Required Fixes
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {results.issues.filter((i: any) => i.type === 'critical').length > 0 ? (
                                                            results.issues.filter((i: any) => i.type === 'critical').map((issue: any, idx: number) => (
                                                                <li key={idx} className="flex gap-3 text-sm">
                                                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" />
                                                                    <span>{issue.message}</span>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li className="text-muted-foreground text-sm">No required fixes found!</li>
                                                        )}
                                                    </ul>
                                                </CardContent>
                                            </Card>

                                            <Card className="bg-yellow-500/5 border-yellow-200/20">
                                                <CardContent className="pt-6">
                                                    <h3 className="text-yellow-500 font-semibold mb-4 flex items-center gap-2">
                                                        <AlertTriangle className="w-5 h-5" /> Suggested Changes
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {results.issues.filter((i: any) => i.type === 'warning').length > 0 ? (
                                                            results.issues.filter((i: any) => i.type === 'warning').map((issue: any, idx: number) => (
                                                                <li key={idx} className="flex gap-3 text-sm">
                                                                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 shrink-0" />
                                                                    <span>{issue.message}</span>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li className="text-muted-foreground text-sm">No suggestions at this time.</li>
                                                        )}
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <Card className="bg-green-500/5 border-green-200/20">
                                            <CardContent className="pt-6">
                                                <h3 className="text-green-600 font-semibold mb-4 flex items-center gap-2">
                                                    <CheckCircle className="w-5 h-5" /> What You Did Well
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {results.positive.map((item: string, idx: number) => (
                                                        <div key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                                                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </ProtectedRoute>
    );
}

function FeatureItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="flex flex-col items-center text-center p-4">
            <div className="mb-4 p-3 bg-secondary/50 rounded-lg">{icon}</div>
            <h4 className="font-semibold mb-2">{title}</h4>
            <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
    )
}

function ScoreBreakdown({ label, value }: { label: string, value: number }) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm">
                <span>{label}</span>
                <span className="font-medium text-muted-foreground">{value}/100</span>
            </div>
            <Progress value={value} className="h-1.5" />
        </div>
    )
}
