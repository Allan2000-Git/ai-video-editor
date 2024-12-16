import { NextRequest, NextResponse } from "next/server";
import { User } from "@clerk/nextjs/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { user } = await req.json();

        if (!user) {
            return NextResponse.json({
                status: 400,
                success: false,
                message: "Invalid data."
            });
        }

        const { id, primaryEmailAddress, firstName, lastName, imageUrl } = user as User;

        const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, primaryEmailAddress?.emailAddress ?? ""));

        if(existingUser) {
            return NextResponse.json({
                status: 200,
                success: true,
                message: "User already exists. Logging you in now."
            });
        }

        await db.insert(usersTable).values({
            userMetaId: id,
            name: `${firstName} ${lastName}`,
            email: primaryEmailAddress?.emailAddress ?? "",
            image: imageUrl
        }).returning({ userId: usersTable.id });

        return NextResponse.json({
            status: 201,
            success: true,
            message: "User data stored successfully. Logging you in now."
        });
    } catch (error) {
        console.error("Error saving user:", error);
        return NextResponse.json({
            status: 500,
            success: false,
            message: "Internal server error."
        });
    }
}