"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageSquare, CalendarCheck, ClipboardCheck, Sparkles, ArrowRight } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: MessageSquare,
        title: "Tell Us What You Need",
        description: "Use our booking page, WhatsApp, or the floating chat widget to describe your space and cleaning requirements. Our system captures every detail — property type, room count, preferred date, and special instructions.",
        detail: "Whether it's a 2-bedroom flat in Lekki or a 10-floor office complex in Abuja, we tailor our approach to your exact needs.",
    },
    {
        number: "02",
        icon: CalendarCheck,
        title: "We Confirm & Assign",
        description: "Within minutes, you'll receive a confirmation with your assigned team lead's name, arrival window, and a detailed scope of work. No surprises, no guessing.",
        detail: "Our scheduling engine matches you with the nearest available team that has experience with your property type.",
    },
    {
        number: "03",
        icon: ClipboardCheck,
        title: "Professional Execution",
        description: "Your vetted, uniformed team arrives with commercial-grade equipment and eco-friendly products. They follow a structured checklist and photograph key areas for quality verification.",
        detail: "Every clean is time-tracked and GPS-verified. Your team lead conducts a final walkthrough before marking the job complete.",
    },
    {
        number: "04",
        icon: Sparkles,
        title: "Quality Guaranteed",
        description: "After the clean, you'll receive a completion report with before/after notes. Rate your experience and provide feedback — if anything isn't perfect, we re-clean within 24 hours at no cost.",
        detail: "Our 98% client satisfaction rate isn't an accident — it's the result of rigorous quality control at every stage.",
    },
];

const differentiators = [
    { title: "Vetted Professionals", text: "Every cleaner passes background checks, reference verification, and 40 hours of in-house training before their first assignment." },
    { title: "Commercial-Grade Equipment", text: "We invest in industrial vacuums, steam cleaners, and hospital-grade disinfectants — not the consumer products you'd buy at Shoprite." },
    { title: "Real-Time Tracking", text: "Know when your team is en route, on-site, and finished. Live GPS tracking and status updates via SMS and WhatsApp." },
    { title: "Flexible Scheduling", text: "7 days a week, 7 AM to 9 PM. Need an emergency clean at 6 AM? Our rapid-response teams can be there." },
    { title: "Transparent Pricing", text: "No surge pricing, no hidden fees. Your quote is your final price. Pay only after the job is completed to your satisfaction." },
    { title: "Eco-Conscious", text: "Our cleaning products are biodegradable, non-toxic, and safe for children, pets, and people with allergies or asthma." },
];

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-[var(--color-jet)] pt-20">
            <Navbar />

            {/* Hero */}
            <section className="py-16">
                <div className="container-nike text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">The Process</p>
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6">
                            How It <span className="text-[var(--color-accent)]">Works</span>
                        </h1>
                        <p className="text-lg text-[var(--color-silver)] max-w-2xl mx-auto">
                            From first contact to spotless finish in four simple steps. No friction, no fuss — just results.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Steps */}
            <section className="pb-20">
                <div className="container-nike">
                    <div className="space-y-12 max-w-4xl mx-auto">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.6 }}
                                className="flex gap-8 items-start"
                            >
                                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 flex items-center justify-center">
                                    <span className="text-2xl font-black italic text-[var(--color-accent)]">{step.number}</span>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-3">
                                        <step.icon className="w-5 h-5 text-[var(--color-accent)]" />
                                        <h2 className="text-xl font-black uppercase tracking-tight">{step.title}</h2>
                                    </div>
                                    <p className="text-sm text-[var(--color-mist)] leading-relaxed mb-2">{step.description}</p>
                                    <p className="text-xs text-[var(--color-silver)] italic">{step.detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why PRISTINE */}
            <section className="py-20 border-t border-white/5">
                <div className="container-nike">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">The Difference</p>
                        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">
                            Why <span className="text-[var(--color-accent)]">Cleaning Service</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {differentiators.map((d, i) => (
                            <motion.div
                                key={d.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
                            >
                                <h3 className="font-black uppercase tracking-tight text-sm mb-2 text-[var(--color-accent)]">{d.title}</h3>
                                <p className="text-xs text-[var(--color-silver)] leading-relaxed">{d.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a href="/book" className="btn-primary text-sm inline-flex">
                            Book Your First Clean <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
