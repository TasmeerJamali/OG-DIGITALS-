"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import { MagneticButton } from "@/components/MagneticButton";

// GSAP-like Easing
const KINETIC_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1]; // cubic-bezier

interface FormState {
    name: string;
    email: string;
    company: string;
    services: string[];
    budget: string;
    message: string;
}

const steps = [
    { id: "intro", label: "Start", question: "Let's build something extraordinary together." },
    { id: "name", label: "01", question: "What's your name?" },
    { id: "email", label: "02", question: "Where can we reach you?" },
    { id: "company", label: "03", question: "What's your organization?" },
    { id: "services", label: "04", question: "What services do you need?" },
    { id: "budget", label: "05", question: "What's the investment?" },
    { id: "message", label: "06", question: "Tell us more about the project." },
];

export default function ContactPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formState, setFormState] = useState<FormState>({
        name: "",
        email: "",
        company: "",
        services: [],
        budget: "",
        message: "",
    });

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    // Auto-focus input when step changes
    useEffect(() => {
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 500);
    }, [currentStep]);

    const handleNext = () => {
        if (!validateCurrentStep()) {
            // Optional: Add shake animation logic here
            return;
        }
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const validateCurrentStep = () => {
        const stepId = steps[currentStep].id;
        if (stepId === "intro") return true;
        if (stepId === "name" && !formState.name) return false;
        if (stepId === "email" && !formState.email.includes("@")) return false;
        if (stepId === "services" && formState.services.length === 0) return false;
        if (stepId === "budget" && !formState.budget) return false;
        if (stepId === "message" && !formState.message) return false;
        return true;
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleNext();
        }
    };

    const toggleService = (service: string) => {
        setFormState((prev) => {
            const exists = prev.services.includes(service);
            return {
                ...prev,
                services: exists
                    ? prev.services.filter((s) => s !== service)
                    : [...prev.services, service],
            };
        });
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#a8ffc4] selection:text-black overflow-hidden font-sans">
            <Navigation />

            <div className="relative w-full h-screen flex flex-col items-center justify-center p-6 md:p-12 lg:p-24">

                {/* AMBIENT BACKGROUND */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#a8ffc4]/5 rounded-full blur-[120px] opacity-50" />
                    <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[100px] opacity-30" />
                </div>

                {!isSuccess ? (
                    <div className="w-full max-w-5xl z-10 relative">
                        {/* PROGRESS INDICATOR */}
                        <div className="absolute top-0 left-0 md:-top-16 text-[#a8ffc4] font-mono text-sm tracking-widest mb-12">
                            {steps[currentStep].label !== "Start" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-4"
                                >
                                    <span>STEP {steps[currentStep].label} / 06</span>
                                    <div className="h-[1px] w-12 bg-[#a8ffc4]/30" />
                                </motion.div>
                            )}
                        </div>

                        {/* HISTORY STACK (Previous Answers) */}
                        <div className="mb-8 space-y-4 opacity-40 hidden lg:block select-none pointer-events-none absolute bottom-full left-0 w-full pb-12">
                            {steps.slice(1, currentStep).map((s) => (
                                <motion.div
                                    key={s.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xl"
                                >
                                    <span className="text-[#a8ffc4] mr-4 text-xs font-mono tracking-widest">{s.label}</span>
                                    <span className="font-light">
                                        {s.id === "name" && formState.name}
                                        {s.id === "email" && formState.email}
                                        {s.id === "company" && formState.company}
                                        {s.id === "services" && formState.services.join(", ")}
                                        {s.id === "budget" && formState.budget}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* ACTIVE QUESTION AREA */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -60, filter: "blur(10px)" }}
                                transition={{ duration: 0.8, ease: KINETIC_EASE }}
                                className="w-full"
                            >
                                {/* THE QUESTION */}
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 md:mb-12 max-w-4xl">
                                    {steps[currentStep].id === 'intro' ? (
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                            {steps[currentStep].question}
                                        </span>
                                    ) : steps[currentStep].id === 'email' && formState.name ? (
                                        <>
                                            Where can we reach <span className="text-[#a8ffc4]">{formState.name}?</span>
                                        </>
                                    ) : (
                                        steps[currentStep].question
                                    )}
                                </h1>

                                {/* INPUTS */}
                                <div className="min-h-[120px]">
                                    {/* INTRO STEP */}
                                    {steps[currentStep].id === "intro" && (
                                        <div className="pt-4">
                                            <MagneticButton>
                                                <button
                                                    onClick={handleNext}
                                                    className="px-10 py-5 bg-[#a8ffc4] text-black rounded-full font-bold text-lg uppercase tracking-widest hover:scale-105 transition-transform"
                                                >
                                                    Start The Project
                                                </button>
                                            </MagneticButton>
                                        </div>
                                    )}

                                    {/* TEXT INPUTS */}
                                    {(["name", "email", "company"].includes(steps[currentStep].id)) && (
                                        <input
                                            ref={inputRef as React.RefObject<HTMLInputElement>}
                                            type={steps[currentStep].id === "email" ? "email" : "text"}
                                            value={formState[steps[currentStep].id as keyof FormState] as string}
                                            onChange={(e) => setFormState({ ...formState, [steps[currentStep].id]: e.target.value })}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Type your answer here..."
                                            className="w-full bg-transparent border-b-2 border-white/20 py-6 text-3xl md:text-5xl lg:text-6xl text-[#a8ffc4] placeholder:text-white/10 focus:outline-none focus:border-[#a8ffc4] transition-colors font-light"
                                            autoComplete="off"
                                        />
                                    )}

                                    {/* SERVICES CHIPS */}
                                    {steps[currentStep].id === "services" && (
                                        <div className="flex flex-wrap gap-3 md:gap-4">
                                            {["Web Design", "Development", "SEO", "Social Media", "Content", "Brand Identity"].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => toggleService(s)}
                                                    className={`px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-2xl border transition-all duration-300 ${formState.services.includes(s)
                                                        ? "bg-[#a8ffc4] text-black border-[#a8ffc4]"
                                                        : "bg-transparent text-white/40 border-white/10 hover:border-white/40 hover:text-white"
                                                        }`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* BUDGET CHIPS */}
                                    {steps[currentStep].id === "budget" && (
                                        <div className="flex flex-wrap gap-3 md:gap-4">
                                            {["< $10k", "$10k - 20k", "$20k - 50k", "$50k +"].map((b) => (
                                                <button
                                                    key={b}
                                                    onClick={() => {
                                                        setFormState({ ...formState, budget: b });
                                                        setTimeout(handleNext, 250); // Fast auto-advance
                                                    }}
                                                    className={`px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-2xl border transition-all duration-300 ${formState.budget === b
                                                        ? "bg-[#a8ffc4] text-black border-[#a8ffc4]"
                                                        : "bg-transparent text-white/40 border-white/10 hover:border-white/40 hover:text-white"
                                                        }`}
                                                >
                                                    {b}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* MESSAGE TEXTAREA */}
                                    {steps[currentStep].id === "message" && (
                                        <textarea
                                            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                                            rows={2}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Tell us about your goals..."
                                            className="w-full bg-transparent border-b-2 border-white/20 py-6 text-2xl md:text-4xl lg:text-5xl text-[#a8ffc4] placeholder:text-white/10 focus:outline-none focus:border-[#a8ffc4] transition-colors font-light resize-none leading-normal"
                                        />
                                    )}
                                </div>

                                {/* NAVIGATION HINTS */}
                                <div className="mt-16 flex items-center gap-6 text-sm md:text-base text-white/30 font-mono">
                                    {steps[currentStep].id !== "intro" && (
                                        <>
                                            <button onClick={handleNext} className="flex items-center gap-3 hover:text-[#a8ffc4] transition-colors group">
                                                <span>PRESS ENTER</span>
                                                <span className="px-2 py-1 border border-white/20 rounded text-[10px] group-hover:border-[#a8ffc4] bg-white/5">↵</span>
                                            </button>
                                            <span className="opacity-50">OR</span>
                                            <button onClick={handleNext} className="hover:text-white transition-colors border-b border-transparent hover:border-white">
                                                CLICK HERE
                                            </button>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                ) : (
                    /* SUCCESS SCREEN */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: KINETIC_EASE }}
                        className="text-center w-full max-w-4xl"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                            className="w-24 h-24 bg-[#a8ffc4] rounded-full flex items-center justify-center mx-auto mb-12 shadow-[0_0_40px_rgba(168,255,196,0.3)]"
                        >
                            <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>
                        <h2 className="text-5xl md:text-8xl font-bold mb-8 text-white tracking-tight">Message Sent.</h2>
                        <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
                            We've received your transmission, <span className="text-[#a8ffc4]">{formState.name}</span>.
                            Our team is already analyzing your request.
                        </p>
                        <div className="mt-16">
                            <MagneticButton>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-8 py-4 border border-white/20 hover:bg-white hover:text-black rounded-full text-sm uppercase tracking-widest transition-all duration-300"
                                >
                                    Return Home
                                </button>
                            </MagneticButton>
                        </div>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
