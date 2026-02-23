import type { Tab, ShowcaseAction } from './types';

interface BottomTabsProps {
  tabs: Tab[];
  selectedTab: string;
  dispatch: React.Dispatch<ShowcaseAction>;
}

export function BottomTabs({ tabs, selectedTab, dispatch }: BottomTabsProps) {
  return (
    <div className="sc-bottom-tabs">
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`sc-tab ${tab.id === selectedTab ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'NAVIGATE', id: tab.id, label: tab.label })}
        >
          <span className="sc-tab-label">{tab.label}</span>
          <span
            className="sc-tab-close"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: 'CLOSE_TAB', id: tab.id });
            }}
          >
            ×
          </span>
        </div>
      ))}
      {tabs.length > 1 && (
        <div
          className="sc-tab-close-all"
          onClick={() => dispatch({ type: 'CLOSE_ALL_TABS' })}
        >
          Close all
        </div>
      )}
    </div>
  );
}
