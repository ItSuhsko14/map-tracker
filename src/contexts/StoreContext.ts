import { createContext } from 'react';
import { rootStore, RootStore } from '../stores/rootStore';

export const StoreContext = createContext<RootStore>(rootStore);
