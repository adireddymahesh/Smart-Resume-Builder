"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ResumeData, initialResumeState } from "@/types/resume";

interface ResumeContextType {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
    updateResumeSection: (section: keyof ResumeData, data: any) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
    const [resumeData, setResumeData] = useState<ResumeData>(initialResumeState);

    // Removed global localStorage effect to prevent data leakage across users/sessions
    // Data persistence is now handled by the page component directly with Firestore

    const updateResumeSection = (section: keyof ResumeData, data: any) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: data,
            updatedAt: Date.now(),
        }));
    };

    return (
        <ResumeContext.Provider value={{ resumeData, setResumeData, updateResumeSection }}>
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error("useResume must be used within a ResumeProvider");
    }
    return context;
}
