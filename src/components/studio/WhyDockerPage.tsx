import { CatalystLogo } from './CatalystLogo';

interface WhyDockerPageProps {
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

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#e8e8e8', margin: '0 0 12px' }}>{title}</h2>
      {children}
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: '#1a1a1a',
      border: '1px solid #2a2a2a',
      borderLeft: '3px solid #4a9eff',
      borderRadius: 6,
      padding: '12px 16px',
      marginTop: 12,
      fontSize: 13,
      color: '#aaa',
      lineHeight: 1.6,
    }}>
      {children}
    </div>
  );
}

export function WhyDockerPage({ onNavigate }: WhyDockerPageProps) {
  const year = new Date().getFullYear();

  return (
    <div className="sc-home-page">
      <div className="sc-gs-page">

        <div style={{ marginBottom: 32 }}>
          <button
            onClick={() => onNavigate('get-started', 'Get Started')}
            style={{
              background: 'none',
              border: 'none',
              color: '#4a9eff',
              cursor: 'pointer',
              fontSize: 13,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Get Started
          </button>
        </div>

        <h1 className="sc-gs-title">Docker and Rancher Desktop — what are they?</h1>

        <p className="sc-gs-intro">
          Catalyst Studio uses Docker to deliver the entire platform as a single package.
          If you've never heard of Docker before, this page explains what it is, why it's
          a great fit for Catalyst, and what Rancher Desktop has to do with it.
        </p>

        <Section title="What is Docker?">
          <p style={{ margin: '0 0 12px', lineHeight: 1.7, color: '#ccc' }}>
            Docker is a tool that packages software — along with everything it needs to run —
            into a self-contained unit called a <strong style={{ color: '#e8e8e8' }}>container</strong>.
            Think of it like a shipping container: everything is packed inside, sealed,
            and it works the same way no matter where it lands.
          </p>
          <p style={{ margin: '0 0 12px', lineHeight: 1.7, color: '#ccc' }}>
            Catalyst Studio is made up of several services: a process engine, a web modeller,
            a database, a dashboard, and more. With Docker, all of those services start together
            with a single command — and stop together just as easily.
          </p>
          <Callout>
            You don't need to install Java, Node.js, PostgreSQL, or any other technology separately.
            Docker handles all of that for you inside the containers.
          </Callout>
        </Section>

        <Section title="What is Rancher Desktop?">
          <p style={{ margin: '0 0 12px', lineHeight: 1.7, color: '#ccc' }}>
            Docker containers run natively on Linux. On Windows and macOS, you need a small
            app to provide the Linux environment that Docker relies on.
            <strong style={{ color: '#e8e8e8' }}> Rancher Desktop</strong> is that app.
          </p>
          <p style={{ margin: '0 0 12px', lineHeight: 1.7, color: '#ccc' }}>
            It runs quietly in the background and gives Docker a place to run on your machine.
            You won't interact with it directly — it's just the engine underneath.
          </p>
          <p style={{ margin: '0 0 12px', lineHeight: 1.7, color: '#ccc' }}>
            <strong style={{ color: '#e8e8e8' }}>Why Rancher Desktop and not Docker Desktop?</strong>{' '}
            Docker Desktop is the more well-known option, but it requires a paid licence for commercial use.
            Rancher Desktop is completely free for commercial use and works just as well for running Catalyst.
          </p>
          <Callout>
            Already have Docker Desktop installed and licenced? It works fine with Catalyst too —
            you don't need to switch.
          </Callout>
        </Section>

        <Section title="Why does Catalyst use Docker?">
          <p style={{ margin: '0 0 16px', lineHeight: 1.7, color: '#ccc' }}>
            There are a few reasons Docker is the right delivery method for Catalyst:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                label: 'One command to start everything',
                desc: 'No manual configuration across multiple services. The install script pulls all the images and starts the full stack in one go.',
              },
              {
                label: 'Works the same on every machine',
                desc: 'Whether you\'re on Windows, macOS, or Linux — the containers behave identically. No "it works on my machine" problems.',
              },
              {
                label: 'No dependency conflicts',
                desc: 'Each service runs in its own isolated container. Catalyst\'s Java version, Node version, and PostgreSQL version don\'t interfere with anything else on your system.',
              },
              {
                label: 'Easy to remove',
                desc: 'If you want to uninstall, you stop and remove the containers. Nothing is scattered across your system.',
              },
              {
                label: 'Easy to update',
                desc: 'New version of Catalyst? Pull the latest images and restart. No manual upgrade scripts.',
              },
            ].map(({ label, desc }) => (
              <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#4a9eff', marginTop: 7, flexShrink: 0,
                }} />
                <div>
                  <span style={{ fontWeight: 600, color: '#e8e8e8', fontSize: 14 }}>{label}</span>
                  <span style={{ color: '#999', fontSize: 13 }}> — {desc}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Do I need to understand Docker to use Catalyst?">
          <p style={{ margin: '0 0 12px', lineHeight: 1.7, color: '#ccc' }}>
            No. That's the whole point. Once the install script runs, Docker is invisible —
            you just use Catalyst through your browser. The install and uninstall scripts
            on the Get Started page handle everything.
          </p>
          <p style={{ margin: 0, lineHeight: 1.7, color: '#ccc' }}>
            If you're curious, Portainer (included in the Catalyst stack) gives you a visual
            dashboard for your containers — but you never need to open it unless you want to.
          </p>
        </Section>

        <Section title="Want to learn more?">
          <p style={{ margin: '0 0 12px', lineHeight: 1.7, color: '#ccc' }}>
            These official resources are a good starting point if you'd like to go deeper:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="https://docs.docker.com/get-started/docker-overview/" target="_blank" rel="noopener noreferrer" className="sc-hp-link" style={{ fontSize: 14 }}>
              Docker overview — official docs <ExternalLinkIcon />
            </a>
            <a href="https://rancherdesktop.io/" target="_blank" rel="noopener noreferrer" className="sc-hp-link" style={{ fontSize: 14 }}>
              Rancher Desktop — official site <ExternalLinkIcon />
            </a>
          </div>
        </Section>

        <div style={{ borderTop: '1px solid #222', paddingTop: 24, marginTop: 8 }}>
          <button
            onClick={() => onNavigate('get-started', 'Get Started')}
            style={{
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: 6,
              color: '#ccc',
              cursor: 'pointer',
              fontSize: 13,
              padding: '8px 16px',
            }}
          >
            Back to Get Started
          </button>
        </div>

        <p className="sc-gs-note" style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #1a1a1a' }}>
          Questions? Email us at{' '}
          <a href="mailto:hello@get-catalyst.dev" className="sc-hp-link">
            <MailIcon /> hello@get-catalyst.dev
          </a>
        </p>

      </div>

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
