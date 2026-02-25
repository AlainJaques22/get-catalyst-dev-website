import { CatalystLogo } from './CatalystLogo';
import { connectorsByCategory } from './connectorData';
import type { ShowcaseState, ShowcaseAction } from './types';

interface LeftMenuProps {
  state: ShowcaseState;
  dispatch: React.Dispatch<ShowcaseAction>;
}

// Inline Lucide-style SVG icons (18x18)
function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s ease' }}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const categoryIcons: Record<string, React.ReactNode> = {
  ai: <SparklesIcon />,
  communication: <MessageIcon />,
  general: <PlugIcon />,
};

const categoryLabels: Record<string, string> = {
  ai: 'AI',
  communication: 'Communication',
  general: 'General',
};

export function LeftMenu({ state, dispatch }: LeftMenuProps) {
  const { activeView, menuExpanded, expandedGroups } = state;
  const isExpanded = (group: string) => expandedGroups.includes(group);

  const navigate = (id: string, label: string) => {
    dispatch({ type: 'NAVIGATE', id, label });
  };

  const toggleGroup = (group: string) => {
    dispatch({ type: 'TOGGLE_GROUP', group });
  };

  if (!menuExpanded) {
    return (
      <div className="sc-left-menu sc-collapsed">
        <div className="sc-menu-logo sc-collapsed-logo" onClick={() => dispatch({ type: 'TOGGLE_MENU' })}>
          <div className="sc-logo-icon">
            <CatalystLogo size={20} />
          </div>
        </div>
        <div className="sc-menu-divider" />
        <div className="sc-menu-items">
          <div
            className={`sc-menu-item sc-collapsed-item ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => navigate('home', 'Home')}
            title="Home"
          >
            <span className="sc-menu-icon"><HomeIcon /></span>
          </div>
          <div
            className={`sc-menu-item sc-collapsed-item ${activeView === 'get-started' ? 'active' : ''}`}
            onClick={() => navigate('get-started', 'Get Started')}
            title="Get Started"
          >
            <span className="sc-menu-icon"><RocketIcon /></span>
          </div>
          <div
            className={`sc-menu-item sc-collapsed-item ${activeView === 'connectors' || activeView.startsWith('connector:') ? 'active' : ''}`}
            onClick={() => navigate('connectors', 'Connectors')}
            title="Connectors"
          >
            <span className="sc-menu-icon"><LinkIcon /></span>
          </div>
          <div
            className={`sc-menu-item sc-collapsed-item ${activeView === 'modeler' ? 'active' : ''}`}
            onClick={() => navigate('modeler', 'Web Modeler')}
            title="Web Modeler"
          >
            <span className="sc-menu-icon"><PenIcon /></span>
          </div>
          <div
            className={`sc-menu-item sc-collapsed-item ${activeView === 'pgweb' ? 'active' : ''}`}
            onClick={() => navigate('pgweb', 'Database Browser')}
            title="Database Browser"
          >
            <span className="sc-menu-icon"><DatabaseIcon /></span>
          </div>
          <div
            className={`sc-menu-item sc-collapsed-item ${activeView === 'portainer' ? 'active' : ''}`}
            onClick={() => navigate('portainer', 'Container Manager')}
            title="Container Manager"
          >
            <span className="sc-menu-icon"><BoxIcon /></span>
          </div>
          <div
            className={`sc-menu-item sc-collapsed-item ${activeView === 'logs' ? 'active' : ''}`}
            onClick={() => navigate('logs', 'Log Viewer')}
            title="Log Viewer"
          >
            <span className="sc-menu-icon"><TerminalIcon /></span>
          </div>
        </div>
        <div className="sc-menu-settings sc-collapsed-item" title="Settings">
          <span className="sc-menu-icon"><SettingsIcon /></span>
        </div>
      </div>
    );
  }

  return (
    <div className="sc-left-menu sc-expanded">
      <div className="sc-menu-logo">
        <div className="sc-logo-home" onClick={() => navigate('home', 'Home')}>
          <div className="sc-logo-icon">
            <CatalystLogo size={20} />
          </div>
          <span className="sc-logo-text">
            <span className="sc-logo-word-catalyst">Catalyst</span>
            <span className="sc-logo-word-product">Studio</span>
          </span>
        </div>
        <div className="sc-logo-chevron" onClick={() => dispatch({ type: 'TOGGLE_MENU' })}>
          <ChevronLeftIcon />
        </div>
      </div>

      <div className="sc-menu-divider" />

      <div className="sc-menu-items">
        {/* Home */}
        <div
          className={`sc-menu-item ${activeView === 'home' ? 'active' : ''}`}
          onClick={() => navigate('home', 'Home')}
        >
          <span className="sc-menu-icon"><HomeIcon /></span>
          <span className="sc-menu-label">Home</span>
        </div>

        {/* Get Started */}
        <div
          className={`sc-menu-item ${activeView === 'get-started' ? 'active' : ''}`}
          onClick={() => navigate('get-started', 'Get Started')}
        >
          <span className="sc-menu-icon"><RocketIcon /></span>
          <span className="sc-menu-label">Get Started</span>
        </div>

        {/* Connectors (expandable) */}
        <div
          className={`sc-menu-item ${activeView === 'connectors' ? 'active' : ''}`}
          onClick={() => navigate('connectors', 'Connectors')}
        >
          <span className="sc-menu-icon"><LinkIcon /></span>
          <span className="sc-menu-label">Connectors</span>
          <span
            className="sc-menu-chevron"
            onClick={(e) => { e.stopPropagation(); toggleGroup('connectors'); }}
          >
            <ChevronIcon open={isExpanded('connectors')} />
          </span>
        </div>

        {isExpanded('connectors') && (
          <div className="sc-menu-sub-items">
            {(['ai', 'communication', 'general'] as const).map(cat => (
              <div key={cat}>
                <div
                  className="sc-menu-sub-item"
                  onClick={() => toggleGroup(`connectors:${cat}`)}
                >
                  <span className="sc-menu-icon">{categoryIcons[cat]}</span>
                  <span className="sc-menu-label">{categoryLabels[cat]}</span>
                  <span className="sc-menu-chevron">
                    <ChevronIcon open={isExpanded(`connectors:${cat}`)} />
                  </span>
                </div>
                {isExpanded(`connectors:${cat}`) && (
                  <div className="sc-menu-sub-sub-items">
                    {connectorsByCategory[cat].map(c => (
                      <div
                        key={c.id}
                        className={`sc-menu-sub-sub-item ${activeView === c.id ? 'active' : ''}`}
                        onClick={() => navigate(c.id, c.label)}
                      >
                        <img src={c.icon} width={16} height={16} alt="" />
                        <span>{c.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Web Modeler */}
        <div
          className={`sc-menu-item ${activeView === 'modeler' ? 'active' : ''}`}
          onClick={() => navigate('modeler', 'Web Modeler')}
        >
          <span className="sc-menu-icon"><PenIcon /></span>
          <span className="sc-menu-label">Web Modeler</span>
        </div>

        {/* Database Browser */}
        <div
          className={`sc-menu-item ${activeView === 'pgweb' ? 'active' : ''}`}
          onClick={() => navigate('pgweb', 'Database Browser')}
        >
          <span className="sc-menu-icon"><DatabaseIcon /></span>
          <span className="sc-menu-label">Database Browser</span>
        </div>

        {/* Container Manager */}
        <div
          className={`sc-menu-item ${activeView === 'portainer' ? 'active' : ''}`}
          onClick={() => navigate('portainer', 'Container Manager')}
        >
          <span className="sc-menu-icon"><BoxIcon /></span>
          <span className="sc-menu-label">Container Manager</span>
        </div>

        {/* Log Viewer */}
        <div
          className={`sc-menu-item ${activeView === 'logs' ? 'active' : ''}`}
          onClick={() => navigate('logs', 'Log Viewer')}
        >
          <span className="sc-menu-icon"><TerminalIcon /></span>
          <span className="sc-menu-label">Log Viewer</span>
        </div>
      </div>

      <div className="sc-menu-settings">
        <span className="sc-menu-icon"><SettingsIcon /></span>
        <span className="sc-menu-label">Settings</span>
      </div>
    </div>
  );
}
