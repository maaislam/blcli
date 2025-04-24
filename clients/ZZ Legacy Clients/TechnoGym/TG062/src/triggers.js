import { pollerLite } from '../../../../lib/uc-lib';
import Run from './lib/experiment';

pollerLite([
  '#contactForm',
  '.contact-details',
  '.form-container',
  '#private',
  '#business',
  '#freelance',
  '.form-container .form-list .wide.comment',
  '.button.submit-trigger'
 ], () => {
   const cache = (function() {
       const _cache = {
         'form': document.querySelector('#contactForm'),
         'callUs': document.querySelector('.contact-details'),
         'formContainer': document.querySelector('.form-container'),
         'privateOption': document.querySelector('#private'),
         'businessOption': document.querySelector('#business'),
         'freelanceOption': document.querySelector('#freelance'),
         'messageField': document.querySelector('.form-container .form-list .wide.comment'),
         'submitBtn': document.querySelector('.button.submit-trigger'),
       };
       return {
         get: (key) => {
             return _cache[key];
         },
         set: (key, value) => {
             _cache[key] = value;
         }
       }
   })();
   Run(cache);
 });
