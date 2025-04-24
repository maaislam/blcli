import {
  throttle
} from '../../../../../../lib/uc-lib';
import { events, scrollTo } from '../../../../../../lib/utils';
import { angularCompile } from '../../../../../../lib/utils/avon';

import shared from '../shared';

const { ID, VARIATION } = shared;

export default class StickyCartHeader {
  constructor() {
    this.name = `${ID}_StickyCartHeader`;
    this.productScope = $('#MainContentWrapper').scope();
    this.create();
    this.bindEvents();
    this.render();
    angularCompile(this.component, $, this.productScope);
  }

  create() {
    const {
      name
    } = this;

    const $productScope = $('#MainContentWrapper').scope();
    const { Product } = $productScope.ViewModel;
    const hasShades = $productScope.ViewModel.HasShadeVariants;

    const component = document.createElement('div');
    let shortName = Product.ShortName;
    if (shortName.indexOf('Skin So Soft') !== -1) shortName = 'Skin So Soft Original';

    component.classList.add(name);
    component.innerHTML = `
    <div class="${name}--wrap">
      <div class="${name}--summary">
        ${hasShades ? `
          <h2 class="${name}--titleShade">
            Selected shade: <span class="${name}--shadeName" ng-bind="(ViewModel.SelectedShadeVariant.Name)"></span> <br/>
            (<span class="${name}--changeShade">change</span>)
          `
        :
          `<h2 class="${name}--title">
            ${window.innerWidth <= 768 ? shortName : Product.Name}
          </h2>
          `}
        </h2>
        <p class="${name}--price">${Product.PriceFormatted}</h2>
      </div>

      <div class="${name}_ctas">
      </div>
    </div>
    `;

    this.component = component;
  }

  bindEvents() {
    const {
      name,
      component
    } = this;
    let waypoint;
    let headerStuck;

    // Scroll to shades.
    $('body').on('click', `.${name}--changeShade`, () => {
      const isMobile = window.innerWidth < 768;
      let scrollElement;
      if (isMobile) {
        scrollElement = $('.Shades');
      }
      else {
        scrollElement = $('.TopPanel.LeftPanel');
      }
      scrollTo(scrollElement.position().top, 50);
      events.send(`${ID}-${VARIATION}`, 'sticky-change-shade-clicked');
    });



    // Stick header on scroll
    /**
     * Get distance of user scroll
     * @returns {number}
     */
    const getScrollDistance = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    /**
     * Define waypoint for when header should stuck
     * @returns {number}
     */
    const getWaypoint = () => {
      let value;

      const header = $(`.${ID}_wrapper`).position();
      value = header.top + 400; // Add 200 to start after element scrolled a little bit.

      const marketingText = document.querySelector('#MarketingTextBar');
      if (marketingText) {
        value -= marketingText.offsetHeight;
      }

      return value;
    };
    waypoint = getWaypoint();

    const headerControls = {
      stick: () => {
        headerStuck = true;
        component.classList.add(`${name}--fixed`);
      },
      unstick: () => {
        headerStuck = false;
        component.classList.remove(`${name}--fixed`);
        component.style.top = '';
      },
    };

    /**
     * Fixes header to top of document if scrolled beyond waypoint
     */
    const stickHeaderOnScroll = throttle(() => {
      if (getScrollDistance() >= waypoint) {
        if (!headerStuck) {
          headerControls.stick();
        }
      } else if (headerStuck) {
        headerControls.unstick();
      }
    }, 100);
    window.addEventListener('scroll', stickHeaderOnScroll);
  }

  render() {
    const {
      component
    } = this;

    const header = document.querySelector('#HeaderPlaceholder');
    if (window.innerWidth <= 768) {
      document.body.insertAdjacentElement('afterbegin', component);
    } else {
      header.insertAdjacentElement('afterend', component);
    }
  }
}
