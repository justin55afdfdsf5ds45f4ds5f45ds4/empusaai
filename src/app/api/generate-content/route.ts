import { NextRequest, NextResponse } from 'next/server';
import { scrapeContent } from '../../../lib/scrapeContent';
import { generateAIContent } from '../../../lib/generateAIContent';
import { getServerSession } from 'next-auth/next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/userModel';
import authOptions from '../auth/[...nextauth]/options';

function isToday(date: Date) {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }
    // Reset postsToday if lastReset is not today
    if (!isToday(user.lastReset)) {
      user.postsToday = 0;
      user.lastReset = new Date();
    }
    if (user.postsToday >= 100) {
      return NextResponse.json({ error: 'Daily post limit reached.' }, { status: 429 });
    }
    const { url } = await req.json();
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid URL.' }, { status: 400 });
    }
    // Basic URL validation
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format.' }, { status: 400 });
    }
    // Scrape content
    const scraped = await scrapeContent(url);
    if (!scraped || !scraped.text) {
      return NextResponse.json({ error: 'Failed to extract content from the page.' }, { status: 422 });
    }
    // Generate AI content (mocked)
    const posts = await generateAIContent(scraped.text, scraped.title, scraped.description);
    user.postsToday += posts.length;
    await user.save();
    return NextResponse.json(posts);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error.' }, { status: 500 });
  }
} 