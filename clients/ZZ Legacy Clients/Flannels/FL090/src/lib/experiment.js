/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { events } from '../../../../../lib/utils';
import { config } from './config';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;
  if (VARIATION == 2) {
    events.send(ID, 'FL090 Control', 'FL090 Control is active');
    return false;
  } else {
    events.send(ID, 'FL090 Variation 1', 'FL090 Variation 1 is active');
  }

  // Filter config to those with images only
  const configArr = config();
  const hasImages = configArr.filter((obj) => {
    const key = Object.keys(obj);
    if (obj[key].image) {
      return obj;
    }
  });


  if (hasImages.length == 0) return;

  let size = 'mobile';
  if (window.innerWidth > 1021) {
    size = 'desktop';
  }

  
  const ref = document.querySelector('.sdHero.SuperHome');

  const buildBanner = () => {
    if (!ref) return;
    ref.insertAdjacentHTML(size == 'desktop' ? 'beforeend' : 'afterbegin', `
      <div class="${ID}-brandsList">
        <h1>Shop By Brand</h1>
        <ul>
          ${hasImages.map((obj) => {
            const name = Object.keys(obj)[0];
            return `
              <li>
                <div class="${ID}-image">
                  <a href="${obj[name].url}">
                    <img src="${obj[name].image}" alt="${name}"/>
                  </a>
                </div>  
                <div class="${ID}-name">
                  <p><a href="${obj[name].url}">${name}</a></p>
                </div>
              </li>
            `;
          }).join(' ')}
          <li>
            <div class="${ID}-more">
              <p><a href="https://www.flannels.com/designers">View All Brands</a></p>
            </div>
          </li>
        </ul>
      </div>
    `);
  };

  buildBanner();


  // Get all links and add events
  const links = document.querySelectorAll(`.${ID}-brandsList li a`);
  if (links.length) {
    for (let i = 0; links.length > i; i += 1) {
      links[i].addEventListener('click', () => {
        events.send(ID, `${ID} Click`, `${ID} CLicked on brand link`);
      });
    }
  }

};
