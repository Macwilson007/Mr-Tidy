"use client";

import { useState, useEffect } from "react";
import { Sparkles, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const footerLinks = {
    services: [
        { label: "Residential Cleaning", href: "/services" },
        { label: "Commercial Cleaning", href: "/services" },
        { label: "Rental Turnover", href: "/how-it-works" },
        { label: "Deep Cleaning", href: "/services" },
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "#" },
    ],
    support: [
        { label: "FAQ", href: "/how-it-works" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ],
};

interface SiteSettings {
    email: string;
    phone: string;
    address: string;
    twitter: string;
    instagram: string;
    linkedin: string;
}

export default function Footer() {
    const [settings, setSettings] = useState<SiteSettings>({
        email: "hello@cleaningservice.com",
        phone: "+234 800 000 0000",
        address: "Serving all major metro areas",
        twitter: "",
        instagram: "",
        linkedin: ""
    });

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(console.error);
    }, []);

    const socialLinks = [
        { name: "Twitter", href: settings.twitter || "#", label: "Twitter" },
        { name: "Instagram", href: settings.instagram || "#", label: "Instagram" },
        { name: "LinkedIn", href: settings.linkedin || "#", label: "LinkedIn" },
    ];

    return (
        <footer className="relative border-t border-white/5 bg-[var(--color-black)] py-16 pb-8">
            <div className="container-nike">
                <div className="grid md:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-[var(--color-accent)]" strokeWidth={1.5} />
                            <span
                                className="text-xl font-bold tracking-[0.15em] uppercase"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                CLEANING SERVICE
                            </span>
                        </Link>
                        <p className="text-sm max-w-sm leading-relaxed">
                            Elite cleaning powered by AI. Every space deserves perfection.
                            Book through our intelligent receptionist and experience the
                            future of clean.
                        </p>
                        <div className="space-y-3 text-sm text-[var(--color-silver)]">
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-[var(--color-accent)]" />
                                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">{settings.email}</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-[var(--color-accent)]" />
                                <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">{settings.phone}</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                                <span>{settings.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4
                                className="text-xs uppercase tracking-[0.15em] text-[var(--color-accent)] mb-6 font-semibold"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[var(--color-silver)] hover:text-[var(--color-white)] transition-colors duration-300 flex items-center gap-1 group"
                                        >
                                            {link.label}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-[var(--color-graphite)] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[var(--color-silver)]">
                        © {new Date().getFullYear()} CLEANING SERVICE. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[var(--color-silver)] hover:text-[var(--color-accent)] transition-colors duration-300 uppercase tracking-wider"
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
