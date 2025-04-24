import settings from '../../lib/settings';
import { events, viewabilityTracker } from '../../../../../../lib/utils';

const { ID } = settings;
events.analyticsReference = '_gaUAT';

export default class ProductZoom {
  constructor(options) {
    const opts = options || {};
    this.injectInto = opts.injectInto;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const generateBlock = (link, index) => `
      <div class="${ID}_prodZoom__itemWrap">
        <div class="${ID}_prodZoom__item">
          <img class="${ID}_prodZoom__itemImg" id="zoom_0${index}" data-zoom-image="${link}" src="${link}" alt="Product Image">
        </div>
      </div>
      <!--end item-->
    `;
    const element = document.createElement('div');
    element.classList.add(`${ID}_prodZoomWrap`);
    const links = document.querySelectorAll('#piThumbList li a');
    let items = '';
    for (let i = 0; i < links.length; i += 1) {
      const link = links[i].href;
      items += generateBlock(link, i);
    }
    element.innerHTML = `
      <input type="checkbox" id="toggleImages" name="toggleImages">
      <div class="${ID}_prodZoom">
        ${items}
      </div>
      <label for="toggleImages" class="${ID}_prodZoom__button"></label>
    `;
    this.component = element;
  }

  bindEvents() {
    const images = this.component.querySelectorAll(`.${ID}_prodZoom__itemImg`);
    Array.from(images).forEach((image, i) => {
      viewabilityTracker(image, () => {
        events.send(ID, 'User saw', `image ${i}`);
      }, { removeOnView: true });
    });
  }

  render() {
    document.querySelector(this.injectInto).insertAdjacentElement('afterbegin', this.component);
  }
}
