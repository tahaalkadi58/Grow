'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

import type { EcosystemView } from '../types';

type EcosystemContextValue = {
  view: EcosystemView;
  setView: (view: EcosystemView) => void;
};

const EcosystemContext = createContext<EcosystemContextValue | null>(null);

type EcosystemProviderProps = {
  children: ReactNode;
};

export function EcosystemProvider({ children }: EcosystemProviderProps) {
  const [view, setView] = useState<EcosystemView>('plus');

  return <EcosystemContext.Provider value={{ view, setView }}>{children}</EcosystemContext.Provider>;
}

export function useEcosystem(): EcosystemContextValue {
  const context = useContext(EcosystemContext);

  if (!context) {
    throw new Error('useEcosystem must be used within an EcosystemProvider.');
  }

  return context;
}
