import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const requests = new Map();

const rateLimit = (limit: number, interval: number) => {
  return (req: Request) => {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    if (!requests.has(ip)) {
      requests.set(ip, { count: 0, firstRequest: Date.now() });
    }

    const data = requests.get(ip);
    if (Date.now() - data.firstRequest > interval) {
      // Reset the count every interval
      data.count = 0;
      data.firstRequest = Date.now();
    }

    data.count += 1;
    if (data.count > limit) {
      return false;
    }

    requests.set(ip, data);
    return true;
  };
};

const checkRateLimit = rateLimit(10, 60000); // 10 requests per minute

export async function POST(req: Request) {
  if (!checkRateLimit(req)) {
    return Response.json(
      { message: 'Too many requests, please try again later.' },
      { status: 429 }
    );
  }

  const { prompt } = await req.json();
  const model = google('gemini-2.0-flash-exp');

  const result = await generateText({
    model: model,
    system:
      'You are a helpful and professional assistant representing a full stack developer. Only answer questions related to their portfolio, technologies they use, projects they’ve built, and their professional experience. Do not answer questions unrelated to their work, personal life, or topics outside of software development and their professional background. If the question is off-topic, politely redirect the user back to the developers work.',
    prompt: prompt,
  });

  return Response.json({ message: result });
}
