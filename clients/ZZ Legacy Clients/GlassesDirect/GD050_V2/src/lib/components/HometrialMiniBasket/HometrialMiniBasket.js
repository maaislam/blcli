import settings from '../../settings';
import Lightbox from '../../../../../../../lib/components/Lightbox/Lightbox';

const { ID } = settings;

export default class HometrialMiniBasket {
  constructor() {
    this.name = `${ID}_HometrialMiniBasket`;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const { name } = this;

    // Lightbox Component
    const lightbox = new Lightbox(ID, {
      content: `
        <div class="${name}">
          Lightbox
        </div>
      `,
      closeOnClick: true,
    });

    if (!window.mobileSite) {
      lightbox.cache.component.classList.add(`${ID}_Lightbox--mobile`);
    }

    this.lightbox = lightbox;
    this.component = lightbox.cache.component;
  }

  bindEvents() {
    const { open, close } = this;
  }

  render() {
    const { component } = this;
    const banner = document.querySelector('#hero-banner');
    banner.insertAdjacentElement('afterend', component);
  }

  /** Open minibasket */
  open() {
    const { component } = this;
  }

  /** Close minibasket */
  close() {
    const { component } = this;
  }
}
