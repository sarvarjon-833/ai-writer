import { useState, type FC, type ReactNode } from 'react';
import { AppContext } from './app.context';

interface IProps {
  children: ReactNode;
}

export const AppContextProvider: FC<IProps> = ({ children }: IProps) => {
  const [generatingContent, setGeneratingContent] = useState(false);

  return (
    <AppContext.Provider value={{ generatingContent, setGeneratingContent }}>
      {children}
    </AppContext.Provider>
  );
};
