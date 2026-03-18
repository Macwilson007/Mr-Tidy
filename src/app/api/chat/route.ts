import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = process.env.GROQ_API_KEY 
  ? new Groq({ apiKey: process.env.GROQ_API_KEY }) 
  : null;

const BUSINESS_INFO = {
  company: "Cleaning Service",
  services: [
    { name: "Residential Cleaning", price: "₦25,000/session", description: "Regular home maintenance" },
    { name: "Premium Deep Clean", price: "₦50,000/session", description: "Intensive top-to-bottom clean" },
    { name: "Commercial Cleaning", price: "Custom pricing", description: "Offices & workspaces" },
    { name: "Rental Turnover", price: "From ₦30,000", description: "Airbnb & short-term properties" },
  ],
  locations: ["Lagos (Island & Mainland, Lekki, Ajah, VI)", "Abuja (FCT)", "Port Harcourt", "Ibadan"],
  hours: "7 days a week, 7 AM – 9 PM",
  phone: "+234 800 000 0000",
  email: "hello@cleaningservice.com",
  website: "https://cleaningservice.com",
  bookingUrl: "https://cleaningservice.com/book",
};

const SYSTEM_PROMPT = `You are a friendly, casual AI receptionist for ${BUSINESS_INFO.company}, Nigeria's premium cleaning service.

PERSONALITY:
- Be conversational, warm, and helpful like a friendly neighbor
- Use short sentences, not long paragraphs
- Add personality - occasional emojis are fine but don't overdo it
- If you don't know something, say so honestly
- Keep responses concise (2-4 sentences for casual chat, a bit more for detailed info)

KEY FACTS (always accurate):
- Company: ${BUSINESS_INFO.company}
- Services: Residential (₦25k), Deep Clean (₦50k), Commercial (custom), Rental Turnover (from ₦30k)
- Locations: ${BUSINESS_INFO.locations.join(", ")}
- Hours: ${BUSINESS_INFO.hours}
- Booking: Direct users to ${BUSINESS_INFO.bookingUrl}
- Phone/WhatsApp: ${BUSINESS_INFO.phone}

RULES:
1. For bookings - encourage them to use the booking page but answer any questions
2. For pricing - give the rates listed above, mention discounts for recurring (weekly 15%, bi-weekly 10%, monthly 5%)
3. For locations - confirm if their area is covered
4. Always be helpful and friendly
5. If asked about topics unrelated to cleaning services, politely steer back or say you specialize in cleaning services
6. Never make up information - use only the facts provided above

IMPORTANT: Keep responses natural and human-like. Don't use bullet points unless specifically asked. Don't sound like a robot or automated system.`;

const SPECIFIC_INTENTS = [
  { keywords: ["book", "schedule", "appointment", "reserve", "i need a clean", "i want to book", "set up", "cleaning session"], type: "booking" },
  { keywords: ["price", "pricing", "cost", "how much", "rate", "charge", "fee", "afford", "expensive", "cheap", "budget"], type: "pricing" },
  { keywords: ["service", "what do you do", "what do you offer", "what do you clean", "type of cleaning", "residential", "commercial", "deep clean", "turnover", "rental", "airbnb"], type: "services" },
  { keywords: ["where", "location", "area", "lagos", "abuja", "port harcourt", "ibadan", "lekki", "ajah", "victoria island", "ikoyi", "city", "cover", "operate"], type: "locations" },
  { keywords: ["cancel", "reschedule", "change date", "move", "postpone"], type: "cancel" },
  { keywords: ["pay", "payment", "transfer", "card", "paystack", "bank", "mobile money"], type: "payment" },
  { keywords: ["how does it work", "how do you work", "process", "steps", "what happens"], type: "howitworks" },
  { keywords: ["about", "who are you", "company", "team", "story", "founded", "background"], type: "about" },
  { keywords: ["contact", "phone", "call", "whatsapp", "email", "reach", "talk to someone", "human", "speak"], type: "contact" },
  { keywords: ["product", "chemical", "safe", "eco", "green", "toxic", "allergy", "child", "pet", "baby"], type: "products" },
  { keywords: ["time", "available", "when", "hours", "early", "late", "weekend", "sunday", "saturday", "emergency", "urgent", "asap"], type: "availability" },
];

function detectIntent(message: string): string | null {
  const lower = message.toLowerCase();
  for (const intent of SPECIFIC_INTENTS) {
    for (const keyword of intent.keywords) {
      if (lower.includes(keyword)) {
        return intent.type;
      }
    }
  }
  return null;
}

