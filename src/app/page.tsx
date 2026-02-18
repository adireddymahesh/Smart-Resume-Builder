"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, FileText, CheckCircle, Sparkles, Wand2, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { ProfileDropdown } from "@/components/ui/ProfileDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState, useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const words = ["Professional Identity", "Dream Job", "Future Career"];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  // Typing Effect Logic
  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[textIndex];

      if (isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
      }

      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">


      {/* Hero Section (Full Height) */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Dynamic Backgrounds */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-70 dark:opacity-40" />
        <div className="absolute inset-0 -z-10 bg-[size:50px_50px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          AI-Powered Career Growth
        </motion.div>

        {/* Headlines */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
        >
          Craft Your Perfect <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
            {displayText}
          </span>
          <span className="typing-cursor ml-1 text-primary"></span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          Create ATS-friendly resumes, generate tailored cover letters, and analyze your job fit with advanced AI. Stand out from the crowd instantly.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-6 w-full justify-center z-10"
        >
          <Link href="/dashboard" className="group relative px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] hover:shadow-[0_0_60px_-10px_rgba(var(--primary),0.6)]">
            <span className="relative z-10 flex items-center gap-2">Build Resume <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
          </Link>
          <Link href="/ats-check" className="px-8 py-4 rounded-full border border-input bg-background/50 hover:bg-accent hover:text-accent-foreground transition-all text-lg font-medium flex items-center justify-center gap-2 backdrop-blur-sm">
            Check ATS Score
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-muted-foreground"
        >
          <ArrowDown className="w-8 h-8 opacity-50" />
        </motion.div>
      </section>

      {/* Features Section (Below Fold) */}
      <section className="py-32 px-4 relative z-10 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Power Up Your Job Search</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our suite of AI tools is designed to get you hired faster.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <FeatureCard
              icon={<FileText className="w-12 h-12 text-blue-500" />}
              title="Smart Builder"
              description="AI-powered templates that rewrite your bullets for maximum impact. Choose from multiple professional designs."
              href="/dashboard"
              color="blue"
            />
            <FeatureCard
              icon={<CheckCircle className="w-12 h-12 text-green-500" />}
              title="ATS Scorer"
              description="Get an instant score and actionable feedback to fix parsing issues before you apply. Beat the bots."
              href="/ats-check"
              color="green"
            />
            <FeatureCard
              icon={<Sparkles className="w-12 h-12 text-yellow-500" />}
              title="Keyword Extractor"
              description="Extract skills and keywords from any Job Description or Resume to tailor your application perfectly."
              href="/keywords"
              color="yellow"
            />
            <FeatureCard
              icon={<Wand2 className="w-12 h-12 text-purple-500" />}
              title="Cover Letter Gen"
              description="Generate personalized cover letters matching your resume's tone and the job description in seconds."
              href="/cover-letter"
              color="purple"
            />
          </motion.div>
        </div>
      </section>

    </main>
  );
}

function FeatureCard({ icon, title, description, href, color }: { icon: React.ReactNode, title: string, description: string, href: string, color: string }) {
  const colorClasses = {
    blue: "group-hover:border-blue-500/50 hover:shadow-blue-500/20",
    green: "group-hover:border-green-500/50 hover:shadow-green-500/20",
    yellow: "group-hover:border-yellow-500/50 hover:shadow-yellow-500/20",
    purple: "group-hover:border-purple-500/50 hover:shadow-purple-500/20",
  };

  return (
    <Link href={href} className="group h-full">
      <div className={cn(
        "relative h-full p-10 rounded-3xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden flex flex-col justify-between",
        colorClasses[color as keyof typeof colorClasses]
      )}>
        {/* Background Glow */}
        <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-transparent to-transparent",
          color === 'blue' && "via-blue-500/5",
          color === 'green' && "via-green-500/5",
          color === 'yellow' && "via-yellow-500/5",
          color === 'purple' && "via-purple-500/5"
        )} />

        <div>
          <div className="mb-8 w-20 h-20 rounded-2xl bg-background border border-border flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-8 flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Try it now <ArrowRight className="ml-2 w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
