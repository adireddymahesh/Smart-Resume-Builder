"use client";

import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ResumeEducation } from "@/types/resume";
import { Plus, Trash2 } from "lucide-react";

export function EducationForm() {
    const { resumeData, updateResumeSection } = useResume();
    const { education } = resumeData;

    const addEducation = () => {
        const newEdu: ResumeEducation = {
            id: crypto.randomUUID(),
            school: "",
            degree: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: "",
            description: "",
        };
        updateResumeSection("education", [...education, newEdu]);
    };

    const removeEducation = (id: string) => {
        updateResumeSection("education", education.filter((edu) => edu.id !== id));
    };

    const updateEducation = (id: string, field: keyof ResumeEducation, value: string) => {
        const updatedEducation = education.map((edu) =>
            edu.id === id ? { ...edu, [field]: value } : edu
        );
        updateResumeSection("education", updatedEducation);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-medium">Education</h3>
                    <p className="text-sm text-muted-foreground">Add your academic background.</p>
                </div>
                <Button onClick={addEducation} size="sm" variant="outline" className="border-dashed">
                    <Plus className="w-4 h-4 mr-2" /> Add Education
                </Button>
            </div>

            {education.length === 0 && (
                <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground bg-accent/5">
                    No education added yet.
                </div>
            )}

            {education.map((edu) => (
                <Card key={edu.id} className="relative group bg-card/50 border-white/5">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeEducation(edu.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">School / University</label>
                                <Input
                                    value={edu.school}
                                    onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                                    placeholder="Ex: Stanford University"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Degree</label>
                                <Input
                                    value={edu.degree}
                                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                    placeholder="Ex: Bachelor of Science"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Field of Study</label>
                                <Input
                                    value={edu.fieldOfStudy}
                                    onChange={(e) => updateEducation(edu.id, "fieldOfStudy", e.target.value)}
                                    placeholder="Ex: Computer Science"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Grade / CGPA</label>
                                <Input
                                    value={edu.grade || ""}
                                    onChange={(e) => updateEducation(edu.id, "grade", e.target.value)}
                                    placeholder="Ex: 3.8/4.0 or 95%"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Start Date</label>
                                <Input
                                    value={edu.startDate}
                                    onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                                    placeholder="Ex: 2018"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">End Date</label>
                                <Input
                                    value={edu.endDate}
                                    onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                                    placeholder="Ex: 2022"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
