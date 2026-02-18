"use client";

import { useAuth } from "@/context/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, LayoutDashboard, Settings, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogoutOverlay } from "@/components/ui/LogoutOverlay";

export function ProfileDropdown() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 1500));
        await logout();
        router.push("/");
    };

    return (
        <>
            <LogoutOverlay isVisible={isLoggingOut} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full overflow-hidden border border-primary/20 hover:border-primary/50 transition-all p-0 group">
                        {/* Animated Glow */}
                        <div className="absolute inset-0 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors" />

                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="User" className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {user?.email?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 mt-2 bg-background/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200">
                    <DropdownMenuLabel className="font-normal p-2">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none text-foreground">{user?.displayName || "User"}</p>
                            <p className="text-xs leading-none text-muted-foreground truncate">{user?.email}</p>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="bg-white/10 my-2" />

                    <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10 focus:text-primary rounded-lg transition-colors p-2">
                        <Link href="/dashboard" className="flex items-center">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10 focus:text-primary rounded-lg transition-colors p-2">
                        <Link href="/profile" className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10 focus:text-primary rounded-lg transition-colors p-2">
                        <Link href="/settings" className="flex items-center">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-white/10 my-2" />

                    <DropdownMenuItem
                        className="cursor-pointer text-red-400 focus:text-red-500 focus:bg-red-500/10 rounded-lg transition-colors p-2"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
