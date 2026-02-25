export interface Tab {
  id: string;
  label: string;
}

export interface ConnectorReadme {
  title: string;
  markdown: string;
}

export interface ConnectorMeta {
  id: string;
  label: string;
  category: 'ai' | 'communication' | 'general';
  icon: string;
  cardCopy: string;
  readme: ConnectorReadme;
}

export interface ShowcaseState {
  activeView: string;
  openTabs: Tab[];
  selectedTab: string;
  menuExpanded: boolean;
  expandedGroups: string[];
}

export type ShowcaseAction =
  | { type: 'NAVIGATE'; id: string; label: string }
  | { type: 'CLOSE_TAB'; id: string }
  | { type: 'CLOSE_ALL_TABS' }
  | { type: 'TOGGLE_MENU' }
  | { type: 'TOGGLE_GROUP'; group: string };
