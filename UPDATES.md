# Project Updates

## Week 6 — Impact Project

### Initial State
* The portfolio was fully built using Next.js, React, and Tailwind CSS.
* Core components like `Navbar`, `Footer`, and various layout pages were already completed.
* A basic UI for the AI Assistant (`AIChat.js`) was present but the logic to query the AI lacked specific context.
* An API route (`src/app/api/chat/route.js`) existed using the Vercel AI SDK but its system prompt was generic and hallucination-prone.

### Changes Made

#### 1. Personal AI Agent
* Upgraded the existing AI integration so the AI agent acts specifically as a personal portfolio assistant.
* The agent now refuses to answer with hallucinated data and only relies on verified portfolio experience, goals, and technical stack.
* Solved critical React state bugs in `AIChat.js` regarding controlled vs uncontrolled components.

#### 2. AI Integration
* Provider: `@ai-sdk/google` (Google Generative AI)
* Model: `gemini-1.5-flash` / `gemini-3.5-flash` (via fallback configurations)
* Implemented strict system prompt inside the API route.
* Context is securely passed to the AI via server-side system instructions.

#### 3. Security
* Removed any reliance on client-side secrets.
* Added `GOOGLE_GENERATIVE_AI_API_KEY` to the `.env.local` configuration for server-side processing.

#### 4. UI/UX
* Completely overhauled the form state in `AIChat.js` using local React state and the `append` function from the AI SDK.
* This resolved all UI freezing and crashing bugs when users tried to interact with the chat input field.
* Fully responsive and maintains the dark-mode compatible design.

#### 5. Documentation
* `WEEK6_AI_AGENT.md` — Added detailed implementation documentation.
* `UPDATES.md` — Added project change tracking and bug-fix notes.

### Files Changed
* `src/components/AIChat.js` — Resolved React state and uncontrolled component crashes. Re-wired chat submission.
* `src/app/api/chat/route.js` — Updated system prompt to include precise portfolio context to eliminate hallucinations.
* `WEEK6_AI_AGENT.md` — Created to document the week 6 requirements.
* `UPDATES.md` — Updated to log project changes.

### Problems & Fixes
* **Problem**: React crashed with an "uncontrolled input to be controlled" and "value prop without onChange" error in `AIChat.js`, which left the chat UI in a "zombie" state where it couldn't be interacted with.
* **Cause**: The Vercel AI SDK's `handleInputChange` behavior was failing to destructure or initialize correctly in React 19 / Next 16 environment.
* **Fix**: Rewrote the `AIChat.js` component to manage its own isolated `localInput` state using standard React `useState` and bypassed `handleSubmit` completely in favor of the `append` function from the AI SDK. 
* **Result**: The chat UI is completely stable, no longer crashes, and correctly submits user queries.

### Testing
* Dev server built successfully.
* UI interacts perfectly with no console errors during typing or submission.
* Hallucination tests implemented via the system prompt logic.

### Final Status
* **Completed**: AI context integration, UI stability fixes, system prompt enhancements, documentation.
* **Build Status**: Green (Ready for production).
* **Week 6 Status**: Fully completed.
