import { ResumeData } from "@/types/resume";

interface TemplateProps {
    data: ResumeData;
}

export function ExecutiveTemplate({ data }: TemplateProps) {
    const { profile, experience, education, skills, projects, certifications, customSection, themeColor } = data;

    const primaryColor = themeColor || '#1f2937'; // Default to gray-900

    return (
        <div className="w-full bg-white font-sans text-gray-800 p-10 leading-relaxed" style={{ fontSize: `${data.baseFontSize ?? 11}pt` }}>
            {/* Header */}
            <header className="mb-8 pl-4 pr-4">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2" style={{ color: primaryColor }}>
                    {profile.fullName || "Your Name"}
                </h1>
                <div className="text-lg font-medium text-gray-500 mb-4 uppercase tracking-widest">
                    {profile.jobTitle || "Professional Title"}
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-600 border-t border-b border-gray-200 py-3">
                    {profile.email && <div className="flex items-center gap-1">✉ {profile.email}</div>}
                    {profile.phone && <div className="flex items-center gap-1">☎ {profile.phone}</div>}
                    {profile.location && <div className="flex items-center gap-1">⚲ {profile.location}</div>}
                    {profile.linkedin && <div className="flex items-center gap-1">in/ {profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</div>}
                    {profile.github && <div className="flex items-center gap-1">gh/ {profile.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</div>}
                    {profile.website && <div className="flex items-center gap-1">🔗 {profile.website.replace(/^https?:\/\/(www\.)?/, '')}</div>}
                </div>
            </header>

            <div className="px-4">
                {/* Profile Summary */}
                {profile.summary && (
                    <section className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>
                            Executive Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-justify">
                            {profile.summary}
                        </p>
                    </section>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>
                            Core Competencies
                        </h2>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-700 font-medium">
                            {skills.map((skill) => (
                                <span key={skill.id} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Work Experience */}
                {experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                            Professional Experience
                        </h2>
                        <div className="space-y-6">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{exp.startDate} – {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm font-semibold mb-3" style={{ color: primaryColor }}>{exp.company}</div>
                                    <ul className="list-none space-y-2 text-gray-700">
                                        {(exp.description || "").split('\n').filter(line => line.trim()).map((line, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="mr-2 mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: primaryColor }}></span>
                                                <span className="flex-1">{line.replace(/^[•\-\*]\s*/, '')}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                            Key Initiatives & Projects
                        </h2>
                        <div className="space-y-5">
                            {projects.map((proj) => (
                                <div key={proj.id}>
                                    <h3 className="text-base font-bold text-gray-900 mb-1">{proj.name}</h3>
                                    {proj.technologies && proj.technologies.length > 0 && (
                                        <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                                            {proj.technologies.join(" • ")}
                                        </div>
                                    )}
                                    <ul className="list-none space-y-1.5 text-gray-700">
                                        {(proj.description || "").split('\n').filter(line => line.trim()).map((line, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="mr-2 mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: primaryColor }}></span>
                                                <span className="flex-1">{line.replace(/^[•\-\*]\s*/, '')}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-8">
                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                                Education
                            </h2>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                                <div className="text-sm text-gray-700 mb-1">{edu.school}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                    {edu.startDate} – {edu.endDate}
                                                </div>
                                                {edu.grade && (
                                                    <div className="text-xs font-medium text-gray-500 tracking-normal mt-0.5">
                                                        {edu.gradeType || "Grade"}: {edu.grade}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications & Additional Info */}
                    <div>
                        {certifications && certifications.length > 0 && (
                            <section className="mb-6">
                                <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                                    Certifications
                                </h2>
                                <div className="grid grid-cols-1 gap-y-3">
                                    {certifications.map((cert) => (
                                        <div key={cert.id} className="flex flex-col">
                                            <div className="font-medium text-sm text-gray-900 flex items-center gap-2">
                                                <span className="w-1 h-1 rounded-full bg-gray-500 shrink-0"></span>
                                                {cert.name}
                                            </div>
                                            {(cert.issuer || cert.date) && (
                                                <div className="text-sm text-gray-700 ml-3 mt-0.5">
                                                    {cert.issuer} {cert.date && <span className="text-gray-500">| {cert.date}</span>}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Custom Section */}
                        {customSection?.visible && (
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                                    {customSection.title}
                                </h2>
                                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {customSection.content}
                                </p>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
