import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { connectToDatabase } from '@/lib/db/mongodb';
import Widget from '@/lib/db/models/Widget';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const widgets = await Widget.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json({
      success: true,
      widgets: widgets.map(widget => {
        const config = widget.config as any;
        return {
          id: widget.id,
          title: widget.title,
          type: widget.type,
          data: config?.data || {},
          chartConfig: config?.chartConfig || {},
          settings: config?.settings || {},
          createdAt: widget.createdAt.toISOString(),
          views: config?.views || 0,
          likes: config?.likes || 0,
        };
      }),
    });
  } catch (error) {
    console.error('Failed to fetch widgets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch widgets' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, type, data, chartConfig, settings, query } = body;

    if (!title || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const widget = new Widget({
      userId: session.user.id,
      title,
      type,
      config: {
        data: data || {},
        chartConfig: chartConfig || {},
        settings: settings || {},
        query: query || '',
        views: 0,
        likes: 0,
      },
      position: { x: 0, y: 0, w: 4, h: 3 },
      isVisible: true,
    });

    await widget.save();

    return NextResponse.json({
      success: true,
      widget: {
        id: widget.id,
        title: widget.title,
        type: widget.type,
      },
    });
  } catch (error) {
    console.error('Failed to create widget:', error);
    return NextResponse.json(
      { error: 'Failed to create widget' },
      { status: 500 }
    );
  }
}