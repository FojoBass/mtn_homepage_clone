import { IconType } from 'react-icons';

export interface NavOptsInt {
  title: string;
  opts: (string | NavOptsInt)[];
}

export interface ServiceOptInt {
  title: string;
  icon: IconType;
}

export interface DevicesOptInt {
  name: string;
  imgUrl: string;
  size: string;
  price: string;
}
