import { ResumeData } from "@/types/resume";

interface TemplateProps {
    data: ResumeData;
}

export function ElegantTemplate({ data }: TemplateProps) {
    const { profile, experience, education, skills, projects, certifications, themeColor, customSection } = data;
    const accent = themeColor || '#000';

    return (
        <div className="w-full p-12 bg-[#fcfbf9] text-gray-800 font-serif leading-relaxed" style={{ fontSize: `${data.baseFontSize ?? 11}pt` }}>
            {/* Header */}
            <div className="text-center border-b-2 border-double pb-8 mb-8" style={{ borderColor: accent }}>
                <h1 className="text-5xl font-italic mb-3 tracking-wide" style={{ color: accent, fontFamily: 'serif' }}>
                    {profile.fullName || "Your Name"}
                </h1>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
                    {profile.jobTitle || "Professional Title"}
                </p>
                <div className="flex justify-center flex-wrap gap-4 text-xs font-medium text-gray-600">
                    {profile.email && <span>{profile.email}</span>}
                    {profile.phone && <span className="text-gray-300">•</span>}
                    {profile.phone && <span>{profile.phone}</span>}
                    {profile.linkedin && <span className="text-gray-300">•</span>}
                    {profile.linkedin && <span>{profile.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                    {profile.location && <span className="text-gray-300">•</span>}
                    {profile.location && <span>{profile.location}</span>}
                </div>
                {(profile.github || profile.website) && (
                    <div className="flex justify-center flex-wrap gap-4 text-xs font-medium text-gray-600 mt-1">
                        {profile.github && <span>{profile.github.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                        {profile.website && <span className="text-gray-300">•</span>}
                        {profile.website && <span>{profile.website.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                    </div>
                )}
            </div>

            {/* Summary */}
            {profile.summary && (
                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <p className="text-gray-700 italic text-sm leading-7">
                        "{profile.summary}"
                    </p>
                </div>
            )}

            {/* Content Grid */}
            <div className="space-y-10">

                {/* Experience */}
                {experience.length > 0 && (
                    <section>
                        <h2 className="text-center text-lg uppercase tracking-widest font-bold mb-8 flex items-center justify-center gap-4">
                            <span className="w-12 h-[1px] bg-gray-300"></span>
                            <span style={{ color: accent }}>Experience</span>
                            <span className="w-12 h-[1px] bg-gray-300"></span>
                        </h2>
                        <div className="space-y-8">
                            {experience.map(exp => (
                                <div key={exp.id} className="relative">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-lg font-bold text-gray-800">{exp.company}</h3>
                                        <span className="text-xs font-medium text-gray-500">{exp.startDate} – {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm italic mb-2 text-gray-600">{exp.position}</div>
                                    <p className="text-sm text-gray-700 text-justify">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section>
                        <h2 className="text-center text-lg uppercase tracking-widest font-bold mb-8 flex items-center justify-center gap-4">
                            <span className="w-12 h-[1px] bg-gray-300"></span>
                            <span style={{ color: accent }}>Projects</span>
                            <span className="w-12 h-[1px] bg-gray-300"></span>
                        </h2>
                        <div className="grid grid-cols-1 gap-6">
                            {projects.map(proj => (
                                <div key={proj.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-800">{proj.name}</h3>
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs underline hover:text-gray-600" style={{ color: accent }}>View Project</a>
                                        )}
                                    </div>
                                    {proj.technologies && (
                                        <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">
                                            {proj.technologies.join(" • ")}
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-700 text-justify">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section>
                        <h2 className="text-center text-lg uppercase tracking-widest font-bold mb-8 flex items-center justify-center gap-4">
                            <span className="w-12 h-[1px] bg-gray-300"></span>
                            <span style={{ color: accent }}>Education</span>
                            <span className="w-12 h-[1px] bg-gray-300"></span>
                        </h2>
                        <div className="space-y-4">
                            {education.map(edu => (
                                <div key={edu.id} className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-gray-800">{edu.school}</div>
                                        <div className="text-sm text-gray-600 italic">{edu.degree}</div>
                                        <div className="text-xs text-gray-500">{edu.fieldOfStudy}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-medium text-gray-500 whitespace-nowrap">{edu.startDate} – {edu.endDate}</div>
                                        {edu.grade && <div className="text-xs font-medium text-gray-500 mt-0.5">{edu.gradeType || "Grade"}: {edu.grade}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section>
                        <h2 className="text-center text-lg uppercase tracking-widest font-bold mb-8 flex items-center justify-center gap-4">
                            <span className="w-12 h-[1px] bg-gray-300"></span>
                            <span style={{ color: accent }}>Certifications</span>
                            <span className="w-12 h-[1px] bg-gray-300"></span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 px-8">
                            {certifications.map((cert) => (
                                <div key={cert.id} className="flex flex-col text-center">
                                    <h4 className="font-medium text-sm text-gray-800">
                                        {cert.name}
                                        {cert.link && (
                                            <a href={cert.link} target="_blank" rel="noreferrer" className="ml-1 hover:underline text-xs font-normal text-blue-600">
                                                ↗
                                            </a>
                                        )}
                                    </h4>
                                    {(cert.issuer || cert.date) && (
                                        <div className="text-gray-600 text-sm mt-0.5">
                                            {cert.issuer} {cert.date && <span className="text-gray-500 font-medium italic">| {cert.date}</span>}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <section>
                        <h2 className="text-center text-lg uppercase tracking-widest font-bold mb-8 flex items-center justify-center gap-4">
                            <span className="w-12 h-[1px] bg-gray-300"></span>
                            <span style={{ color: accent }}>Skills</span>
                            <span className="w-12 h-[1px] bg-gray-300"></span>
                        </h2>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 px-8">
                            {skills.map(skill => (
                                <div key={skill.id} className="relative pl-4">
                                    <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }}></span>
                                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Custom Section */}
                {customSection?.visible && (
                    <section>
                        <h2 className="text-center text-lg uppercase tracking-widest font-bold mb-8 flex items-center justify-center gap-4">
                            <span className="w-12 h-[1px] bg-gray-300"></span>
                            <span style={{ color: accent }}>{customSection.title}</span>
                            <span className="w-12 h-[1px] bg-gray-300"></span>
                        </h2>
                        <div className="text-sm text-gray-700 text-justify leading-relaxed whitespace-pre-line max-w-2xl mx-auto">
                            {customSection.content}
                        </div>
                    </section>
                )}

            </div>
        </div >
    );
}
