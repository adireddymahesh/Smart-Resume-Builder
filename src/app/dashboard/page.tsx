"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, FileText, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { ProfileDropdown } from "@/components/ui/ProfileDropdown";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, orderBy, getDocs, deleteDoc, setDoc } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import { initialResumeState } from "@/types/resume";

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter(); // Initialize router
    const [resumes, setResumes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchResumes = async () => {
        if (!user) return;
        try {
            const resumesRef = collection(db, "users", user.uid, "resumes");
            const q = query(resumesRef, orderBy("updatedAt", "desc"));
            const querySnapshot = await getDocs(q);

            const resumeList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setResumes(resumeList);
        } catch (error) {
            console.error("Error fetching resumes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading) {
            fetchResumes();
        }
    }, [user, authLoading]);

    const handleCreateNew = async () => {
        if (!user) return;
        const newId = crypto.randomUUID();
        try {
            await setDoc(doc(db, "users", user.uid, "resumes", newId), {
                ...initialResumeState,
                id: newId,
                title: "Untitled Resume",
                updatedAt: new Date().toISOString(),
                createdAt: new Date().toISOString(),
            });
            router.push(`/builder?id=${newId}`);
        } catch (error) {
            console.error("Error creating resume:", error);
            alert("Failed to create new resume. Please try again.");
        }
    };

    const handleDelete = async (e: React.MouseEvent, resumeId: string) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation(); // Stop event bubbling

        if (!user) return;

        if (window.confirm("Are you sure you want to delete this resume? This action cannot be undone.")) {
            try {
                await deleteDoc(doc(db, "users", user.uid, "resumes", resumeId));
                // Remove from local state to update UI immediately
                setResumes(prev => prev.filter(r => r.id !== resumeId));
            } catch (error) {
                console.error("Error deleting resume:", error);
                alert("Failed to delete resume. Please try again.");
            }
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
                </div>

                {/* Navbar */}

                <main className="flex-1 container mx-auto px-6 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                            <p className="text-muted-foreground">Welcome back, {user?.displayName || "User"}</p>
                        </div>
                        <Button onClick={handleCreateNew} size="lg" className="rounded-full shadow-lg hover:shadow-primary/25 transition-all">
                            <Plus className="w-5 h-5 mr-2" /> Create New Resume
                        </Button>
                    </motion.div>

                    {/* Resume Builder Section */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            My Resumes
                        </h2>
                    </div>

                    {/* Resumes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* New Resume Card (Quick Action) */}
                        <motion.div
                            onClick={handleCreateNew}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="h-[280px] border-2 border-dashed border-muted-foreground/25 rounded-xl flex flex-col items-center justify-center p-6 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group"
                        >
                            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                                <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors">Create New Resume</h3>
                        </motion.div>

                        {/* Existing Resume Cards */}
                        {isLoading ? (
                            <div className="h-[280px] rounded-xl bg-muted/10 animate-pulse" />
                        ) : resumes.length > 0 ? (
                            resumes.map((resume, index) => (
                                <Link key={resume.id} href={`/builder?id=${resume.id}`}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.15 + index * 0.05 }}
                                    >
                                        <Card className="h-[280px] flex flex-col p-6 hover:shadow-xl transition-all border-border/50 hover:border-primary/50 group relative overflow-hidden cursor-pointer">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
                                            {/* Delete Button */}
                                            <div className="absolute top-4 right-4 z-10">
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full shadow-md"
                                                    onClick={(e) => handleDelete(e, resume.id)}
                                                    title="Delete Resume"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            <div className="flex-1 flex flex-col justify-center items-center">
                                                <FileText className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                                <h3 className="text-xl font-bold mb-1 text-center line-clamp-1">{resume.title || resume.profile?.fullName || "Untitled Resume"}</h3>
                                                <p className="text-sm text-muted-foreground">{resume.profile?.jobTitle || "No Job Title"}</p>
                                            </div>
                                            <div className="mt-auto flex justify-between items-center pt-4 border-t border-border/50 w-full">
                                                <span className="text-xs text-muted-foreground">
                                                    {resume.updatedAt ? formatDistanceToNow(new Date(resume.updatedAt), { addSuffix: true }) : "Recently"}
                                                </span>
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <ArrowRight className="w-4 h-4 text-primary" />
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                </Link>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.15 }}
                            >
                                <Card className="h-[280px] flex flex-col p-6 border-border/50 group relative overflow-hidden opacity-50 bg-muted/5">
                                    <div className="flex-1 flex flex-col justify-center items-center">
                                        <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                                        <p className="text-sm text-muted-foreground">No saved resumes yet</p>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
