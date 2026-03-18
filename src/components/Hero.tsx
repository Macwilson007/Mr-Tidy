"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Shield, Clock, Star, Sparkles } from "lucide-react";

const stats = [
    { value: "2,500+", label: "Spaces Perfected" },
    { value: "99.8%", label: "Satisfaction Rate" },
    { value: "24/7", label: "AI Receptionist" },
];

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden grid-pattern">
            {/* Gradient Orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-[180px] opacity-10" />
            <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[var(--color-accent)] rounded-full blur-[150px] opacity-5" />

            <div className="container-nike relative z-10 pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — Copy */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-slate)] text-xs tracking-[0.1em] uppercase text-[var(--color-silver)]"
                        >
                            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                            AI-Powered Cleaning
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="font-black leading-[0.95]"
                        >
                            <span className="block">SPACES</span>
                            <span className="block text-gradient">PERFECTED.</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-lg max-w-md leading-relaxed"
                        >
                            Elite cleaning for homes, offices, and short-term rentals.
                            Book instantly with our AI receptionist — via voice call or
                            WhatsApp.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a href="/book" className="btn-primary">
                                Book a Clean
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <button className="btn-secondary">
                                <Play className="w-4 h-4" />
                                Talk to AI
                            </button>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className="flex items-center gap-6 pt-4 text-xs text-[var(--color-silver)]"
                        >
                            <div className="flex items-center gap-1.5">
                                <Shield className="w-4 h-4 text-[var(--color-accent)]" />
                                <span>Insured & Bonded</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-[var(--color-accent)]" />
                                <span>Same-Day Available</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-[var(--color-accent)]" />
                                <span>5-Star Rated</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right — Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative hidden lg:block"
                    >
                        {/* Decorative ring */}
                        <div className="absolute inset-0 rounded-[2rem] border border-[var(--color-graphite)] rotate-3" />

                        {/* Main card */}
                        <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-gradient-to-br from-[var(--color-charcoal)] to-[var(--color-jet)] border border-[var(--color-graphite)] group/card">
                            <motion.img
                                src="/images/hero.png"
                                alt="Premium Clean Space"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.5 }}
                            />
                            {/* Inner gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                            {/* Center branding */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                                <div className="text-center space-y-4 z-20">
                                    <div className="w-24 h-24 mx-auto rounded-full border-2 border-[var(--color-accent)] flex items-center justify-center animate-pulse-glow bg-black/40 backdrop-blur-md">
                                        <Sparkles className="w-10 h-10 text-[var(--color-accent)]" />
                                    </div>
                                    <p className="text-sm uppercase tracking-[0.15em] text-[var(--color-white)] font-bold">
                                        CLEANING SERVICE
                                    </p>
                                </div>
                            </div>

                            {/* Floating stats card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                                className="absolute bottom-6 left-6 right-6 z-20 glass-card p-5"
                            >
                                <div className="grid grid-cols-3 gap-4">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="text-center">
                                            <div
                                                className="text-lg font-bold text-[var(--color-accent)]"
                                                style={{ fontFamily: "var(--font-heading)" }}
                                            >
                                                {stat.value}
                                            </div>
                                            <div className="text-[0.65rem] uppercase tracking-wider text-[var(--color-silver)]">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-jet)] to-transparent pointer-events-none" />
        </section>
    );
}
