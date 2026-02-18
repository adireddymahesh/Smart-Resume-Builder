"use client";

import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ResumeExperience } from "@/types/resume";
import { Plus, Trash2, Wand2, Loader2 } from "lucide-react";
import { useState } from "react";

export function ExperienceForm() {
    const { resumeData, updateResumeSection } = useResume();
    const { experience } = resumeData;
    const [loading, setLoading] = useState<string | null>(null);

    const handleRewrite = async (id: string, currentText: string) => {
        if (!currentText) return;
        setLoading(id);
        try {
            const { optimizeText } = await import("@/lib/gemini");
            const polishedText = await optimizeText(currentText);
            updateExperience(id, "description", polishedText);
        } catch (error: any) {
            console.error("Error rewriting:", error);
            alert("Failed to rewrite text. Please check your API key.");
        } finally {
            setLoading(null);
        }
    };

    const addExperience = () => {
        const newExp: ResumeExperience = {
            id: crypto.randomUUID(),
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
        };
        updateResumeSection("experience", [...experience, newExp]);
    };

    const removeExperience = (id: string) => {
        updateResumeSection("experience", experience.filter((exp) => exp.id !== id));
    };

    const updateExperience = (id: string, field: keyof ResumeExperience, value: string) => {
        const updatedExperience = experience.map((exp) =>
            exp.id === id ? { ...exp, [field]: value } : exp
        );
        updateResumeSection("experience", updatedExperience);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-medium">Work Experience</h3>
                    <p className="text-sm text-muted-foreground">Add your previous job positions.</p>
                </div>
                <Button onClick={addExperience} size="sm" variant="outline" className="border-dashed">
                    <Plus className="w-4 h-4 mr-2" /> Add Position
                </Button>
            </div>

            {experience.length === 0 && (
                <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground bg-accent/5">
                    No experience added yet. It's properly okay for freshers!
                </div>
            )}

            {experience.map((exp, index) => (
                <Card key={exp.id} className="relative group bg-card/50 border-white/5">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeExperience(exp.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Job Title</label>
                                <Input
                                    value={exp.position}
                                    onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                                    placeholder="Ex: Software Engineer"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Company Name</label>
                                <Input
                                    value={exp.company}
                                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                    placeholder="Ex: Google"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Start Date</label>
                                <Input
                                    value={exp.startDate}
                                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                    type="text"
                                    placeholder="Ex: Jan 2022"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">End Date</label>
                                <Input
                                    value={exp.endDate}
                                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                    type="text"
                                    placeholder="Ex: Present"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Description</label>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRewrite(exp.id, exp.description)}
                                    disabled={loading === exp.id || !exp.description}
                                    className="h-6 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                                >
                                    {loading === exp.id ? (
                                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                    ) : (
                                        <Wand2 className="w-3 h-3 mr-1" />
                                    )}
                                    Rewrite with AI
                                </Button>
                            </div>
                            <Textarea
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                                placeholder="Describe your responsibilities and achievements..."
                                className="min-h-[100px]"
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
