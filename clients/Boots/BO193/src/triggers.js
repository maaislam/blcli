/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    pollerLite([
      'body',
      '#estore_product_title',
      '#estore_productpage_template_container',
      () => {
        return !!window.dataLayer[2] && window.dataLayer[2]['ecommerce.detail'] && window.dataLayer[2]['ecommerce.detail']['products'][0].brand;
      },
      
      () => {
        const brands = [
          'No7',
          'Dyson',
          'Oral B',
          'Christian Dior',
          'CHANEL',
          'Lancome',
          'Estee Lauder',
          'Clinique',
          "L'Oreal",
          'La Roche Posay',
          'M.A.C',
          'Braun',
          'Philips',
          'Fenty Beauty',
          'YVES SAINT LAURENT',
          'Paco Rabanne',
          'Clarins',
          'The Ordinary',
          'Benefit',
          'Cerave',
          'Aptamil',
          'Liz Earle',
          'Mothercare',
          'NARS',
          'Joie',
          'Olay',
          'Huda',
          'NYX Professional Makeup',
          'Pampers',
          'Soap & Glory',
          'Maybelline',
          'Giorgio Armani',
          'Garnier',
          'Fitbit',
          'Too Faced',
          'Tom Ford',
          'Nivea',
          "Kiehl's",
          'Babyliss',
          'Gillette',
          'Mugler',
          'Yankee Candles',
          'Revolution',
          'Gucci',
          'Remington',
          'Bobbi Brown',
          'MAM',
          'Urban Decay',
        ];

        if(brands.includes(window.dataLayer[2]['ecommerce.detail']['products'][0].brand)) {
          return true
        }
      }
    ], activate);
  }
}
