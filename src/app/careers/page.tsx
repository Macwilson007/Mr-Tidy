"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, DollarSign, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jobs = [
    {
        title: "Lead Cleaner",
        type: "Full-time",
        location: "Los Angeles, CA",
        salary: "$25 - $35 / hour",
        description: "Lead our residential cleaning team with attention to detail and exceptional service."
    },
    {
        title: "Commercial Cleaner",
        type: "Full-time",
        location: "Los Angeles, CA",
        salary: "$22 - $30 / hour",
        description: "Handle office buildings and commercial spaces with professionalism."
    },
    {
        title: "Airbnb Specialist",
        type: "Part-time",
        location: "Remote",
        salary: "$20 - $28 / hour",
        description: "Specialize in quick turnovers for short-term rental properties."
    },
    {
        title: "Team Supervisor",
        type: "Full-time",
        location: "Los Angeles, CA",
        salary: "$28 - $40 / hour",
        description: "Manage multiple cleaning teams and ensure quality standards."
    },
    {
        title: "Customer Success Manager",
        type: "Full-time",
        location: "Remote",
        salary: "$50,000 - $70,000 / year",
        description: "Handle customer inquiries and ensure client satisfaction."
    },
    {
        title: "AI Support Specialist",
        type: "Part-time",
        location: "Remote",
        salary: "$18 - $25 / hour",
        description: "Assist with AI chatbot training and customer support automation."
    }
];

const benefits = [
    "Flexible scheduling",
    "Health insurance",
    "Paid training",
    "Career growth",
    "Supplies provided",
    "Weekly pay"
];

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-[var(--color-black)]">
            <Navbar />
            <div className="pt-24 pb-16">
                <div className="container-nike">
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic" style={{ fontFamily: "var(--font-heading)" }}>
                        Join Our <span className="text-[var(--color-accent)]">Team</span>
                    </h1>
                    <p className="text-[var(--color-silver)] mt-4 max-w-2xl mx-auto">
                        Be part of the future of cleaning. We're always looking for talented individuals who share our passion for excellence.
                    </p>
                </motion.div>

                {/* Benefits */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold uppercase tracking-wide mb-8 text-center">Why Work With Us</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="glass-card p-4 border-white/5 text-center">
                                <Sparkles className="w-6 h-6 text-[var(--color-accent)] mx-auto mb-2" />
                                <p className="text-sm font-medium">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Open Positions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold uppercase tracking-wide mb-8">Open Positions</h2>
                    <div className="grid gap-6">
                        {jobs.map((job, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="glass-card p-6 border-white/5 hover:border-[var(--color-accent)]/30 transition-colors"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Briefcase className="w-5 h-5 text-[var(--color-accent)]" />
                                            <h3 className="text-lg font-bold">{job.title}</h3>
                                        </div>
                                        <p className="text-sm text-[var(--color-silver)] mb-3">{job.description}</p>
                                        <div className="flex flex-wrap gap-4 text-xs text-[var(--color-silver)]">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {job.type}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <DollarSign className="w-3 h-3" />
                                                {job.salary}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="btn-primary text-sm flex items-center gap-2 whitespace-nowrap">
                                        Apply Now
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Application CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 glass-card p-12 border-[var(--color-accent)]/20 text-center"
                >
                    <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">Don't See the Right Role?</h2>
                    <p className="text-[var(--color-silver)] mb-6 max-w-xl mx-auto">
                        We're always growing and looking for exceptional talent. Send us your resume and we'll keep you in mind for future opportunities.
                    </p>
                    <a href="mailto:careers@cleaningservice.com" className="btn-primary inline-flex items-center gap-2">
                        Send Your Resume
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
            </div>
            <Footer />
        </div>
    );
}
