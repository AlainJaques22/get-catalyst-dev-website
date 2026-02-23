import type { ShowcaseState, ShowcaseAction } from './types';
import { HomePage } from './HomePage';
import { ConnectorsGrid } from './ConnectorsGrid';
import { ConnectorDetail } from './ConnectorDetail';
import { PlaceholderPage } from './PlaceholderPage';

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

  const renderContent = () => {
    if (activeView === 'home') {
      return <HomePage />;
    }
    if (activeView === 'connectors') {
      return (
        <ConnectorsGrid
          onSelect={(id, label) => dispatch({ type: 'NAVIGATE', id, label })}
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
    return <HomePage />;
  };

  return (
    <div className="sc-content-area">
      <div className="sc-content-panel">
        {renderContent()}
      </div>
    </div>
  );
}
