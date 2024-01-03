import { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/appContext';
import { useHomeContext } from '../contexts/homeContext';

const Hero = () => {
  const [issmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 500),
    { theme } = useAppContext();
  const { intersectRef } = useHomeContext();

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 500) setIsSmallScreen(true);
      else setIsSmallScreen(false);
    });
  }, []);

  return (
    <section
      className={`hero_sect ${issmallScreen ? 'small' : 'large'} ${
        theme === 'dark' ? 'dark_overlay' : ''
      }`}
    >
      <header className='hero_text'>
        <h1
          ref={(el) => el && intersectRef?.current?.push(el)}
          className='int_obs'
        >
          Enjoy 50GB Free + 50% Bonus
        </h1>
        <h3
          ref={(el) => el && intersectRef?.current?.push(el)}
          className='int_obs'
        >
          on every recharge on myMTN NG App
        </h3>
      </header>

      <footer className='hero_btm'>
        <button
          className='cta_btn int_obs'
          ref={(el) =>
            el &&
            !intersectRef?.current?.find((e) => e === el) &&
            intersectRef?.current?.push(el)
          }
        >
          get started
        </button>
      </footer>
    </section>
  );
};

export default Hero;
