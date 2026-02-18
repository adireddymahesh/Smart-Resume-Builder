export interface ResumeProfile {
    fullName: string;
    email: string;
    phone: string;
    website?: string;
    linkedin?: string;
    github?: string;
    location?: string;
    summary: string;
    jobTitle?: string;
}

export interface ResumeExperience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string; // or "Present"
    description: string; // Markdown or bullet points
}

export interface ResumeEducation {
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    description?: string;
}

export interface ResumeSkill {
    id: string;
    name: string;
    level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface ResumeProject {
    id: string;
    name: string;
    description: string;
    link?: string;
    technologies?: string[];
}

export interface ResumeCertification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    link?: string;
}

export interface ResumeCustomSection {
    title: string;
    content: string; // Markdown or plain text
    visible: boolean;
}

export interface ResumeData {
    id?: string;
    userId: string;
    title: string; // Internal title for the resume
    templateId: string;
    themeColor: string;
    profile: ResumeProfile;
    experience: ResumeExperience[];
    education: ResumeEducation[];
    skills: ResumeSkill[];
    projects: ResumeProject[];
    certifications: ResumeCertification[];
    customSection: ResumeCustomSection;
    createdAt: number; // Timestamp
    updatedAt: number; // Timestamp
}

export const initialResumeState: ResumeData = {
    userId: "",
    title: "Untitled Resume",
    templateId: "modern",
    themeColor: "#7c3aed",
    profile: {
        fullName: "",
        email: "",
        phone: "",
        jobTitle: "",
        summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    customSection: {
        title: "Additional Information",
        content: "",
        visible: false,
    },
    createdAt: Date.now(),
    updatedAt: Date.now(),
};
