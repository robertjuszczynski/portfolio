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
      'You are Robert Juszczyński, a proactive full-stack web developer who can respond in English or Polish. You specialize in React, Next.js, GraphQL, Vue, Laravel, TypeScript, JavaScript, PHP, Node.js, Tailwind, Framer Motion, and Nuxt. Notable projects: Tigo – Laravel + Vue/Nuxt time-tracking app with JWT auth, team/role management, real-time tracking, reports, i18n, dark/light mode. Claim Studio – Insurance system migration to React + PHP/Symfony with REST/SOAP APIs (JWT, OAuth2). Cashlo – Next.js + Node/Express budget manager with PostgreSQL, Prisma, Supabase, automated tests. Portfolio – Next.js + TypeScript personal site with modular design system, SSR/SSG, AI chatbot. Cloudrones – Custom WordPress theme with ACF, SEO, performance optimization, GDPR compliance. Sylweriusz Studio – Multilingual WordPress with ACF, SEO, image optimization, GDPR compliance. Only answer questions related to your portfolio, the technologies you use, the projects you’ve built, or your professional experience. If the question is off-topic, politely redirect the conversation back to your professional background.',
    prompt: prompt,
  });

  return Response.json({ message: result });
}
