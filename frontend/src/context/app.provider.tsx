import { useState, type FC, type ReactNode } from 'react';
import { AppContext } from './app.context';

interface IProps {
  children: ReactNode;
}

export const AppContextProvider: FC<IProps> = ({ children }: IProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
