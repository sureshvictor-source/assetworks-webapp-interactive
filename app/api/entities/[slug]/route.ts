import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { connectToDatabase } from '@/lib/db/mongodb';
import Entity from '@/lib/db/models/Entity';
import EntityMention from '@/lib/db/models/EntityMention';
import EntityInsight from '@/lib/db/models/EntityInsight';
import { entityAggregationService } from '@/lib/services/entity-aggregation.service';

// GET /api/entities/[slug] - Get entity details
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { slug } = params;

    // Find entity by slug or ID
    const entity = slug.match(/^[0-9a-fA-F]{24}$/)
      ? await Entity.findById(slug)
      : await Entity.findBySlug(slug);

    if (!entity) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
    }

    // Get aggregated data
    const aggregatedData = await entityAggregationService.aggregateEntityData(
      entity._id.toString()
    );

    return NextResponse.json({
      success: true,
      entity: aggregatedData?.entity || entity,
      mentions: aggregatedData?.mentions || [],
      insights: aggregatedData?.insights || [],
      summary: aggregatedData?.summary || '',
      trends: aggregatedData?.trends || [],
      relatedEntities: aggregatedData?.relatedEntities || [],
    });
  } catch (error) {
    console.error('Failed to fetch entity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch entity' },
      { status: 500 }
    );
  }
}

// PUT /api/entities/[slug] - Update entity
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { slug } = params;
    const body = await request.json();

    // Find entity
    const entity = slug.match(/^[0-9a-fA-F]{24}$/)
      ? await Entity.findById(slug)
      : await Entity.findBySlug(slug);

    if (!entity) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
    }

    // Update fields
    const allowedFields = [
      'description', 'logo', 'website', 'industry', 'sector',
      'headquarters', 'founded', 'employees', 'marketCap',
      'revenue', 'profit', 'peRatio', 'tags', 'metadata'
    ];

    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        (entity as any)[field] = body[field];
      }
    });

    await entity.save();

    return NextResponse.json({
      success: true,
      entity,
    });
  } catch (error) {
    console.error('Failed to update entity:', error);
    return NextResponse.json(
      { error: 'Failed to update entity' },
      { status: 500 }
    );
  }
}

// DELETE /api/entities/[slug] - Delete entity
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { slug } = params;

    // Find entity
    const entity = slug.match(/^[0-9a-fA-F]{24}$/)
      ? await Entity.findById(slug)
      : await Entity.findBySlug(slug);

    if (!entity) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
    }

    // Delete related data
    await EntityMention.deleteMany({ entityId: entity._id });
    await EntityInsight.deleteMany({ entityId: entity._id });

    // Delete entity
    await entity.deleteOne();

    return NextResponse.json({
      success: true,
      message: 'Entity deleted successfully',
    });
  } catch (error) {
    console.error('Failed to delete entity:', error);
    return NextResponse.json(
      { error: 'Failed to delete entity' },
      { status: 500 }
    );
  }
}