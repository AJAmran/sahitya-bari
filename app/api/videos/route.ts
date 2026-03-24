import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Video from '@/lib/models/Video';
import { auth } from '@/lib/auth-node';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const [rawVideos, total] = await Promise.all([
      Video.find()
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Video.countDocuments(),
    ]);

    const videos = rawVideos.map((v: any) => ({
      ...v,
      id: v._id.toString(),
    }));

    return NextResponse.json({ videos, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const video = await Video.create({
      youtubeId: body.youtubeId,
      title: body.title,
      description: body.description || '',
      thumbnail: body.thumbnail || '',
      views: body.views || '0',
      duration: body.duration || '',
      publishedAt: new Date(body.publishedAt || new Date()),
      category: body.category || 'Video',
    });

    const result = JSON.parse(JSON.stringify(video));
    result.id = result._id;

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to create video:', error);
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
  }
}
