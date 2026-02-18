"use client";

import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PersonalInfoForm() {
    const { resumeData, updateResumeSection } = useResume();
    const { profile } = resumeData;
    const [loading, setLoading] = useState(false);

    const handleChange = (field: keyof typeof profile, value: string) => {
        updateResumeSection("profile", { ...profile, [field]: value });
    };

    const handleRewrite = async () => {
        if (!profile.summary) return;
        setLoading(true);
        try {
            const { optimizeText } = await import("@/lib/gemini");
            const polishedText = await optimizeText(profile.summary);
            handleChange("summary", polishedText);
        } catch (error: any) {
            console.error("Error rewriting:", error);
            alert("Failed to rewrite text. Please check your API key.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
            <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium uppercase text-muted-foreground">Full Name</label>
                        <Input
                            value={profile.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                            placeholder="Ex: John Doe"
                            className="bg-background/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium uppercase text-muted-foreground">Job Title</label>
                        <Input
                            value={profile.jobTitle || ""}
                            onChange={(e) => handleChange("jobTitle", e.target.value)}
                            placeholder="Ex: Senior Software Engineer"
                            className="bg-background/50"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium uppercase text-muted-foreground">Email</label>
                        <Input
                            value={profile.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="john@example.com"
                            className="bg-background/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium uppercase text-muted-foreground">Phone</label>
                        <Input
                            value={profile.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="+1 234 567 890"
                            className="bg-background/50"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-medium uppercase text-muted-foreground">Website / Portfolio</label>
                    <Input
                        value={profile.website || ""}
                        onChange={(e) => handleChange("website", e.target.value)}
                        placeholder="https://johndoe.com"
                        className="bg-background/50"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium uppercase text-muted-foreground">LinkedIn</label>
                        <Input
                            value={profile.linkedin || ""}
                            onChange={(e) => handleChange("linkedin", e.target.value)}
                            placeholder="linkedin.com/in/johndoe"
                            className="bg-background/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium uppercase text-muted-foreground">GitHub</label>
                        <Input
                            value={profile.github || ""}
                            onChange={(e) => handleChange("github", e.target.value)}
                            placeholder="github.com/johndoe"
                            className="bg-background/50"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-medium uppercase text-muted-foreground">Professional Summary</label>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRewrite}
                            disabled={loading || !profile.summary}
                            className="h-6 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                        >
                            {loading ? (
                                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            ) : (
                                <Wand2 className="w-3 h-3 mr-1" />
                            )}
                            Rewrite with AI
                        </Button>
                    </div>
                    <Textarea
                        value={profile.summary || ""}
                        onChange={(e) => handleChange("summary", e.target.value)}
                        placeholder="Briefly describe your professional background and goals..."
                        className="min-h-[120px]"
                    />
                </div>

            </CardContent>
        </Card>
    );
}
