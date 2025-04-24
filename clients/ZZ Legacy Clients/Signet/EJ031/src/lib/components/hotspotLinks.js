/**
 * @desc add the wrapper that all content will sit in
 */

import shared from "../shared";

const { ID } = shared;

export default class HotspotNav {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {

    const element = document.createElement('div');
    element.classList.add(`${ID}_hotspotNav`);
    element.innerHTML = 
    `<div class="${ID}-blur"></div>
    <div class="${ID}-navLinks">
      <ul>
          <li class="${ID}-topLink" spot-target="${ID}-watches">Watches</li>
          <li class="${ID}-topLink" spot-target="${ID}-rings">Engagement Rings</li>
          <li class="${ID}-topLink" spot-target="${ID}-jewellery">Jewellery</li>
          <li class="${ID}-topLink" spot-target="${ID}-diamonds">Diamonds</li>
      </ul>
    </div>`;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
    
    // hide all the hotspots except the first one
    const allHotspots = document.querySelectorAll(`.${ID}-section`);
    for (let index = 0; index < allHotspots.length; index += 1) {
        const element = allHotspots[index];
        element.classList.add(`${ID}-hidden_category`);
    }

    // on click of each hotspot link, hide/show the matching section

    const allLinks = component.querySelectorAll(`.${ID}-topLink`);
    for (let index = 0; index < allLinks.length; index += 1) {
        const element = allLinks[index];
        element.addEventListener('click', (e) => {

            const elTarget = e.currentTarget.getAttribute('spot-target');
            const currentEl = e.currentTarget;
            const matchingSection = document.querySelector(`.${elTarget}`);

            Array.prototype.forEach.call(document.querySelectorAll(`.${ID}-section`), (section) => {
                section.classList.add(`${ID}-hidden_category`);
            });
            Array.prototype.forEach.call(document.querySelectorAll(`.${ID}-topLink`), (link) => {
              link.classList.remove(`${ID}-hotspot_active`);
            });

            currentEl.classList.add(`${ID}-hotspot_active`);

            matchingSection.classList.remove(`${ID}-hidden_category`);

        });
    }
  }

  render() {
    const { component } = this;
    const hotspots = document.querySelector(`.${ID}_newContent`);
    hotspots.insertAdjacentElement('beforebegin', component);

    // make the first one visible
    const firstSection = document.querySelector(`.${ID}-section.${ID}-watches`);
    firstSection.classList.remove(`${ID}-hidden_category`);
    const firstHotspot = document.querySelector(`[spot-target="${ID}-watches"]`);
    firstHotspot.classList.add(`${ID}-hotspot_active`);
  }
}

