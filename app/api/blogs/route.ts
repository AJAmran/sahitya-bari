import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { auth } from '@/lib/auth-node';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const [rawBlogs, total] = await Promise.all([
      BlogPost.find()
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogPost.countDocuments(),
    ]);

    const blogs = rawBlogs.map((b: any) => ({
      ...b,
      id: b._id.toString(),
    }));

    return NextResponse.json({ blogs, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
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
    const blog = await BlogPost.create({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || '',
      content: body.content,
      coverImage: body.coverImage || '',
      author: body.author,
      category: body.category,
      publishedAt: new Date(),
    });

    const result = JSON.parse(JSON.stringify(blog));
    result.id = result._id;

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to create blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
