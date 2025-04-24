import settings from '../../lib/settings';
import { pollerLite } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default class MobileHeaderNav {
  constructor(options) {
    this.navData = options.navLinks;
    this.create();
    this.bindEvents();
    this.render();
    this.initSlider();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_headerNav`);

    element.innerHTML = `
      <div class="${ID}_headerNav-inner">
      ${Array.prototype.map.call(this.navData, (navData, i) => `
        <div class="${ID}-navLink"><span style="background-image: url(${navData.icon})"></span><a href="${navData.link}">${navData.title}</a></div>
      `).join('')}
      </div>`;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const header = document.querySelector('.header__container');
    header.insertAdjacentElement('afterend', component);
  }

  initSlider() {
    const { component } = this;
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
      pollerLite([`.${ID}_headerNav-inner`, () => !!jQuery.fn.slick], () => {
        jQuery(`.${ID}_headerNav-inner`).slick({
          centerMode: false,
          variableWidth: true,
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        });
      });
    });
  }
}
