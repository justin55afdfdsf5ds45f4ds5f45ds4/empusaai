import { openai, MODEL_NAME } from './aiClient';

export async function generateAIContent(text: string, title: string, description: string) {
  const prompt = `Based on the following scraped content, generate 10 creative social media posts.\n\nFor each post:\n- Give a catchy title\n- Write a short description (max 30 words)\n\nContent:\n${text}`;

  async function callOpenAI() {
    const completion = await openai.createChatCompletion({
      model: MODEL_NAME,
      messages: [
        {
          role: 'system',
          content: 'You are a creative assistant specialized in social media content.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
    }, { timeout: 30000 });
    return completion;
  }

  let completion;
  try {
    completion = await callOpenAI();
  } catch (err) {
    // Retry once
    try {
      completion = await callOpenAI();
    } catch (err2) {
      // Fallback error
      return Array.from({ length: 10 }).map((_, i) => ({
        image_url: 'https://via.placeholder.com/300x160.png?text=AI+Image',
        title: `AI generation failed`,
        description: `Could not generate post. Please try again later.`
      }));
    }
  }

  // Parse OpenAI response
  const content = completion.data.choices[0]?.message?.content || '';
  // Expecting OpenAI to return a list of posts, parse them
  // Try to split by lines and group into title/description pairs
  const posts: { image_url: string; title: string; description: string }[] = [];
  const lines = content.split('\n').filter(Boolean);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line && (line.toLowerCase().startsWith('title:') || line.toLowerCase().startsWith('post'))) {
      const title = line.replace(/^title:/i, '').replace(/^post \d+:/i, '').trim();
      const descLine = lines[i + 1]?.trim();
      let description = '';
      if (descLine && descLine.toLowerCase().startsWith('description:')) {
        description = descLine.replace(/^description:/i, '').trim();
        i++; // skip next line
      }
      posts.push({
        image_url: 'https://via.placeholder.com/300x160.png?text=AI+Image',
        title: title || 'Generated Title',
        description: description || 'Generated Description',
      });
    }
    if (posts.length >= 10) break;
  }
  // Fallback: if parsing fails, return generic posts
  if (posts.length === 0) {
    return Array.from({ length: 10 }).map((_, i) => ({
      image_url: 'https://via.placeholder.com/300x160.png?text=AI+Image',
      title: `Generated Title ${i + 1}`,
      description: `Generated Description ${i + 1}`,
    }));
  }
  return posts;
} 