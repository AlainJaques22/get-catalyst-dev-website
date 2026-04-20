import { useRef, useEffect } from 'react';
import type { ShowcaseState, ShowcaseAction } from './types';
import { HomePage } from './HomePage';
import { GetStartedPage } from './GetStartedPage';
import { ConnectorsGrid } from './ConnectorsGrid';
import { ConnectorDetail } from './ConnectorDetail';
import { PlaceholderPage } from './PlaceholderPage';
import { WhyDockerPage } from './WhyDockerPage';
import { PricingPage } from './PricingPage';

interface ContentAreaProps {
  state: ShowcaseState;
  dispatch: React.Dispatch<ShowcaseAction>;
}

// Inline icons for placeholder pages
function PenIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const placeholderConfig: Record<string, { title: string; icon: React.ReactNode; description: string; credentials?: string }> = {
  modeler: {
    title: 'Web Modeler',
    icon: <PenIcon />,
    description: 'Design and deploy BPMN processes with Catalyst connectors built in.',
    credentials: 'No login required',
  },
  pgweb: {
    title: 'Database Browser',
    icon: <DatabaseIcon />,
    description: 'PostgreSQL database browser. Query and explore your Camunda database.',
    credentials: 'admin / catalyst-admin',
  },
  portainer: {
    title: 'Container Manager',
    icon: <BoxIcon />,
    description: 'Docker container management. Monitor and control your containers.',
    credentials: 'admin / catalyst-admin',
  },
  logs: {
    title: 'Log Viewer',
    icon: <TerminalIcon />,
    description: 'Real-time container logs via Dozzle. Watch all services at once.',
    credentials: 'No login required',
  },
  camunda: {
    title: 'Camunda',
    icon: <SettingsIcon />,
    description: 'Process monitoring, operations, and admin tools for your Camunda 7 engine.',
    credentials: 'admin / catalyst-admin',
  },
};

export function ContentArea({ state, dispatch }: ContentAreaProps) {
  const { activeView } = state;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.scrollTo(0, 0);
  }, [activeView]);

  const navigate = (id: string, label: string) => {
    dispatch({ type: 'NAVIGATE', id, label });
  };

  const renderContent = () => {
    if (activeView === 'home') {
      return <HomePage onNavigate={navigate} />;
    }
    if (activeView === 'get-started') {
      return <GetStartedPage onNavigate={navigate} />;
    }
    if (activeView === 'pricing') {
      return <PricingPage onNavigate={navigate} />;
    }
    if (activeView === 'why-docker') {
      return <WhyDockerPage onNavigate={navigate} />;
    }
    if (activeView === 'connectors') {
      return (
        <ConnectorsGrid
          onSelect={navigate}
        />
      );
    }
    if (activeView.startsWith('connector:')) {
      return <ConnectorDetail connectorId={activeView} />;
    }
    const placeholder = placeholderConfig[activeView];
    if (placeholder) {
      return <PlaceholderPage title={placeholder.title} icon={placeholder.icon} description={placeholder.description} credentials={placeholder.credentials} />;
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 20,
        textAlign: 'center',
        padding: '0 24px',
      }}>
        {/* BPMN Error End Event */}
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" strokeWidth="2.5" />
          <path d="M13 5.5 L8.5 13 L12 13 L11 18.5 L15.5 11 L12 11 Z" strokeWidth="1.2" fill="var(--error)" fillOpacity="0.25" />
        </svg>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--error)', opacity: 0.8 }}>
            Error End Event — 404
          </p>
          <p style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>
            Page not found
          </p>
          <p style={{ margin: '0 0 6px', fontSize: 13, color: 'var(--text-muted)', maxWidth: 360 }}>
            The process token followed a sequence flow to <code style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--primary)', background: 'var(--primary-bg)', padding: '1px 5px', borderRadius: 4 }}>{activeView}</code> and terminated unexpectedly.
          </p>
          <p style={{ margin: '0 0 24px', fontSize: 12, color: 'var(--text-dim)' }}>
            This view doesn't exist.
          </p>
        </div>
        <button
          onClick={() => navigate('home', 'Home')}
          style={{
            font: 'inherit',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--primary)',
            background: 'var(--primary-bg)',
            border: '1px solid var(--primary-border)',
            borderRadius: 6,
            padding: '7px 16px',
            cursor: 'pointer',
            transition: 'opacity 0.15s',
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '0.8')}
          onMouseOut={e => (e.currentTarget.style.opacity = '1')}
        >
          Route to Start Event
        </button>
      </div>
    );
  };

  return (
    <div className="sc-content-area">
      <div ref={panelRef} className="sc-content-panel">
        {renderContent()}
      </div>
    </div>
  );
}
