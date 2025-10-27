import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { connectToDatabase } from '@/lib/db/mongodb';
import Entity from '@/lib/db/models/Entity';

// GET /api/entities - Search and list entities
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let entities;

    if (query) {
      // Search entities
      entities = await Entity.searchEntities(query, limit);
    } else if (type) {
      // Get entities by type
      entities = await Entity.find({ type })
        .sort({ mentionCount: -1 })
        .skip(offset)
        .limit(limit);
    } else {
      // Get top entities
      entities = await Entity.getTopEntities(undefined, limit);
    }

    return NextResponse.json({
      success: true,
      entities,
      total: await Entity.countDocuments(type ? { type } : {}),
    });
  } catch (error) {
    console.error('Failed to fetch entities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch entities' },
      { status: 500 }
    );
  }
}

// POST /api/entities - Create new entity
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const body = await request.json();
    const { name, type, ticker, description, metadata } = body;

    if (!name || !type) {
      return NextResponse.json(
        { error: 'Name and type are required' },
        { status: 400 }
      );
    }

    // Check if entity already exists
    const existing = ticker
      ? await Entity.findByTicker(ticker)
      : await Entity.findOne({ name: new RegExp(`^${name}$`, 'i'), type });

    if (existing) {
      return NextResponse.json(
        { error: 'Entity already exists', entity: existing },
        { status: 409 }
      );
    }

    // Create new entity
    const entity = new Entity({
      name,
      type,
      ticker,
      description,
      metadata: metadata || {},
    });

    await entity.save();

    return NextResponse.json({
      success: true,
      entity,
    });
  } catch (error) {
    console.error('Failed to create entity:', error);
    return NextResponse.json(
      { error: 'Failed to create entity' },
      { status: 500 }
    );
  }
}