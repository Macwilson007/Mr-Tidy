"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Mitchell",
        role: "Homeowner",
        text: "CLEANING SERVICE transformed my home. The AI booking was incredibly smooth — I just sent a WhatsApp message and everything was confirmed in under 2 minutes.",
        rating: 5,
    },
    {
        name: "James Rivera",
        role: "Property Manager, 12 Units",
        text: "Managing turnovers for 12 Airbnb units used to be chaos. Now I just tell the AI my schedule and every turnover is handled flawlessly.",
        rating: 5,
    },
    {
        name: "Elena Kozlova",
        role: "CFO, TechVault Inc.",
        text: "Our 20,000 sq ft office has never been cleaner. The enterprise team is professional, punctual, and the monthly reports are exceptional.",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="section-padding relative overflow-hidden">
            {/* Background orb */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-[250px] opacity-[0.03]" />

            <div className="container-nike relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
                        Client Stories
                    </p>
                    <h2 className="font-black">
                        TRUSTED BY
                        <br />
                        <span className="text-gradient">THOUSANDS</span>
                    </h2>
                </motion.div>

                {/* Testimonial Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.15,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="glass-card p-8 flex flex-col"
                        >
                            {/* Quote icon */}
                            <Quote
                                className="w-8 h-8 text-[var(--color-accent)] opacity-30 mb-4"
                                strokeWidth={1}
                            />

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Star
                                        key={j}
                                        className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]"
                                    />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-sm leading-relaxed mb-6 flex-grow italic text-[var(--color-cloud)]">
                                &ldquo;{t.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-graphite)]">
                                {/* Avatar placeholder */}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-dark)] flex items-center justify-center text-sm font-bold text-[var(--color-black)]">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{t.name}</p>
                                    <p className="text-xs text-[var(--color-silver)]">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
