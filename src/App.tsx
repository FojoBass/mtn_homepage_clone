import { useEffect } from 'react';
import { HomeProvider } from './contexts/homeContext';
import Home from './home';
import { useAppContext } from './contexts/appContext';

const App = () => {
  const { setTheme } = useAppContext();

  useEffect(() => {
    const mode: string = localStorage.getItem('mtn_proj_theme')
      ? localStorage.getItem('mtn_proj_theme')!
      : 'light';
    setTheme && setTheme(mode);
  }, []);

  return (
    <HomeProvider>
      <Home />
    </HomeProvider>
  );
};

export default App;
