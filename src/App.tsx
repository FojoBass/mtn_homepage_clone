import { useEffect } from 'react';
import { HomeProvider } from './contexts/homeContext';
import Home from './home';

const App = () => {
  useEffect(() => {
    const mode: string = localStorage.getItem('mtn_proj_theme')
      ? localStorage.getItem('mtn_proj_theme')!
      : 'light';
    document.documentElement.classList.add(mode);
  }, []);

  return (
    <HomeProvider>
      <Home />
    </HomeProvider>
  );
};

export default App;
