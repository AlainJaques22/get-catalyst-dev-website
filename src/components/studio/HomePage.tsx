import { useState, useEffect } from 'react';
import { CatalystLogo } from './CatalystLogo';
import ParticleCanvas from '../ParticleCanvas';

type OS = 'win' | 'mac' | 'linux';

const installCommands: Record<OS, string> = {
  win: 'irm https://get-catalyst.dev/install.ps1 | iex',
  mac: 'curl -fsSL https://get-catalyst.dev/install.sh | bash',
  linux: 'curl -fsSL https://get-catalyst.dev/install.sh | bash',
};

const installScriptUrls: Record<OS, string> = {
  win: 'https://get-catalyst.dev/install.ps1',
  mac: 'https://get-catalyst.dev/install.sh',
  linux: 'https://get-catalyst.dev/install.sh',
};

function InstallTerminal({ onNavigate }: { onNavigate: (id: string, label: string) => void }) {
  const [os, setOs] = useState<OS>('win');
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(installCommands[os]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="sc-hp-terminal">
      <div className="sc-hp-terminal-bar">
        <div className="sc-hp-terminal-dots">
          <span /><span /><span />
        </div>
        <div className="sc-hp-os-tabs">
          {(['win', 'mac', 'linux'] as OS[]).map(o => (
            <button
              key={o}
              type="button"
              className={`sc-hp-os-tab${os === o ? ' active' : ''}`}
              onClick={() => setOs(o)}
            >
              {o === 'win' ? 'Windows' : o === 'mac' ? 'macOS' : 'Linux'}
            </button>
          ))}
        </div>
      </div>
      <div className="sc-hp-terminal-cmd">
        <code>
          <span className="sc-hp-terminal-prompt">{os === 'win' ? 'PS> ' : '$ '}</span>
          {installCommands[os]}
        </code>
        <button type="button" className="sc-hp-terminal-copy" onClick={handleCopy}>
          {copied ? 'copied!' : 'copy'}
        </button>
      </div>
      <p className="sc-hp-terminal-prereq">
        Requires <strong>Docker Desktop</strong> or <strong>Rancher Desktop</strong> installed first
      </p>
      <div className="sc-hp-terminal-meta">
        <button type="button" className="sc-hp-terminal-link" onClick={() => onNavigate('get-started', 'Get Started')}>
          Full install guide
        </button>
        <span className="sc-hp-terminal-sep">·</span>
        <a href={installScriptUrls[os]} target="_blank" rel="noreferrer" className="sc-hp-terminal-link">
          What does this script do?
        </a>
      </div>
    </div>
  );
}

const previews = [
  { id: 'anthropic-claude', label: 'Anthropic Claude', icon: '/connectors/anthropic-claude.svg' },
];

function PreviewGallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox]);

  return (
    <section className="sc-hp-section">
      <div className="sc-hp-narrow">
        <div className="sc-hp-previews">
          {previews.map(({ id, label, icon }) => (
            <div key={id} className="sc-hp-preview-card" onClick={() => setLightbox(id)}>
              <div className="sc-hp-preview-screen">
                <div className="sc-hp-preview-chrome">
                  <span className="sc-hp-preview-dot" />
                  <span className="sc-hp-preview-dot" />
                  <span className="sc-hp-preview-dot" />
                  <span className="sc-hp-preview-urlbar" />
                </div>
                <div className="sc-hp-preview-thumb">
                  <img src={`/connectors/screenshots/${id}.png`} alt={label} />
                </div>
              </div>
              <div className="sc-hp-preview-footer">
                <img src={icon} alt="" className="sc-hp-preview-icon" />
                <span className="sc-hp-preview-label">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightbox && (
        <div className="sc-lightbox-overlay" onClick={() => setLightbox(null)}>
          <img
            src={`/connectors/screenshots/${lightbox}.png`}
            alt={previews.find(p => p.id === lightbox)?.label}
            className="sc-lightbox-image"
          />
        </div>
      )}
    </section>
  );
}

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
      {/* ── Hero + Preview (shared particle background) ── */}
      <div className="sc-hp-hero-zone">
        <div className="sc-hp-particles">
          <ParticleCanvas />
        </div>

        <section className="sc-hp-hero">
          <div className="sc-hp-hero-lockup">
            <CatalystLogo size={160} />
            <span className="sc-hp-hero-lockup-text">
              <span className="sc-hp-hero-lockup-bold">Catalyst</span>{' '}
              <span className="sc-hp-hero-lockup-light">Studio</span>
            </span>
          </div>

          <div className="sc-hp-eyebrow">Camunda 7 · Local development</div>

          <h1 className="sc-hp-hero-title">
            The multi-engine, <em>AI</em><br />
            connected workspace<br />
            Camunda devs<br />
            <em>actually wanted.</em>
          </h1>

          <p className="sc-hp-hero-tagline">
            Engine, modeler, cockpit, logs and AI connectors —
            all in your browser. One Docker command and you're running.
          </p>

          <button
            type="button"
            className="sc-hp-btn-primary"
            onClick={() => onNavigate('get-started', 'Get Started')}
          >
            Get Started
          </button>
        </section>

        {/* ── Connector previews ── */}
        <PreviewGallery />
      </div>

      {/* ── Engine support ── */}
      <section className="sc-hp-section">
        <div className="sc-hp-narrow">
          <h2 className="sc-hp-section-title">Engines supported</h2>
          <p className="sc-hp-solution-text">
            <strong>One-click switch between engines.</strong> Change your engine without changing your workflow — Catalyst Studio is engine-agnostic by design.
          </p>
          <div className="sc-hp-engine-grid">
            <div className="sc-hp-engine-card live">
              <div className="sc-hp-engine-header">
                <img src="/engines/camunda-7.svg" alt="Camunda 7" className="sc-hp-engine-logo" />
                <span className="sc-hp-engine-status">live</span>
              </div>
              <div className="sc-hp-engine-name">Camunda 7</div>
              <div className="sc-hp-engine-note">Community Edition</div>
            </div>
            <div className="sc-hp-engine-card live">
              <div className="sc-hp-engine-header">
                <img src="/engines/operaton.svg" alt="Operaton" className="sc-hp-engine-logo" />
                <span className="sc-hp-engine-status">live</span>
              </div>
              <div className="sc-hp-engine-name">Operaton</div>
              <div className="sc-hp-engine-note">Open source fork</div>
            </div>
            <div className="sc-hp-engine-card soon">
              <div className="sc-hp-engine-header">
                <span className="sc-hp-engine-status">coming</span>
              </div>
              <div className="sc-hp-engine-name">CIB seven</div>
              <div className="sc-hp-engine-note">Commercial fork</div>
            </div>
            <div className="sc-hp-engine-card soon">
              <div className="sc-hp-engine-header">
                <span className="sc-hp-engine-status">coming</span>
              </div>
              <div className="sc-hp-engine-name">eximee BPMN</div>
              <div className="sc-hp-engine-note">Camunda 7 fork</div>
            </div>
            <div className="sc-hp-engine-card soon">
              <div className="sc-hp-engine-header">
                <span className="sc-hp-engine-status">maybe one day</span>
              </div>
              <div className="sc-hp-engine-name">Camunda 8</div>
              <div className="sc-hp-engine-note">Zeebe-based</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="sc-hp-section">
        <div className="sc-hp-narrow">
          <h2 className="sc-hp-section-title">What's inside Studio</h2>
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
          <h2 className="sc-hp-section-title">Connectors included</h2>
          <p className="sc-hp-solution-text">
            All our pre-configured connector templates are available in your BPMN Service Task properties within Catalyst Studio, you just add your API secret key, deploy and it works. Comprehensive Readme docs are provided.
          </p>
          <p className="sc-hp-solution-text" style={{ marginBottom: 24 }}>
            On the server it is even more simple, the Catalyst Connector is a single JAR for all connectors that you simply drop in your Camunda Resources folder, and restart Camunda. No new services. No extra infrastructure.
          </p>
          <div className="sc-hp-connector-grid">
            {showcaseConnectors.map(c => (
              <div key={c.id} className="sc-hp-connector-chip" style={{ cursor: 'pointer' }} onClick={() => onNavigate(`connector:${c.id}`, c.label)}>
                <img src={`/connectors/${c.id}.svg`} width={20} height={20} alt="" />
                <span>{c.label}</span>
              </div>
            ))}
            <div className="sc-hp-connector-chip sc-hp-placeholder">
              More coming
            </div>
          </div>
<p className="sc-hp-connector-note">
            Catalyst Connector works independently of Catalyst Studio. Drop the JAR
            into any existing Camunda 7 environment and the Connectors just work.
          </p>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="sc-hp-section">
        <div className="sc-hp-narrow">
          <div className="sc-hp-wyg-eyebrow">What you get</div>
          <h2 className="sc-hp-wyg-h2">Full functionality.<br /><em>From the first command.</em></h2>
          <div className="sc-hp-wyg-grid">
            <div className="sc-hp-wyg-cell">
              <div className="sc-hp-wyg-label">Engines</div>
              <p><strong>Camunda 7, Operaton</strong>, and more on the way. Switch engines without changing your workflow.</p>
            </div>
            <div className="sc-hp-wyg-cell">
              <div className="sc-hp-wyg-label">Connectors</div>
              <p><strong>17 AI and integration connectors</strong> pre-loaded. Configured as element templates, ready to drop in.</p>
            </div>
            <div className="sc-hp-wyg-cell">
              <div className="sc-hp-wyg-label">Tooling</div>
              <p><strong>Web modeler, cockpit, tasklist, live logs</strong> and a database browser. All in your browser.</p>
            </div>
            <div className="sc-hp-wyg-cell">
              <div className="sc-hp-wyg-label">No account</div>
              <p>No email address. No "verify your inbox." No onboarding sequence. No drip campaign. <strong>We don't even know you installed it.</strong></p>
            </div>
            <div className="sc-hp-wyg-cell">
              <div className="sc-hp-wyg-label">No trial</div>
              <p>No trial period. No feature gates. No nudges to upgrade. <strong>No crippleware. No nagware. No tricks. No catch.</strong></p>
            </div>
            <div className="sc-hp-wyg-cell">
              <div className="sc-hp-wyg-label">No salesperson</div>
              <p>No salesperson will follow up. <strong>Just run one command and you're in.</strong> Full functionality from day one.</p>
            </div>
          </div>
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
            <p className="sc-hp-footer-tagline">Built with ❤️ for the Camunda community</p>
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
