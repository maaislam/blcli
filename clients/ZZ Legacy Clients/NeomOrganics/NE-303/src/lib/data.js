import wellbeingRange from './content/wellbeing-range';
import wellbeingPods from './content/wellbeing-pods';
import homeFragrance from './content/home-fragrance';
import bathAndBody from './content/bath-and-body';
import skincare from './content/skincare';
import aboutUs from './content/about-us';
import christmas from './content/christmas';

export default [
  {
    name: 'Bestsellers',
    link: '/collections/bestsellers',
  },
  {
    name: 'Wellbeing Need',
    link: '/pages/shop-by-wellbeing-range',
    content: wellbeingRange,
  },
  {
    name: 'Pods & Oils',
    link: '/pages/the-wellbeing-pod-family',
    content: wellbeingPods,
  },
  {
    name: 'Home Fragrance',
    link: '/collections/home',
    content: homeFragrance,
  },
  {
    name: 'Bath & Body',
    link: '/collections/bath-body',
    content: bathAndBody,
  },
  {
    name: 'Skincare',
    link: '/collections/skincare',
    content: skincare,
  },
  {
    name: 'Haircare',
    link: '/collections/super-shower-power-shampoo-conditioner',
  },
  {
    name: 'Gifts',
    link: '/pages/feel-good-gifts',
  },
  {
    name: 'Shop & Save',
    link: '/collections/wellbeing-boosts-with-a-saving',
  },
  {
    name: 'About Us',
    link: '/pages/about-us',
    content: aboutUs,
  },
];
