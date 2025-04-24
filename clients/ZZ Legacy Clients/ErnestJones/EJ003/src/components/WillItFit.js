/* eslint-disable no-underscore-dangle */
import settings from './../settings';
import { pollerLite } from '../../../../../lib/uc-lib';
import { eventFire, events } from '../../../../../lib/utils';
import { cacheDom } from '../../../../../lib/cache-dom';

/** Class that renders a will it fit box */
export default class WillItFit {
  /** Run triggers */
  run() {
    pollerLite([
      '.tangiblee-button',
      '#wishlist',
    ], () => {
      this._create();
      this._bindEvents();
      this._render();
    });
  }

  /** Create component element */
  _create() {
    const component = document.createElement('div');
    component.classList.add(`${settings.ID}_WillItFit`);

    // Image
    const tangibleeBtn = cacheDom.get('.tangiblee-button');
    const imageWrap = document.createElement('div');
    imageWrap.classList.add(`${settings.ID}_WillItFit__imageWrap`);
    imageWrap.innerHTML = `<img src="${tangibleeBtn.src}" />`;

    /*
     * Sometimes the src is a link rather than the image, so poll for the image
     * and replace it when availible
     */
    pollerLite([() => tangibleeBtn.src.indexOf('cdn.tangiblee.com') > -1], () => {
      imageWrap.querySelector('img').setAttribute('src', tangibleeBtn.src);
    });

    component.appendChild(imageWrap);

    // Description
    const description = document.createElement('p');
    description.classList.add(`${settings.ID}_WillItFit__desc`);
    description.innerText = 'Will this fit? Click here for more information on the size of this product';
    component.appendChild(description);

    this.component = component;
  }

  _bindEvents() {
    const tangibleeBtn = cacheDom.get('.tangiblee-button');
    if (tangibleeBtn) {
      this.component.addEventListener('click', () => {
        events.send(settings.ID, 'Click', 'Clicked Will It Fit link');
        eventFire(tangibleeBtn, 'click');
      });
    }
  }

  /** Render component elements */
  _render() {
    const wishlist = cacheDom.get('#wishlist');
    wishlist.parentElement.insertBefore(this.component, wishlist);
  }
}
