import { IoMdClose } from 'react-icons/io';
import subImg from '../assets/subscribe.png';
import { useHomeContext } from '../contexts/homeContext';
import { useEffect, useRef, useState } from 'react';

const Subscribe = () => {
  const { setIsSubs } = useHomeContext();
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleSubClose = () => {
    if (closeBtnRef.current && mainRef.current) {
      closeBtnRef.current.style.animation =
        'closeOutAnim 0.5s ease-out 0s 1 forwards';

      closeBtnRef.current.onanimationstart = () => {
        setTimeout(() => {
          mainRef.current && mainRef.current.classList.remove('active');
          setTimeout(() => {
            setIsSubs && setIsSubs(false);
          }, 700);
        }, 500);
      };
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <section
      className='sub_sect'
      onClick={(e) => e.target === e.currentTarget && handleSubClose()}
    >
      <div className={`loading ${loading ? 'active' : ''}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <main className={`${!loading ? 'active' : ''}`} ref={mainRef}>
        <button
          className={`close_btn `}
          onClick={handleSubClose}
          ref={closeBtnRef}
        >
          <IoMdClose />
        </button>

        <div className='wrapper'>
          <div className='img_wrapper'>
            <img src={subImg} alt='img' />
          </div>

          <div className='right_side'>
            <h1>Discounts Delivered to Your Inbox!</h1>
            <p>
              Subscribe now to receive early-bird access to discounts and be
              informed about upcoming events.
            </p>

            <form className='sub_form' onSubmit={(e) => e.preventDefault()}>
              <div className='opt'>
                <input type='text' placeholder='Enter your name...' />
              </div>
              <div className='opt'>
                <input type='text' placeholder='Enter your email...' />
              </div>

              <button className='sub_btn'>Subscribe</button>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Subscribe;
