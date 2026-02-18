"use client";

import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function AdditionalInfoForm() {
    const { resumeData, updateResumeSection } = useResume();
    const { customSection } = resumeData;

    // Handle initial undefined state if necessary (though initialResumeState handles it)
    const section = customSection || { title: "Additional Information", content: "", visible: false };

    const handleChange = (field: keyof typeof section, value: any) => {
        updateResumeSection("customSection", { ...section, [field]: value });
    };

    return (
        <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Custom Section</CardTitle>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="custom-visible"
                        checked={section.visible}
                        onCheckedChange={(checked) => handleChange("visible", checked)}
                    />
                    <Label htmlFor="custom-visible" className="text-xs">Show on Resume</Label>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-medium uppercase text-muted-foreground">Section Title</label>
                    <Input
                        value={section.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="e.g. Languages, Volunteering, Hobbies"
                        className="bg-background/50"
                        disabled={!section.visible}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-medium uppercase text-muted-foreground">Content</label>
                    <Textarea
                        value={section.content}
                        onChange={(e) => handleChange("content", e.target.value)}
                        placeholder="Enter your additional details (markdown supported)..."
                        className="min-h-[150px] bg-background/50"
                        disabled={!section.visible}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
