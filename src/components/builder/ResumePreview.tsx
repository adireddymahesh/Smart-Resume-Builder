import { useResume } from "@/context/ResumeContext";

import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { ProfessionalTemplate } from "@/components/templates/ProfessionalTemplate";
import { ElegantTemplate } from "@/components/templates/ElegantTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { ATSStandardTemplate } from "@/components/templates/ATSStandardTemplate";
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate";

export function ResumePreview() {
    const { resumeData } = useResume();
    const { templateId } = resumeData;

    const fontSizeScale = (resumeData.baseFontSize ?? 11) / 11;

    let TemplateComponent;
    switch (templateId) {
        case "professional":
            TemplateComponent = <ProfessionalTemplate data={resumeData} />;
            break;
        case "elegant":
            TemplateComponent = <ElegantTemplate data={resumeData} />;
            break;
        case "creative":
            TemplateComponent = <CreativeTemplate data={resumeData} />;
            break;
        case "ats-standard":
            TemplateComponent = <ATSStandardTemplate data={resumeData} />;
            break;
        case "executive":
            TemplateComponent = <ExecutiveTemplate data={resumeData} />;
            break;
        case "modern":
        default:
            TemplateComponent = <ModernTemplate data={resumeData} />;
            break;
    }

    // Apply proportional scaling based on baseFontSize (11pt = 1.0x)
    return (
        <div style={{ zoom: fontSizeScale }}>
            {TemplateComponent}
        </div>
    );
}
