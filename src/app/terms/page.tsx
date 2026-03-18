"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
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
                        Terms of <span className="text-[var(--color-accent)]">Service</span>
                    </h1>

                    <div className="space-y-8 text-[var(--color-silver)]">
                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Acceptance of Terms</h2>
                            <p className="leading-relaxed">
                                By accessing and using Cleaning Service, you accept and agree to be bound by the terms and provision of this agreement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Services Provided</h2>
                            <p className="leading-relaxed mb-4">
                                Cleaning Service provides residential, commercial, and short-term rental cleaning services. We reserve the right to modify or discontinue services at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Booking and Cancellation</h2>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Bookings can be made through our website, phone, or AI chatbot</li>
                                <li>Cancellations must be made at least 24 hours before the scheduled service</li>
                                <li>Late cancellations may incur a fee</li>
                                <li>Rescheduling is available subject to availability</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Payment Terms</h2>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Payment is due at the time of service unless otherwise arranged</li>
                                <li>We accept all major credit cards and payment apps</li>
                                <li>Refunds are processed within 5-7 business days</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Service Guarantees</h2>
                            <p className="leading-relaxed mb-4">
                                We strive for excellence in every cleaning. If you're not satisfied with our service, please contact us within 24 hours of service completion. We will make every effort to address your concerns and provide a re-clean if necessary.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Liability</h2>
                            <p className="leading-relaxed">
                                Cleaning Service is fully insured. We are not responsible for pre-existing damage or damage caused by factors beyond our control. Please ensure access to the property is safe and clear.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Intellectual Property</h2>
                            <p className="leading-relaxed">
                                All content on this website, including logos, text, graphics, and images, is the property of Cleaning Service and may not be reproduced without permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">User Conduct</h2>
                            <p className="leading-relaxed mb-4">
                                Users agree to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Provide accurate information</li>
                                <li>Maintain the security of their account</li>
                                <li>Not engage in any unlawful activity</li>
                                <li>Not attempt to gain unauthorized access to our systems</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Limitation of Liability</h2>
                            <p className="leading-relaxed">
                                Cleaning Service shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Governing Law</h2>
                            <p className="leading-relaxed">
                                These terms shall be governed by and construed in accordance with the laws of the United States.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">Contact Information</h2>
                            <p className="leading-relaxed">
                                For questions about these Terms of Service, please contact us at hello@cleaningservice.com.
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
