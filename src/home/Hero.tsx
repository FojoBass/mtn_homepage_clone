import { useEffect, useState } from 'react';

const Hero = () => {
  const [issmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 500);

  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth <= 500) setIsSmallScreen(true);
      else setIsSmallScreen(false);
    };
  }, []);

  return (
    <section className={`hero_sect ${issmallScreen ? 'small' : 'large'}`}>
      <header className='hero_text'>
        <h1>Enjoy 50GB Free + 50% Bonus</h1>
        <h3>on every recharege on myMTN NG App</h3>
      </header>

      <footer className='hero_btm'>
        <button className='cta_btn'>get started</button>
      </footer>
    </section>
  );
};

export default Hero;
