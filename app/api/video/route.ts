import { useAuthContext } from "@/contexts/auth-context";
import { db } from "@/db";
import { videosTable, VideoTypeValues } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    if (req.method === 'POST') {
        try {
            const { type, userDetails } = await req.json();

            if(!userDetails.id) {
                return NextResponse.json({
                    status: 500,
                    success: false,
                    data: null,
                    message: "User not found. Please try again."
                });
            }

            if (!VideoTypeValues.includes(type)) {
                return NextResponse.json({
                    status: 400,
                    success: false,
                    message: "Invalid video type."
                });
            }

            const result = await db.insert(videosTable).values({
                title: 'Default Title',
                createdBy: userDetails.id,
                type: 'CUSTOM'
            }).returning({id: videosTable.id});

            const newVideoId = result[0].id;

            return NextResponse.json({
                status: 201,
                success: true,
                data: newVideoId,
                message: "Video created successfully."
            });
        } catch (error) {
            console.error("Error creating video:", error);
            return NextResponse.json({
                status: 500,
                success: false,
                data: null,
                message: "Error creating video."
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

export async function PATCH(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    if (req.method === 'PATCH') {
        try {
            const { videoId, userDetails, videoTitle, videoData } = await req.json();

            if(!userDetails) {
                return NextResponse.json({
                    status: 500,
                    success: false,
                    data: null,
                    message: "User not found. Please try again."
                });
            }

            const video = await db.select().from(videosTable).where(
                and(
                    eq(videosTable.id, videoId),
                    eq(videosTable.createdBy, userDetails.id)
                )
            )

            if(!video) {
                return NextResponse.json({
                    status: 500,
                    success: false,
                    data: null,
                    message: "Video not found. Please try again by creating a new video."
                });
            }

            const result = await db.update(videosTable).set({
                title: videoTitle,
                data: videoData,
                createdBy: userDetails.id,
            }).where(
                and(
                    eq(videosTable.id, videoId),
                    eq(videosTable.createdBy, userDetails.id)
                )
            ).returning({id: videosTable.id});

            const newVideoId = result[0].id;

            return NextResponse.json({
                status: 200,
                success: true,
                data: newVideoId,
                message: "Video has been saved successfully."
            });
        } catch (error) {
            console.error("Error saving video:", error);
            return NextResponse.json({
                status: 500,
                success: false,
                data: null,
                message: "Error saving video."
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
