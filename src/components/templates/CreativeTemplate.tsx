import { ResumeData } from "@/types/resume";

interface TemplateProps {
    data: ResumeData;
}

export function CreativeTemplate({ data }: TemplateProps) {
    const { profile, experience, education, skills, projects, certifications, themeColor } = data;

    return (
        <div className="w-full h-full p-8 font-sans text-sm leading-relaxed text-gray-800">
            {/* Header */}
            <div className="mb-6 pb-5 border-b-4 border-gray-200">
                <h1 className="text-3xl font-extrabold uppercase tracking-tight text-gray-900 leading-none mb-2">
                    {profile.fullName || "Your Name"}
                </h1>
                <p className="text-base font-medium text-gray-500 uppercase tracking-widest mb-3">
                    {profile.jobTitle || "Professional Title"}
                </p>

                <div className="flex flex-wrap gap-3 text-xs font-semibold text-gray-600">
                    {profile.email && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full border border-gray-200">
                            ✉️ {profile.email}
                        </span>
                    )}
                    {profile.phone && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full border border-gray-200">
                            📱 {profile.phone}
                        </span>
                    )}
                    {profile.linkedin && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full border border-gray-200">
                            🔗 {profile.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                        </span>
                    )}
                    {profile.github && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full border border-gray-200">
                            💻 {profile.github.replace(/^https?:\/\/(www\.)?/, '')}
                        </span>
                    )}
                    {profile.website && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full border border-gray-200">
                            🌐 {profile.website.replace(/^https?:\/\/(www\.)?/, '')}
                        </span>
                    )}
                    {profile.location && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full border border-gray-200">
                            📍 {profile.location}
                        </span>
                    )}
                </div>
            </div>

            {/* Summary */}
            {profile.summary && (
                <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2 text-gray-900">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-900"></span>
                        Professional Summary
                    </h3>
                    <p className="text-gray-700 text-justify whitespace-pre-line leading-relaxed text-xs">
                        {profile.summary}
                    </p>
                </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-gray-900">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-900"></span>
                        Experience
                    </h3>
                    <div className="space-y-4">
                        {experience.map((exp) => (
                            <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-gray-900 text-sm">{exp.position}</h4>
                                    <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                                        {exp.startDate} – {exp.endDate}
                                    </span>
                                </div>
                                <div className="text-[11px] font-bold uppercase tracking-wide mb-1 text-gray-600">{exp.company}</div>
                                <p className="text-gray-600 whitespace-pre-line text-xs leading-relaxed text-justify">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-gray-900">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-900"></span>
                        Projects
                    </h3>
                    <div className="space-y-3">
                        {projects.map((proj) => (
                            <div key={proj.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-gray-900 text-sm">
                                        {proj.name}
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noreferrer" className="ml-2 hover:underline text-[10px] font-normal opacity-75 text-gray-500">
                                                Link ↗
                                            </a>
                                        )}
                                    </h4>
                                </div>
                                {proj.technologies && proj.technologies.length > 0 && (
                                    <div className="text-[10px] text-gray-500 mb-1 font-medium uppercase tracking-wide">
                                        {proj.technologies.join(" • ")}
                                    </div>
                                )}
                                <p className="text-gray-600 whitespace-pre-line text-xs leading-relaxed text-justify">
                                    {proj.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {education.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-gray-900">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-900"></span>
                        Education
                    </h3>
                    <div className="space-y-3">
                        {education.map((edu) => (
                            <div key={edu.id} className="flex justify-between items-start border-b border-gray-100 pb-2 last:border-0">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{edu.school}</h4>
                                    <div className="text-gray-600 text-xs">
                                        {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                                    </div>
                                </div>
                                <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                                    {edu.startDate} – {edu.endDate}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-gray-900">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-900"></span>
                        Certifications
                    </h3>
                    <div className="space-y-2">
                        {certifications.map(cert => (
                            <div key={cert.id} className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">
                                        {cert.name}
                                        {cert.link && (
                                            <a href={cert.link} target="_blank" rel="noreferrer" className="ml-2 hover:underline text-[10px] font-normal opacity-75 text-gray-500">
                                                Link ↗
                                            </a>
                                        )}
                                    </h4>
                                    <div className="text-gray-500 text-[10px]">{cert.issuer}</div>
                                </div>
                                <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                                    {cert.date}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-gray-900">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-900"></span>
                        Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <span key={skill.id} className="bg-white text-gray-700 px-3 py-1 rounded-full text-[10px] font-bold border border-gray-300 shadow-sm">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Custom Section */}
            {data.customSection?.visible && (
                <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-gray-900">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-900"></span>
                        {data.customSection.title}
                    </h3>
                    <div className="text-gray-700 text-justify whitespace-pre-line text-xs leading-relaxed">
                        {data.customSection.content}
                    </div>
                </div>
            )}
        </div>
    );
}
