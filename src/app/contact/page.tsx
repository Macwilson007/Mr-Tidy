"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        setTimeout(() => {
            setSubmitted(true);
            setLoading(false);
        }, 1000);
    };

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
                            Contact <span className="text-[var(--color-accent)]">Us</span>
                        </h1>
                        <p className="text-[var(--color-silver)] mt-4 max-w-xl mx-auto">
                            Have questions? We'd love to hear from you. Our team is here to help.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="glass-card p-8 border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-[var(--color-accent)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold uppercase tracking-wide">Email</h3>
                                        <p className="text-[var(--color-silver)] mt-1">hello@cleaningservice.com</p>
                                        <p className="text-xs text-[var(--color-silver)]/60 mt-2">We reply within 24 hours</p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-8 border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-[var(--color-accent)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold uppercase tracking-wide">Phone</h3>
                                        <p className="text-[var(--color-silver)] mt-1">+1 (555) 000-0000</p>
                                        <p className="text-xs text-[var(--color-silver)]/60 mt-2">Mon-Fri, 9am-6pm EST</p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-8 border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-[var(--color-accent)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold uppercase tracking-wide">Location</h3>
                                        <p className="text-[var(--color-silver)] mt-1">Serving all major metro areas</p>
                                        <p className="text-xs text-[var(--color-silver)]/60 mt-2">Available nationwide</p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-8 border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6 text-[var(--color-accent)]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold uppercase tracking-wide">Live Chat</h3>
                                        <p className="text-[var(--color-silver)] mt-1">Available 24/7</p>
                                        <p className="text-xs text-[var(--color-silver)]/60 mt-2">AI-powered instant support</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {submitted ? (
                                <div className="glass-card p-12 border-[var(--color-accent)]/30 text-center">
                                    <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mx-auto mb-6">
                                        <Send className="w-8 h-8 text-[var(--color-accent)]" />
                                    </div>
                                    <h3 className="text-2xl font-bold uppercase tracking-wide">Message Sent!</h3>
                                    <p className="text-[var(--color-silver)] mt-2">Thank you for reaching out. We'll get back to you soon.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-6 text-[var(--color-accent)] hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="glass-card p-8 border-white/5 space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)] block mb-2">Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[var(--color-accent)] transition-colors"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)] block mb-2">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[var(--color-accent)] transition-colors"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)] block mb-2">Phone (Optional)</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[var(--color-accent)] transition-colors"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)] block mb-2">Subject</label>
                                            <select
                                                required
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[var(--color-accent)] transition-colors"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="booking">Booking Request</option>
                                                <option value="support">Customer Support</option>
                                                <option value="partnership">Partnership</option>
                                                <option value="careers">Careers</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)] block mb-2">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[var(--color-accent)] text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#20bd62] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {loading ? "Sending..." : "Send Message"}
                                        {!loading && <Send className="w-4 h-4" />}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