function getRuleBasedResponse(intent: string): string {
  switch (intent) {
    case "booking":
      return "Awesome! 🎉 You can book right here: https://cleaningservice.com/book\n\nJust pick your service, choose a time that works, and we'll handle the rest. Want to know anything before you book?";
    case "pricing":
      return "Here's our pricing:\n\n🏠 Residential: ₦25,000\n✨ Deep Clean: ₦50,000\n🏢 Commercial: Custom rates\n🛏️ Rental Turnover: From ₦30,000\n\nSave more with recurring! Weekly -15%, Bi-weekly -10%, Monthly -5%. Questions?";
    case "services":
      return "We've got you covered!\n\n🏠 Residential - Regular home cleaning\n✨ Deep Clean - Top-to-bottom intensive clean\n🏢 Commercial - Offices and workspaces\n🛏️ Rental Turnover - For Airbnb/short-term rentals\n\nEach one includes our satisfaction guarantee. Which interests you?";
    case "locations":
      return "We're currently in:\n\n📍 Lagos (Island & Mainland, Lekki, Ajah, VI)\n📍 Abuja\n📍 Port Harcourt\n📍 Ibadan\n\nLet me know your area and I can confirm!";
    case "cancel":
      return "No worries! You can cancel or reschedule free up to 12 hours before. After that, there's a ₦5,000 fee. Just WhatsApp us or reply with your booking details to change anything.";
    case "payment":
      return "We accept:\n\n💳 Cards (Paystack)\n🏦 Bank transfer\n📱 Mobile money\n\nPayment happens AFTER the clean - you only pay when you're happy with the result!";
    case "howitworks":
      return "Super simple! 🧹\n\n1. Book online or message us\n2. We confirm & send a vetted team\n3. They arrive with pro equipment\n4. You check & pay - only if satisfied!\n\nFull details here: https://cleaningservice.com/how-it-works";
    case "about":
      return "Cleaning Service is Nigeria's go-to cleaning service! We've done 2,400+ cleans with a 4.9⭐ rating. Our teams are vetted, insured, and use eco-friendly products. Learn more: https://cleaningservice.com/about";
    case "contact":
      return "Here's how to reach us:\n\n📱 WhatsApp: " + BUSINESS_INFO.phone + "\n📧 Email: " + BUSINESS_INFO.email + "\n\nHuman support available Mon-Sat, 8am-8pm!";
    case "products":
      return "All our products are eco-friendly and totally safe! 🌿 No harsh chemicals - completely non-toxic, biodegradable, and hypoallergenic. Safe for kids, pets, everyone!";
    case "availability":
      return "We're open 7 days a week, 7am-9pm! ⏰\n\nNeed something urgent? We often can do same-day within 2-3 hours. Just let us know!";
    default:
      return "Sure thing! Ask me anything about our services, pricing, or how to book. 😊";
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages, useAI = true } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array required" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage.content.toLowerCase();

    const intent = detectIntent(userMessage);

    if (!useAI || !groq) {
      const ruleResponse = intent ? getRuleBasedResponse(intent) : null;
      if (ruleResponse) {
        return NextResponse.json({ 
          message: ruleResponse,
          source: "rules"
        });
      }
      return NextResponse.json({ 
        message: "I'd be happy to help! For bookings, check out https://cleaningservice.com/book - or ask me anything about our services!",
        source: "rules"
      });
    }

    if (intent && Math.random() > 0.3) {
      const ruleResponse = getRuleBasedResponse(intent);
      if (ruleResponse) {
        return NextResponse.json({ 
          message: ruleResponse,
          source: "rules"
        });
      }
    }

    const conversationHistory: { role: "user" | "assistant"; content: string }[] = messages.slice(-8).map((m: { role: string, content: string }) => ({
      role: m.role === "user" ? "user" as const : "assistant" as const,
      content: m.content
    }));

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system" as const, content: SYSTEM_PROMPT },
        ...conversationHistory
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 256,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content || 
      "Oops! Something went wrong. Try again or book directly at https://cleaningservice.com/book";

    return NextResponse.json({ 
      message: aiResponse,
      source: "ai"
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ 
      message: "Sorry, I hit a small hiccup! 🤔 Try again or book directly at https://cleaningservice.com/book",
      source: "error"
    }, { status: 500 });
  }
}
