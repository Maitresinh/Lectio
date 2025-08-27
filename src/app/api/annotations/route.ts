import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import HypothesisClient, { lectioToHypothesis } from '@/lib/hypothesis';

// GET /api/annotations - Get user's annotations
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');
    const groupId = searchParams.get('groupId');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {
      userId: session.user.id,
      isDeleted: false,
    };

    if (bookId) where.bookId = bookId;
    if (groupId) where.groupId = groupId;
    if (type) where.type = type;

    const annotations = await prisma.annotation.findMany({
      where,
      include: {
        user: {
          select: { id: true, name: true, username: true, email: true }
        },
        book: {
          select: { id: true, title: true, author: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await prisma.annotation.count({ where });

    return NextResponse.json({
      annotations,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching annotations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/annotations - Create new annotation
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      bookId,
      groupId,
      text,
      content,
      cfiRange,
      pageNumber,
      position,
      color = 'YELLOW',
      type = 'NOTE',
      isPrivate = false,
    } = body;

    // Validate required fields
    if (!bookId || !text || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: bookId, text, content' },
        { status: 400 }
      );
    }

    // Check if book exists
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    // Check group membership if annotation is for a group
    if (groupId) {
      const membership = await prisma.groupMember.findUnique({
        where: {
          userId_groupId: {
            userId: session.user.id,
            groupId: groupId
          }
        }
      });

      if (!membership) {
        return NextResponse.json({ error: 'Not a member of this group' }, { status: 403 });
      }
    }

    let hypothesisId: string | undefined;

    // Sync with Hypothesis if configured
    if (process.env.HYPOTHESIS_API_KEY) {
      try {
        const hypothesisClient = new HypothesisClient({
          apiUrl: 'https://hypothes.is/api',
          apiKey: process.env.HYPOTHESIS_API_KEY,
        });

        const hypothesisAnnotation = await hypothesisClient.createAnnotation(
          lectioToHypothesis({
            text,
            content,
            cfiRange,
            pageNumber,
            position,
            bookId,
            userId: session.user.id,
            groupId,
          })
        );

        hypothesisId = hypothesisAnnotation.id;
      } catch (hypothesisError) {
        console.error('Failed to sync with Hypothesis:', hypothesisError);
        // Continue without Hypothesis sync
      }
    }

    // Create annotation in database
    const annotation = await prisma.annotation.create({
      data: {
        userId: session.user.id,
        bookId,
        groupId,
        hypothesisId,
        text,
        content,
        cfiRange,
        pageNumber,
        position: position ? JSON.stringify(position) : null,
        color,
        type,
        isPrivate,
      },
      include: {
        user: {
          select: { id: true, name: true, username: true, email: true }
        },
        book: {
          select: { id: true, title: true, author: true }
        }
      }
    });

    // Create feed item for group activity
    if (groupId && !isPrivate) {
      await prisma.feedItem.create({
        data: {
          groupId,
          userId: session.user.id,
          type: 'ANNOTATION_CREATED',
          content: {
            annotationId: annotation.id,
            bookTitle: book.title,
            text: text.substring(0, 100),
          }
        }
      });
    }

    return NextResponse.json(annotation, { status: 201 });
  } catch (error) {
    console.error('Error creating annotation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}