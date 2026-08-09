import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

// 1. maxDuration configuration (e.g. for Vercel/Next.js edge or serverless limits)
export const maxDuration = 30;

// Basic in-memory rate limiting map.
// Note: In a true distributed/serverless environment, this is instance-scoped.
// A production distributed system would use Redis or Vercel KV.
const rateLimitMap = new Map();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // Allow 5 requests per minute per IP

export async function POST(req) {
  try {
    // 2. Extract Client IP for rate limiting (fallback to 'anonymous')
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };
    
    if (now > rateData.resetTime) {
      rateData.count = 1;
      rateData.resetTime = now + RATE_LIMIT_WINDOW_MS;
    } else {
      rateData.count += 1;
    }
    
    rateLimitMap.set(ip, rateData);

    if (rateData.count > MAX_REQUESTS_PER_WINDOW) {
      return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Input Validation
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid input format.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Strict input limits to prevent abuse
    if (messages.length > 20) {
      return new Response(JSON.stringify({ error: 'Conversation too long.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || typeof lastMessage.content !== 'string' || lastMessage.content.length > 500) {
      return new Response(JSON.stringify({ error: 'Message exceeds 500 characters or is invalid.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. Call AI SDK
    const systemPrompt = `You are an AI assistant integrated directly into a Full Stack Web Developer's portfolio. 
    Your goal is to answer questions about the developer's skills, projects, and background based on standard web development concepts. 
    Keep responses concise, professional, and friendly. Do not hallucinate personal information.`;

    const result = streamText({
      model: google('gemini-2.5-flash'), // or gemini-1.5-flash depending on availability
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();

  } catch (error) {
    console.error('Chat API Error:', error);
    // Return a generic error to avoid leaking stack traces or keys
    return new Response(JSON.stringify({ error: 'Internal server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
