import settings from '../../settings';
import { __ } from '../../../helpers';

const { ID } = settings;

export default class StickyTab {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_stickyTab`);

    if (window.outerWidth < 767) {
      if (settings.VARIATION === '1') {
        element.innerHTML = `<p>${__('Make the right choice <br>with a free product consultation')}</p>`;
      } else {
        element.innerHTML = `<p>${__('Free product consultation')}</p>`;
      }
    } else {
      element.innerHTML = `<p>${__('Free product consultation')}</p>`;
    }

    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const mainContent = document.querySelector('.content-container');
    mainContent.appendChild(component);

    if (window.outerWidth < 767) {
      if (settings.VARIATION === '1') {
        setTimeout(() => {
          component.classList.add(`${ID}-tab_show`);
          let belowFold;
          // if homepage
          if (document.body.classList.contains('cms-home')) {
            belowFold = document.querySelector('.container-fluid.homepage_slider');
          } else {
            belowFold = document.querySelector('.content-container');
          }

          window.onscroll = () => {
            const navOffset = (belowFold.getBoundingClientRect().y + window.scrollY);
            const scrollTop = (document.documentElement && document.documentElement.scrollTop)
            || document.body.scrollTop;
            if (scrollTop >= navOffset) {
              component.classList.add(`${ID}-nav_fixed`);
            } else {
              component.classList.remove(`${ID}-nav_fixed`);
            }
          };
        }, 15000);
      }
    }
  }
}
