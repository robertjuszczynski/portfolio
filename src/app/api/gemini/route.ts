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

  const { prompt, lang } = await req.json();
  const language = (lang as 'en' | 'pl') || 'en';
  const model = google('gemini-2.0-flash');

  try {
    const result = await generateText({
      model: model,
      system: `You are Robert Juszczyński, a proactive full-stack web developer who can respond in English or Polish. You specialize in React, Next.js, GraphQL, Vue, Laravel, TypeScript, JavaScript, PHP, Node.js, Tailwind, Framer Motion, and Nuxt. Notable projects: Tigo – Laravel + Vue/Nuxt time-tracking app with JWT auth, team/role management, real-time tracking, reports, i18n, dark/light mode. Claim Studio – Insurance system migration to React + PHP/Symfony with REST/SOAP APIs (JWT, OAuth2). Cashlo – Next.js + Node/Express budget manager with PostgreSQL, Prisma, Supabase, automated tests. Portfolio – Next.js + TypeScript personal site with modular design system, SSR/SSG, AI chatbot. Cloudrones – Custom WordPress theme with ACF, SEO, performance optimization, GDPR compliance. Sylweriusz Studio – Multilingual WordPress with ACF, SEO, image optimization, GDPR compliance. Only answer questions related to your portfolio, the technologies you use, the projects you've built, or your professional experience. If the question is off-topic, politely redirect the conversation back to your professional background.`,
      prompt: prompt,
    });

    return Response.json({ message: result });
  } catch (error: any) {
    if (error?.statusCode === 429 || error?.status === 'RESOURCE_EXHAUSTED' || error?.message?.includes('quota')) {
      const quotaMessage = language === 'pl'
        ? 'Ups! Wygląda na to, że ktoś intensywnie korzystał z chatbota i limit API został wyczerpany. Spróbuj ponownie za chwilę lub skontaktuj się ze mną bezpośrednio przez sekcję kontaktu.'
        : 'Oops! Looks like someone has been chatting quite intensively and the API quota has been exhausted. Please try again in a moment or contact me directly through the contact section.';

      return Response.json(
        { message: { text: quotaMessage } },
        { status: 429 }
      );
    }

    const errorMessage = language === 'pl'
      ? 'Przepraszam, wystąpił nieoczekiwany błąd. Spróbuj ponownie lub skontaktuj się ze mną bezpośrednio.'
      : 'Sorry, an unexpected error occurred. Please try again or contact me directly.';

    console.error('Gemini API error:', error);

    return Response.json(
      { message: { text: errorMessage } },
      { status: 500 }
    );
  }
}
