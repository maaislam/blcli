import settings from '../../lib/settings';
import { events } from '../../../../../../lib/utils';

const { ID } = settings;

export default class ViewTypes {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_viewTypes`);

    element.innerHTML = `
      <span>View: </span>
      <div class="${ID}-view ${ID}-listView" view-target="listView"></div>
      <div class="${ID}-view ${ID}-columnView" view-target="columnView"></div>
      <div class="${ID}-view ${ID}-largeView" view-target="largeView"></div>
    `;

    this.component = element;
  }

  bindEvents() {
    const { component } = this;

    const productContainer = document.querySelector('#list');


    // set one based on the local storage
    if (localStorage.getItem(`${ID}-view`)) {
      const view = localStorage.getItem(`${ID}-view`);
      component.querySelector(`.${ID}-${view}`).classList.add(`${ID}-view-active`);
      productContainer.setAttribute('view-style', `${ID}-${view}`);
    } else {
      // make the first one active on page load and show the list view
      component.querySelector(`.${ID}-listView`).classList.add(`${ID}-view-active`);
      productContainer.setAttribute('view-style', `${ID}-listView`);
    }

    const viewTypes = component.querySelectorAll(`.${ID}-view`);
    for (let index = 0; index < viewTypes.length; index += 1) {
      const element = viewTypes[index];

      element.addEventListener('click', (e) => {

        // remove any that are active
        [].forEach.call(document.querySelectorAll(`.${ID}-view`), (item) => {
          item.classList.remove(`${ID}-view-active`);
        });

        // make the one clicked active
        e.currentTarget.classList.add(`${ID}-view-active`);

        // add attribute to the list view
        const listStyleSelected = e.currentTarget.getAttribute('view-target');

        events.send(`${ID} v${settings.VARIATION}`, 'view click', `${listStyleSelected}`);

        productContainer.setAttribute('view-style', `${ID}-${listStyleSelected}`);

        localStorage.setItem(`${ID}-view`, listStyleSelected);
      });
    }
  }

  render() {
    const { component } = this;
    const itemsShowing = document.querySelector('.browse__results-and-sort-container');
    itemsShowing.insertAdjacentElement('afterend', component);
  }
}
