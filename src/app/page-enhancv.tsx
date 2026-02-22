"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, CheckCircle, Sparkles, X, FileText, CheckCircle as CheckCircleIcon, Wand2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20 lg:pt-32">
        {/* Ambient Glows (Theme-aware) */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[30%] right-[5%] w-[600px] h-[600px] bg-purple-500/15 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[30%] w-[500px] h-[500px] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT COLUMN: Copy & CTA */}
          <div className="flex flex-col items-start text-left max-w-xl z-20">
            {/* Breadcrumb / Small text */}
            <div className="text-muted-foreground text-sm mb-6 font-medium">
              Home &gt; <span className="text-foreground">AI Resume Builder</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-500 drop-shadow-sm">
              AI Resume Builder
            </h1>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-medium">
              Powered by AI, <span className="font-semibold text-foreground">ResumeAI</span> is the easiest way to create a tailored resume containing all the right keywords, improve your writing & highlight your strengths.
            </p>

            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-bold text-lg transition-all mb-8 hover:scale-[1.02] shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]"
            >
              Build your resume with AI
            </Link>

            <div className="flex flex-col items-start gap-1 mb-12">
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div className="flex items-center gap-1 text-foreground font-bold tracking-wide text-sm">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  REVIEWS.io
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">3,908 happy customers shared their experience.</p>
            </div>

            <div className="w-full pt-6">
              <p className="text-xs text-muted-foreground mb-6 font-semibold uppercase tracking-wider">Our resumes get people hired at top companies</p>
              <div className="flex gap-8 items-center opacity-50 dark:opacity-40 grayscale flex-wrap">
                <span className="text-xl font-bold text-foreground tracking-widest transform scale-y-110">TESLA</span>
                <span className="text-2xl font-semibold text-foreground tracking-tighter">Google</span>
                <span className="text-xl font-bold text-foreground flex items-center gap-1"><div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center"><div className="w-3 h-3 bg-background rounded-full" /></div> Spotify</span>
                <span className="text-xl font-bold text-foreground flex items-center gap-1"><div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-background rounded-sm" /></div> Pinterest</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Mockups */}
          <div className="relative h-[650px] w-full hidden lg:block">
            {/* Main Resume Mockup */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[650px] bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl p-8 border border-zinc-200/50 dark:border-white/10 overflow-hidden backdrop-blur-3xl"
            >
              {/* Fake UI Header inside mockup */}
              <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center"><div className="w-4 h-4 bg-primary rounded-full opacity-50" /></div>
                  <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                  <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                </div>
              </div>

              {/* Fake Resume Content */}
              <div className="flex gap-8 h-full">
                {/* Sidebar */}
                <div className="w-1/3 bg-zinc-50 dark:bg-zinc-900 h-full rounded-xl p-5 space-y-5 border border-zinc-100 dark:border-zinc-800/50">
                  <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-2 bg-zinc-300 dark:bg-zinc-700 rounded w-full"></div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-4/5"></div>
                  </div>
                  <div className="space-y-3 mt-8">
                    <div className="h-3 bg-primary/50 rounded w-2/3 mb-4"></div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3"></div>
                  </div>
                </div>
                {/* Main Content */}
                <div className="w-2/3 h-full pt-2 space-y-8">
                  <div>
                    <div className="h-8 bg-zinc-800 dark:bg-zinc-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-primary opacity-80 rounded w-1/2"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-4/5"></div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-11/12"></div>
                  </div>
                  <div className="space-y-3 pt-4">
                    <div className="h-4 bg-zinc-800 dark:bg-zinc-300 rounded w-1/3 mb-4"></div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                  </div>
                  <div className="space-y-3 pt-4">
                    <div className="h-4 bg-zinc-800 dark:bg-zinc-300 rounded w-1/3 mb-4"></div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Assistant Chat Overlay */}
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[-60px] top-[15%] w-[340px] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-zinc-200/50 dark:border-white/10 overflow-hidden z-30"
            >
              {/* Chat Header */}
              <div className="px-5 py-4 border-b flex items-center justify-between border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-950/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">ResumeGPT</span>
                </div>
                <X className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
              </div>

              {/* Chat Body */}
              <div className="p-5 flex flex-col gap-5 h-[400px]">
                <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-xl rounded-tl-sm text-sm text-foreground shadow-sm border border-primary/20 dark:border-primary/30 leading-relaxed relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary/10 dark:bg-primary/20 border-l border-t border-primary/20 dark:border-primary/30 rotate-[-45deg] -z-10 [clip-path:polygon(0_0,100%_0,0_100%)]"></div>
                  Hello, I'm your AI assistant! How can I help you improve your resume today?
                </div>

                <div className="bg-zinc-100 dark:bg-background p-4 rounded-xl rounded-tr-sm text-sm text-foreground ml-auto w-3/4 shadow-sm border border-zinc-200 dark:border-white/5 relative">
                  <div className="absolute -right-2 top-0 w-4 h-4 bg-zinc-100 dark:bg-background border-r border-t border-zinc-200 dark:border-white/5 rotate-[45deg] -z-10 [clip-path:polygon(0_0,100%_0,100%_100%)]"></div>
                  Make my experience bullets sound more impactful 🚀
                </div>

                <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-xl rounded-tl-sm text-sm text-foreground shadow-sm border border-primary/20 dark:border-primary/30 leading-relaxed relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary/10 dark:bg-primary/20 border-l border-t border-primary/20 dark:border-primary/30 rotate-[-45deg] -z-10 [clip-path:polygon(0_0,100%_0,0_100%)]"></div>
                  I can do that! Let's start with your most recent role. I will analyze the job description to extract the best keywords.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section (Below Fold) */}
      <section className="py-24 px-4 relative z-10 bg-gradient-to-b from-background via-accent/5 to-background border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Power Up Your Job Search</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our suite of AI tools is designed to get you hired faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<FileText className="w-10 h-10 text-primary" />}
              title="Smart Builder"
              description="AI-powered templates that rewrite your bullets for maximum impact. Choose from multiple professional designs."
              href="/dashboard"
              color="primary"
            />
            <FeatureCard
              icon={<CheckCircleIcon className="w-10 h-10 text-teal-500" />}
              title="ATS Scorer"
              description="Get an instant score and actionable feedback to fix parsing issues before you apply. Beat the bots."
              href="/ats-check"
              color="teal"
            />
            <FeatureCard
              icon={<Sparkles className="w-10 h-10 text-pink-500" />}
              title="Keyword Extractor"
              description="Extract skills and keywords from any Job Description or Resume to tailor your application perfectly."
              href="/keywords"
              color="pink"
            />
            <FeatureCard
              icon={<Wand2 className="w-10 h-10 text-purple-500" />}
              title="Cover Letter Generator"
              description="Generate personalized cover letters matching your resume's tone and the job description in seconds."
              href="/cover-letter"
              color="purple"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description, href, color }: { icon: React.ReactNode, title: string, description: string, href: string, color: string }) {
  const colorClasses = {
    primary: "hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.2)]",
    teal: "hover:border-teal-500/50 hover:shadow-teal-500/10 dark:hover:shadow-teal-500/20",
    pink: "hover:border-pink-500/50 hover:shadow-pink-500/10 dark:hover:shadow-pink-500/20",
    purple: "hover:border-purple-500/50 hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20",
  };

  return (
    <Link href={href} className="group h-full">
      <div className={cn(
        "relative h-full p-8 rounded-3xl border border-zinc-200/50 dark:border-white/5 bg-white/50 dark:bg-card/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between",
        colorClasses[color as keyof typeof colorClasses]
      )}>
        <div>
          <div className="mb-6 w-16 h-16 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center shadow-md dark:shadow-none group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-3 text-foreground transition-colors">{title}</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-8 flex items-center font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-foreground">
          Try it now <ArrowRight className="ml-2 w-4 h-4 text-primary" />
        </div>
      </div>
    </Link>
  );
}
