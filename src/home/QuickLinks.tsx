import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { quickLinks } from '../data';
import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../contexts/appContext';
import { useHomeContext } from '../contexts/homeContext';

const QuickLinks = () => {
  const { theme } = useAppContext();
  const { intersectRef, isQLinkInt } = useHomeContext();
  const [navBtns, setNavBtns] = useState<string[]>([]);
  const [currSel, setCurrSel] = useState(0);
  const spacingRef = useRef(20);

  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const boxesRef = useRef<HTMLDivElement[]>([]);
  const [startClones, setStartClones] = useState<string[]>([]);
  const [endClones, setEndClones] = useState<string[]>([]);
  const sliderTransRef = useRef('all ease-out 1s');
  const [carouselCount, setCarouselCount] = useState(0);
  const btnsClickedRef = useRef(false);
  const prevNxtBtsRef = useRef<HTMLButtonElement[]>([]);
  const isPointerDownRef = useRef(false);
  const iniPointerXRef = useRef(0);
  const currPointerXRef = useRef(0);
  const origTransRef = useRef(0);
  const [isTouchAllowed, setIsTouchAllowed] = useState(
    window.innerWidth <= 850 ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
  );

  const [boxesPerView, setBoxesPerView] = useState(
    window.innerWidth > 1000
      ? 3
      : window.innerWidth <= 1000 && window.innerWidth > 500
      ? 2
      : 1
  );
  const setBoxWidths = () => {
    const boxesPerView =
      window.innerWidth > 1000
        ? 3
        : window.innerWidth <= 1000 && window.innerWidth > 500
        ? 2
        : 1;

    if (sliderContainerRef.current) {
      const sliderContainerWidth =
        sliderContainerRef.current.getBoundingClientRect().width;
      const reduceValue =
        boxesPerView * spacingRef.current + spacingRef.current / 2;

      const boxWidth = (sliderContainerWidth - reduceValue) / boxesPerView;
      [...new Set(boxesRef.current)].forEach(
        (box) => (box.style.width = boxWidth + 'px')
      );

      const left =
        (boxWidth + spacingRef.current) *
        (boxesPerView - 1 ? boxesPerView - 1 : boxesPerView);

      if (sliderRef.current) {
        const sliderEl = sliderRef.current;
        sliderEl.style.transition = 'none';
        sliderEl.style.left = `-${left}px`;
        setTimeout(() => {
          sliderEl.style.transition = sliderTransRef.current;
        }, 100);
      }
    }
  };

  const handleNext = () => {
    btnsClickedRef.current = true;
    setCarouselCount((prev) => prev + 1);
  };

  const handlePrev = () => {
    btnsClickedRef.current = true;
    setCarouselCount((prev) => prev - 1);
  };

  const btnsOp = (activate: boolean) => {
    [...new Set(prevNxtBtsRef.current)].forEach(
      (btn) => (btn.disabled = !activate)
    );
  };

  const handleGestureDown = (e: PointerEvent) => {
    e.preventDefault();
    isPointerDownRef.current = true;
    iniPointerXRef.current =
      e.clientX -
      (sliderContainerRef.current?.getBoundingClientRect().left ?? 0);
    origTransRef.current = parseFloat(
      window.getComputedStyle(sliderRef.current!).transform.split(',')[4]
    );
  };

  const handleGestureMove = (e: PointerEvent) => {
    e.preventDefault();
    if (
      isPointerDownRef.current &&
      sliderRef.current &&
      sliderContainerRef.current
    ) {
      currPointerXRef.current =
        e.clientX - sliderContainerRef.current?.getBoundingClientRect().left;
      const xDiff = iniPointerXRef.current - currPointerXRef.current;
      const sliderEl = sliderRef.current;
      sliderEl.style.transition = 'none';
      sliderEl.style.transform = `translateX(${
        origTransRef.current - xDiff
      }px)`;
    }
  };

  const handleGestureUp = (e: PointerEvent) => {
    e.preventDefault();
    isPointerDownRef.current = false;
    const sliderEl = sliderRef.current;
    const xDiff = iniPointerXRef.current - currPointerXRef.current;

    if (sliderEl) {
      sliderEl.style.transition = sliderTransRef.current;
      if (Math.abs(xDiff) < 100 && prevNxtBtsRef.current)
        sliderEl.style.transform = `translateX(${origTransRef.current}px)`;
      else {
        if (xDiff > 0)
          [...new Set(prevNxtBtsRef.current)]
            .find((el) => el.classList.contains('next_btn'))!
            .click();
        else
          [...new Set(prevNxtBtsRef.current)]
            .find((el) => el.classList.contains('prev_btn'))!
            .click();
      }
    }
  };

  useEffect(() => {
    if (sliderContainerRef.current && isTouchAllowed) {
      sliderContainerRef.current.onpointerdown = handleGestureDown;
      sliderContainerRef.current.onpointermove = handleGestureMove;
      sliderContainerRef.current.onpointerup = handleGestureUp;
    } else if (sliderContainerRef.current) {
      sliderContainerRef.current.onpointerdown = null;
      sliderContainerRef.current.onpointermove = null;
      sliderContainerRef.current.onpointerup = null;
    }

    return () => {
      if (sliderContainerRef.current) {
        sliderContainerRef.current.onpointerdown = null;
        sliderContainerRef.current.onpointermove = null;
        sliderContainerRef.current.onpointerup = null;
      }
    };
  }, [isTouchAllowed]);

  useEffect(() => {
    if (window.innerWidth > 1000)
      setNavBtns(new Array(Math.ceil(quickLinks.length / 3)).fill(''));
    else if (window.innerWidth <= 1000 && window.innerWidth > 500)
      setNavBtns(new Array(Math.ceil(quickLinks.length / 2)).fill(''));
    else setNavBtns(new Array(quickLinks.length).fill(''));

    setStartClones(quickLinks.slice(0, boxesPerView));
    setEndClones(
      quickLinks.slice(
        quickLinks.length -
          (boxesPerView - 1 > 0 ? boxesPerView - 1 : boxesPerView)
      )
    );

    window.addEventListener('resize', () => {
      const modBoxesPerView =
        window.innerWidth > 1000
          ? 3
          : window.innerWidth <= 1000 && window.innerWidth > 500
          ? 2
          : 1;

      if (window.innerWidth > 1000)
        setNavBtns(new Array(Math.ceil(quickLinks.length / 3)).fill(''));
      else if (window.innerWidth <= 1000 && window.innerWidth > 500)
        setNavBtns(new Array(Math.ceil(quickLinks.length / 2)).fill(''));
      else setNavBtns(new Array(quickLinks.length).fill(''));

      if (window.innerWidth <= 850)
        setIsTouchAllowed((prev) => (prev ? prev : true));
      else if (!('ontouchstart' in window || navigator.maxTouchPoints > 0))
        setIsTouchAllowed(false);

      setBoxWidths();
      setBoxesPerView(modBoxesPerView);

      setStartClones(quickLinks.slice(0, modBoxesPerView));
      setEndClones(
        quickLinks.slice(
          quickLinks.length -
            (modBoxesPerView - 1 > 0 ? modBoxesPerView - 1 : modBoxesPerView)
        )
      );
    });
  }, []);

  useEffect(() => {
    let timer: number;
    if (boxesRef.current && isQLinkInt) {
      timer = setTimeout(() => {
        setBoxWidths();
        const timer2 = setTimeout(() => {
          [...new Set(boxesRef.current)].forEach(
            (box) => (box.style.opacity = '1')
          );

          window.addEventListener('resize', () => {
            [...new Set(boxesRef.current)].forEach(
              (box) => (box.style.opacity = '1')
            );
          });

          clearTimeout(timer2);
        }, 100);
      }, 700);
    }

    return () => clearTimeout(timer);
  }, [isQLinkInt]);

  useEffect(() => {
    if (!btnsClickedRef.current) {
      setCarouselCount(currSel);
    }
  }, [currSel]);

  useEffect(() => {
    if (sliderContainerRef.current && sliderRef.current && navBtns.length) {
      const containerEl = sliderContainerRef.current;
      const sliderEl = sliderRef.current;
      const containerWidth = containerEl.getBoundingClientRect().width;
      const sliderWidth = sliderEl.getBoundingClientRect().width;
      let transVal: number;

      if (carouselCount < 0 && boxesRef.current) {
        btnsOp(false);

        const boxWidth = boxesRef.current[0].getBoundingClientRect().width;
        transVal = -(boxWidth + spacingRef.current) * endClones.length;
        setCurrSel(navBtns.length - 1);

        sliderEl.ontransitionend = () => {
          sliderEl.style.transition = 'none';
          setCarouselCount(navBtns.length - 1);

          setTimeout(() => {
            sliderEl.style.transition = sliderTransRef.current;
            sliderEl.ontransitionend = null;
            btnsOp(true);
          }, 1000);

          return;
        };
      } else if (carouselCount > navBtns.length - 1) {
        btnsOp(false);

        const boxWidth = boxesRef.current[0].getBoundingClientRect().width;
        transVal =
          (carouselCount - 1) * containerWidth +
          sliderWidth -
          (carouselCount * containerWidth +
            boxWidth * endClones.length +
            spacingRef.current);
        setCurrSel(0);
        sliderEl.ontransitionend = () => {
          sliderEl.style.transition = 'none';
          setCarouselCount(0);

          setTimeout(() => {
            sliderEl.style.transition = sliderTransRef.current;
            sliderEl.ontransitionend = null;
            btnsOp(true);
          }, 1000);

          return;
        };
      } else {
        transVal = carouselCount * (containerWidth - spacingRef.current / 2.5);
        setCurrSel(carouselCount);
      }

      sliderEl.style.transform =
        transVal < 0
          ? `translateX(${Math.abs(transVal)}px)`
          : `translateX(-${transVal}px)`;
    }
  }, [carouselCount, navBtns]);

  return (
    <section
      className='qlinks_sect int_obs'
      ref={(el) => el && intersectRef?.current?.push(el)}
    >
      <div
        className={`lrg_center_sect ${theme === 'dark' ? 'dark_overlay' : ''}`}
      >
        <h1>quick links</h1>

        <div className='carousel_wrapper'>
          <div className='slider_container' ref={sliderContainerRef}>
            <div className='slider' ref={sliderRef}>
              {endClones.map((clone) => (
                <div
                  className='link_wrapper clone'
                  key={clone}
                  ref={(el) => el && boxesRef.current.push(el)}
                  style={{ opacity: '0' }}
                >
                  <h3>{clone}</h3>
                  <p>Find out more</p>
                </div>
              ))}

              {quickLinks.map((link) => (
                <div
                  className='link_wrapper'
                  key={link}
                  ref={(el) => el && boxesRef.current.push(el)}
                  style={{ opacity: '0' }}
                >
                  <h3>{link}</h3>
                  <p>Find out more</p>
                </div>
              ))}

              {startClones.map((clone) => (
                <div
                  className='link_wrapper clone'
                  key={clone}
                  ref={(el) => el && boxesRef.current.push(el)}
                  style={{ opacity: '0' }}
                >
                  <h3>{clone}</h3>
                  <p>Find out more</p>
                </div>
              ))}
            </div>
          </div>

          <button
            className='carousel_btns next_btn'
            onClick={handleNext}
            ref={(el) => el && prevNxtBtsRef.current.push(el)}
          >
            <FaCaretRight />
          </button>
          <button
            className='carousel_btns prev_btn'
            onClick={handlePrev}
            ref={(el) => el && prevNxtBtsRef.current.push(el)}
          >
            <FaCaretLeft />
          </button>
        </div>
      </div>

      <div className='carousel_nav_btns'>
        {navBtns.map((btn, index) => (
          <button
            className={`carousel_nav_btn ${index === currSel ? 'active' : ''}`}
            key={index}
            onClick={() => {
              setCurrSel(index);
              btnsClickedRef.current = false;
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickLinks;
