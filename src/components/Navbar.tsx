"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
    { label: "Services", href: "/services" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const getFirstName = (name: string | null | undefined) => {
        if (!name) return "User";
        return name.split(" ")[0];
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "backdrop-blur-xl bg-black/70 border-b border-white/5"
                : "bg-transparent"
                }`}
        >
            <div className="container-nike flex items-center justify-between h-20">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <Sparkles
                        className="w-6 h-6 transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                        strokeWidth={1.5}
                    />
                    <span
                        className="text-xl font-bold tracking-[0.15em] uppercase"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        CLEANING SERVICE
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="underline-hover text-sm font-medium tracking-[0.08em] uppercase text-[var(--color-mist)] hover:text-[var(--color-white)] transition-colors duration-300"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* CTA + User Menu */}
                <div className="flex items-center gap-4">
                    {status === "loading" ? (
                        <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
                    ) : session ? (
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/20 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                                    <User className="w-4 h-4 text-black" />
                                </div>
                                <span className="text-xs font-semibold text-white hidden sm:block">
                                    Welcome, {getFirstName(session.user?.name)}
                                </span>
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-[var(--color-charcoal)] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                <a href="/dashboard" className="block px-4 py-2 text-sm text-[var(--color-silver)] hover:text-white hover:bg-white/5">
                                    My Dashboard
                                </a>
                                <button 
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <a href="/auth/login/user" className="hidden sm:inline-flex text-xs font-semibold text-white hover:text-[var(--color-accent)] transition-colors">
                            Sign In
                        </a>
                    )}

                    <a href="/book" className="hidden sm:inline-flex btn-primary text-xs">
                        Book Now
                    </a>

                    {/* Hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-slate)] hover:border-[var(--color-accent)] transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden backdrop-blur-xl bg-black/90 border-t border-white/5 overflow-hidden"
                    >
                        <div className="container-nike py-8 flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-2xl font-bold tracking-[0.05em] uppercase hover:text-[var(--color-accent)] transition-colors"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            {session ? (
                                <>
                                    <a href="/dashboard" className="text-xl font-bold uppercase hover:text-[var(--color-accent)]">
                                        My Dashboard
                                    </a>
                                    <button 
                                        onClick={() => { signOut({ callbackUrl: "/" }); setIsOpen(false); }}
                                        className="text-xl font-bold uppercase text-red-400 text-left"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <a href="/auth/login/user" className="text-xl font-bold uppercase hover:text-[var(--color-accent)]">
                                    Sign In
                                </a>
                            )}
                            <a href="/book" className="btn-primary justify-center mt-4">
                                Book Now
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
