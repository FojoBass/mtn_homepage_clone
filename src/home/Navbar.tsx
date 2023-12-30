import { useHomeContext } from '../contexts/homeContext';
import { navAcctOpt, navOpts } from '../data';
import logo from '../assets/mtn_logo.svg';
import { NavOptsInt } from '../types';
import { CiSearch } from 'react-icons/ci';
import { FaAngleRight, FaAngleDown, FaLongArrowAltRight } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const { acctTypeOpt, setAcctTypeOpt } = useHomeContext();
  const mobDropContainerRef = useRef<HTMLDivElement | null>(null);
  const mobDropContentRef = useRef<HTMLUListElement | null>(null);
  const [isDrop, setIsDrop] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);

  useEffect(() => {
    let unsub: number;

    if (mobDropContainerRef.current && mobDropContentRef.current) {
      const containerEl = mobDropContainerRef.current;
      const contentEl = mobDropContentRef.current;

      if (isDrop) {
        containerEl.style.height =
          contentEl.getBoundingClientRect().height + 'px';
        containerEl.classList.add('active');
        document.documentElement.style.overflow = 'hidden';
        setIsOverlay(true);
      } else {
        containerEl.style.height = '0';
        containerEl.classList.remove('active');
        document.documentElement.style.overflow = 'auto';
        unsub = setTimeout(() => {
          setIsOverlay(false);
          clearTimeout(unsub);
        }, 700);
      }
    }
    return () => clearTimeout(unsub);
  }, [isDrop]);

  return (
    <nav id='nav_sect'>
      {isOverlay && <section className='overlay'></section>}

      <ul className='acct_type_wrapper'>
        {navAcctOpt.map((opt, index) => (
          <li
            className='acct_type_opt'
            onClick={() => setAcctTypeOpt && setAcctTypeOpt(opt)}
            key={`opt${index}`}
          >
            <div className='opt_title_wrapper'>
              <span
                className={`opt_title_icon ${
                  acctTypeOpt === opt ? 'active' : ''
                }`}
              ></span>
              <span className='opt_title'>{opt}</span>
            </div>
          </li>
        ))}
      </ul>

      <section className='navbar_sect'>
        <div className='top_wrapper'>
          <div className='left_side'>
            <div className='logo_wrapper'>
              <img src={logo} alt='mtn logo' />
            </div>

            <div className='midside'>
              {navOpts.map((opt, index) => (
                <div className='navopt' key={`${opt}${index}`}>
                  <span className='opt_title'>{opt.title}</span>
                  <ul className='navsub_opts top_level'>
                    {opt.opts.map((subOpt, ind) =>
                      typeof subOpt === 'string' ? (
                        <li className='navsub_opt' key={`${ind}`}>
                          <div className='title'>{subOpt}</div>
                        </li>
                      ) : (
                        <li className='navsub_opt' key={`${ind}`}>
                          <div className='title'>{subOpt.title}</div>

                          <SubOptsDrop opts={subOpt.opts as NavOptsInt[]} />
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}

              <div className='expandable_drop'></div>
            </div>
          </div>

          <div className='rightside'>
            <button className='search_btn'>
              <CiSearch />
            </button>

            <button
              className={`menu_btn ${isDrop ? 'active' : ''}`}
              onClick={() => setIsDrop(!isDrop)}
            >
              <hr />
              <hr />
              <hr />
            </button>
          </div>
        </div>

        <div className='mobile_drop_wrapper' ref={mobDropContainerRef}>
          <ul className='nav_opts' ref={mobDropContentRef}>
            {navOpts.map((opt, index) => (
              <MobileOptsDrop
                opt={opt}
                index={index}
                isLast={index === navOpts.length - 1}
                key={`${opt}${index}`}
              />
            ))}

            <div className='acct_type_opts'>
              {navAcctOpt.map((opt, index) => (
                <li
                  className='acct_type_opt'
                  onClick={() => setAcctTypeOpt && setAcctTypeOpt(opt)}
                  key={`opt${index}`}
                >
                  <span
                    className={`${acctTypeOpt === opt ? 'active' : ''}`}
                  ></span>
                  <div className='opt_title'>{opt}</div>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;

interface SubOptsDropInt {
  opts: (NavOptsInt | string)[];
  containerRef?: React.MutableRefObject<HTMLDivElement | null>;
  contentRef?: React.MutableRefObject<HTMLUListElement | null>;
  isDrop?: boolean;
  gParContainerRef?: React.MutableRefObject<HTMLDivElement | null>;
}

interface MobileOptsDropInt {
  opt: NavOptsInt;
  index: number;
  isLast: boolean;
}

const SubOptsDrop: React.FC<SubOptsDropInt> = ({
  opts,
  containerRef,
  contentRef,
  isDrop,
  gParContainerRef,
}) => {
  useEffect(() => {
    if (
      containerRef?.current &&
      contentRef?.current &&
      gParContainerRef?.current
    ) {
      const containerEl = containerRef.current;
      const contentEl = contentRef.current;
      const gContainerEl = gParContainerRef.current;
      if (isDrop) {
        containerEl.style.height =
          contentEl.getBoundingClientRect().height + 'px';
        {
          gContainerEl.style.height =
            gContainerEl.getBoundingClientRect().height +
            contentEl.getBoundingClientRect().height +
            'px';
        }
      } else {
        containerEl.style.height = '0';
        gContainerEl.style.height =
          gContainerEl.getBoundingClientRect().height -
          contentEl.getBoundingClientRect().height +
          'px';
      }
    }
  }, [isDrop]);

  return (
    <div className='subdrop_wrapper' ref={containerRef}>
      <ul className='navsub_opts' ref={contentRef}>
        {opts.map((subOpt, ind) => (
          <li className='navsub_opt' key={`${ind}`}>
            {subOpt as string}
          </li>
        ))}
      </ul>
    </div>
  );
};

const MobileOptsDrop: React.FC<MobileOptsDropInt> = ({
  opt,
  index,
  isLast,
}) => {
  const [isDrop, setIsDrop] = useState(false);
  const subDropContainerRef = useRef<HTMLDivElement | null>(null);
  const subDropContentRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (subDropContainerRef.current && subDropContentRef.current) {
      const subDropContainer = subDropContainerRef.current;
      const subDropContent = subDropContentRef.current;

      if (isDrop)
        subDropContainer.style.height =
          subDropContent.getBoundingClientRect().height + 'px';
      else subDropContainer.style.height = '0';
    }
  }, [isDrop]);

  return (
    <div
      className={`navopt ${isLast ? 'last_child' : ''}`}
      key={`${opt}${index}`}
    >
      <div className='opt_title' onClick={() => setIsDrop(!isDrop)}>
        {opt.title}
        {opt.opts.length ? (
          <div className='drop_icon'>
            {isDrop ? <FaAngleRight /> : <FaAngleDown />}
          </div>
        ) : (
          <span className='arrow_icon'>
            <FaLongArrowAltRight />
          </span>
        )}
      </div>
      <div className='subdrop_wrapper' ref={subDropContainerRef}>
        <ul className='navsub_opts' ref={subDropContentRef}>
          {opt.opts.map((subOpt, ind) =>
            typeof subOpt === 'string' ? (
              <li className='navsub_opt' key={`${ind}`}>
                {subOpt}
              </li>
            ) : (
              <SubDrops
                opt={subOpt}
                ind={ind}
                key={`${ind}`}
                parContainerRef={subDropContainerRef}
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
};

// * The below handles the state for the sub drops titles

const SubDrops: React.FC<{
  opt: NavOptsInt;
  ind: number;
  parContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ opt, ind, parContainerRef }) => {
  const [isDrop, setIsDrop] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLUListElement>(null);

  return (
    <li className='navsub_opt no_hover' key={`${ind}`}>
      <div className='title_wrapper' onClick={() => setIsDrop(!isDrop)}>
        {opt.title}
        <span className='drop_icon'>
          {isDrop ? <FaAngleRight /> : <FaAngleDown />}
        </span>
      </div>
      <SubOptsDrop
        opts={opt.opts as NavOptsInt[]}
        containerRef={containerRef}
        contentRef={contentRef}
        isDrop={isDrop}
        gParContainerRef={parContainerRef}
      />
    </li>
  );
};
