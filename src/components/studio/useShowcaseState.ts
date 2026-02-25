import { useReducer, useEffect, useCallback } from 'react';
import type { ShowcaseState, ShowcaseAction, Tab } from './types';

const initialState: ShowcaseState = {
  activeView: 'home',
  openTabs: [{ id: 'home', label: 'Home' }],
  selectedTab: 'home',
  menuExpanded: true,
  expandedGroups: ['connectors'],
};

function reducer(state: ShowcaseState, action: ShowcaseAction): ShowcaseState {
  switch (action.type) {
    case 'NAVIGATE': {
      const exists = state.openTabs.find(t => t.id === action.id);
      const newTabs: Tab[] = exists
        ? state.openTabs
        : [...state.openTabs, { id: action.id, label: action.label }];
      return {
        ...state,
        activeView: action.id,
        selectedTab: action.id,
        openTabs: newTabs,
      };
    }
    case 'CLOSE_TAB': {
      const filtered = state.openTabs.filter(t => t.id !== action.id);
      if (filtered.length === 0) {
        return {
          ...state,
          openTabs: [{ id: 'home', label: 'Home' }],
          activeView: 'home',
          selectedTab: 'home',
        };
      }
      if (state.selectedTab === action.id) {
        const closedIndex = state.openTabs.findIndex(t => t.id === action.id);
        const newIndex = Math.min(closedIndex, filtered.length - 1);
        return {
          ...state,
          openTabs: filtered,
          activeView: filtered[newIndex].id,
          selectedTab: filtered[newIndex].id,
        };
      }
      return { ...state, openTabs: filtered };
    }
    case 'CLOSE_ALL_TABS':
      return {
        ...state,
        openTabs: [{ id: 'home', label: 'Home' }],
        activeView: 'home',
        selectedTab: 'home',
      };
    case 'TOGGLE_MENU':
      return { ...state, menuExpanded: !state.menuExpanded };
    case 'TOGGLE_GROUP': {
      const has = state.expandedGroups.includes(action.group);
      return {
        ...state,
        expandedGroups: has
          ? state.expandedGroups.filter(g => g !== action.group)
          : [...state.expandedGroups, action.group],
      };
    }
    default:
      return state;
  }
}

export function useShowcaseState() {
  const [state, rawDispatch] = useReducer(reducer, initialState);

  // Wrapped dispatch: pushes browser history on NAVIGATE so back/forward work
  const dispatch = useCallback((action: ShowcaseAction) => {
    rawDispatch(action);
    if (action.type === 'NAVIGATE') {
      history.pushState({ id: action.id, label: action.label }, '');
    }
  }, []);

  useEffect(() => {
    // Seed the initial history entry so the first back-press has somewhere to go
    history.replaceState({ id: 'home', label: 'Home' }, '');

    const onPopState = (e: PopStateEvent) => {
      const id = e.state?.id ?? 'home';
      const label = e.state?.label ?? 'Home';
      // Use rawDispatch so we don't push another history entry
      rawDispatch({ type: 'NAVIGATE', id, label });
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return [state, dispatch] as const;
}
