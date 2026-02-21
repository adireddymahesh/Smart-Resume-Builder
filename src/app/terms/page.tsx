import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden py-16 lg:py-24">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            <main className="container mx-auto px-6 max-w-4xl">
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 group transition-colors w-fit">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/5">
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">Terms of Service</h1>
                    <p className="text-muted-foreground mb-10 border-b border-border/50 pb-8">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>

                    <div className="space-y-8 text-muted-foreground leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using ResumeAI (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. We reserve the right to modify these terms at any time, and your continued use of the Service constitutes acceptance of those changes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                            <p>
                                ResumeAI provides users with tools to build, analyze, and optimize professional resumes and cover letters using artificial intelligence. The Service includes resume parsing, ATS scoring, keyword extraction, and document generation capabilities.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>You must provide accurate and complete information when creating an account.</li>
                                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                                <li>You may not use the Service for any illegal or unauthorized purpose.</li>
                                <li>You retain all rights to the personal data and documents you upload, but you grant us the necessary licenses to process this data to provide the Service.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Privacy and Data Security</h2>
                            <p>
                                Your privacy is critically important to us. We securely process your resume data and do not sell your personal information to third parties. Please review our Privacy Policy for detailed information on how we collect, use, and protect your data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Artificial Intelligence Disclaimer</h2>
                            <p>
                                ResumeAI utilizes advanced third-party AI models (including Google Gemini) to generate suggestions, scores, and text. While we strive for high accuracy, AI-generated content may sometimes contain errors or inaccuracies. It is your responsibility to review, verify, and edit any AI-generated content before using it in your professional applications.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
                            <p>
                                In no event shall ResumeAI, its founders, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service; or any content obtained from the Service.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
