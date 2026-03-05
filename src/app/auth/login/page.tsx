"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Mail, Lock, ShieldAlert } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    const handleCredentialsLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid Vector ID or Access Protocol.");
                setIsLoading(false);
            } else {
                // Login succeeded, check role and redirect
                router.refresh();
                setTimeout(() => {
                    router.push("/admin");
                }, 500);
            }
        } catch (err) {
            setError("System initialization failed. Try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-black)] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Pattern */}
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
                            Mission <span className="text-[var(--color-accent)]">Control</span>
                        </h1>
                        <p className="text-[10px] text-[var(--color-silver)] font-bold uppercase tracking-[0.2em] mt-3">Authorized Personnel Only</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 relative z-10">
                            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                            <p className="text-xs font-bold uppercase tracking-wider">{error}</p>
                        </div>
                    )}

                    <form className="space-y-6 w-full relative z-10" onSubmit={handleCredentialsLogin}>
                        <div className="space-y-2 w-full">
                            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--color-silver)] ml-2 block">Vector ID (Email)</label>
                            <div className="relative w-full">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--color-silver)]" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@pristine.agency"
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[var(--color-accent)] focus:bg-black/60 transition-all font-semibold placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 w-full mt-5">
                            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--color-silver)] ml-2 block">Access Protocol (Password)</label>
                            <div className="relative w-full">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--color-silver)]" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[var(--color-accent)] focus:bg-black/60 transition-all font-semibold placeholder:text-white/20 tracking-widest"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[var(--color-accent)] text-black font-black uppercase tracking-widest text-xs w-full py-4 mt-8 rounded-xl flex items-center justify-center gap-2 hover:bg-[#20bd62] focus:ring-4 focus:ring-[var(--color-accent)]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? "Synchronizing..." : "Initialize Dashboard"}
                            {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="w-full mt-10 pt-8 border-t border-white/10 flex flex-col items-center relative z-10">
                        <button
                            onClick={() => signIn("google", { callbackUrl: "/admin" })}
                            type="button"
                            className="flex items-center gap-3 px-6 py-4 rounded-xl border border-white/10 bg-white/5 w-full justify-center text-[10px] text-white font-black uppercase tracking-[0.15em] hover:bg-white/10 hover:border-white/20 transition-all"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google ID
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center w-full">
                    <p className="text-[9px] text-[var(--color-silver)]/60 font-black uppercase tracking-[0.3em]">
                        <button 
                            onClick={() => router.push("/auth/login/user")}
                            className="hover:text-[var(--color-accent)] transition-colors"
                        >
                            Customer Login
                        </button>
                        <span className="mx-2">/</span> 
                        <button 
                            onClick={() => router.push("/auth/register/admin")}
                            className="hover:text-[var(--color-accent)] transition-colors"
                        >
                            Admin Register
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
