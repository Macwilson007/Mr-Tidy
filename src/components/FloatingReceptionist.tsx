"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Mic } from "lucide-react";
import { usePathname } from "next/navigation";

// Extend window interface for SpeechRecognition
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface Message {
    role: "assistant" | "user";
    content: string;
}

const WELCOME_MESSAGE = "Hi there! 👋 I'm Cleaning Service's AI assistant. Need help booking a clean, have questions about our services, or just want to chat? I'm here to help!";

function getAIResponse(input: string): string {
    const msg = input.toLowerCase().trim();

    // Greetings
    if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|sup|yo)/.test(msg)) {
        return "Hey there! 😊 How's it going? What can I help you with today?";
    }

    // Booking intent
    if (/(book|schedule|appointment|reserve|i need a clean|i want to book|set up)/.test(msg)) {
        return "Nice! You can book right here: https://cleaningservice.com/book\n\nPick your service, choose a time, and we'll send a pro team your way. Want to know anything first?";
    }

    // Pricing
    if (/(price|pricing|cost|how much|rate|charge|fee|afford|expensive|cheap|budget)/.test(msg)) {
        return "Here's our quick pricing:\n\n🏠 Residential: ₦25k\n✨ Deep Clean: ₦50k\n🏢 Commercial: Custom\n🛏️ Rental: From ₦30k\n\nBook regular and save - weekly 15% off, bi-weekly 10%, monthly 5%!";
    }

    // Services
    if (/(service|what do you (do|offer|clean)|type|residential|commercial|deep clean|turnover|rental|airbnb)/.test(msg)) {
        return "We've got a few options:\n\n🏠 Residential - regular home cleaning\n✨ Deep Clean - thorough top-to-bottom\n🏢 Commercial - offices & workspaces\n🛏️ Rental Turnover - for Airbnb hosts\n\nWhich one sounds like what you need?";
    }

    // Location/areas
    if (/(where|location|area|lagos|abuja|port harcourt|ibadan|lekki|ajah|victoria island|ikoyi|city|cover|operate)/.test(msg)) {
        return "We're in Lagos (island & mainland, Lekki, Ajah, VI), Abuja, Port Harcourt, and Ibadan! Let me know your area and I can confirm. 🚗";
    }

    // Cancel/reschedule
    if (/(cancel|reschedule|change date|move|postpone)/.test(msg)) {
        return "No problem! Just let us know at least 12 hours before to avoid a fee. Just WhatsApp us with your booking details! 📱";
    }

    // Payment
    if (/(pay|payment|transfer|card|paystack|bank|mobile money)/.test(msg)) {
        return "We take cards (Paystack), bank transfer, and mobile money. The best part? You pay AFTER the clean - only when you're happy! 💳";
    }

    // How it works
    if (/(how (does it|do you) work|process|steps|what happens)/.test(msg)) {
        return "It's easy! 👇\n\n1. Book online or message us\n2. We confirm & assign a team\n3. They show up with pro gear\n4. You check, then pay - only if satisfied!\n\nFull details: https://cleaningservice.com/how-it-works";
    }

    // About
    if (/(about|who are you|company|team|story|founded|background)/.test(msg)) {
        return "Cleaning Service is Nigeria's favorite cleaning service! We've done 2,400+ cleans with a 4.9⭐ rating. Our teams are vetted, insured, and use eco-friendly products. Learn more: https://cleaningservice.com/about";
    }

    // Contact / WhatsApp
    if (/(contact|phone|call|whatsapp|email|reach|talk to someone|human|speak)/.test(msg)) {
        return "Here's how to reach us:\n\n📱 WhatsApp: +234 800 000 0000\n📧 Email: hello@cleaningservice.com\n\nHuman support: Mon-Sat, 8am-8pm!";
    }

    // Thank you
    if (/(thank|thanks|cheers|appreciate|great|awesome|perfect|wonderful)/.test(msg)) {
        return "You're welcome! 😊 Anything else I can help with?";
    }

    // Bye
    if (/(bye|goodbye|see you|take care|that's all|nothing else)/.test(msg)) {
        return "Thanks for chatting! 👋 Have a great day, and remember - we're here whenever you need us!";
    }

    // Products / eco
    if (/(product|chemical|safe|eco|green|toxic|allergi|child|pet|baby)/.test(msg)) {
        return "All our products are eco-friendly and totally safe! 🌿 Non-toxic, biodegradable, hypoallergenic - safe for kids, pets, everyone!";
    }

    // Time / availability
    if (/(time|available|when|hours|early|late|weekend|sunday|saturday|emergency|urgent|asap)/.test(msg)) {
        return "We're open 7 days a week, 7am-9pm! ⏰\n\nNeed something urgent? We can often squeeze in same-day within 2-3 hours. Just ask!";
    }

    // Default fallback
    return "Gotcha! I can help with bookings, pricing, services, or any questions you have. What would you like to know? 😊";
}

