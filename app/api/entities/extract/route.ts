import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { connectToDatabase } from '@/lib/db/mongodb';
import { entityExtractionService } from '@/lib/services/entity-extraction.service';

// POST /api/entities/extract - Extract entities from text
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const body = await request.json();
    const { text, reportId, messageId, threadId, title, type } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required for extraction' },
        { status: 400 }
      );
    }

    let result;

    if (reportId) {
      // Extract from report
      result = await entityExtractionService.extractFromReport(
        reportId,
        text,
        title,
        session.user.id
      );
    } else if (messageId) {
      // Extract from message
      result = await entityExtractionService.extractFromMessage(
        messageId,
        text,
        threadId
      );
    } else {
      // Just extract entities without creating mentions
      const extractedData = await entityExtractionService['extractEntitiesWithAI'](
        text,
        title
      );

      return NextResponse.json({
        success: true,
        entities: extractedData,
      });
    }

    return NextResponse.json({
      success: true,
      entities: result.entities.map(e => ({
        id: e._id,
        name: e.name,
        type: e.type,
        ticker: e.ticker,
        slug: e.slug,
        mentionCount: e.mentionCount,
        sentimentScore: e.sentimentScore,
      })),
      mentions: result.mentions.length,
      errors: result.errors,
    });
  } catch (error) {
    console.error('Entity extraction failed:', error);
    return NextResponse.json(
      { error: 'Entity extraction failed' },
      { status: 500 }
    );
  }
}