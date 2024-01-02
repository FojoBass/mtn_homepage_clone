import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AppContextInt {
  theme?: string;
  setTheme?: Dispatch<SetStateAction<string>>;
}

const AppContext = createContext<AppContextInt>({});

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('mtn_proj_theme', theme);
    }
  }, [theme]);

  const sharedProps: AppContextInt = { theme, setTheme };

  return (
    <AppContext.Provider value={sharedProps}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
