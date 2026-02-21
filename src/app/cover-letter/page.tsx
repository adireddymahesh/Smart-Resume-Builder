"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Wand2, FileText, Upload, Copy, Check, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
import CoverLetterPDF from "@/components/CoverLetterPDF";

const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <Button variant="outline" size="sm" disabled><Loader2 className="w-4 h-4 animate-spin" /></Button>,
    }
);

export default function CoverLetterPage() {
    const { user, loading: authLoading } = useAuth();
    const [resumes, setResumes] = useState<any[]>([]);
    const [selectedResumeId, setSelectedResumeId] = useState("");
    const [resumeText, setResumeText] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [tone, setTone] = useState("Professional");
    const [generatedLetter, setGeneratedLetter] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (user && !authLoading) {
            fetchResumes();
        }
    }, [user, authLoading]);

    const fetchResumes = async () => {
        try {
            const resumesRef = collection(db, "users", user!.uid, "resumes");
            const q = query(resumesRef, orderBy("updatedAt", "desc"));
            const snapshot = await getDocs(q);
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setResumes(list);
        } catch (error) {
            console.error("Error fetching resumes:", error);
        }
    };

    const handleResumeSelect = (value: string) => {
        setSelectedResumeId(value);
        const resume = resumes.find(r => r.id === value);
        if (resume) {
            // Basic extraction logic from JSON resume structure
            // Adapt this based on your actual resume data structure
            const text = `
                Name: ${resume.profile?.fullName || ""}
                Title: ${resume.profile?.jobTitle || ""}
                Summary: ${resume.profile?.summary || ""}
                Experience: ${resume.experience?.map((e: any) => `${e.jobTitle} at ${e.company} (${e.date}): ${e.description}`).join("\n") || ""}
                Education: ${resume.education?.map((e: any) => `${e.degree} from ${e.school}`).join("\n") || ""}
                Skills: ${resume.skills?.join(", ") || ""}
            `;
            setResumeText(text);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            setUploadError("Please upload a PDF file.");
            return;
        }

        setUploadError("");
        setIsUploading(true);

        try {
            const { extractTextFromPDF } = await import("@/lib/pdf-utils");
            const text = await extractTextFromPDF(file);
            setResumeText(text);
        } catch (error) {
            console.error(error);
            setUploadError("Failed to extract text from resume.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleGenerate = async () => {
        if (!resumeText) return alert("Please select a resume or upload one.");
        if (!jobDescription) return alert("Please enter a job description.");

        setIsGenerating(true);
        try {
            const { generateCoverLetter } = await import("@/lib/gemini");
            const letter = await generateCoverLetter(resumeText, jobDescription, tone);
            setGeneratedLetter(letter);
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLetter);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-background p-6 md:p-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Input Section */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                            <Wand2 className="w-8 h-8 text-purple-500" />
                            Cover Letter Generator
                        </h1>
                        <p className="text-muted-foreground">AI-powered letters tailored to your job application.</p>
                    </div>

                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-6 space-y-6">

                            <Tabs defaultValue="saved" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="saved">Saved Resume</TabsTrigger>
                                    <TabsTrigger value="upload">Upload PDF</TabsTrigger>
                                </TabsList>
                                <TabsContent value="saved" className="space-y-4 pt-4">
                                    <Label>Select Resume</Label>
                                    <Select onValueChange={handleResumeSelect} value={selectedResumeId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose from your resumes" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {resumes.map(r => (
                                                <SelectItem key={r.id} value={r.id}>
                                                    {r.title || "Untitled Resume"}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TabsContent>
                                <TabsContent value="upload" className="space-y-4 pt-4">
                                    <Label>Upload Resume (PDF)</Label>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" className="w-full relative overflow-hidden" disabled={isUploading}>
                                                <input
                                                    type="file"
                                                    accept=".pdf"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={handleFileUpload}
                                                />
                                                {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                                                {isUploading ? "Extracting..." : "Choose File"}
                                            </Button>
                                        </div>
                                        {uploadError && <p className="text-xs text-destructive">{uploadError}</p>}
                                        {resumeText && !selectedResumeId && (
                                            <p className="text-xs text-green-500 flex items-center">
                                                <Check className="w-3 h-3 mr-1" /> PDF extracted successfully
                                            </p>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <div className="space-y-2">
                                <Label>Job Description</Label>
                                <Textarea
                                    placeholder="Paste the job description here..."
                                    className="min-h-[150px] resize-none"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Tone</Label>
                                <Select value={tone} onValueChange={setTone}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Professional">Professional (Safe & Standard)</SelectItem>
                                        <SelectItem value="Enthusiastic">Enthusiastic (High Energy)</SelectItem>
                                        <SelectItem value="Confident">Confident (Leadership Focus)</SelectItem>
                                        <SelectItem value="Creative">Creative (Unique & Storytelling)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-purple-500/25"
                                onClick={handleGenerate}
                                disabled={isGenerating || !resumeText || !jobDescription}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-5 h-5 mr-2" /> Generate Cover Letter
                                    </>
                                )}
                            </Button>

                        </CardContent>
                    </Card>
                </div>

                {/* Output Section */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-3xl -z-10" />

                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-semibold">Your Cover Letter</h2>
                            {generatedLetter && (
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={handleCopy}>
                                        {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                                        {copied ? "Copied" : "Copy"}
                                    </Button>
                                    {/* Download button */}
                                    <PDFDownloadLink
                                        document={<CoverLetterPDF content={generatedLetter} />}
                                        fileName="cover-letter.pdf"
                                    >
                                        {/* @ts-ignore - render props type mismatch often occurs with dynamic import */}
                                        {({ blob, url, loading, error }) => (
                                            <Button variant="outline" size="sm" disabled={loading}>
                                                {loading ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Download className="w-4 h-4 mr-1" />
                                                )}
                                                {loading ? "Preparing..." : "Download PDF"}
                                            </Button>
                                        )}
                                    </PDFDownloadLink>
                                </div>
                            )}
                        </div>

                        <Card className="flex-1 border-border/50 bg-card/80 backdrop-blur-md min-h-[500px]">
                            <CardContent className="p-8 h-full overflow-auto custom-scrollbar">
                                {generatedLetter ? (
                                    <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-foreground prose-p:text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground">
                                        <ReactMarkdown>{generatedLetter}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                                        <FileText className="w-16 h-16 mb-4" />
                                        <p>Generated letter will appear here</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </div>
        </div>
    );
}
