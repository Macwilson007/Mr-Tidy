"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Mail, Lock, ShieldAlert, User, Phone } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRegisterPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (session) {
            const role = (session.user as any)?.role;
            if (role === "ADMIN") {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }
        }
    }, [session, router]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            setIsLoading(false);
            return;
        }

        try {
            console.log("Registering admin:", formData.email);
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    role: "ADMIN"
                })
            });

            const data = await res.json();
            console.log("Registration response:", res.status, data);

            if (!res.ok) {
                setError(data.error || "Registration failed.");
                setIsLoading(false);
                return;
            }

            console.log("Signing in...");
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            console.log("Sign in result:", result);

            if (result?.error) {
                setError("Registration succeeded but login failed. Please try logging in.");
            }
        } catch (err) {
            console.error("Registration catch error:", err);
            setError("System initialization failed. Try again: " + (err instanceof Error ? err.message : "Unknown error"));
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-[var(--color-black)] flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-20" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[480px] relative z-10 mx-auto"
            >
                <div
                    className="p-10 md:p-14 flex flex-col w-full rounded-3xl shadow-2xl relative overflow-hidden"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(255, 255, 255, 0.08)"
                    }}
                >
                    <div className="flex flex-col items-center mb-10 w-full relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center border border-[var(--color-accent)]/20 mb-6 shadow-[0_0_30px_rgba(46,213,115,0.2)]">
                            <Sparkles className="w-8 h-8 text-[var(--color-accent)]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-center text-white">
                            Admin <span className="text-[var(--color-accent)]">Setup</span>
                        </h1>
                        <p className="text-[10px] text-[var(--color-silver)] font-bold uppercase tracking-[0.2em] mt-3">Create Admin Account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 relative z-10">
                            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                            <p className="text-xs font-bold uppercase tracking-wider">{error}</p>
                        </div>
                    )}

                    <form className="space-y-5 w-full relative z-10" onSubmit={handleRegister}>
                        <div className="space-y-2 w-full">
                            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--color-silver)] ml-2 block">Full Name</label>
                            <div className="relative w-full">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--color-silver)]" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Admin Name"
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[var(--color-accent)] focus:bg-black/60 transition-all font-semibold placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 w-full">
                            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--color-silver)] ml-2 block">Email Address</label>
                            <div className="relative w-full">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--color-silver)]" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="admin@cleaningservice.com"
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[var(--color-accent)] focus:bg-black/60 transition-all font-semibold placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 w-full">
                            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--color-silver)] ml-2 block">Phone Number</label>
                            <div className="relative w-full">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--color-silver)]" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+234 800 000 0000"
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[var(--color-accent)] focus:bg-black/60 transition-all font-semibold placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 w-full">
                            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--color-silver)] ml-2 block">Password</label>
                            <div className="relative w-full">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--color-silver)]" />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[var(--color-accent)] focus:bg-black/60 transition-all font-semibold placeholder:text-white/20 tracking-widest"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 w-full">
                            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--color-silver)] ml-2 block">Confirm Password</label>
                            <div className="relative w-full">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--color-silver)]" />
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[var(--color-accent)] focus:bg-black/60 transition-all font-semibold placeholder:text-white/20 tracking-widest"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[var(--color-accent)] text-black font-black uppercase tracking-widest text-xs w-full py-4 mt-6 rounded-xl flex items-center justify-center gap-2 hover:bg-[#20bd62] focus:ring-4 focus:ring-[var(--color-accent)]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? "Creating Account..." : "Create Admin Account"}
                            {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center relative z-10">
                        <p className="text-[10px] text-[var(--color-silver)] font-black uppercase tracking-[0.15em]">
                            Already have an account?{" "}
                            <button
                                onClick={() => router.push("/auth/login")}
                                className="text-[var(--color-accent)] hover:underline"
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center w-full">
                    <p className="text-[9px] text-[var(--color-silver)]/60 font-black uppercase tracking-[0.3em]">
                        Encryption: AES-256-GCM <span className="mx-2">/</span> Protocol Layer: V-12
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
