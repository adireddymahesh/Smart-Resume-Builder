import { ResumeData } from "@/types/resume";

interface TemplateProps {
    data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
    const { profile, experience, education, skills, projects, certifications, themeColor, customSection } = data;

    return (
        <div className="w-full h-full p-8 font-sans text-sm leading-relaxed text-gray-800">
            {/* Header */}
            <div className="mb-6 border-b pb-4 border-gray-200">
                <h1 className="text-3xl font-bold uppercase tracking-wide text-gray-900">
                    {profile.fullName || "Your Name"}
                </h1>
                <p className="text-gray-600 mt-1 text-base font-medium">
                    {profile.jobTitle || "Professional Title"}
                </p>

                <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-600">
                    {profile.email && (
                        <span className="flex items-center gap-1">
                            ✉️ {profile.email}
                        </span>
                    )}
                    {profile.phone && (
                        <span className="flex items-center gap-1">
                            📱 {profile.phone}
                        </span>
                    )}
                    {profile.linkedin && (
                        <span className="flex items-center gap-1">
                            🔗 {profile.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                        </span>
                    )}
                    {profile.github && (
                        <span className="flex items-center gap-1">
                            💻 {profile.github.replace(/^https?:\/\/(www\.)?/, '')}
                        </span>
                    )}
                    {profile.website && (
                        <span className="flex items-center gap-1">
                            🌐 {profile.website.replace(/^https?:\/\/(www\.)?/, '')}
                        </span>
                    )}
                    {profile.location && (
                        <span className="flex items-center gap-1">
                            📍 {profile.location}
                        </span>
                    )}
                </div>
            </div>

            {/* Summary */}
            {profile.summary && (
                <div className="mb-6">
                    <h3 className="uppercase font-bold border-b mb-2 pb-1 text-xs tracking-wider text-gray-800 border-gray-200">
                        Professional Summary
                    </h3>
                    <p className="text-gray-700 text-justify whitespace-pre-line">
                        {profile.summary}
                    </p>
                </div>
            )}

            {/* Projects (Now standard list view) */}
            {projects.length > 0 && (
                <div className="mb-6">
                    <h3 className="uppercase font-bold border-b mb-2 pb-1 text-xs tracking-wider text-gray-800 border-gray-200">
                        Projects
                    </h3>
                    <div className="space-y-4">
                        {projects.map((proj) => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-gray-800">
                                        {proj.name}
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noreferrer" className="ml-2 hover:underline text-xs font-normal text-blue-600">
                                                Link ↗
                                            </a>
                                        )}
                                    </h4>
                                </div>
                                {proj.technologies && proj.technologies.length > 0 && (
                                    <div className="text-xs text-gray-500 mb-1">
                                        <span className="font-medium">Tech:</span> {proj.technologies.join(", ")}
                                    </div>
                                )}
                                <p className="text-gray-600 whitespace-pre-line text-xs">
                                    {proj.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <div className="mb-6">
                    <h3 className="uppercase font-bold border-b mb-2 pb-1 text-xs tracking-wider text-gray-800 border-gray-200">
                        Experience
                    </h3>
                    <div className="space-y-4">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-gray-800">{exp.company}</h4>
                                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                                        {exp.startDate} – {exp.endDate}
                                    </span>
                                </div>
                                <div className="text-sm font-medium mb-1 text-gray-600">{exp.position}</div>
                                <p className="text-gray-600 whitespace-pre-line text-xs">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {/* Education */}
            {education.length > 0 && (
                <div className="mb-6">
                    <h3 className="uppercase font-bold border-b mb-2 pb-1 text-xs tracking-wider text-gray-800 border-gray-200">
                        Education
                    </h3>
                    <div className="space-y-3">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-gray-800">{edu.school}</h4>
                                        <div className="text-gray-600 text-sm mt-0.5">
                                            {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-500 font-medium whitespace-nowrap">
                                            {edu.startDate} – {edu.endDate}
                                        </div>
                                        {edu.grade && <div className="text-xs text-gray-500 font-medium mt-0.5">{edu.gradeType || "Grade"}: {edu.grade}</div>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <div className="mb-6">
                    <h3 className="uppercase font-bold border-b mb-2 pb-1 text-xs tracking-wider text-gray-800 border-gray-200">
                        Certifications
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                        {certifications.map((cert) => (
                            <div key={cert.id} className="flex flex-col">
                                <h4 className="font-medium text-sm text-gray-800 flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-gray-500 shrink-0"></span>
                                    {cert.name}
                                    {cert.link && (
                                        <a href={cert.link} target="_blank" rel="noreferrer" className="hover:underline text-xs font-normal text-blue-600">
                                            ↗
                                        </a>
                                    )}
                                </h4>
                                {(cert.issuer || cert.date) && (
                                    <div className="text-gray-600 text-xs ml-2.5 mt-0.5">
                                        {cert.issuer} {cert.date && <span className="text-gray-500 font-medium">| {cert.date}</span>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <div className="mb-6">
                    <h3 className="uppercase font-bold border-b mb-2 pb-1 text-xs tracking-wider text-gray-800 border-gray-200">
                        Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <span key={skill.id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium border border-gray-200">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Custom Section */}
            {customSection?.visible && (
                <div className="mb-6">
                    <h3 className="uppercase font-bold border-b mb-2 pb-1 text-xs tracking-wider text-gray-800 border-gray-200">
                        {customSection.title}
                    </h3>
                    <div className="text-gray-700 text-justify whitespace-pre-line text-xs leading-relaxed">
                        {customSection.content}
                    </div>
                </div>
            )}
        </div>
    );
}
