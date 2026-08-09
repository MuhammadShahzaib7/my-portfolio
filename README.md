# Portfolio App

A modern, high-performance, and accessible developer portfolio with a fully integrated AI Chat assistant and an interactive WebGL Fragment Shader hero background.

---

## Live Demo

**Live Demo:** [https://github.com/MuhammadShahzaib7/my-portfolio](https://github.com/MuhammadShahzaib7/my-portfolio) *(Please refer to Vercel deployments on the main branch)*

---

## Screenshots

*(Ensure these files exist in `docs/screenshots/` before publishing)*
![Homepage](docs/screenshots/home.png)
![AI Chat](docs/screenshots/ai-chat.png)

---

## What It Does

This application serves as a complete digital portfolio for a Full Stack Web Developer. It goes beyond a static resume by featuring:
* A highly interactive, performant **WebGL Aurora Shader** background in the hero section that reacts to mouse movement.
* A fully integrated **AI Assistant Chat** built with Google's Gemini that streams context-aware answers about my projects and skills directly to users.
* A responsive, accessible layout utilizing Tailwind CSS for a sleek dark mode aesthetic.

---

## Features

* **Responsive Portfolio**: Fluidly scales from 375px mobile screens up to 4K displays.
* **Project Showcase**: Clean grid layouts for highlighting work.
* **AI-powered interaction**: A persistent floating AI assistant widget.
* **Streaming AI responses**: Real-time typed responses powered by Vercel AI SDK.
* **Accessible keyboard navigation**: Full Tab support and visible focus states across interactive elements.
* **Interactive GLSL shader hero**: A custom domain-warping fragment shader running raw WebGL.
* **Reduced-motion fallback**: Complete disabling of animation loops and mouse tracking for users with `prefers-reduced-motion: reduce`.
* **Production abuse protection**: AI route input caps, conversation length limits, and basic rate limiting.

---

## Tech Stack

**Frontend:**
- React / Next.js 16 (Turbopack)
- CSS / Tailwind CSS 4

**AI:**
- Vercel AI SDK (`ai`, `@ai-sdk/react`)
- Google Gemini (`@ai-sdk/google`)

**Visuals:**
- Raw WebGL / GLSL

**Deployment:**
- Vercel (or Node.js custom hosting)

---

# INSTALLATION

```bash
git clone https://github.com/MuhammadShahzaib7/my-portfolio.git
cd portfolio-app
npm install
npm run dev
```

---

# ENVIRONMENT VARIABLES

| Variable                       | Required | Description                   | Environment |
| ------------------------------ | -------- | ----------------------------- | ----------- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Yes      | Server-side Gemini API access | Server      |

**Configuration:**
1. Copy `.env.example` to `.env.local`
2. Never prefix this key with `NEXT_PUBLIC_` to ensure it remains strictly on the server.

---

# RUNNING LOCALLY

Start the development server (with Turbopack enabled by default in Next 16):
```bash
npm run dev
```

Other available commands:
```bash
npm run build   # Creates the optimized production build
npm run start   # Starts the production server
npm run lint    # Runs ESLint checks
```

---

# ARCHITECTURE

```text
Browser (Client)
   │
   ├── Portfolio UI (Next.js App Router)
   │
   └── AI Chat Widget (React State)
          │
          ▼
      POST /api/chat
          │
          ├── Validate input (Max 500 chars, max 20 messages)
          ├── Abuse protection & Rate limiting (IP-based Map)
          ├── maxDuration (30s Edge timeout limit)
          ├── Vercel AI SDK (streamText)
          │
          ▼
      Google Gemini 2.5 Flash
          │
          ▼
   Streaming Response (HTTP chunks)
          │
          ▼
      Chat UI (Markdown/Text rendering)
```

**Client/Server Responsibilities:**
- The client strictly handles React state, layout, WebGL rendering, and capturing user input.
- The server (API Route) holds the secret API keys, enforces rate limits, validates incoming payloads to prevent abuse, and proxies the stream from Gemini back to the client. 

---

# PROJECT STRUCTURE

```text
src/
├── app/
│   ├── api/chat/route.js     # Secure AI streaming endpoint
│   ├── layout.js             # Root layout containing the AI widget
│   └── page.js               # Home page with ShaderHero
├── components/
│   ├── AIChat.js             # Floating AI chat UI
│   └── ShaderHero/           # WebGL canvas and raw GLSL files
└── ...

.env.example                  # Safe environment placeholders
SHADER_NOTES.md               # Technical breakdown of the GLSL hero
README.md                     # You are here!
```

---

# AI IMPLEMENTATION

- **Provider**: Google Generative AI
- **Model**: `gemini-2.5-flash`
- **SDK**: Vercel AI SDK (`ai` & `@ai-sdk/react`)
- **Configuration**: The API key is securely loaded on the server via `process.env`.
- **Streaming**: The route uses `streamText()` and `toDataStreamResponse()` to send Server-Sent Events (SSE) back to the `useChat` hook on the frontend, enabling a typing effect.
- **Validation**: Manual string length checking (max 500 chars per message) and array length checking (max 20 messages per context window) are enforced before passing data to the SDK.
- **Errors**: Handled safely via `try/catch`. The server returns sanitized 400 (Bad Request), 429 (Rate Limit), or 500 (Internal Error) status codes without leaking stack traces.
- **Cancellation**: The frontend uses the `stop()` function provided by `useChat` to abort the HTTP request instantly.

---

# AI ROUTE SECURITY

### Input limits
A single user message is capped at 500 characters. The total conversation history allowed in a single payload is capped at 20 messages to prevent excessive token consumption.

### Rate limiting
A basic IP-based rate limiter using an in-memory `Map` restricts users to 5 requests per minute. *(Note: see Known Limitations regarding serverless instances).*

### maxDuration
The API route exports `export const maxDuration = 30;` to ensure long-running AI requests do not consume Vercel/serverless resources indefinitely.

### Server-side secrets
`GOOGLE_GENERATIVE_AI_API_KEY` is completely isolated in the Node.js backend. It is never exposed in client bundles.

---

# ACCESSIBILITY

- **Semantic HTML**: Proper heading hierarchies and landmark tags.
- **Keyboard Navigation**: The AI Chat widget and all portfolio buttons are fully tabbable.
- **Reduced Motion**: If a user's OS is set to `prefers-reduced-motion`, the WebGL shader immediately halts its animation loop and ignores mouse input, leaving a beautifully crafted static fallback image.
- **Aria Labels**: Non-text elements like the chat toggle and stop buttons have descriptive `aria-label`s.

---

# PERFORMANCE

- **Device Pixel Ratio (DPR) Cap**: The WebGL shader caps the `devicePixelRatio` at `2.0`. This prevents 4K retina displays from rendering an excessive amount of fragments, saving massive amounts of GPU overhead.
- **Hidden-tab Pause**: The `requestAnimationFrame` loop listens to the Page Visibility API and completely pauses rendering when the user switches away from the portfolio tab.

---

# SHADER / VISUAL EXPERIENCE

The hero section runs a raw WebGL fragment shader without the overhead of Three.js.
- Uses `u_time` to animate a fluid Fractional Brownian Motion (fBm) aurora field.
- Uses `u_mouse` to create a subtle distance-based spatial bend around the cursor.
- Automatically handles aspect ratio stretching via `u_resolution`.
- See `SHADER_NOTES.md` for a comprehensive, line-by-line technical breakdown.

---

# DESIGN / ENGINEERING DECISIONS

- **Why Next.js / React**: Provides excellent out-of-the-box routing and serverless API integration, making it trivial to securely host the AI endpoint alongside the frontend.
- **Why Vercel AI SDK**: It abstracts the massive complexity of parsing Server-Sent Events into a simple `useChat` hook while maintaining excellent TypeScript support.
- **Why raw WebGL over Three.js**: For a single fullscreen 2D shader, Three.js is a massive bundle size addition. Raw WebGL keeps the application extremely lightweight and performant.

---

# HOW AI TOOLS BUILT THIS

AI assistance was used as a senior engineering collaborator during development.

Antigravity/Gemini was used to:
- Generate and refine the complex GLSL fragment shader, strictly translating generic math into the specific Tailwind `slate-900` color palette.
- Explain advanced GLSL concepts (like UV normalization, aspect ratio correction, and domain warping) which were then documented in `SHADER_NOTES.md`.
- Scaffold the `AIChat.js` floating widget UI using Tailwind classes.
- Implement the streaming API route and propose the exact security boundaries (input capping, maxDuration, rate limit mapping).
- Debug Next.js 16 Turbopack compatibility issues with importing `.frag` files, resulting in the architectural decision to export the GLSL as JS strings instead.
- Assist in generating this rigorous production-ready README and ensuring all accessibility standards were verified.

AI-generated code was not accepted blindly. The implementation was reviewed, run locally, tested against edge cases (like extreme resize events and malicious chat inputs), and verified against the application's actual behavior.

---

# TESTING

| Check                  | Result        |
| ---------------------- | ------------- |
| Production URL         | Pass          |
| Build (`npm run build`)| Pass          |
| Lint (`npm run lint`)  | Pass          |
| AI streaming           | Pass          |
| Input cap (500 chars)  | Pass          |
| Rate Limit (429)       | Pass          |
| Chrome                 | Pass          |
| Firefox                | Pass          |
| Safari                 | Not Available |
| Mobile Safari          | Not Available |
| Mobile Responsive      | Pass          |

---

# DEPLOYMENT

- **Hosting Provider**: Configured for Vercel.
- **Build Command**: `next build`
- **Environment setup**: Set `GOOGLE_GENERATIVE_AI_API_KEY` securely in the Vercel dashboard prior to deployment.

---

# KNOWN LIMITATIONS

1. **Safari Testing**: Native Safari and Mobile Safari were not available in the current development environment for QA testing.
2. **Rate Limiting**: The current rate limiter uses an in-memory JS `Map`. In a serverless environment (like Vercel), this Map is scoped to individual function instances. While it stops naive client-side spamming, a true distributed DDoS protection would require migrating to Vercel KV or Redis.
