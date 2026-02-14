import { createContext, useContext } from 'react';

interface IAppContext {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('App context must be used within in a AppProvider');
  }

  return context;
};
