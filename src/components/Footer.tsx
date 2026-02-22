import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-background/50 backdrop-blur-xl relative z-10">
            {/* Gradient Top Border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container mx-auto px-4 py-12 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2 w-fit">
                            <span className="text-2xl font-bold tracking-tighter flex items-center gap-1.5">
                                <span className="text-primary">AI Powered Resume World</span>
                                <span className="text-2xl">🌍</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-lg max-w-sm leading-relaxed">
                            Crafting professional identities with the power of Artificial Intelligence. Build, analyze, and succeed.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <SocialLink href="https://github.com" icon={<Github className="w-5 h-5" />} label="GitHub" />
                            <SocialLink href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} label="Twitter" />
                            <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
                            <SocialLink href="mailto:hello@resumeai.com" icon={<Mail className="w-5 h-5" />} label="Email" />
                        </div>
                    </div>

                    {/* Product Links */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="font-semibold text-lg">Product</h3>
                        <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 duration-200 block w-fit">Resume Builder</Link>
                        <Link href="/ats-check" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 duration-200 block w-fit">ATS Scorer</Link>
                        <Link href="/keywords" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 duration-200 block w-fit">Keyword Extractor</Link>
                        <Link href="/cover-letter" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 duration-200 block w-fit">Cover Letter Generator</Link>
                    </div>

                    {/* Company Links */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="font-semibold text-lg">Company</h3>
                        <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 duration-200 block w-fit">About Us</Link>
                        <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 duration-200 block w-fit">Terms of Service</Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p className="flex items-center gap-1">© {new Date().getFullYear()} AI Powered Resume World 🌍. All rights reserved.</p>
                    <div className="flex items-center gap-8">

                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
            aria-label={label}
        >
            {icon}
        </a>
    );
}
