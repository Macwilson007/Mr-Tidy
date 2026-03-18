import { NextResponse } from "next/server";
import getPrisma from "@/lib/prisma";

export async function GET() {
    try {
        const prisma = getPrisma();
        if (!prisma) {
            return NextResponse.json({
                email: "hello@cleaningservice.com",
                phone: "+234 800 000 0000",
                address: "Serving all major metro areas",
                twitter: "",
                instagram: "",
                linkedin: ""
            });
        }

        let settings = await prisma.siteSettings.findUnique({
            where: { id: "default" }
        });

        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: { id: "default" }
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Settings error:", error);
        return NextResponse.json({
            email: "hello@cleaningservice.com",
            phone: "+234 800 000 0000",
            address: "Serving all major metro areas",
            twitter: "",
            instagram: "",
            linkedin: ""
        });
    }
}
