"use client";

import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResumeSkill } from "@/types/resume";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function SkillsForm() {
    const { resumeData, updateResumeSection } = useResume();
    const { skills } = resumeData;
    const [newSkill, setNewSkill] = useState("");

    const addSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSkill.trim()) return;

        const skill: ResumeSkill = {
            id: crypto.randomUUID(),
            name: newSkill.trim(),
            level: "Intermediate", // Default level
        };
        updateResumeSection("skills", [...skills, skill]);
        setNewSkill("");
    };

    const removeSkill = (id: string) => {
        updateResumeSection("skills", skills.filter((s) => s.id !== id));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-medium">Skills</h3>
                    <p className="text-sm text-muted-foreground">Add relevant professional skills.</p>
                </div>
            </div>

            <Card className="bg-card/50 border-white/5">
                <CardContent className="pt-6">
                    <form onSubmit={addSkill} className="flex gap-2 mb-6">
                        <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill (e.g. React, Python, Project Management)"
                            className="bg-background/50"
                        />
                        <Button type="submit" size="sm">
                            <Plus className="w-4 h-4 mr-2" /> Add
                        </Button>
                    </form>

                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <div
                                key={skill.id}
                                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20 text-sm animate-in fade-in zoom-in duration-300"
                            >
                                <span>{skill.name}</span>
                                <button
                                    onClick={() => removeSkill(skill.id)}
                                    className="hover:text-destructive transition-colors focus:outline-none"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                        {skills.length === 0 && (
                            <p className="text-sm text-muted-foreground w-full text-center py-4">No skills added yet.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
