"use client";

import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ResumeProject } from "@/types/resume";
import { Plus, Trash2, Wand2, Loader2 } from "lucide-react";
import { useState } from "react";

export function ProjectsForm() {
    const { resumeData, updateResumeSection } = useResume();
    const { projects } = resumeData;
    const [loading, setLoading] = useState<string | null>(null);

    const handleRewrite = async (id: string, currentText: string) => {
        if (!currentText) return;
        setLoading(id);
        try {
            const { optimizeText } = await import("@/lib/gemini");
            const polishedText = await optimizeText(currentText);
            updateProject(id, "description", polishedText);
        } catch (error: any) {
            console.error("Error rewriting:", error);
            alert("Failed to rewrite text. Please check your API key.");
        } finally {
            setLoading(null);
        }
    };

    const addProject = () => {
        const newProject: ResumeProject = {
            id: crypto.randomUUID(),
            name: "",
            description: "",
            link: "",
            technologies: [],
        };
        updateResumeSection("projects", [...projects, newProject]);
    };

    const removeProject = (id: string) => {
        updateResumeSection("projects", projects.filter((proj) => proj.id !== id));
    };

    const updateProject = (id: string, field: keyof ResumeProject, value: any) => {
        const updatedProjects = projects.map((proj) =>
            proj.id === id ? { ...proj, [field]: value } : proj
        );
        updateResumeSection("projects", updatedProjects);
    };

    const updateTechnologies = (id: string, value: string) => {
        const techs = value.split(",").map((t) => t.trim());
        updateProject(id, "technologies", techs);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-medium">Projects</h3>
                    <p className="text-sm text-muted-foreground">Add your personal or academic projects.</p>
                </div>
                <Button onClick={addProject} size="sm" variant="outline" className="border-dashed">
                    <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
            </div>

            {projects.length === 0 && (
                <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground bg-accent/5">
                    No projects added yet.
                </div>
            )}

            {projects.map((proj) => (
                <Card key={proj.id} className="relative group bg-card/50 border-white/5">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeProject(proj.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Project Name</label>
                                <Input
                                    value={proj.name}
                                    onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                                    placeholder="Ex: E-commerce Website"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Link (Optional)</label>
                                <Input
                                    value={proj.link || ""}
                                    onChange={(e) => updateProject(proj.id, "link", e.target.value)}
                                    placeholder="https://github.com/..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium uppercase text-muted-foreground">Technologies Used</label>
                            <Input
                                value={proj.technologies?.join(", ") || ""}
                                onChange={(e) => updateTechnologies(proj.id, e.target.value)}
                                placeholder="Ex: React, Node.js, Firebase (comma separated)"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Overview / Description</label>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRewrite(proj.id, proj.description)}
                                    disabled={loading === proj.id || !proj.description}
                                    className="h-6 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                                >
                                    {loading === proj.id ? (
                                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                    ) : (
                                        <Wand2 className="w-3 h-3 mr-1" />
                                    )}
                                    Rewrite with AI
                                </Button>
                            </div>
                            <Textarea
                                value={proj.description}
                                onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                                placeholder="Describe the project, your role, and the outcome..."
                                className="min-h-[100px]"
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
