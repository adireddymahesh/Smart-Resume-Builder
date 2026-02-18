import { useResume } from "@/context/ResumeContext";

import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { ProfessionalTemplate } from "@/components/templates/ProfessionalTemplate";
import { ElegantTemplate } from "@/components/templates/ElegantTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";

export function ResumePreview() {
    const { resumeData } = useResume();
    const { templateId } = resumeData;

    switch (templateId) {
        case "professional":
            return <ProfessionalTemplate data={resumeData} />;
        case "elegant":
            return <ElegantTemplate data={resumeData} />;
        case "creative":
            return <CreativeTemplate data={resumeData} />;
        case "modern":
        default:
            return <ModernTemplate data={resumeData} />;
    }
}
