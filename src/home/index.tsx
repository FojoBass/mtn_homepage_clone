import { devicesOpts, servicesOpts } from '../data';
import Hero from './Hero';
import Navbar from './Navbar';
import QuickLinks from './QuickLinks';
import Subscribe from './Subscribe';
import { IoSunny } from 'react-icons/io5';
import { FaLongArrowAltRight, FaMoon } from 'react-icons/fa';
import { useAppContext } from '../contexts/appContext';

const Home = () => {
  const { theme, setTheme } = useAppContext();

  return (
    <>
      <Navbar />
      <Subscribe />
      <Hero />

      <section className='services_sect'>
        <div className='center_sect'>
          <div className='opts_wrapper'>
            {servicesOpts.map((opt) => (
              <button className='opt_wrapper' key={opt.title}>
                <span className='opt_icon'>{<opt.icon />}</span>
                <span className='opt_title'>{opt.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className='devices_sect'>
        <h1 className='heading_text'>
          Devices <button className='cta_btn'>all devices</button>
        </h1>

        <div className='center_sect'>
          <div className='devices_opts'>
            {devicesOpts.map(({ name, size, imgUrl, price }) => (
              <div
                className={`devices_opt`}
                style={{
                  backgroundImage: `url(${imgUrl})`,
                }}
                key={name}
              >
                <h3 className='name'>{name}</h3>

                <div className='bottom'>
                  <p>comes with free {size}</p>
                  <h3 className='price'>
                    <span className='naira_icon'>N</span>
                    {price}
                    <span className='arrow_icon'>
                      <FaLongArrowAltRight />
                    </span>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className='cta_btn'>all devices</button>
      </section>

      <p>Get doing</p>
      <QuickLinks />
      <p>Search</p>
      <p>Favs</p>
      <p>Footer</p>

      <div className='mode_wrapper'>
        <button
          className={`mode_btn ${theme}`}
          onClick={() =>
            setTheme && setTheme(theme === 'light' ? 'dark' : 'light')
          }
        >
          <span className={`light_icon ${theme === 'light' ? 'active' : ''}`}>
            <IoSunny />
          </span>
          <span className={`dark_icon ${theme === 'dark' ? 'active' : ''}`}>
            <FaMoon />
          </span>
        </button>
      </div>
    </>
  );
};

export default Home;
