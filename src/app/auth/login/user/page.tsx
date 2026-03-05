"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Mail, Lock, ShieldAlert } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserLoginPage() {
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
                redirect: true,
                callbackUrl: "/dashboard"
            });
        } catch (err) {
            setError("Something went wrong. Try again.");
            setIsLoading(false);
        }
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
                            Welcome <span className="text-[var(--color-accent)]">Back</span>
                        </h1>
                        <p className="text-[10px] text-[var(--color-silver)] font-bold uppercase tracking-[0.2em] mt-3">Sign in to your account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 relative z-10">
                            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                            <p className="text-xs font-bold uppercase tracking-wider">{error}</p>
                        </div>
                    )}

                    <form className="space-y-6 w-full relative z-10" onSubmit={handleCredentialsLogin}>
                        <div className="space-y-2 w-full">
                            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--color-silver)] ml-2 block">Email Address</label>
                            <div className="relative w-full">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--color-silver)]" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[var(--color-accent)] focus:bg-black/60 transition-all font-semibold placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 w-full mt-5">
                            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--color-silver)] ml-2 block">Password</label>
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
                            {isLoading ? "Signing in..." : "Sign In"}
                            {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="w-full mt-8 pt-8 border-t border-white/10 flex flex-col items-center relative z-10">
                        <p className="text-[10px] text-[var(--color-silver)] font-black uppercase tracking-[0.15em]">
                            Don&apos;t have an account?{" "}
                            <button
                                onClick={() => router.push("/auth/register")}
                                className="text-[var(--color-accent)] hover:underline"
                            >
                                Register
                            </button>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center w-full">
                    <button
                        onClick={() => router.push("/auth/login")}
                        className="text-[9px] text-[var(--color-silver)]/60 font-black uppercase tracking-[0.3em] hover:text-[var(--color-accent)] transition-colors"
                    >
                        Admin Login
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
