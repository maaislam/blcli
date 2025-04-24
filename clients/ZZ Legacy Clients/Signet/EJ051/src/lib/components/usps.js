import shared from "../shared";
import { events } from "../../../../../../lib/utils";


const { ID, VARIATION } = shared;

export default class BasketUSPs {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {

    const element = document.createElement('div');
    element.classList.add(`${ID}_basket_usps`);
    element.innerHTML = `
     <div class="${ID}-usp ${ID}-delivery" side-target="${ID}-delivery">
      <span class="${ID}-icon"></span>
      <p><span>Free</span> Delivery*</p>
     </div>
     <div class="${ID}-usp ${ID}-return" side-target="${ID}-return">
      <span class="${ID}-icon"></span>
      <p><span>Free</span> Returns</p>
     </div>
     <div class="${ID}-usp ${ID}-exchange" side-target="${ID}-exchange">
      <span class="${ID}-icon"></span>
      <p><span>Free</span> Exchange</p>
     </div>
    `;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
    const allUsps = component.querySelectorAll(`.${ID}-usp`);

    const overlay = document.querySelector(`.${ID}_overlay`);

    for (let index = 0; index < allUsps.length; index += 1) {
      const element = allUsps[index];

      const slideOutWrapper = document.querySelector(`.${ID}_slideOutWrapper`);

      // on click of each usp, trigger the slide out box
      element.addEventListener('click', (e) => {
        document.documentElement.classList.add(`${ID}_Lightbox__noScroll`);
        document.body.classList.add(`${ID}_Lightbox__noScroll`);

        slideOutWrapper.classList.add(`${ID}-sideBox_show`);

        const targetEl = e.currentTarget.getAttribute('side-target');
        const matchingElm = slideOutWrapper.querySelector(`#${targetEl}`);

        const uspName = e.currentTarget.querySelector('p').textContent;
        events.send(`${ID} v${VARIATION}`, 'Click', `Info box: ${uspName}`);

        overlay.classList.add(`${ID}-overlay_active`);

        // remove any that are currently showing
        const allUspContent = slideOutWrapper.querySelectorAll(`.${ID}-slideOut_inner`);
        for (let index = 0; index < allUspContent.length; index += 1) {
          const slideOutBlock = allUspContent[index];
          if(slideOutBlock.classList.contains(`${ID}-inner_show`)) {
            slideOutBlock.classList.remove(`${ID}-inner_show`);
          }
        }
        // make the matching content active
        matchingElm.classList.add(`${ID}-inner_show`);
      });
    }

    // close the slide out box
    const allSections = document.querySelectorAll(`.${ID}-slideOut_inner`);
    const slideOutModal = document.querySelector(`.${ID}_slideOutWrapper`);

    for (let index = 0; index < allSections.length; index += 1) {
      const element = allSections[index];

      element.querySelector(`.${ID}-slide_outClose`).addEventListener('click', () => {
          slideOutModal.classList.remove(`${ID}-sideBox_show`);
          slideOutModal.querySelector(`.${ID}-inner_show`).classList.remove(`${ID}-inner_show`);
          overlay.classList.remove(`${ID}-overlay_active`);
          document.documentElement.classList.remove(`${ID}_Lightbox__noScroll`);
          document.body.classList.remove(`${ID}_Lightbox__noScroll`);
      });

      // overlay event
      overlay.addEventListener('click', () => {
        slideOutModal.classList.remove(`${ID}-sideBox_show`);
        slideOutModal.querySelector(`.${ID}-inner_show`).classList.remove(`${ID}-inner_show`);
        overlay.classList.remove(`${ID}-overlay_active`);
        document.documentElement.classList.remove(`${ID}_Lightbox__noScroll`);
        document.body.classList.remove(`${ID}_Lightbox__noScroll`);
      });
    }
  }

  render() {
    const { component } = this;
    document.querySelector('.container section').insertAdjacentElement('beforebegin', component);
  }
}

