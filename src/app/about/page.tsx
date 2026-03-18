"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import { Target, Users, Shield, Award, MapPin, ArrowRight } from "lucide-react";

const values = [
    {
        icon: Target,
        title: "Precision-Driven",
        text: "Every clean follows a structured checklist verified by our quality assurance team. We measure what matters — dust particles, surface bacteria levels, and client satisfaction scores.",
    },
    {
        icon: Users,
        title: "People First",
        text: "Our cleaning professionals earn above-market wages, receive ongoing training, and are treated as partners — not contractors. Happy teams deliver exceptional results.",
    },
    {
        icon: Shield,
        title: "Fully Insured",
        text: "All Cleaning Service operations carry comprehensive liability insurance. Your property, valuables, and peace of mind are protected on every visit.",
    },
    {
        icon: Award,
        title: "Quality Obsessed",
        text: "We conduct random quality audits, collect post-service feedback, and maintain a 4.9/5 average rating across 2,000+ completed jobs.",
    },
];

const stats = [
    { value: "2,400+", label: "Cleans Completed" },
    { value: "840+", label: "Active Clients" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "98%", label: "Rebook Rate" },
];

const cities = ["Lagos (Island & Mainland)", "Abuja (FCT)", "Port Harcourt", "Ibadan", "Lekki & Ajah", "Victoria Island"];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[var(--color-jet)] pt-20">
            <Navbar />

            {/* Hero */}
            <section className="py-16">
                <div className="container-nike text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">Our Story</p>
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6">
                            The <span className="text-[var(--color-accent)]">Standard</span>
                        </h1>
                        <p className="text-lg text-[var(--color-silver)] max-w-3xl mx-auto">
                            Cleaning Service was born from a simple frustration: finding a reliable, professional cleaning service in Nigeria shouldn&apos;t be a gamble. We built the company we wished existed — tech-enabled, quality-obsessed, and relentlessly consistent.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-12 border-y border-white/5">
                <div className="container-nike">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter text-[var(--color-accent)]">{stat.value}</h3>
                                <p className="text-xs uppercase tracking-widest text-[var(--color-silver)] mt-2 font-bold">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-20">
                <div className="container-nike">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">Our Mission</p>
                            <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase mb-6">
                                Raising the Bar for <span className="text-[var(--color-accent)]">Clean</span>
                            </h2>
                            <p className="text-sm text-[var(--color-mist)] leading-relaxed mb-4">
                                We believe that a clean environment is not a luxury — it&apos;s a necessity for health, productivity, and well-being. Yet in Nigeria, the cleaning industry has long been fragmented, informal, and inconsistent.
                            </p>
                            <p className="text-sm text-[var(--color-mist)] leading-relaxed mb-6">
                                 Cleaning Service exists to professionalise this space. We recruit, train, and equip our teams with commercial-grade tools and eco-friendly products. Every engagement is tracked, measured, and continuously improved. Our goal is simple: make &quot;clean&quot; mean the same thing, every single time.
                            </p>
                            <a href="/book" className="btn-primary text-xs inline-flex">
                                Experience the Difference <ArrowRight className="w-4 h-4" />
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {values.map((val, i) => (
                                <div key={val.title} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                                    <val.icon className="w-8 h-8 text-[var(--color-accent)] mb-4" strokeWidth={1.5} />
                                    <h3 className="font-black uppercase tracking-tight text-xs mb-2">{val.title}</h3>
                                    <p className="text-[11px] text-[var(--color-silver)] leading-relaxed">{val.text}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Service Areas */}
            <section className="py-16 border-t border-white/5">
                <div className="container-nike">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">Coverage</p>
                        <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase">
                            Where We <span className="text-[var(--color-accent)]">Operate</span>
                        </h2>
                    </motion.div>
                    <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                        {cities.map((city) => (
                            <div key={city} className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/[0.02] text-sm text-[var(--color-mist)]">
                                <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                                {city}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials (appropriate here — social proof under About) */}
            <Testimonials />

            <Footer />
        </main>
    );
}
