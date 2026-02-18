"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Sparkles, FileText, Briefcase, Upload, Type } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export default function KeywordExtractor() {
    const [mode, setMode] = useState<'resume' | 'jd'>('resume');
    const [inputType, setInputType] = useState<'text' | 'file'>('text');
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = async () => {
        if (mode === 'resume' && inputType === 'file' && !file) {
            alert("Please upload a file.");
            return;
        }
        if ((mode === 'jd' || inputType === 'text') && !text.trim()) {
            alert("Please enter some text.");
            return;
        }

        setAnalyzing(true);
        setResult(null);

        try {
            let finalText = text;

            if (mode === 'resume' && inputType === 'file' && file) {
                const { extractTextFromPDF } = await import("@/lib/pdf-utils");
                finalText = await extractTextFromPDF(file);
            }

            const { extractSkillsFromText } = await import("@/lib/gemini");
            const data = await extractSkillsFromText(finalText, mode);

            setResult(data);
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Analysis failed.");
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-foreground p-8">

            <div className="max-w-4xl mx-auto space-y-8">

                {/* Mode Selection */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="flex gap-4 p-1 bg-white/5 rounded-2xl w-fit">
                        <button
                            onClick={() => { setMode('resume'); setResult(null); }}
                            className={`px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${mode === 'resume' ? 'bg-primary text-black shadow-lg' : 'hover:bg-white/5'}`}
                        >
                            <FileText className="w-4 h-4" /> Resume
                        </button>
                        <button
                            onClick={() => { setMode('jd'); setResult(null); }}
                            className={`px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${mode === 'jd' ? 'bg-primary text-black shadow-lg' : 'hover:bg-white/5'}`}
                        >
                            <Briefcase className="w-4 h-4" /> Start JD
                        </button>
                    </div>

                    {mode === 'resume' && (
                        <div className="flex gap-2 text-sm bg-white/5 p-1 rounded-lg">
                            <button
                                onClick={() => setInputType('text')}
                                className={`px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors ${inputType === 'text' ? 'bg-white/10 text-white' : 'text-muted-foreground hover:text-white'}`}
                            >
                                <Type className="w-4 h-4" /> Text
                            </button>
                            <button
                                onClick={() => setInputType('file')}
                                className={`px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors ${inputType === 'file' ? 'bg-white/10 text-white' : 'text-muted-foreground hover:text-white'}`}
                            >
                                <Upload className="w-4 h-4" /> File
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Input Area */}
                    <Card className="bg-white/5 border-white/10 h-fit min-h-[400px]">
                        <CardHeader>
                            <CardTitle>
                                {mode === 'resume'
                                    ? (inputType === 'file' ? 'Upload Resume (PDF)' : 'Paste Resume Text')
                                    : 'Paste Job Description'}
                            </CardTitle>
                            <CardDescription>
                                {mode === 'resume' ? 'Extract skills and keywords from your CV.' : 'Find main keywords to target in a job post.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mode === 'resume' && inputType === 'file' ? (
                                <div className="h-64 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-6 text-center hover:bg-white/5 transition-colors cursor-pointer relative">
                                    <Input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept=".pdf"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    />
                                    <Upload className="w-10 h-10 text-muted-foreground mb-4" />
                                    {file ? (
                                        <div>
                                            <p className="font-medium text-green-400">{file.name}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground">Click to upload or drag and drop PDF</p>
                                    )}
                                </div>
                            ) : (
                                <Textarea
                                    placeholder={mode === 'resume' ? "Paste your full resume content here..." : "Paste the job description here..."}
                                    className="h-64 bg-black/50 border-white/10 resize-none font-mono text-sm"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            )}

                            <Button
                                onClick={handleAnalyze}
                                disabled={analyzing}
                                className="w-full font-bold"
                                size="lg"
                            >
                                {analyzing ? "Extracting..." : "Extract Keywords"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results Area */}
                    <Card className="bg-white/5 border-white/10 min-h-[400px]">
                        <CardHeader>
                            <CardTitle>Extracted Data</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {result ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Hard Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {result.hard_skills?.map((s: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-md text-sm border border-blue-500/30">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Soft Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {result.soft_skills?.map((s: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-md text-sm border border-purple-500/30">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Keywords</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {result.keywords?.map((s: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-white/10 text-white/70 rounded-md text-sm">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground text-center opacity-50">
                                    <Sparkles className="w-12 h-12 mb-2" />
                                    <p>Results will appear here</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
