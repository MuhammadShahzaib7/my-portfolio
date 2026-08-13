# Audit Fixes Log

### Global Navigation & Health Check
- Removed the `/health` directory and all its contents.
- Updated `src/components/Navbar.js` to remove the 'Health' link, streamlining the navigation.

### Contact Section
- Extracted the contact form to a new Client Component (`src/components/ContactForm.js`).
- Changed the form submit action to use a `mailto:` link (defaulting to `hello@example.com`), allowing users to successfully send messages via their default email clients when they click "Send Message".

### Projects Section
- Replaced dummy project placeholders in `src/app/projects/page.js` with the 4 real projects: UI Evolution, Atlas AI, Website Analyzer Tool, and Nexus Quantum.
- Attached real GitHub and live demo links to the respective project buttons.
- Generated 4 high-quality, theme-matching abstract images and placed them in the `public/` directory.
- Updated `src/components/ProjectCard.js` to render the actual images utilizing the `img` tag instead of the SVG placeholder, giving the projects a polished look.

### Experience Section
- Updated the experience timeline in `src/app/about/page.js` to reflect the latest roles:
  - Frontend Engineering Intern at Flyrank (June 2026 - Present)
  - React Developer at Alberuni Tech (Feb 2026 - April 2026)
