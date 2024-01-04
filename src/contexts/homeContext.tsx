import {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface HomeContextInt {
  acctTypeOpt?: string;
  setAcctTypeOpt?: Dispatch<SetStateAction<string>>;
  intersectRef?: RefObject<HTMLElement[]>;
  isQLinkInt?: boolean;
}

const HomeContext = createContext<HomeContextInt>({});

export const HomeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [acctTypeOpt, setAcctTypeOpt] = useState('personal');
  const intersectRef = useRef<HTMLElement[]>([]);
  const [isQLinkInt, setIsQlinkInt] = useState(false);

  const observerFunc: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.contains('qlinks_sect') && setIsQlinkInt(true);
        entry.target.classList.remove('int_obs');
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    if (intersectRef.current) {
      const modIntEls = [...new Set(intersectRef.current)];

      const observer = new IntersectionObserver(observerFunc, {
        threshold: 0.75,
      });

      modIntEls.forEach((el) => {
        observer.observe(el);
      });
    }
  }, []);

  const sharedProps: HomeContextInt = {
    acctTypeOpt,
    setAcctTypeOpt,
    intersectRef,
    isQLinkInt,
  };

  return (
    <HomeContext.Provider value={sharedProps}>{children}</HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  return useContext(HomeContext);
};
