/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, translate } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';

export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    const hamburger = document.querySelector('#Hamburger');
    if(hamburger) {
      hamburger.insertAdjacentHTML('afterend', `
        <div class="${ID}-search">
          <svg-icon icon="search" class="ng-isolate-scope"><svg ng-if="Ready" class="" style=""><use xlink:href="#Svg_search" ng-attr-xlink:href="{{TrustedSvgHref()}}"></use></svg></svg-icon>
          <span>${translate('Search')}</span>
        </div>
      `);

      const search = document.querySelector(`.${ID}-search`);
      const searchBar = document.querySelector('#SearchBar');

      if(search && searchBar) {
        searchBar.insertAdjacentHTML('beforebegin', `
          <div class="${ID}-search-wrapper"></div>
        `);

        const searchWrapper = document.querySelector(`.${ID}-search-wrapper`);
        if(searchWrapper) {
          searchWrapper.insertAdjacentElement('afterbegin', searchBar);
        }

        search.addEventListener('click', () => {
          searchWrapper.classList.toggle(`${ID}-active`);
          document.body.classList.toggle(`${ID}-active`);

          const searchSpan = search.querySelector('span');
          if(searchSpan.innerText.trim() == translate('Search')) {
            searchSpan.innerHTML = translate('Close');
          } else {
            searchSpan.innerHTML = translate('Search');
          }

          events.send(`${ID}-${VARIATION}`, 'Clicked Search Icon', searchWrapper.classList.contains(`${ID}-active`) ? 'active' : 'close');
        });

        document.querySelector('#MainContentWrapper').addEventListener('click', () => {
          if(document.body.classList.contains(`${ID}-active`)) {
            searchWrapper.classList.remove(`${ID}-active`);
            document.body.classList.remove(`${ID}-active`);

            const searchSpan = search.querySelector('span');
            if(searchSpan.innerText.trim() == translate('Search')) {
              searchSpan.innerHTML = translate('Close');
            } else {
              searchSpan.innerHTML = translate('Search');
            }
          }
        });
      }
    }
  };

  // Make device specific changes when layout changes
  rootScope.$on('App_LayoutChanged', () => {
    setTimeout(init, 500);
  });

  init();
};
