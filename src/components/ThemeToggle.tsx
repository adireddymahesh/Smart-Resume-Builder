"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="rounded-full w-10 h-10 hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
        >
            {isDark ? (
                <Moon className="h-[1.2rem] w-[1.2rem] text-blue-400 transition-all" />
            ) : (
                <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
