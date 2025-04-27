import axios from 'axios';
import * as cheerio from 'cheerio';

const MAX_SIZE = 1024 * 1024 * 2; // 2MB
const TIMEOUT = 10000; // 10 seconds

export async function scrapeContent(url: string): Promise<{ title: string; description: string; text: string }> {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      maxContentLength: MAX_SIZE,
      timeout: TIMEOUT,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; EmpusaAI/1.0)'
      }
    });
    const html = response.data.toString('utf-8');
    const $ = cheerio.load(html);
    // Remove scripts, styles, ads
    $('script, style, [class*="ad"], [id*="ad"]').remove();
    const title = $('title').text().trim() || '';
    const description = $('meta[name="description"]').attr('content')?.trim() || '';
    // Get main text content
    let text = '';
    $('p').each((_, el) => {
      text += $(el).text() + '\n';
    });
    text = text.replace(/\s+/g, ' ').trim();
    return { title, description, text };
  } catch (err: any) {
    throw new Error('Failed to scrape content: ' + (err.message || 'Unknown error'));
  }
} 