function renderMarkdown(text: string) {
    // Simple markdown: bold, links, line breaks
    const parts = text.split("\n");
    return parts.map((line, i) => {
        // Process bold (**text**)
        let processed = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        // Process links [text](url)
        processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[var(--color-accent)] underline hover:brightness-125">$1</a>');
        return (
            <span key={i}>
                <span dangerouslySetInnerHTML={{ __html: processed }} />
                {i < parts.length - 1 && <br />}
            </span>
        );
    });
}

function speakResponse(text: string) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        // Clean markdown symbols for speech
        const cleanText = text
            .replace(/\*\*/g, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Extract text from links
            .replace(/•/g, '')
            .replace(/[🏠🏢🛏️✨📍🗓️💡🌿📞📱💳🏦]/g, ''); // Remove emojis 

        const utterance = new SpeechSynthesisUtterance(cleanText);
        // Optional: you can try to select a specific voice if available
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    }
}

export default function FloatingReceptionist() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: WELCOME_MESSAGE },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 400);
        } else {
            // Stop TTS and recognition if closed
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            if (recognitionRef.current) {
                recognitionRef.current.stop();
                setIsListening(false);
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                // Auto send after listening
                handleSendMessage(transcript);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const startListening = () => {
        if (!recognitionRef.current) {
            alert("Your browser does not support speech recognition.");
            return;
        }

        // Stop any ongoing speech
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        setIsListening(true);
        try {
            recognitionRef.current.start();
        } catch (e) {
            console.error(e);
            setIsListening(false);
        }
    };

    const sendMessage = () => {
        handleSendMessage(input);
    };

    const handleSendMessage = async (textToSubmit: string) => {
        const trimmed = textToSubmit.trim();
        if (!trimmed) return;

        // Ensure TTS is stopped before answering
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        const userMsg: Message = { role: "user", content: trimmed };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput("");
        setIsTyping(true);

        // Simulate slight delay for natural feel
        setTimeout(async () => {
            try {
                const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: newMessages })
                });

                if (res.ok) {
                    const data = await res.json();
                    setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
                    speakResponse(data.message);
                } else {
                    throw new Error('API error');
                }
            } catch (err) {
                console.error("Chat error, using fallback:", err);
                const response = getAIResponse(trimmed);
                setMessages(prev => [...prev, { role: "assistant", content: response }]);
                speakResponse(response);
            } finally {
                setIsTyping(false);
            }
        }, 600 + Math.random() * 800);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (pathname?.startsWith("/admin") || pathname?.startsWith("/auth")) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                        className="rounded-3xl w-[340px] md:w-[400px] shadow-[0_20px_60px_-15px_rgba(0,229,160,0.2)] flex flex-col overflow-hidden border border-[var(--color-accent)]/20"
                        style={{
                            background: "rgba(10, 10, 10, 0.95)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            maxHeight: "min(75vh, 600px)",
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center border border-[var(--color-accent)]/30">
                                    <Bot className="w-5 h-5 text-[var(--color-accent)]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-tight">Cleaning Service Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <X className="w-4 h-4 text-white/50" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-grow overflow-y-auto px-4 py-4 space-y-4" style={{ minHeight: "300px" }}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.role === "assistant" && (
                                        <div className="w-7 h-7 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center flex-shrink-0 mt-1">
                                            <Bot className="w-4 h-4 text-[var(--color-accent)]" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${msg.role === "user"
                                            ? "bg-[var(--color-accent)] text-black rounded-br-md font-medium"
                                            : "bg-white/5 text-[var(--color-cloud)] border border-white/5 rounded-bl-md"
                                            }`}
                                    >
                                        {msg.role === "assistant" ? renderMarkdown(msg.content) : msg.content}
                                    </div>
                                    {msg.role === "user" && (
                                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                                            <User className="w-4 h-4 text-white/60" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-2.5"
                                >
                                    <div className="w-7 h-7 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-4 h-4 text-[var(--color-accent)]" />
                                    </div>
                                    <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="px-4 py-3 border-t border-white/10 flex-shrink-0">
                            <div className="flex items-center gap-2 bg-white/5 rounded-xl border border-white/10 focus-within:border-[var(--color-accent)]/50 transition-colors px-3 py-2">
                                <button
                                    onClick={startListening}
                                    type="button"
                                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                                        }`}
                                >
                                    <Mic className="w-4 h-4" />
                                </button>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={isListening ? "Listening..." : input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={isListening}
                                    placeholder="Ask me anything..."
                                    className="flex-grow bg-transparent outline-none text-sm text-white placeholder-white/30 px-1 disabled:opacity-50"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={(!input.trim() && !isListening) || isTyping}
                                    className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition-all flex-shrink-0"
                                >
                                    <Send className="w-4 h-4 text-black" />
                                </button>
                            </div>
                            <p className="text-[9px] text-white/20 text-center mt-2">Powered by Groq AI • Available 24/7</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center shadow-[0_0_30px_rgba(0,229,160,0.4)] text-black relative z-10"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <>
                        <MessageCircle className="w-6 h-6" />
                        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-black">
                            <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                        </div>
                    </>
                )}
            </motion.button>
        </div>
    );
}
