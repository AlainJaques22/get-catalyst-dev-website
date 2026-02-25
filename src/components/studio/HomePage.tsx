import { CatalystLogo } from './CatalystLogo';
import ParticleCanvas from '../ParticleCanvas';

interface HomePageProps {
  onNavigate: (id: string, label: string) => void;
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// Feature card icons (20x20, lucide-style)
function PenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

const features = [
  { icon: <PenIcon />, title: 'Web Modeler', desc: 'Full BPMN editing in your browser. Catalyst connectors pre-loaded.' },
  { icon: <TerminalIcon />, title: 'Live Logs', desc: 'See exactly what your process is doing, in real time.' },
  { icon: <GaugeIcon />, title: 'Cockpit & Tasklist', desc: 'Always running, no configuration needed.' },
  { icon: <DatabaseIcon />, title: 'Database Browser', desc: 'Inspect your process data directly. No external tools needed.' },
  { icon: <LinkIcon />, title: 'Native Connectors', desc: 'OpenAI, Anthropic, Slack, SendGrid and more — built in, ready to use in your processes.' },
  { icon: <BoxIcon />, title: 'Container Manager', desc: 'Start, stop and monitor your environment without touching a terminal.' },
];

const showcaseConnectors = [
  { id: 'anthropic-claude', label: 'Anthropic Claude' },
  { id: 'openai', label: 'OpenAI' },
  { id: 'google-gemini', label: 'Google Gemini' },
  { id: 'deepseek', label: 'DeepSeek' },
  { id: 'mistral', label: 'Mistral AI' },
  { id: 'groq', label: 'Groq' },
  { id: 'xai-grok', label: 'xAI Grok' },
  { id: 'azure-openai', label: 'Azure OpenAI' },
  { id: 'perplexity', label: 'Perplexity' },
  { id: 'fireworks-ai', label: 'Fireworks AI' },
  { id: 'together-ai', label: 'Together AI' },
  { id: 'ollama', label: 'Ollama' },
  { id: 'slack', label: 'Slack' },
  { id: 'sendgrid', label: 'SendGrid' },
  { id: 'generic-rest', label: 'Generic REST' },
  { id: 'webhook', label: 'Webhook' },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const year = new Date().getFullYear();

  return (
    <div className="sc-home-page">
      <div className="sc-hp-ribbon">Early Access</div>

      {/* ── Hero ── */}
      <section className="sc-hp-hero">
        <div className="sc-hp-particles">
          <ParticleCanvas />
        </div>
        <div className="sc-hp-hero-lockup">
          <CatalystLogo size={160} />
          <span className="sc-hp-hero-lockup-text">
            <span className="sc-hp-hero-lockup-bold">Catalyst</span>{' '}
            <span className="sc-hp-hero-lockup-light">Studio</span>
          </span>
        </div>

        <h1 className="sc-hp-hero-title">
          Happy on Camunda 7? So are we.
        </h1>

        <p className="sc-hp-hero-tagline">
          Especially now that we've got everything a Camunda developer reaches for right here in Catalyst Studio.
        </p>

        <p className="sc-hp-hero-subtitle">
          Installation is simple. Catalyst Studio opens in your browser where you'll find everything you need, the full stack. No more app installing, no more app-hopping between engine, modeler and cockpit.
        </p>

        <div className="sc-hp-hero-cta">
          <button
            type="button"
            className="sc-hp-btn-primary"
            onClick={() => onNavigate('get-started', 'Get Started')}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* ── Solution ── */}
      <section className="sc-hp-section">
        <div className="sc-hp-narrow">
          <h2 className="sc-hp-section-title">The workspace we always wanted.</h2>
          <p className="sc-hp-solution-text">
            One docker command installs everything. Engine running, Web Modeler open,
            Cockpit, Tasklist, live logs, database browser — all connected,
            all in your browser.
          </p>
          <p className="sc-hp-solution-text">
            And it keeps growing. API docs, FEEL playground, reference guides
            — more landing every release.
          </p>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="sc-hp-section">
        <div className="sc-hp-narrow">
          <h2 className="sc-hp-section-title">What's inside</h2>
          <div className="sc-hp-features-grid">
            {features.map(f => (
              <div key={f.title} className="sc-hp-feature-card">
                <div className="sc-hp-feature-icon">{f.icon}</div>
                <h3 className="sc-hp-feature-title">{f.title}</h3>
                <p className="sc-hp-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Connectors ── */}
      <section className="sc-hp-section">
        <div className="sc-hp-narrow">
          <h2 className="sc-hp-section-title">Oh! did we mention it ships with connectors?</h2>
          <p className="sc-hp-solution-text">
            All our pre-configured connector templates are available in your BPMN Service Task properties within Catalyst Studio, you just add your API secret key, deploy and it works. Comprehensive Readme docs are provided.
          </p>
          <p className="sc-hp-solution-text" style={{ marginBottom: 24 }}>
            On the server it is even more simple, the Catalyst Connector is a single JAR for all connectors that you simply drop in your Camunda Resources folder, and restart Camunda. No new services. No extra infrastructure.
          </p>
          <div className="sc-hp-connector-grid">
            {showcaseConnectors.map(c => (
              <div key={c.id} className="sc-hp-connector-chip">
                <img src={`/connectors/${c.id}.svg`} width={20} height={20} alt="" />
                <span>{c.label}</span>
              </div>
            ))}
            <div className="sc-hp-connector-chip sc-hp-placeholder">
              More coming
            </div>
          </div>
          <p className="sc-hp-connector-highlight">
            Free to use in development. For early access Production use we want it to cost the equivalent of a pizza a month.
          </p>
          <p className="sc-hp-connector-note">
            Catalyst Connector works independently of Catalyst Studio. Drop the JAR
            into any existing Camunda 7 environment and the Connectors just work.
          </p>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="sc-hp-section">
        <div className="sc-hp-narrow">
          <h2 className="sc-hp-section-title">How pricing works</h2>
          <p className="sc-hp-solution-text">
            Catalyst Studio is free.
          </p>
          <p className="sc-hp-solution-text">
            Connectors are free for development and testing. Every integration,
            no limits, no time restrictions, no credit card required.
          </p>
          <p className="sc-hp-solution-text">
            When you move to production, pricing is published, transparent,
            and the same for everyone. No sales calls. No negotiation.
            No wondering if someone else got a better deal.
          </p>
          <p className="sc-hp-solution-text">
            Pricing is simple, cheap and fair. It is execution-based, paid in advance according to your estimated usage. Then you consume according to your executions — not per
            seat, not per process, not per month. It is a few cents per connector call.
          </p>          
          <p className="sc-hp-solution-text">
            We're currently in alpha, if you are an early adopter please join our alpha program, click below to send us an email and we'll get back to you.
          </p>
          <div style={{ marginTop: 32 }}>
            <a
              href="mailto:hello@get-catalyst.dev"
              className="sc-hp-btn-primary"
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              Join the alpha
            </a>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="sc-hp-section">
        <div className="sc-hp-narrow sc-hp-closing-cta">
          <h2 className="sc-hp-closing-title">Ready to try it?</h2>
          <button
            type="button"
            className="sc-hp-btn-primary"
            onClick={() => onNavigate('get-started', 'Get Started')}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="sc-hp-footer">
        <div className="sc-hp-footer-inner">
          <div className="sc-hp-footer-brand">
            <div className="sc-hp-footer-logo">
              <CatalystLogo size={20} />
              <span className="sc-hp-footer-name">Catalyst</span>
            </div>
            <p className="sc-hp-footer-tagline">Built for the Camunda 7 community</p>
          </div>

          <div className="sc-hp-footer-links">
            <a href="mailto:hello@get-catalyst.dev" className="sc-hp-footer-link">
              <MailIcon />
              hello@get-catalyst.dev
            </a>
          </div>
        </div>

        <div className="sc-hp-footer-copyright">
          <p>&copy; {year} Catalyst</p>
        </div>
      </footer>
    </div>
  );
}
