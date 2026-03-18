"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, Bot } from "lucide-react";

export default function BookingCTA() {
    return (
        <section id="book" className="section-padding relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-[200px] opacity-10" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[var(--color-gold)] rounded-full blur-[180px] opacity-5" />
            </div>

            <div className="container-nike relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-card p-12 md:p-20 text-center relative overflow-hidden"
                >
                    {/* Grid pattern inside card */}
                    <div className="absolute inset-0 grid-pattern opacity-50" />

                    <div className="relative z-10 space-y-8">
                        {/* AI Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/[0.08]">
                            <Bot className="w-4 h-4 text-[var(--color-accent)]" />
                            <span className="text-xs uppercase tracking-[0.1em] text-[var(--color-accent)]">
                                AI Receptionist Available 24/7
                            </span>
                        </div>

                        {/* Headline */}
                        <h2
                            className="font-black text-4xl md:text-6xl leading-[1.05]"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            READY FOR A<br />
                            <span className="text-gradient">PRISTINE SPACE?</span>
                        </h2>

                        <p className="text-lg max-w-xl mx-auto text-[var(--color-mist)]">
                            Talk to our AI receptionist now. It will handle everything —
                            from understanding your needs to locking in the perfect
                            appointment.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <a href="/book" className="btn-primary text-base px-8 py-4">
                                <Phone className="w-5 h-5" />
                                Chat AI Receptionist
                            </a>
                            <a
                                href="https://wa.me/2348000000000?text=Hi%20Cleaning%20Service%2C%20I%20need%20a%20clean!"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary text-base px-8 py-4"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp Us
                            </a>
                        </div>

                        {/* Micro-copy */}
                        <div className="flex items-center justify-center gap-2 text-xs text-[var(--color-silver)]">
                            <ArrowRight className="w-3 h-3" />
                            <span>Average response time: under 15 seconds</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
