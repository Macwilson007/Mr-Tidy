"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Globe, Mail, Phone, MapPin, Twitter, Instagram, Linkedin, CheckCircle } from "lucide-react";

interface SiteSettings {
    email: string;
    phone: string;
    address: string;
    twitter: string;
    instagram: string;
    linkedin: string;
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<SiteSettings>({
        email: "",
        phone: "",
        address: "",
        twitter: "",
        instagram: "",
        linkedin: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                setSettings(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
            
            if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            }
        } catch (error) {
            console.error("Failed to save settings:", error);
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter">Site Settings</h1>
                <p className="text-[var(--color-silver)] text-sm mt-1">Manage your website content and contact information</p>
            </div>

            <div className="grid gap-8">
                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 border-white/5"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Globe className="w-5 h-5 text-[var(--color-accent)]" />
                        <h2 className="text-lg font-bold uppercase tracking-wide">Contact Information</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)] block mb-2">
                                <Mail className="w-4 h-4 inline mr-2" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={settings.email}
                                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[var(--color-accent)] transition-colors"
                                placeholder="hello@cleaningservice.com"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)] block mb-2">
                                <Phone className="w-4 h-4 inline mr-2" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={settings.phone}
                                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[var(--color-accent)] transition-colors"
                                placeholder="+234 800 000 0000"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)] block mb-2">
                                <MapPin className="w-4 h-4 inline mr-2" />
                                Address / Service Area
                            </label>
                            <input
                                type="text"
                                value={settings.address}
                                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[var(--color-accent)] transition-colors"
                                placeholder="Serving all major metro areas"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Social Media Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-8 border-white/5"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Globe className="w-5 h-5 text-[var(--color-accent)]" />
                        <h2 className="text-lg font-bold uppercase tracking-wide">Social Media Links</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)] block mb-2">
                                <Twitter className="w-4 h-4 inline mr-2" />
                                Twitter / X
                            </label>
                            <input
                                type="url"
                                value={settings.twitter}
                                onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[var(--color-accent)] transition-colors"
                                placeholder="https://twitter.com/username"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)] block mb-2">
                                <Instagram className="w-4 h-4 inline mr-2" />
                                Instagram
                            </label>
                            <input
                                type="url"
                                value={settings.instagram}
                                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[var(--color-accent)] transition-colors"
                                placeholder="https://instagram.com/username"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-silver)] block mb-2">
                                <Linkedin className="w-4 h-4 inline mr-2" />
                                LinkedIn
                            </label>
                            <input
                                type="url"
                                value={settings.linkedin}
                                onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[var(--color-accent)] transition-colors"
                                placeholder="https://linkedin.com/company/name"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Save Button */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[var(--color-accent)] text-black font-black uppercase tracking-widest py-3 px-8 rounded-xl hover:bg-[#20bd62] transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                        {!saving && <Save className="w-4 h-4" />}
                    </button>

                    {saved && (
                        <span className="flex items-center gap-2 text-[var(--color-accent)]">
                            <CheckCircle className="w-4 h-4" />
                            Settings saved!
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
