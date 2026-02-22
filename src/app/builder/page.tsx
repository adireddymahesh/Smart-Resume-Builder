"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/ResumeContext";
import { PersonalInfoForm } from "@/components/builder/forms/PersonalInfoForm";
import { ExperienceForm } from "@/components/builder/forms/ExperienceForm";
import { EducationForm } from "@/components/builder/forms/EducationForm";
import { SkillsForm } from "@/components/builder/forms/SkillsForm";

import { ProjectsForm } from "@/components/builder/forms/ProjectsForm";
import { CertificationsForm } from "@/components/builder/forms/CertificationsForm";
import { AdditionalInfoForm } from "@/components/builder/forms/AdditionalInfoForm";
import { ResumePreview } from "../../components/builder/ResumePreview";
import { ATSChecker } from "@/components/builder/ATSChecker";
import { ArrowLeft, Save, Download, LayoutTemplate, Monitor, FileText, CheckCircle, Award, Loader2, PlusCircle, TrendingUp, Sparkles, Pencil, Check, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useReactToPrint } from "react-to-print";
import { initialResumeState } from "@/types/resume";
import { useSearchParams } from "next/navigation";
import * as htmlToImage from "html-to-image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function BuilderContent() {
    const searchParams = useSearchParams();
    const resumeId = searchParams.get("id");
    const { resumeData, setResumeData, updateResumeSection } = useResume();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<"content" | "design" | "ats">("content");
    const [activeSection, setActiveSection] = useState("personal");
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [tempTitle, setTempTitle] = useState("");
    const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);

    const previewRef = useRef<HTMLDivElement>(null);
    const printContentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    const [notFound, setNotFound] = useState(false);

    // A4 height in natural pixels (297mm at 96dpi)
    const A4_H_PX = 1122.5;

    // Section-aware page breaks: computed break points in natural pixels.
    // Each value is the contentHeight offset where a new page should start.
    const [pageBreaks, setPageBreaks] = useState<number[]>([0]);

    const computePageBreaks = () => {
        const el = printContentRef.current;
        if (!el || el.scrollHeight < 100) return;

        const totalHeight = el.scrollHeight;
        setContentHeight(totalHeight);

        // Query direct children of the template root — these are the top-level sections
        // el is #resume-print-content
        // el.firstElementChild is the ResumePreview zoom wrapper
        // el.firstElementChild.firstElementChild is the actual template's root div
        const templateRoot = el.firstElementChild?.firstElementChild as HTMLElement | null;
        if (!templateRoot) {
            setPageBreaks([0]);
            return;
        }

        const containerTop = el.getBoundingClientRect().top;
        const sections = Array.from(templateRoot.children) as HTMLElement[];

        const breaks: number[] = [0];
        let pageBottom = A4_H_PX; // end of the first page in natural px

        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            const sTop = Math.max(0, rect.top - containerTop);
            const sBot = sTop + rect.height;

            // If this section straddles the current page boundary, push break to section start
            if (sTop < pageBottom && sBot > pageBottom && sTop > 10) {
                // Only break if it's not the very top of the page
                // to avoid pushing an empty page 1
                const lastBreak = breaks[breaks.length - 1];
                if (sTop - lastBreak > 50) {
                    breaks.push(sTop);
                    pageBottom = sTop + A4_H_PX;
                }
            }

            // If a single section is taller than one page, add raw breaks inside it
            while (pageBottom < sBot) {
                breaks.push(pageBottom);
                pageBottom += A4_H_PX;
            }
        }

        setPageBreaks(breaks);
    };

    // Recompute on resumeData changes (deferred so DOM has time to paint)
    useEffect(() => {
        const frameId = requestAnimationFrame(() => {
            computePageBreaks();
            // Retry once more at 500ms for slow-to-render content
            setTimeout(computePageBreaks, 500);
        });
        return () => cancelAnimationFrame(frameId);
    }, [resumeData]); // eslint-disable-line react-hooks/exhaustive-deps

    // Continuous ResizeObserver for live typing updates
    useEffect(() => {
        const el = printContentRef.current;
        if (!el) return;
        const observer = new ResizeObserver(() => computePageBreaks());
        observer.observe(el);
        return () => observer.disconnect();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Load data specific to this resume ID
    useEffect(() => {
        const loadData = async () => {
            if (!user?.uid || !resumeId) return;

            setIsLoading(true);
            try {
                const docRef = doc(db, "users", user.uid, "resumes", resumeId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setResumeData(docSnap.data() as any);
                } else {
                    // Strict Mode: If ID doesn't exist, show error.
                    // Do NOT initialize blank state here.
                    setNotFound(true);
                }
            } catch (error) {
                console.error("Error loading resume:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            loadData();
        }
    }, [user, resumeId, setResumeData]);

    const handlePrint = useReactToPrint({
        contentRef: previewRef,
        documentTitle: resumeData.profile.fullName || "Resume",
        pageStyle: `
        @page {
            size: A4 portrait;
            margin: 0 !important;
        }
        @media print {
            body { 
                margin: 0 !important; 
                padding: 0 !important;
                background: white !important;
            }
        }
        `,
    });

    const [isExportingImage, setIsExportingImage] = useState(false);

    const handleExportImage = async (format: 'png' | 'jpeg') => {
        if (!previewRef.current) return;
        setIsExportingImage(true);
        try {
            // Un-hide the container temporarily
            const container = previewRef.current.parentElement;
            if (container) {
                const originalLeft = container.style.left;
                container.style.left = '0px';
                container.style.zIndex = '-9999';

                // We use html-to-image because html2canvas fails on Tailwind v4 lab() colors
                const dataUrl = await (format === 'png'
                    ? htmlToImage.toPng(previewRef.current, { pixelRatio: 2 })
                    : htmlToImage.toJpeg(previewRef.current, { pixelRatio: 2, quality: 1.0 })
                );

                // Restore hidden state
                container.style.left = originalLeft;
                container.style.zIndex = 'auto';

                const link = document.createElement('a');
                link.download = `${resumeData.profile.fullName || "Resume"}.${format === 'jpeg' ? 'jpg' : format}`;
                link.href = dataUrl;
                link.click();
            }
        } catch (error) {
            console.error("Error exporting image:", error);
            alert("Failed to export image. Please try again.");
        } finally {
            setIsExportingImage(false);
        }
    };

    const handleSave = async () => {
        if (!user || !resumeId) return;
        setIsSaving(true);
        try {
            const resumeRef = doc(db, "users", user.uid, "resumes", resumeId);
            await setDoc(resumeRef, {
                ...resumeData,
                id: resumeId, // Save ID into the document too
                updatedAt: new Date().toISOString(),
            });
            // Optional: Show success toast
            console.log("Resume saved!");
        } catch (error) {
            console.error("Error saving resume:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleEnhance = async () => {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_AI_API_KEY;
        if (!apiKey) {
            alert("To use AI features, please add NEXT_PUBLIC_GEMINI_API_KEY or NEXT_PUBLIC_AI_API_KEY to your .env file!");
            return;
        }

        setIsEnhancing(true);
        try {
            // Dynamically import to avoid server-side issues
            const { enhanceResumeContent } = await import("@/lib/gemini");
            const enhancedData = await enhanceResumeContent(resumeData);
            setResumeData(enhancedData);
            alert("Resume enhanced successfully! formatting and keywords have been optimized.");
        } catch (error: any) {
            console.error("Enhancement failed:", error);
            if (error.message?.includes("429") || error.message?.includes("quota")) {
                alert("You've hit the free usage limit. Please wait a minute and try again!");
            } else {
                alert(`Failed to enhance resume: ${error.message || "Unknown error"}`);
            }
        } finally {
            setIsEnhancing(false);
        }
    };

    const handleTitleSave = async () => {
        if (!tempTitle.trim()) {
            setIsEditingTitle(false);
            return;
        }

        // 1. Update local state
        updateResumeSection("title", tempTitle);
        setIsEditingTitle(false);

        // 2. Save to Firestore immediately
        if (!user || !resumeId) return;

        try {
            const resumeRef = doc(db, "users", user.uid, "resumes", resumeId);
            await setDoc(resumeRef, {
                title: tempTitle,
                updatedAt: new Date().toISOString(),
            }, { merge: true });
        } catch (error) {
            console.error("Error saving title:", error);
            alert("Failed to save title publically. Please check your connection.");
        }
    };

    const sections = [
        { id: "personal", label: "Personal Info", icon: <FileText className="w-4 h-4" /> },
        { id: "experience", label: "Experience", icon: <BriefcaseIcon className="w-4 h-4" /> },
        { id: "projects", label: "Projects", icon: <Monitor className="w-4 h-4" /> },
        { id: "education", label: "Education", icon: <GraduationCapIcon className="w-4 h-4" /> },
        { id: "certifications", label: "Certifications", icon: <Award className="w-4 h-4" /> },
        { id: "skills", label: "Skills", icon: <CheckCircle className="w-4 h-4" /> },
        { id: "additional", label: "Additional", icon: <PlusCircle className="w-4 h-4" /> },
    ];

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-4">
                <div className="bg-red-500/10 p-4 rounded-full">
                    <FileText className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold">Resume Not Found</h1>
                <p className="text-muted-foreground text-center max-w-md">
                    We couldn't find a resume with this ID. It may have been deleted or you might not have permission to view it.
                </p>
                <Link href="/dashboard">
                    <Button>Return to Dashboard</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
            {/* Top Bar */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm z-10">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        {isEditingTitle ? (
                            <div className="flex items-center gap-2">
                                <input
                                    value={tempTitle}
                                    onChange={(e) => setTempTitle(e.target.value)}
                                    className="text-lg font-semibold bg-transparent border-b border-primary focus:outline-none p-0 m-0 w-full min-w-[200px]"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleTitleSave();
                                        } else if (e.key === "Escape") {
                                            setIsEditingTitle(false);
                                        }
                                    }}
                                />
                                <button
                                    onClick={handleTitleSave}
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full p-1 transition-colors"
                                >
                                    <Check className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsEditingTitle(false)}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full p-1 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 group">
                                <h1
                                    className="text-lg font-semibold cursor-pointer"
                                    onClick={() => {
                                        setTempTitle(resumeData.title || "Untitled Resume");
                                        setIsEditingTitle(true);
                                    }}
                                >
                                    {resumeData.title || "Untitled Resume"}
                                </h1>
                                <button
                                    onClick={() => {
                                        setTempTitle(resumeData.title || "Untitled Resume");
                                        setIsEditingTitle(true);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-all"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )}
                        <p className="text-xs text-muted-foreground">Draft • Last saved: Using Smart Save</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEnhance}
                        disabled={isEnhancing}
                        className="bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                    >
                        {isEnhancing ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Sparkles className="w-4 h-4 mr-2" />
                        )}
                        {isEnhancing ? "Enhancing..." : "Enhance with AI"}
                    </Button>

                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4 mr-2" />
                        )}
                        {isSaving ? "Saving..." : "Save"}
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="sm"
                                disabled={isExportingImage}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 hover:opacity-90 transition-opacity shadow-md"
                            >
                                {isExportingImage ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                                {isExportingImage ? "Exporting..." : "Export"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-background border-border">
                            <DropdownMenuItem onClick={handlePrint} className="cursor-pointer">
                                Download as PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExportImage('png')} className="cursor-pointer">
                                Download as PNG
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExportImage('jpeg')} className="cursor-pointer">
                                Download as JPG
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Main Workspace */}
            <main className="flex-1 flex overflow-hidden relative">
                {/* Left Side - Editor */}
                <div className={cn(
                    "w-full lg:w-[55%] lg:min-w-[500px] border-r border-border flex flex-col bg-card/20 pb-20 lg:pb-0",
                    isMobilePreviewOpen ? "hidden lg:flex" : "flex"
                )}>
                    <div className="p-4 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                        <div className="flex space-x-2 bg-muted/50 p-1 rounded-lg w-fit mb-4">
                            <button
                                onClick={() => setActiveTab("content")}
                                className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-all", activeTab === "content" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
                            >
                                Content
                            </button>
                            <button
                                onClick={() => setActiveTab("design")}
                                className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-all", activeTab === "design" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
                            >
                                Design
                            </button>
                            <button
                                onClick={() => setActiveTab("ats")}
                                className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2", activeTab === "ats" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
                            >
                                <TrendingUp className="w-3.5 h-3.5" /> ATS Score
                            </button>
                        </div>

                        {activeTab === "content" && (
                            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                                {sections.map(section => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap",
                                            activeSection === section.id
                                                ? "bg-primary/10 border-primary text-primary"
                                                : "bg-background border-border hover:border-primary/50 text-muted-foreground"
                                        )}
                                    >
                                        {section.icon} {section.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="mt-4 pt-4 border-t border-border/50">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Document Font Size</h3>
                                <span className="text-xs font-semibold tabular-nums text-foreground">{resumeData.baseFontSize ?? 11}pt</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="8"
                                    max="14"
                                    step="0.5"
                                    value={resumeData.baseFontSize ?? 11}
                                    onChange={(e) => updateResumeSection('baseFontSize', parseFloat(e.target.value))}
                                    className="flex-1 accent-primary cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-12 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
                        {activeTab === "content" && (
                            <div className="max-w-2xl mx-auto space-y-12 pb-20">
                                <section id="personal" className="scroll-mt-6">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                                        Personal Informaton
                                    </h2>
                                    <PersonalInfoForm />
                                </section>

                                <section id="experience" className="scroll-mt-6">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                                        Experience
                                    </h2>
                                    <ExperienceForm />
                                </section>

                                <section id="projects" className="scroll-mt-6">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                                        Projects
                                    </h2>
                                    <ProjectsForm />
                                </section>

                                <section id="education" className="scroll-mt-6">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                                        Education
                                    </h2>
                                    <EducationForm />
                                </section>

                                <section id="certifications" className="scroll-mt-6">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                                        Certifications
                                    </h2>
                                    <CertificationsForm />
                                </section>

                                <section id="skills" className="scroll-mt-6">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                                        Skills
                                    </h2>
                                    <SkillsForm />
                                </section>

                                <section id="additional" className="scroll-mt-6">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                                        Additional Information
                                    </h2>
                                    <AdditionalInfoForm />
                                </section>
                            </div>
                        )}
                        {activeTab === "design" && (
                            <div className="space-y-8 pb-20">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Choose Template</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { id: 'modern', name: 'Modern', color: 'bg-gradient-to-br from-gray-100 to-gray-200' },
                                            { id: 'professional', name: 'Professional', color: 'bg-blue-50 border-l-4 border-blue-200' },
                                            { id: 'elegant', name: 'Elegant', color: 'bg-[#fcfbf9] border border-stone-200 font-serif' },
                                            { id: 'creative', name: 'Creative', color: 'bg-gray-50 border-2 border-gray-900' },
                                            { id: 'ats-standard', name: 'ATS Standard', color: 'bg-white border-2 border-gray-300 font-serif' },
                                            { id: 'executive', name: 'Executive', color: 'bg-slate-50 border-t-4 border-slate-900' },
                                        ].map((template) => (
                                            <div
                                                key={template.id}
                                                onClick={() => updateResumeSection("templateId", template.id)}
                                                className={cn(
                                                    "cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:scale-[1.02]",
                                                    resumeData.templateId === template.id
                                                        ? "border-primary ring-2 ring-primary/20 shadow-lg"
                                                        : "border-transparent hover:border-primary/50 opacity-80 hover:opacity-100"
                                                )}
                                            >
                                                <div className={cn("aspect-[210/297] w-full flex items-center justify-center p-4", template.color)}>
                                                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{template.name}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Accent Color</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            "#000000", // Classic Black
                                            "#334155", // Slate
                                            "#1e3a8a", // Navy Blue
                                            "#15803d", // Deep Green
                                            "#881337", // Wine Red
                                            "#4c1d95", // Deep Purple
                                            "#0f766e", // Teal
                                            "#a16207", // Golden/Bronze
                                        ].map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => updateResumeSection("themeColor", color)}
                                                className={cn(
                                                    "w-10 h-10 rounded-full border-2 transition-all hover:scale-110",
                                                    resumeData.themeColor === color
                                                        ? "border-background ring-2 ring-foreground scale-110"
                                                        : "border-transparent opacity-80 hover:opacity-100"
                                                )}
                                                style={{ backgroundColor: color }}
                                                aria-label={`Select color ${color}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "ats" && (
                            <div className="pb-20">
                                <ATSChecker data={resumeData} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side - Preview (PDF viewer style) */}

                {/* Hidden off-screen print target — used ONLY for Export PDF */}
                <div style={{ position: 'fixed', left: '-9999px', top: 0, width: '210mm' }} aria-hidden="true">
                    <div
                        ref={previewRef}
                        id="resume-preview-container"
                        className="bg-white text-black w-[210mm]"
                    >
                        <div ref={printContentRef} id="resume-print-content" className="w-full">
                            <ResumePreview />
                        </div>
                    </div>
                </div>

                {/* Visual multi-page preview */}
                <div className={cn(
                    "flex-1 bg-[#525659] overflow-y-auto pb-20 lg:pb-0",
                    !isMobilePreviewOpen ? "hidden lg:block" : "block"
                )}>
                    {(() => {
                        const PREVIEW_ZOOM = 0.65;
                        const A4_H_PX = 1122.5;
                        return (
                            <div
                                className="flex flex-col items-center py-8 gap-5"
                                style={{ zoom: PREVIEW_ZOOM }}
                            >
                                {pageBreaks.map((breakStart, i) => {
                                    const breakEnd = pageBreaks[i + 1] ?? contentHeight;
                                    // Each page shows at least A4 height, except the very last
                                    const pageH = i < pageBreaks.length - 1
                                        ? A4_H_PX
                                        : Math.max(breakEnd - breakStart, 1); // last page: natural height
                                    return (
                                        <div
                                            key={i}
                                            className="relative bg-white shadow-xl print:hidden"
                                            style={{ width: '210mm', height: `${pageH}px`, overflow: 'hidden' }}
                                        >
                                            {/* Page number badge */}
                                            <div className="absolute bottom-2 right-2 z-10 bg-black/10 text-gray-500 text-[8px] font-medium px-2 py-0.5 rounded-full">
                                                Page {i + 1}
                                            </div>
                                            {/* Shift content to show only this page's slice */}
                                            <div style={{ height: `${breakEnd - breakStart}px`, overflow: 'hidden' }}>
                                                <div style={{ marginTop: `-${breakStart}px` }}>
                                                    <ResumePreview />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })()}
                </div>

                {/* Mobile Floating Toggle Button */}
                <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                    <Button
                        size="lg"
                        onClick={() => setIsMobilePreviewOpen(!isMobilePreviewOpen)}
                        className="rounded-full shadow-2xl bg-primary text-primary-foreground px-6 py-6"
                    >
                        {isMobilePreviewOpen ? (
                            <><Pencil className="w-5 h-5 mr-2" /> Edit Resume</>
                        ) : (
                            <><FileText className="w-5 h-5 mr-2" /> View Preview</>
                        )}
                    </Button>
                </div>
            </main>
        </div>
    );
}

// Simple icons for the navigation
function BriefcaseIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    )
}

function GraduationCapIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    )
}

export default function BuilderPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
            <BuilderContent />
        </Suspense>
    );
}
