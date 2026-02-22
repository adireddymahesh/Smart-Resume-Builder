"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const TypewriterText = ({
    words,
    className,
}: {
    words: string[];
    className?: string;
}) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[currentWordIndex];
        let timeoutId: NodeJS.Timeout;

        if (isDeleting) {
            if (currentText === "") {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
                timeoutId = setTimeout(() => { }, 400); // Pause before typing new word
            } else {
                timeoutId = setTimeout(() => {
                    setCurrentText(currentText.slice(0, -1));
                }, 50); // fast deleting speed
            }
        } else {
            if (currentText === word) {
                timeoutId = setTimeout(() => {
                    setIsDeleting(true);
                }, 2500); // 2.5s pause after fully typing word
            } else {
                timeoutId = setTimeout(() => {
                    setCurrentText(word.slice(0, currentText.length + 1));
                }, 120); // normal typing speed
            }
        }

        return () => clearTimeout(timeoutId);
    }, [currentText, isDeleting, currentWordIndex, words]);

    return (
        <span className="flex items-center whitespace-nowrap">
            {/* The actual text using the provided gradient class */}
            <span className={className}>{currentText}</span>

            {/* The blinking cursor styled with a matching pink/red color */}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                className="inline-block w-[0.1em] h-[0.9em] bg-[#ea1a7d] dark:bg-[#ff479b] ml-1 rounded-sm"
            />
        </span>
    );
};
