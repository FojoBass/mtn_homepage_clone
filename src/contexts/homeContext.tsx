import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface HomeContextInt {
  acctTypeOpt?: string;
  setAcctTypeOpt?: Dispatch<SetStateAction<string>>;
}

const HomeContext = createContext<HomeContextInt>({});

export const HomeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [acctTypeOpt, setAcctTypeOpt] = useState('personal');

  const sharedProps: HomeContextInt = { acctTypeOpt, setAcctTypeOpt };

  return (
    <HomeContext.Provider value={sharedProps}>{children}</HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  return useContext(HomeContext);
};
