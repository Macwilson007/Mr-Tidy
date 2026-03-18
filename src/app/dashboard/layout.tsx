"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import {
    LayoutDashboard,
    Calendar,
    CreditCard,
    History,
    LogOut,
    Sparkles,
    User,
    ArrowLeft
} from "lucide-react";

const sidebarLinks = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Bookings", href: "/dashboard/bookings", icon: Calendar },
    { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
    { label: "History", href: "/dashboard/transactions", icon: History },
];

export default function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login/user");
        } else if (status === "authenticated") {
            const role = (session?.user as any)?.role;
            if (role === "ADMIN") {
                router.push("/admin");
            }
        }
    }, [status, session, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-[var(--color-black)] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const role = (session?.user as any)?.role;
    if (role === "ADMIN") {
        return null;
    }

    const getFirstName = (name: string | null | undefined) => {
        if (!name) return "User";
        return name.split(" ")[0];
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[var(--color-black)] to-[#0a0a0a]">
            <header className="bg-white/5 border-b border-white/10">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="flex items-center gap-2 group">
                                <Sparkles className="w-5 h-5 text-[var(--color-accent)]" />
                                <span className="font-bold tracking-widest uppercase text-sm">Cleaning Service</span>
                            </Link>
                            <nav className="hidden md:flex items-center gap-1">
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                isActive
                                                    ? "bg-[var(--color-accent)] text-black"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Site
                            </Link>
                            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                                    <User className="w-4 h-4 text-black" />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-medium">Welcome, {getFirstName(session?.user?.name)}</p>
                                </div>
                                <button 
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
