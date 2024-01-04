import { devicesOpts, servicesOpts } from '../data';
import Hero from './Hero';
import Navbar from './Navbar';
import QuickLinks from './QuickLinks';
import Subscribe from './Subscribe';
import { IoSunny } from 'react-icons/io5';
import { FaAngleRight, FaLongArrowAltRight, FaMoon } from 'react-icons/fa';
import { useAppContext } from '../contexts/appContext';
import { useHomeContext } from '../contexts/homeContext';
import Doings from './Doings';
import { CiSearch } from 'react-icons/ci';

const Home = () => {
  const { theme, setTheme } = useAppContext();
  const { intersectRef } = useHomeContext();

  return (
    <>
      <Navbar />
      <Subscribe />
      <Hero />

      <section className='services_sect'>
        <div className='center_sect'>
          <div className='opts_wrapper'>
            {servicesOpts.map((opt) => (
              <button
                className='opt_wrapper int_obs'
                key={opt.title}
                ref={(el) => el && intersectRef?.current?.push(el)}
              >
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
                className='devices_opt int_obs'
                style={{
                  backgroundImage: `url(${imgUrl})`,
                }}
                key={name}
                ref={(el) => el && intersectRef?.current?.push(el)}
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
        <button
          className='cta_btn int_obs'
          ref={(el) => el && intersectRef?.current?.push(el)}
        >
          all devices
        </button>
      </section>

      <Doings />
      <QuickLinks />

      <section className='search_sect'>
        <div className='center_sect'>
          <aside
            className='left_side int_obs'
            ref={(el) => el && intersectRef?.current?.push(el)}
          >
            <div className='form_search'>
              <input type='text' placeholder='Search help...' />
              <button className='search_btn'>
                <CiSearch />
              </button>
            </div>

            <div className='left_opts_wrapper'>
              <div className='left_opt_wrapper'>
                <div className='left_opt'>
                  <span className='title'>5G</span>
                  <span className='icon'>
                    <FaAngleRight />
                  </span>
                </div>
              </div>

              <div className='left_opt_wrapper'>
                <div className='left_opt'>
                  <span className='title'>Broadband</span>
                  <span className='icon'>
                    <FaAngleRight />
                  </span>
                </div>
              </div>

              <div className='left_opt_wrapper'>
                <div className='left_opt'>
                  <span className='title'>Data</span>
                  <span className='icon'>
                    <FaAngleRight />
                  </span>
                </div>
              </div>
            </div>
          </aside>

          <aside
            className='right_side int_obs'
            ref={(el) => el && intersectRef?.current?.push(el)}
          >
            <p className='question'>need help?</p>
            <h3>Buy a SIM card</h3>
            <p>
              A SIM card is included in every prepaid - PayAsYouGo - starter
              pack bought at any MTN Store or participating retailer.
            </p>

            <button className='read_more_btn'>
              read more{' '}
              <span className='icon'>
                <FaAngleRight />
              </span>
            </button>
          </aside>
        </div>
      </section>

      <section className='fav_sect'>
        <div
          className={`lrg_center_sect ${
            theme === 'dark' ? 'dark_overlay' : ''
          }`}
        >
          <h1>Enjoy access to your favorite social media apps</h1>
          <button className='more_btn'>view more</button>
        </div>
      </section>

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
