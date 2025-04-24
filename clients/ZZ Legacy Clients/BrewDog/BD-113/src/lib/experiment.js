/**
 * BD011 - Mobile Navigation
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { events, pollerLite } from '../../../../../lib/utils';
import { h, render, Component } from 'preact';
import { CategoriesScrollSwipe } from './components/CategoriesScrollSwipe/CategoriesScrollSwipe';
import { TiledNav } from './components/TiledNav/TiledNav';
import navData from './data/nav';
import stylesData from './data/styles';
import popularProductsData from './data/popular-products';
import tapLabelsData from './data/tap-labels';

const {ID, VARIATION} = settings;

const activate = () => {
  setup()

  const hero = document.querySelector('.main .hero');
  if(hero) {
    hero.insertAdjacentHTML('beforebegin', `
      <div class="${ID}-wrapper">
      </div>
    `);

    const wrapper = document.querySelector(`.${ID}-wrapper`);
    if(wrapper) {

      // -----------------------
      // Render depending on data sets
      // -----------------------
      if(settings.VARIATION == 1) { 
        render(<CategoriesScrollSwipe data={navData} />, wrapper);
      } else if(settings.VARIATION == 2) {
        render(<TiledNav data={data} />, wrapper);
      } else if(settings.VARIATION == 3) {
        render(<CategoriesScrollSwipe data={stylesData} />, wrapper);
      } else if(settings.VARIATION == 4) {
        render(<CategoriesScrollSwipe data={popularProductsData} />, wrapper);
      } else if(settings.VARIATION == 5) {
        render(<CategoriesScrollSwipe data={tapLabelsData} />, wrapper);
      }

      // -----------------------
      // Events
      // -----------------------
      [].forEach.call(document.querySelectorAll(`.CategoriesScrollSwipe__link`), link => {
        link.addEventListener('click', (e) => {
          events.send(`${ID} Mobile Home Navigation V-${VARIATION}`, 'Click Link', e.currentTarget.innerText.trim());
        });
      });

      [].forEach.call(document.querySelectorAll(`.TiledNav__link`), link => {
        link.addEventListener('click', (e) => {
          events.send(`${ID} Mobile Home Navigation V-${VARIATION}`, 'Click Link', e.currentTarget.innerText.trim());
        });
      });

      const inner = document.querySelector(`.CategoriesScrollSwipe__inner`);
      if(inner) {
        inner.addEventListener('scroll', (e) => {
          events.send(`${ID} Mobile Home Navigation V-${VARIATION}`, 'Scrolled Interaction', '', {
            sendOnce: true
          });
        });
      }

      // --
      // Move the efp banner above if it is loaded within a few seconds of ttfb
      // --
      pollerLite(['.efp-banner'], () => {
        const efpBanner = document.querySelector('.efp-banner');
        if(efpBanner) {
          efpBanner.insertAdjacentElement('afterend', wrapper);
        }
      }, {
        multiplier: 1,
        wait: 20,
        timeout: 8000
      });
    }
  }
};

export default activate;
