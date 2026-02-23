# Catalyst Website — Claude Code Brief

## Project
Build the marketing website for **Catalyst** at `get-catalyst.dev`.
Repo: `get-catalyst-dev-website` (public GitHub repo, already created)
Deploy target: Cloudflare Pages

---

## Tech Stack
- **Astro** (static site generator)
- **React** (component islands where needed)
- **Tailwind CSS**
- **TypeScript**
- **Geist font** (same as Catalyst Studio)
- **Lucide icons** (same as Catalyst Studio)

Match the look and feel of Catalyst Studio as closely as possible —
same color palette, same typography, same component aesthetic.
The website should feel like a natural extension of the product.

---

## Deployment Config
Add `wrangler.toml` or `astro.config.mjs` configured for Cloudflare Pages static output.
Add `.gitignore` covering `node_modules/`, `dist/`, `.env`, `.env.local`.

---

## Brand & Tone

**Voice:** Understated. Developer-to-developer. No marketing fluff.
- No exclamation marks in headlines
- No words like "revolutionary", "game-changing", "powerful"
- Facts over claims. Let numbers speak quietly.
- Casual confidence — like a colleague showing you something useful
- "Built to scratch an itch" energy

**Audience:** Camunda 7 developers and architects. They are technical,
experienced, and have finely tuned BS detectors. Speak to them as peers.

**Relationship with Camunda:** Respectful. We are part of the same community.
Camunda 8 pricing is mentioned factually, never mockingly.

---

## The Story (read this carefully before writing any copy)

Catalyst is a free browser-based development environment for Camunda 7 developers.
No 100MB desktop modeler download. Just open and build.

**The trojan horse:** Studio is genuinely useful as a standalone IDE.
But it also ships with 15 native connectors (OpenAI, Anthropic, Slack,
SendGrid, Generic REST and more). Developers discover the connectors
*inside* the tool — not from a sales page. The website's only job is
to get Studio downloaded. The connectors sell themselves from within.

**Key facts:**
- Studio is free, always
- 15 connectors included, some production-tested
- Connectors run natively in Camunda 7 — one JAR on the classpath, no new services
- Studio uses the Miragon browser-based BPMN modeler — no desktop download needed
- Connectors work independently of Studio (drop JAR into existing Camunda 7)
- Camunda 8 charges $60,000+/year for comparable integration capability
- Catalyst connector production use starts at $192/year (alpha, not on website yet)
- Works with Camunda 7 and Operaton (the open source fork)

**What we don't say loudly:**
- Don't lead with pricing comparison — let developers discover the value first
- Don't mention n8n — that's a previous architecture, no longer relevant
- Don't oversell connector count or maturity — it's a growing library, alpha

---

## Page Structure

### 1. Hero
**Headline:** "Still on Camunda 7? So are we."
**Subheadline:** "Catalyst Studio is a free browser-based development environment
for Camunda 7. No desktop download. No setup. Just open and build."
**CTA button:** "Download Studio — Free"
**Secondary line below button:** "Works with Camunda 7 and Operaton"

Include the BPMN particle animation from Studio if extractable,
otherwise a clean static hero with the Catalyst gateway diamond logo.

---

### 2. The Problem (no heading needed, just flow into it)
Short section. 2-3 sentences max.

The pain: Camunda Desktop Modeler is a 100MB+ download that needs
to be kept in sync with element templates. Tedious. Fragile.
Every team member needs it configured correctly.

---

### 3. What is Catalyst Studio
Three simple columns or cards:

- **Browser-based modeler** — Full BPMN editing in the browser.
  Powered by Miragon. No download. Always up to date.

- **Element templates built-in** — Catalyst connectors pre-loaded
  in the properties panel. Apply, configure, deploy.

- **One-command setup** — `docker-compose up`. Everything running
  in minutes. Camunda 7, modeler, connectors — all in one package.

---

### 4. Oh, and it ships with connectors.
This section should feel like an aside — not a feature parade.
Casual. Almost an afterthought. That's intentional.

Short intro line: *"We added a few integrations while we were at it."*

Show a clean grid of connector tiles. Current connectors:
- OpenAI
- Anthropic Claude
- Google Gemini
- Slack
- SendGrid
- Generic REST
- Webhook
- (and growing)

Small note below: *"Native Camunda 7 connectors. One JAR on your classpath.
No new services. No extra infrastructure to manage."*

---

### 5. Get Started
This is the "Try it Now" section. Clean, technical, no fluff.

**Step 1 — Install Docker**
"If you don't have Docker installed:"
Link to docs.docker.com/get-docker (opens in new tab)

**Step 2 — Download**
Button: "Download docker-compose.yml"
(File served directly from the website, not GitHub)

**Step 3 — Run**
Code block:
```bash
docker-compose up -d
```
"Then open http://localhost:3000"

---

### 6. Footer
- Logo + "Catalyst"
- Links: GitHub (camunda-n8n-bridge repo for now), hello@get-catalyst.dev
- "Built for the Camunda 7 community"
- Copyright line

---

## Assets & References
- Catalyst gateway diamond logo (get from Studio repo)
- Geist font (npm: `geist`)
- Lucide icons (npm: `lucide-react`)
- BPMN particle animation (get from Studio repo if feasible)
- Color palette: match Studio exactly

---

## docker-compose.yml
Place the Catalyst Studio docker-compose.yml in `public/downloads/docker-compose.yml`
so it's served as a static file download from the website.
The download button should point to `/downloads/docker-compose.yml`.

---

## Environment Variables (for future form handling)
Add `.env.example` with:
```
RESEND_API_KEY=
```
Not needed for v1 — no form on this page. But set it up cleanly for later.

---

## What NOT to build
- No waitlist form (v1)
- No pricing page (v1)
- No blog/CMS
- No comparison table (v1)
- No contact form (v1)
- No cookie banner (no tracking)
- No analytics (v1)

Keep it fast, clean, and honest. One page. One CTA. One job.
