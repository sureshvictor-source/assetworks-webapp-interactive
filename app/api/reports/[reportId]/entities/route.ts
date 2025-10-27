import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { connectToDatabase } from '@/lib/db/mongodb';
import Entity from '@/lib/db/models/Entity';
import EntityMention from '@/lib/db/models/EntityMention';
import { Types } from 'mongoose';

// GET /api/reports/[reportId]/entities - Get entities mentioned in a report
export async function GET(
  request: NextRequest,
  { params }: { params: { reportId: string } }
) {
  try {
    // Check for dev auth bypass
    const isDev = process.env.NODE_ENV === 'development' && process.env.DISABLE_AUTH === 'true';

    if (!isDev) {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const { reportId } = params;

    if (!reportId || !Types.ObjectId.isValid(reportId)) {
      return NextResponse.json({ error: 'Invalid report ID' }, { status: 400 });
    }

    await connectToDatabase();

    // Find all entity mentions for this report
    const mentions = await EntityMention.find({
      reportId: new Types.ObjectId(reportId)
    })
      .populate('entityId')
      .sort({ relevance: -1, sentiment: -1 });

    // Group by entity and aggregate data
    const entityMap = new Map();

    for (const mention of mentions) {
      if (!mention.entityId) continue;

      const entity = mention.entityId as any;
      const entityId = entity._id.toString();

      if (!entityMap.has(entityId)) {
        entityMap.set(entityId, {
          id: entityId,
          name: entity.name,
          slug: entity.slug,
          type: entity.type,
          ticker: entity.ticker,
          logo: entity.logo,
          mentionCount: 0,
          sentiment: 0,
          relevance: 0,
          contexts: []
        });
      }

      const entityData = entityMap.get(entityId);
      entityData.mentionCount++;

      // Calculate average sentiment and relevance
      if (mention.sentiment !== undefined) {
        entityData.sentiment =
          (entityData.sentiment * (entityData.mentionCount - 1) + mention.sentiment) /
          entityData.mentionCount;
      }

      if (mention.relevance !== undefined) {
        entityData.relevance =
          (entityData.relevance * (entityData.mentionCount - 1) + mention.relevance) /
          entityData.mentionCount;
      }

      // Add context if available
      if (mention.context) {
        entityData.contexts.push(mention.context);
      }
    }

    // Convert map to array and sort by relevance/mention count
    const entities = Array.from(entityMap.values())
      .sort((a, b) => {
        // First sort by relevance
        if (a.relevance !== b.relevance) {
          return b.relevance - a.relevance;
        }
        // Then by mention count
        return b.mentionCount - a.mentionCount;
      })
      .slice(0, 10); // Limit to top 10 entities

    return NextResponse.json({
      success: true,
      entities,
      total: entities.length
    });

  } catch (error) {
    console.error('Failed to fetch report entities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report entities' },
      { status: 500 }
    );
  }
}