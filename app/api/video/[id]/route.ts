import { db } from "@/db";
import { videosTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    if (req.method === 'GET') {
        try {
            const id = (await params).id
            const url = new URL(req.url ?? '', 'http://localhost');
            const userId = url.searchParams.get('userId');

            if(!id) {
                return NextResponse.json({
                    status: 500,
                    success: false,
                    data: null,
                    message: "Invalid video ID provided. Please try again."
                });
            }

            if(!userId) {
                return NextResponse.json({
                    status: 401,
                    success: false,
                    data: null,
                    message: "User not found. Please try again."
                });
            }

            const response = await db.select().from(videosTable).where(
                and(
                    eq(videosTable.createdBy, Number(userId)),
                    eq(videosTable.id, id)
                )
            );

            if (!response) {
                return NextResponse.json({
                    status: 404,
                    success: false,
                    data: null,
                    message: "Video not found."
                });
            }

            const result = response[0];

            return NextResponse.json({
                status: 200,
                success: true,
                data: result,
                message: "Video fetched successfully."
            });
        } catch (error) {
            console.error("Error fetching video:", error);
            return NextResponse.json({
                status: 500,
                success: false,
                data: null,
                message: "Error fetching video."
            });
        }
    } else {
        return NextResponse.json({
            status: 405,
            success: false,
            data: null,
            message: "Method not allowed."
        });
    }
}
