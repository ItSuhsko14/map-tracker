import { FC, ReactNode } from 'react';
import { StoreContext } from '../contexts/StoreContext';
import { rootStore } from './rootStore';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);
