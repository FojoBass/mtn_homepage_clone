import {
  DevicesOptInt,
  DoingOptsInt,
  NavOptsInt,
  ServiceOptInt,
} from './types';
import { TfiWorld } from 'react-icons/tfi';
import { BsBrowserSafari } from 'react-icons/bs';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { PiBatteryVerticalFullLight } from 'react-icons/pi';
import { GrGift } from 'react-icons/gr';
import { FiShoppingCart } from 'react-icons/fi';
import { LiaHandshake } from 'react-icons/lia';

export const navOpts: NavOptsInt[] = [
  {
    title: 'data',
    opts: [
      'Mtn 5g',
      'Data Plans',
      'Router Plans',
      'Fibre Plans',
      'Data Gifting',
      'Social Media Bundles',
      'Video Streaming Pack',
    ],
  },
  {
    title: 'devices',
    opts: [
      {
        title: 'Broadband',
        opts: ['Broadband Overview', 'Broadband One Account', 'How-To-Guide'],
      },
      'VOLTE',
      'Device Financing',
    ],
  },
  {
    title: 'voice',
    opts: [
      {
        title: 'Voice Plans',
        opts: [
          'Pulse',
          'Xtravalue More',
          'mPulse',
          'Postpaid',
          'XtraValue',
          'BetaTalk',
          'TruTalk',
        ],
      },
      {
        title: "Roaming & Int'l. Calling",
        opts: ["Int'l Call & SMS Rates", 'International Roaming'],
      },
    ],
  },
  {
    title: 'SIM services',
    opts: ['eSim', 'SIM Swap', 'SIM Registration Tips', 'Keep My Number'],
  },
  {
    title: 'support',
    opts: [
      'Find a Store',
      'Coverage Locator',
      'Help Centre',
      'Internet settings',
    ],
  },
  {
    title: 'shop',
    opts: [],
  },
];

export const navAcctOpt: string[] = [
  'personal',
  'business',
  'play',
  'about',
  'foundation',
];

export const servicesOpts: ServiceOptInt[] = [
  { title: 'Broadband', icon: TfiWorld },
  { title: 'Data', icon: BsBrowserSafari },
  { title: 'Devices', icon: IoPhonePortraitOutline },
  { title: 'Recharge', icon: PiBatteryVerticalFullLight },
  { title: 'myMTN NG App', icon: GrGift },
  { title: 'Shop', icon: FiShoppingCart },
];

export const devicesOpts: DevicesOptInt[] = [
  {
    name: '5G broadband router',
    imgUrl: '/device_5g.jpg',
    price: '50,000',
    size: '100GB',
  },
  {
    name: '4g broadband router (standard)',
    imgUrl: '/devices_standardjpg.jpg',
    price: '10,000',
    size: '50GB',
  },
  {
    name: 'firbre broadband',
    imgUrl: '/devices_Fibrebroadjpeg.jpeg',
    price: '35,000',
    size: '50MBPS',
  },
];

export const doingOpts: DoingOptsInt[] = [
  {
    icon: LiaHandshake,
    title: 'connect with loved ones',
    text: 'Discover affordable voice and data plans tailored for seamless communication with loved ones',
  },
  {
    icon: TfiWorld,
    title: 'explore the digital world',
    text: 'Unlock endless possibilities with our high-speed data plans and robust network coverage',
  },
  {
    icon: IoPhonePortraitOutline,
    title: 'stay productive on the go',
    text: 'Leverage innovative solutions designed to boost productivity for professionals and businesses',
  },
];

export const quickLinks: string[] = [
  'roaming',
  'device financing',
  '4G LTE',
  'MTN pulse',
  'NIN',
];
