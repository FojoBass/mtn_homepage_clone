import { NavOptsInt } from './types';

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

export const navAcctOpt = [
  'personal',
  'business',
  'play',
  'about',
  'foundation',
];
