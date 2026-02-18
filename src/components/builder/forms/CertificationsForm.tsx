"use client";

import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ResumeCertification } from "@/types/resume";
import { Plus, Trash2 } from "lucide-react";

export function CertificationsForm() {
    const { resumeData, updateResumeSection } = useResume();
    const { certifications } = resumeData;

    const addCertification = () => {
        const newCert: ResumeCertification = {
            id: crypto.randomUUID(),
            name: "",
            issuer: "",
            date: "",
            link: "",
        };
        updateResumeSection("certifications", [...certifications, newCert]);
    };

    const removeCertification = (id: string) => {
        updateResumeSection("certifications", certifications.filter((cert) => cert.id !== id));
    };

    const updateCertification = (id: string, field: keyof ResumeCertification, value: string) => {
        const updatedCertifications = certifications.map((cert) =>
            cert.id === id ? { ...cert, [field]: value } : cert
        );
        updateResumeSection("certifications", updatedCertifications);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-medium">Certifications</h3>
                    <p className="text-sm text-muted-foreground">Add licenses and certifications.</p>
                </div>
                <Button onClick={addCertification} size="sm" variant="outline" className="border-dashed">
                    <Plus className="w-4 h-4 mr-2" /> Add Certification
                </Button>
            </div>

            {certifications.length === 0 && (
                <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground bg-accent/5">
                    No certifications added yet.
                </div>
            )}

            {certifications.map((cert) => (
                <Card key={cert.id} className="relative group bg-card/50 border-white/5">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeCertification(cert.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Certificate Level / Name</label>
                                <Input
                                    value={cert.name}
                                    onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                                    placeholder="Ex: AWS Certified Solutions Architect"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Issuing Organization</label>
                                <Input
                                    value={cert.issuer}
                                    onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                                    placeholder="Ex: Amazon Web Services"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Date Issued</label>
                                <Input
                                    value={cert.date}
                                    onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                                    placeholder="Ex: Dec 2023"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium uppercase text-muted-foreground">Credential URL (Optional)</label>
                                <Input
                                    value={cert.link || ""}
                                    onChange={(e) => updateCertification(cert.id, "link", e.target.value)}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
