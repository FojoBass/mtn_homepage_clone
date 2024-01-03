import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { quickLinks } from '../data';
import { useEffect, useState } from 'react';

const QuickLinks = () => {
  const [navBtns, setNavBtns] = useState<string[]>([]);
  const [currSel, setCurrSel] = useState(0);

  useEffect(() => {
    if (window.innerWidth > 1000)
      setNavBtns(new Array(Math.ceil(quickLinks.length / 3)).fill(''));
    else if (window.innerWidth <= 1000 && window.innerWidth > 500)
      setNavBtns(new Array(Math.ceil(quickLinks.length / 2)).fill(''));
    else setNavBtns(new Array(quickLinks.length).fill(''));

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1000)
        setNavBtns(new Array(Math.ceil(quickLinks.length / 3)).fill(''));
      else if (window.innerWidth <= 1000 && window.innerWidth > 500)
        setNavBtns(new Array(Math.ceil(quickLinks.length / 2)).fill(''));
      else setNavBtns(new Array(quickLinks.length).fill(''));
    });
  }, []);

  return (
    <section className='qlinks_sect'>
      <div className='lrg_center_sect'>
        <h1>quick links</h1>

        <div className='carousel_wrapper'>
          <div className='slider'>
            {quickLinks.map((link) => (
              <div className='link_wrapper' key={link}>
                <h3>{link}</h3>
                <p>Find out more</p>
              </div>
            ))}
          </div>
        </div>

        <button className='carousel_btns next_btn'>
          <FaCaretRight />
        </button>
        <button className='carousel_btns prev_btn'>
          <FaCaretLeft />
        </button>
      </div>

      <div className='carousel_nav_btns'>
        {navBtns.map((btn, index) => (
          <button
            className={`carousel_nav_btn ${index === currSel ? 'active' : ''}`}
            key={index}
            onClick={() => setCurrSel(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default QuickLinks;
