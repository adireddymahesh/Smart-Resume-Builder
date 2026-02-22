import { ResumeData } from "@/types/resume";

interface TemplateProps {
    data: ResumeData;
}

export function ProfessionalTemplate({ data }: TemplateProps) {
    const { profile, experience, education, skills, projects, certifications, themeColor } = data;

    const sidebarBg = themeColor || '#2c3e50';

    return (
        <div className="w-full flex bg-white font-sans text-sm text-gray-800 print-content">
            {/* Left Sidebar */}
            <div className="w-[30%] shrink-0 text-white p-6 flex flex-col gap-6 min-h-full" style={{ backgroundColor: sidebarBg }}>
                {/* Contact Info */}
                <div className="space-y-4 text-sm mt-4">
                    {profile.email && (
                        <div>
                            <div className="opacity-70 text-xs mb-1">Email</div>
                            <div className="font-medium break-all">{profile.email}</div>
                        </div>
                    )}
                    {profile.phone && (
                        <div>
                            <div className="opacity-70 text-xs mb-1">Phone</div>
                            <div className="font-medium">{profile.phone}</div>
                        </div>
                    )}
                    {profile.location && (
                        <div>
                            <div className="opacity-70 text-xs mb-1">Location</div>
                            <div className="font-medium">{profile.location}</div>
                        </div>
                    )}
                    {profile.linkedin && (
                        <div>
                            <div className="opacity-70 text-xs mb-1">LinkedIn</div>
                            <div className="font-medium break-all">{profile.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</div>
                        </div>
                    )}
                    {profile.github && (
                        <div>
                            <div className="opacity-70 text-xs mb-1">GitHub</div>
                            <div className="font-medium break-all">{profile.github.replace(/^https?:\/\/(www\.)?/, '')}</div>
                        </div>
                    )}
                    {profile.website && (
                        <div>
                            <div className="opacity-70 text-xs mb-1">Website</div>
                            <div className="font-medium break-all">{profile.website.replace(/^https?:\/\/(www\.)?/, '')}</div>
                        </div>
                    )}
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div>
                        <h3 className="flex items-center gap-2 uppercase font-bold text-sm tracking-widest border-b border-white/20 pb-2 mb-3">
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span key={skill.id} className="bg-white/10 px-2 py-1 rounded text-xs">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <div>
                        <h3 className="flex items-center gap-2 uppercase font-bold text-sm tracking-widest border-b border-white/20 pb-2 mb-3">
                            Education
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h4 className="font-bold">{edu.school}</h4>
                                    <div className="text-white/80 text-xs">{edu.degree}</div>
                                    <div className="text-white/60 text-xs mt-1">{edu.startDate} – {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Content */}
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="border-b-2 border-gray-100 pb-6 mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-tight" style={{ color: themeColor || '#2c3e50' }}>{profile.fullName || "Your Name"}</h1>
                    <p className="text-lg text-gray-500 mt-2 font-light">{profile.jobTitle || "Professional Title"}</p>
                </div>

                {/* Summary */}
                {profile.summary && (
                    <div className="mb-8">
                        <h3 className="uppercase font-bold text-sm tracking-widest mb-3 flex items-center gap-2" style={{ color: themeColor || '#2c3e50' }}>
                            Profile
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-justify">
                            {profile.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <div className="mb-8">
                        <h3 className="uppercase font-bold text-sm tracking-widest mb-4 flex items-center gap-2" style={{ color: themeColor || '#2c3e50' }}>
                            Work Experience
                        </h3>
                        <div className="space-y-6">
                            {experience.map((exp) => (
                                <div key={exp.id} className="relative pl-4 border-l-2 border-gray-100">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-gray-800 text-base">{exp.position}</h4>
                                        <span className="text-xs text-gray-400 font-medium">
                                            {exp.startDate} – {exp.endDate}
                                        </span>
                                    </div>
                                    <div className="text-sm font-semibold mb-2" style={{ color: themeColor || '#2c3e50' }}>{exp.company}</div>
                                    <p className="text-gray-600 text-xs leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <div className="mb-8">
                        <h3 className="uppercase font-bold text-sm tracking-widest mb-4 flex items-center gap-2" style={{ color: themeColor || '#2c3e50' }}>
                            Key Projects
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {projects.map((proj) => (
                                <div key={proj.id} className="bg-gray-50 p-4 rounded-sm">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h4 className="font-bold text-gray-800">
                                            {proj.name}
                                        </h4>
                                    </div>
                                    <p className="text-gray-600 text-xs mb-2">
                                        {proj.description}
                                    </p>
                                    {proj.technologies && (
                                        <div className="text-xs text-gray-400">
                                            {proj.technologies.join(" • ")}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* Custom Section */}
                {data.customSection?.visible && (
                    <div className="mb-8">
                        <h3 className="uppercase font-bold text-sm tracking-widest mb-3 flex items-center gap-2" style={{ color: themeColor || '#2c3e50' }}>
                            {data.customSection.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-justify whitespace-pre-line text-xs">
                            {data.customSection.content}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
