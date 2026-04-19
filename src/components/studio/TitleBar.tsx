import { useState, useEffect } from 'react';

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

interface TitleBarProps {
  onNavigate: (id: string, label: string) => void;
}

export function TitleBar({ onNavigate }: TitleBarProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = document.documentElement.getAttribute('data-theme');
    if (saved === 'light') setTheme('light');
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('catalyst-theme', next);
    setTheme(next);
  }

  return (
    <div className="sc-titlebar">
      <div className="sc-titlebar-center">
        <span className="sc-titlebar-catalyst">Catalyst</span>
        <span className="sc-titlebar-studio">Studio</span>
        <span className="sc-titlebar-edition">Pre-Release Edition</span>
      </div>
      <div className="sc-titlebar-actions">
        <button
          type="button"
          className="sc-theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle light/dark theme"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          <span className="sc-theme-label">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button
          type="button"
          className="sc-titlebar-cta"
          onClick={() => onNavigate('get-started', 'Get Started')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
