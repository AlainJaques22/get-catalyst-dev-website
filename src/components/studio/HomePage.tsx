import { CatalystLogo } from './CatalystLogo';
import ParticleCanvas from '../ParticleCanvas';

function DownloadIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function PuzzleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.611a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.685a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.611a2.404 2.404 0 0 1 1.705-.707c.618 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function HomePage() {
  const year = new Date().getFullYear();

  return (
    <div className="sc-home-page">
      {/* ── Hero ── */}
      <section className="sc-hp-hero">
        <div className="sc-hp-particles">
          <ParticleCanvas />
        </div>
        <div className="sc-hp-hero-image">
          <img
            src="/catalyst-hero.png"
            alt="Catalyst Studio"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        <div className="sc-hp-hero-logo">
          <CatalystLogo size={32} />
          <span className="sc-hp-hero-logo-text">
            <span className="sc-hp-hero-logo-bold">Catalyst</span> Studio
          </span>
        </div>

        <h1 className="sc-hp-hero-title">
          Still on Camunda 7? So are we.
        </h1>

        <p className="sc-hp-hero-subtitle">
          Catalyst Studio is a free browser-based development environment
          for Camunda 7. No desktop download. No setup. Just open and build.
        </p>

        <div className="sc-hp-hero-cta">
          <a href="/downloads/docker-compose.yml" download className="sc-hp-btn-primary">
            <DownloadIcon />
            Download Studio — Free
          </a>
          <p className="sc-hp-hero-note">Works with Camunda 7 and Operaton</p>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="sc-hp-section">
        <div className="sc-hp-narrow">
          <p className="sc-hp-problem-text">
            The Camunda Desktop Modeler is a 100MB+ download that needs to be kept
            in sync with element templates. Tedious. Fragile. Every team member
            needs it configured correctly.
          </p>
        </div>
      </section>

      {/* ── What Is Catalyst ── */}
      <section className="sc-hp-section">
        <div className="sc-hp-card-grid">
          <div className="sc-hp-card">
            <div className="sc-hp-card-header">
              <div className="sc-hp-card-icon"><GlobeIcon /></div>
              <h3 className="sc-hp-card-title">Browser-based modeler</h3>
            </div>
            <p className="sc-hp-card-body">
              Full BPMN editing in the browser. Powered by Miragon. No download. Always up to date.
            </p>
          </div>

          <div className="sc-hp-card">
            <div className="sc-hp-card-header">
              <div className="sc-hp-card-icon"><PuzzleIcon /></div>
              <h3 className="sc-hp-card-title">Element templates built-in</h3>
            </div>
            <p className="sc-hp-card-body">
              Catalyst connectors pre-loaded in the properties panel. Apply, configure, deploy.
            </p>
          </div>

          <div className="sc-hp-card">
            <div className="sc-hp-card-header">
              <div className="sc-hp-card-icon"><TerminalIcon /></div>
              <h3 className="sc-hp-card-title">One-command setup</h3>
            </div>
            <p className="sc-hp-card-body">
              <code className="sc-hp-code">docker-compose up</code>.
              Everything running in minutes. Camunda 7, modeler, connectors — all in one package.
            </p>
          </div>
        </div>
      </section>

      {/* ── Get Started ── */}
      <section className="sc-hp-section">
        <div className="sc-hp-narrow">
          <h2 className="sc-hp-section-title">Get Started</h2>

          <div className="sc-hp-steps">
            <div className="sc-hp-step">
              <div className="sc-hp-step-header">
                <span className="sc-hp-step-num">01</span>
                <h3 className="sc-hp-step-title">Install Docker</h3>
              </div>
              <p className="sc-hp-step-body">
                If you don't have Docker installed:{' '}
                <a href="https://docs.docker.com/get-docker/" target="_blank" rel="noopener noreferrer" className="sc-hp-link">
                  docs.docker.com/get-docker
                  <ExternalLinkIcon />
                </a>
              </p>
            </div>

            <div className="sc-hp-step">
              <div className="sc-hp-step-header">
                <span className="sc-hp-step-num">02</span>
                <h3 className="sc-hp-step-title">Download</h3>
              </div>
              <div className="sc-hp-step-body">
                <a href="/downloads/docker-compose.yml" download className="sc-hp-btn-secondary">
                  <DownloadIcon size={16} />
                  Download docker-compose.yml
                </a>
              </div>
            </div>

            <div className="sc-hp-step">
              <div className="sc-hp-step-header">
                <span className="sc-hp-step-num">03</span>
                <h3 className="sc-hp-step-title">Run</h3>
              </div>
              <div className="sc-hp-step-body">
                <div className="sc-hp-code-block">
                  <code className="sc-hp-code">docker-compose up -d</code>
                </div>
                <p className="sc-hp-step-note">
                  Then open <code className="sc-hp-code-inline">http://localhost:3000</code>
                </p>
              </div>
            </div>
          </div>
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
            <a href="https://github.com/AlainJaques22/camunda-n8n-bridge" target="_blank" rel="noopener noreferrer" className="sc-hp-footer-link">
              <GitHubIcon />
              GitHub
            </a>
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
