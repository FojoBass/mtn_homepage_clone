import { devicesOpts, servicesOpts } from '../data';
import Hero from './Hero';
import Navbar from './Navbar';
import QuickLinks from './QuickLinks';
import Subscribe from './Subscribe';
import { IoClose, IoSunny } from 'react-icons/io5';
import {
  FaAngleDown,
  FaAngleRight,
  FaCookieBite,
  FaLongArrowAltRight,
  FaMoon,
} from 'react-icons/fa';
import { useAppContext } from '../contexts/appContext';
import { useHomeContext } from '../contexts/homeContext';
import Doings from './Doings';
import { CiChat1, CiSearch } from 'react-icons/ci';
import { useEffect, useRef, useState } from 'react';
import chatBot from '../assets/chat_logo.png';

const Home = () => {
  const { theme, setTheme } = useAppContext();
  const [isFooterDrop, setIsFooterDrop] = useState(false);
  const footDropWrapperRef = useRef<HTMLDivElement | null>(null);
  const footDropContentRef = useRef<HTMLUListElement | null>(null);
  const { isSubs, intersectRef } = useHomeContext();
  const [isChatBox, setIsChatBox] = useState(true);

  useEffect(() => {
    const footDropWrapperEl = footDropWrapperRef.current;
    const footDropContentEl = footDropContentRef.current;

    if (footDropContentEl && footDropWrapperEl) {
      if (isFooterDrop)
        footDropWrapperEl.style.height =
          footDropContentEl.getBoundingClientRect().height + 'px';
      else footDropWrapperEl.style.height = '0';
    }
  }, [isFooterDrop]);

  return (
    <>
      <Navbar />
      {isSubs && <Subscribe />}
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

      <section
        className='fav_sect int_obs'
        ref={(el) => el && intersectRef?.current?.push(el)}
      >
        <div
          className={`lrg_center_sect ${
            theme === 'dark' ? 'dark_overlay' : ''
          }`}
        >
          <h1>Enjoy access to your favorite social media apps</h1>
          <button className='more_btn'>view more</button>
        </div>
      </section>

      <footer className='foot_sect'>
        <div className='center_sect'>
          <div className='top'>
            <div className='contact_wrapper'>
              <button
                className='contact_btn'
                onClick={() => setIsFooterDrop(!isFooterDrop)}
              >
                <span className='chat_icon'>
                  <CiChat1 />
                </span>
                contact us
                <span className='drop_icon'>
                  {isFooterDrop ? <FaAngleRight /> : <FaAngleDown />}
                </span>
              </button>

              <div className='drop_wrapper' ref={footDropWrapperRef}>
                <ul ref={footDropContentRef}>
                  <div className='ul_left'>
                    <div className='opt'>
                      <h3>mtn network</h3>
                      <p>300</p>
                    </div>

                    <div className='opt'>
                      <h3>general enquiries</h3>
                      <p>info@mtn.ng</p>
                    </div>
                  </div>
                  <div className='ul_right'>
                    <h3>physical address</h3>
                    <p>
                      MTN golden plaza, No 1, awolowo road, falomo, ikoyi, lagos
                    </p>
                  </div>
                </ul>
              </div>
            </div>

            <div className='links_wrapper'>
              <span className='link'>whatsapp</span>
              <span className='link'>facebook</span>
              <span className='link'>instagram</span>
              <span className='link'>x</span>
              <span className='link'>linkedin</span>
              <span className='link'>youtube</span>
            </div>
          </div>

          <div className='bottom'>
            <div className='b_top'>
              {' '}
              <span className='privacy'>
                Privacy and data protection policy
              </span>
              <span className='terms'>terms & conditions</span>
            </div>

            <div className='rights'>
              &copy; {new Date().getFullYear()} lorem ipsum dolor plc, all
              rights reserved
            </div>
          </div>
        </div>
      </footer>

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

      <button className='feedback_wrapper'>Feedback</button>

      <div className='chat_bot_wrapper'>
        <div className={`text_wrapper ${!isChatBox ? 'hide' : ''}`}>
          <h6>Hi there!</h6>
          <h6>Need some help?</h6>
          <button className='chat_btn'>Let's chat now</button>
          <button className='close_bot_btn' onClick={() => setIsChatBox(false)}>
            <IoClose />
          </button>
        </div>
        <button className='img_wrapper' onClick={() => setIsChatBox(true)}>
          <img src={chatBot} alt='chat icon' />
        </button>
      </div>

      <button className='cookie_btn'>
        <FaCookieBite />
      </button>
    </>
  );
};

export default Home;
