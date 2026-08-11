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
    const systemPrompt = `You are the personal AI assistant for this Full Stack Web Developer's portfolio.
    Answer questions based ONLY on the following portfolio information. NEVER invent or fabricate facts, projects, skills, jobs, education, or experience. 
    If information is not available in the context below, clearly say that the information is not available. Keep responses professional, concise, and friendly.

    PORTFOLIO CONTEXT:
    Bio: Full Stack Web Developer. Passionate about creating seamless user experiences and writing clean, maintainable code.
    Education: B.S. Computer Science, University Name (2018 - 2022). Focused on software engineering, web development, algorithms.
    Experience: 
    - Frontend Developer at Tech Company Inc. (2022 - Present). React, Next.js.
    - Web Development Intern at Startup LLC (Summer 2021). UI components, RESTful APIs.
    Goals: Cloud architecture, web performance optimization, accessible web experiences.
    
    Projects:
    1. E-Commerce Platform (Next.js, Tailwind CSS, Stripe, MongoDB)
    2. Task Management App (React, Node.js, Socket.io, Express)
    3. Weather Dashboard (JavaScript, HTML, CSS, OpenWeather API)
    4. Personal Blog (Next.js, Tailwind CSS, MDX)
    5. Fitness Tracker (React, Chart.js, Firebase)
    6. Recipe Finder (Vue.js, Tailwind CSS, Spoonacular API)

    Skills:
    - Frontend: HTML, CSS, JavaScript, React, Next.js, Tailwind CSS
    - Backend: Node.js, Express.js, PHP, Laravel
    - Database: MongoDB, MySQL
    - Tools: Git, GitHub, VS Code, Vercel`;

    const result = streamText({
      model: google('gemini-3.5-flash'), // or gemini-1.5-flash depending on availability
      system: systemPrompt,
      messages,
    });

    // Handle different AI SDK versions seamlessly
    // We now use toTextStreamResponse because the custom frontend parser expects raw text.
    if (typeof result.toTextStreamResponse === 'function') {
      return result.toTextStreamResponse();
    } else if (typeof result.toDataStreamResponse === 'function') {
      return result.toDataStreamResponse();
    } else if (typeof result.toAIStreamResponse === 'function') {
      return result.toAIStreamResponse();
    } else if (typeof result.toResponse === 'function') {
      return result.toResponse();
    } else {
      return new Response(JSON.stringify({ error: 'Missing stream function on result object.' }), { status: 500 });
    }

  } catch (error) {
    console.error('Chat API Error:', error);
    // Return a generic error to avoid leaking stack traces or keys
    return new Response(JSON.stringify({ error: 'Internal server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
