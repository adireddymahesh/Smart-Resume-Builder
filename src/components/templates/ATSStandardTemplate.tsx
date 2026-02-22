import { ResumeData } from "@/types/resume";

interface TemplateProps {
    data: ResumeData;
}

export function ATSStandardTemplate({ data }: TemplateProps) {
    const { profile, experience, education, skills, projects, certifications, customSection, themeColor } = data;

    const headingColor = themeColor || '#000000';

    return (
        <div className="w-full bg-white font-[Times_New_Roman,serif] text-black p-8 leading-snug" style={{ fontSize: `${data.baseFontSize ?? 11}pt` }}>
            {/* Header */}
            <header className="text-center mb-6">
                <h1 className="text-[24pt] font-bold uppercase tracking-wide mb-2" style={{ color: headingColor }}>
                    {profile.fullName || "Your Name"}
                </h1>
                <div className="text-[12pt] mb-2 font-semibold">
                    {profile.jobTitle || "Professional Title"}
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-700">
                    {profile.email && <span>{profile.email}</span>}
                    {profile.phone && <span>• {profile.phone}</span>}
                    {profile.location && <span>• {profile.location}</span>}
                    {profile.linkedin && <span>• {profile.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                    {profile.github && <span>• {profile.github.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                    {profile.website && <span>• {profile.website.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                </div>
            </header>

            {/* Profile Summary */}
            {profile.summary && (
                <section className="mb-6">
                    <h2 className="text-[14pt] font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3" style={{ color: headingColor }}>
                        Professional Summary
                    </h2>
                    <p className="text-justify whitespace-pre-wrap">
                        {profile.summary}
                    </p>
                </section>
            )}

            {/* Work Experience */}
            {experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-[14pt] font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3" style={{ color: headingColor }}>
                        Work Experience
                    </h2>
                    <div className="space-y-4">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline font-bold text-[12pt]">
                                    <span>{exp.position}</span>
                                    <span className="text-sm font-normal">{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <div className="font-semibold italic mb-2">{exp.company}</div>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    {(exp.description || "").split('\n').filter(line => line.trim()).map((line, i) => (
                                        <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-[14pt] font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3" style={{ color: headingColor }}>
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {projects.map((proj) => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline font-bold text-[12pt]">
                                    <span>{proj.name}</span>
                                </div>
                                {proj.technologies && proj.technologies.length > 0 && (
                                    <div className="italic text-sm mb-1">
                                        Technologies: {proj.technologies.join(", ")}
                                    </div>
                                )}
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    {(proj.description || "").split('\n').filter(line => line.trim()).map((line, i) => (
                                        <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-[14pt] font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3" style={{ color: headingColor }}>
                        Education
                    </h2>
                    <div className="space-y-3">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-start font-bold text-[12pt]">
                                    <span>{edu.degree}</span>
                                    <div className="text-right">
                                        <div className="text-sm font-normal whitespace-nowrap">{edu.startDate} – {edu.endDate}</div>
                                        {edu.grade && <div className="text-sm font-normal text-gray-600 mt-0.5">{edu.gradeType || "Grade"}: {edu.grade}</div>}
                                    </div>
                                </div>
                                <div className="font-medium">{edu.school}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-[14pt] font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3" style={{ color: headingColor }}>
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                            <span key={skill.id}>
                                {skill.name}{i < skills.length - 1 ? "," : ""}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-[14pt] font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3" style={{ color: headingColor }}>
                        Certifications
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {certifications.map((cert) => (
                            <div key={cert.id} className="flex flex-col">
                                <div className="font-medium text-[0.95rem] flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0"></span>
                                    {cert.name}
                                </div>
                                {(cert.issuer || cert.date) && (
                                    <div className="text-sm ml-3 text-gray-700 mt-0.5">
                                        {cert.issuer} {cert.date && <span className="text-gray-500">({cert.date})</span>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Custom Section */}
            {customSection?.visible && (
                <section className="mb-6">
                    <h2 className="text-[14pt] font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3" style={{ color: headingColor }}>
                        {customSection.title}
                    </h2>
                    <p className="whitespace-pre-wrap">
                        {customSection.content}
                    </p>
                </section>
            )}
        </div>
    );
}
