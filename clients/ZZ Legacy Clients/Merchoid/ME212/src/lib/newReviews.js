import settings from './settings';
import { pollerLite } from '../../../../../lib/uc-lib';

const { ID } = settings;

export default class Reviews {
  constructor(options) {
    this.reviewData = options.review;
    this.create();
    this.render();
    this.initSlider();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_reviews_wrapper`);


    element.innerHTML = `
    ${Array.prototype.map.call(this.reviewData, (reviewData, i) => `
    <div class="${ID}_review-slide">
      <p>${reviewData.quote}</p>
      <div class="${ID}-reviewInfo">
        <div class="${ID}-reviewstars"></div>
        <div class="${ID}-reviewAuthor">- ${reviewData.author}</div>
      </div>
    </div>
    `).join('')}
  `;

    this.component = element;
  }

  render() {
    const { component } = this;
    const reviewWrap = document.querySelector('.me111-innerBanner');
    reviewWrap.insertAdjacentElement('afterbegin', component);
  }

  /** Run slider plugin */
  initSlider() {
    const { component } = this;
    // Run Flickity Slider if more than 1 banner
    pollerLite([
      () => {
        try {
          return typeof window.Flickity === 'function';
        } catch (e) {}
      },
    ], () => {
      // Flickity slider exists
      const flickity = new Flickity(document.querySelector(`.${ID}_reviews_wrapper`), {
        pageDots: false,
        wrapAround: true,
        cellSelector: `.${ID}_review-slide`,
        autoPlay: 4000,
        draggable: false,
        prevNextButtons: false,
      });
    });
  }
}
