"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[var(--color-black)]">
            <Navbar />
            <div className="pt-24 pb-16">
                <div className="container-nike max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-8" style={{ fontFamily: "var(--font-heading)" }}>
                        Privacy <span className="text-[var(--color-accent)]">Policy</span>
                    </h1>

                    <div className="space-y-8 text-[var(--color-silver)]">
                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Introduction</h2>
                            <p className="leading-relaxed">
                                At Cleaning Service, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Information We Collect</h2>
                            <p className="leading-relaxed mb-4">
                                We may collect personal information that you voluntarily provide to us when you:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Register on the website</li>
                                <li>Book a cleaning service</li>
                                <li>Contact us for support</li>
                                <li>Subscribe to our newsletter</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">How We Use Your Information</h2>
                            <p className="leading-relaxed mb-4">
                                The information we collect may be used to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Provide and manage our cleaning services</li>
                                <li>Process your bookings and payments</li>
                                <li>Communicate with you about your account</li>
                                <li>Send you marketing and promotional materials</li>
                                <li>Improve our website and services</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Information Sharing</h2>
                            <p className="leading-relaxed">
                                We do not sell, trade, or otherwise transfer your personal information to outside parties except when necessary to provide our services. We may share information with trusted third parties who assist us in operating our website and conducting our business.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Data Security</h2>
                            <p className="leading-relaxed">
                                We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Your Rights</h2>
                            <p className="leading-relaxed">
                                You have the right to request access to your personal information, correct any inaccuracies, or request deletion of your data. To exercise these rights, please contact us at hello@cleaningservice.com.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Changes to This Policy</h2>
                            <p className="leading-relaxed">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last modified" date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Contact Us</h2>
                            <p className="leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at hello@cleaningservice.com.
                            </p>
                        </section>

                        <p className="text-sm text-[var(--color-silver)]/60 pt-8">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </motion.div>
            </div>
            </div>
            <Footer />
        </div>
    );
}
