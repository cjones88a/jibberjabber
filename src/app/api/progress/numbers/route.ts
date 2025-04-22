import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { number, completed, score } = body;

    if (typeof number !== 'number' || typeof completed !== 'boolean' || typeof score !== 'number') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Update or create progress record
    const progress = await prisma.progress.upsert({
      where: {
        userId_category_level: {
          userId: session.user.id,
          category: 'NUMBERS',
          level: number,
        },
      },
      update: {
        completed,
        score: score,
      },
      create: {
        userId: session.user.id,
        category: 'NUMBERS',
        level: number,
        completed,
        score: score,
      },
    });

    // Check for achievements
    if (completed && score >= 90) {
      await prisma.achievement.create({
        data: {
          userId: session.user.id,
          type: 'NUMBER_MASTER',
          name: `Number ${number} Master`,
          description: `Mastered the number ${number} with an excellent score!`,
        },
      });
    }

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error('Progress update error:', error);
    return NextResponse.json(
      { error: 'Error updating progress' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const progress = await prisma.progress.findMany({
      where: {
        userId: session.user.id,
        category: 'NUMBERS',
      },
      orderBy: {
        level: 'asc',
      },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error('Progress fetch error:', error);
    return NextResponse.json(
      { error: 'Error fetching progress' },
      { status: 500 }
    );
  }
} 