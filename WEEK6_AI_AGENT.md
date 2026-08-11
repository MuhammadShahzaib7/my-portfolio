# Week 6 - Personal AI Agent

## Overview
This document outlines the implementation details of the Personal AI Agent added to the portfolio.

### What Was Already Present
- A functional Next.js portfolio website.
- Basic AI SDK dependencies (`ai`, `@ai-sdk/react`, `@ai-sdk/google`).
- A generic `AIChat.js` component and `src/app/api/chat/route.js` endpoint.

### What Was Added
- A comprehensive **System Prompt Strategy** to convert the generic chat interface into a true *Personal* AI Agent.
- Explicit anti-hallucination instructions.
- Full context injection containing actual Skills, Education, Experience, and Projects from the website.

## AI Implementation Details
- **AI Provider**: Google Generative AI (Gemini).
- **Model Used**: `gemini-3.5-flash`.
- **How It Works**: The user types a message in the `AIChat` UI component, which streams a request to `src/app/api/chat/route.js`. The server route attaches the predefined context and streams back a response using the `streamText` function from the Vercel AI SDK.
- **Context Injection**: Portfolio information is hardcoded into the `systemPrompt` variable in the backend route, acting as a strict boundary for the AI's knowledge base.

## Security Approach
- The Gemini API key (`GOOGLE_GENERATIVE_AI_API_KEY`) is stored in environment variables (`.env.local`).
- No API keys are prefixed with `NEXT_PUBLIC_`, ensuring they are never exposed to the frontend bundle.
- The route implements a basic IP-based rate limiting strategy (max 5 requests per minute) to prevent abuse.
- Message input length and history size are validated strictly before contacting the LLM.

## Environment Variables
Required variables:
- `GOOGLE_GENERATIVE_AI_API_KEY` (placeholder provided in `.env.example`).

## Example Questions
- "Tell me about your projects."
- "What experience do you have?"
- "Which frontend frameworks do you use?"
- "Tell me about a project that isn't listed on the portfolio." (Hallucination test - should refuse gracefully).

## How to Run Locally
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env.local` file and add your `GOOGLE_GENERATIVE_AI_API_KEY`.
4. Run `npm run dev`.
5. Click the chat bubble in the bottom right corner of the screen.
