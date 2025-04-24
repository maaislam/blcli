/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, events } from "../../../../../lib/utils";
import shared from "./shared";

const runChanges = () => {
  const categoryInfo = document.querySelector('.categoryinfo');
  if (categoryInfo) {
    const markup = `
      <div class="${shared.ID}__gift">
        <a class="${shared.ID}__gift__item1" href="https://www.wolfandbadger.com/uk/category/gifts/gifts-under-50/">
          <p class="${shared.ID}__gift__text">GIFTS UNDER £50</p>
        </a>
        <a class="${shared.ID}__gift__item2" href="https://www.wolfandbadger.com/uk/category/gifts/gifts-under-75/ ">
          <p class="${shared.ID}__gift__text">GIFTS UNDER £75</p>
        </a>
        <a class="${shared.ID}__gift__item3" href="https://www.wolfandbadger.com/uk/category/gifts/gifts-under-100/ ">
          <p class="${shared.ID}__gift__text">GIFTS UNDER £100</p>
        </a>
      </div>
    `;
    categoryInfo.insertAdjacentHTML('afterend', markup);

    const item1 = document.querySelector(`.${shared.ID}__gift__item1`);
    if (item1) {
      item1.addEventListener('click', () => {
        events.send(`${shared.ID}`, 'click-gifts-50')
      })
    }
    const item2 = document.querySelector(`.${shared.ID}__gift__item2`);
    if (item2) {
      item2.addEventListener('click', () => {
        events.send(`${shared.ID}`, 'click-gifts-75')
      })
    }
    const item3 = document.querySelector(`.${shared.ID}__gift__item3`);
    if (item3) {
      item3.addEventListener('click', () => {
        events.send(`${shared.ID}`, 'click-gifts-100')
      })
    }
  }
}

export default () => {
  const init = () => {
    setup();
    runChanges();
  }

  init();
  // Write experiment code here
};
