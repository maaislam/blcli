import settings from '../../lib/settings';
import { pollerLite, poller } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default class HeroBanner {
  constructor(options) {
    this.slideData = options.slides;
    this.create();
    this.bindEvents();
    this.render();
    this.initSlider();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_HeroBanner`);

    /* Hide all secondary slides by default to prevent "flicker" as
      flickity slider loads in */
    element.innerHTML = `
      <div class="${ID}_HeroBanner-slides">
        ${Array.prototype.map.call(this.slideData, (slideData, i) => `
          <div class="${ID}_HeroBanner-slide"${i > 0 ? ' style="display: none;"' : ''}>
            <a href="${slideData.link}">
              <img class="${ID}_HeroBanner-slideImg" src="${slideData.img}" />
              <div class="${ID}_HeroBanner-content">
                <div class="${ID}_HeroBanner-slideTitle">${slideData.title}</div>
                <div class="${ID}_HeroBanner-slideDesc">${slideData.desc}</div>
                <div class="${ID}_HeroBanner-slideCta">${slideData.ctaText}</div>
              </div>
              <div class="${ID}_HeroBanner-slideGradient"></div>
            </a>
          </div>
        `).join('')}
      </div>
      <div class="${ID}_HeroBanner-background"></div>
    `;

    // Move "As Seen In" bar inside this component
    pollerLite(['.asSeeninimage-bar'], () => {
      const asSeenInBar = document.querySelector('.asSeeninimage-bar');
      element.querySelector(`.${ID}_HeroBanner-slides`).insertAdjacentElement('afterend', asSeenInBar);
    });

    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const headerWrap = document.querySelector('.header-wrapper');
    headerWrap.insertAdjacentElement('afterend', component);
  }

  /** Run slider plugin */
  initSlider() {
    const { component } = this;
    const slides = component.querySelectorAll(`.${ID}_HeroBanner-slide`);
    if (slides.length > 1) {
      // Run Flickity Slider if more than 1 banner
      pollerLite([
        () => {
          try {
            return typeof window.Flickity === 'function';
          } catch (e) {}
        },
      ], () => {
        // Flickity slider exists
        setTimeout(() => {
          // Show all secondary slides before slider init
          Array.prototype.forEach.call(slides, (el) => {
            const isHidden = el.style.display === 'none';
            if (isHidden) el.style.display = '';
          });
          const flickity = new Flickity(component.querySelector(`.${ID}_HeroBanner-slides`));
        }, 800);
      });
    }
  }
}
