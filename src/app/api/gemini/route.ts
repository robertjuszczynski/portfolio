import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
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
