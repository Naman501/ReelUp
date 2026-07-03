import { connectDB } from "@/lib/db";
import { authOptions } from "@/lib/next-auth-options";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    if (!videos || videos.length === 0) {
      return NextResponse.json([], {
        status: 200,
      });
    }
    console.log("videos", videos);
    return NextResponse.json(videos, {
      status: 200,
    });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      {
        status: 401,
      },
    );
  }
}


export async function POST(req:NextRequest){
    try {
        const session=getServerSession(authOptions)
        if(!session){
            return NextResponse.json({
                error:"Unauthorized!"
            },
            {status:402}
        )
        }
        await connectDB();
        const body:IVideo=await req.json();

        if(!body.title || !body.description || !body.videoUrl || !body.thumbNailUrl){
            return NextResponse.json({
                error:"Missing required fields!"
            },
            {status:400}
        )}

        const videoData={
            ...body,
            controls:body.controls ?? true,
            transformation:{
                height:1920,
                width:1080,
                quality:body.transformation?.quallity ?? 100
            }
        }
        const newVideo=await Video.create(videoData)
        console.log("Uploaded video",newVideo)
        return NextResponse.json({
                newVideo
            },
            {status:402}
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json({error:"Failed to upload videos."},{
status:200
})
    }
} 