"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, CheckCircle, Sparkles, X, FileText, CheckCircle as CheckCircleIcon, Wand2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TypewriterText } from "@/components/ui/typewriter-text";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20 lg:pt-32 overflow-hidden">
        {/* Ambient Glows (Theme-aware) */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-primary/20 dark:bg-primary/30 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-[30%] right-[5%] w-[600px] h-[600px] bg-purple-500/15 dark:bg-purple-500/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[30%] w-[500px] h-[500px] bg-pink-500/15 dark:bg-pink-500/25 blur-[100px] rounded-full pointer-events-none" />

        {/* CSS Grid Pattern Overlay */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(128, 128, 128, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(128, 128, 128, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            maskImage: "linear-gradient(to bottom, black 20%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 80%)"
          }}
        />

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT COLUMN: Copy & CTA */}
          <div className="flex flex-col items-start text-left max-w-2xl z-20">
            {/* Main Headlines */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#9f2bf0] via-[#d48aff] to-[#9f2bf0] animate-gradient-text"
            >
              AI-Based Resume Screening & Optimization Platform
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 dark:text-zinc-300 font-medium leading-relaxed mb-6 max-w-[90%]"
            >
              Using Natural Language Processing, Cosine Similarity & Machine Learning Algorithms
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-2 mb-10"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] flex flex-wrap gap-[0.3em] uppercase relative z-10 w-full">
                <span className="text-zinc-900 dark:text-white">ONE</span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#a332fc] via-[#ea1a7d] to-[#e61313] dark:from-[#bc7dff] dark:via-[#ff479b] dark:to-[#ff4040]">PLATFORM</span>
              </h2>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] flex flex-wrap gap-[0.3em] uppercase relative z-10 w-full">
                <span className="text-zinc-900 dark:text-white">MANY</span>
                <span className="inline-block min-w-0">
                  <TypewriterText
                    words={["SOLUTIONS", "FEATURES"]}
                    className="text-transparent bg-clip-text bg-linear-to-r from-[#a332fc] via-[#ea1a7d] to-[#e61313] dark:from-[#bc7dff] dark:via-[#ff479b] dark:to-[#ff4040]"
                  />
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-full bg-[#9f2bf0] hover:bg-[#8b23d6] text-white font-bold text-lg transition-all hover:scale-[1.02] animate-breathing-glow flex items-center gap-2"
              >
                Build your resume with AI
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Mockups */}

          {/* DESKTOP VERSION */}
          <div className="hidden lg:block relative h-[650px] w-full">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[650px] bg-white dark:bg-zinc-950 rounded-2xl shadow-[5px_5px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_0_50px_-15px_rgba(181,53,255,0.15)] p-8 border border-zinc-200 dark:border-white/10 overflow-hidden backdrop-blur-3xl"
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

              {/* ATS Overlay - Desktop only */}
              <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="absolute left-[-20px] top-[20%] w-[360px] z-30"
              >
                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/95 dark:bg-[#111111]/95 backdrop-blur-xl rounded-2xl shadow-[10px_10px_50px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_30px_-10px_rgba(181,53,255,0.2)] border border-zinc-200 dark:border-white/10 overflow-hidden"
                >
                  <div className="px-5 py-4 border-b flex items-center justify-between border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-950/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-sm">ATS Analysis</span>
                    </div>
                    <X className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="p-5 space-y-4 text-sm">
                    <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-200/50 dark:border-white/5">
                      <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                        <svg className="w-14 h-14 transform -rotate-90">
                          <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-300 dark:text-zinc-700" />
                          <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="150" strokeDashoffset="30" className="text-green-500" />
                        </svg>
                        <span className="absolute text-lg font-bold text-green-500">82</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Good Match!</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">Your resume is highly optimized for applicant tracking systems.</p>
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl rounded-tl-none border border-purple-100 dark:border-purple-800/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="font-semibold text-purple-900 dark:text-purple-300 text-xs uppercase tracking-wider">AI Suggestion</span>
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">Consider adding the keyword <span className="font-semibold text-purple-600 dark:text-purple-400 px-1 py-0.5 bg-purple-100 dark:bg-purple-900/40 rounded">Next.js</span> to your recent experience to boost your score to 90+.</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* MOBILE VERSION: centered ATS card only */}
          <div className="flex lg:hidden justify-center mt-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="w-full max-w-sm"
            >
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white/95 dark:bg-[#111111]/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),0_0_30px_-10px_rgba(181,53,255,0.3)] border border-zinc-200 dark:border-white/10 overflow-hidden"
              >
                <div className="px-5 py-4 border-b flex items-center justify-between border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-950/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-sm">ATS Analysis</span>
                  </div>
                  <X className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="p-5 space-y-4 text-sm">
                  <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-200/50 dark:border-white/5">
                    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                      <svg className="w-14 h-14 transform -rotate-90">
                        <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-300 dark:text-zinc-700" />
                        <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="150" strokeDashoffset="30" className="text-green-500" />
                      </svg>
                      <span className="absolute text-lg font-bold text-green-500">82</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Good Match!</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Your resume is highly optimized for applicant tracking systems.</p>
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl rounded-tl-none border border-purple-100 dark:border-purple-800/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold text-purple-900 dark:text-purple-300 text-xs uppercase tracking-wider">AI Suggestion</span>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">Consider adding the keyword <span className="font-semibold text-purple-600 dark:text-purple-400 px-1 py-0.5 bg-purple-100 dark:bg-purple-900/40 rounded">Next.js</span> to your recent experience to boost to 90+.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Features Section (Below Fold) */}
      <section className="py-24 px-4 relative z-10 bg-linear-to-b from-transparent via-accent/5 to-background overflow-hidden -mt-10 pt-32">

        {/* Deep Background Floating Orbs */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-pink-500/5 dark:bg-pink-500/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
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
        "relative h-full p-8 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-card/40 shadow-sm dark:shadow-none backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between",
        colorClasses[color as keyof typeof colorClasses]
      )}>
        <div>
          <div className="mb-6 w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-sm dark:shadow-none group-hover:scale-110 transition-transform duration-300">
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
