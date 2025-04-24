import { setup } from './services';
import { events } from '../../../../../lib/utils';
import navigationData from './navigationlinks';
import settings from './settings';

/**
 * {{PD033}} - {{Browse By Body Part}}
 */

const Run = () => {
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const renderLocation = docVar.getElementById('content');

      return {
        docVar,
        bodyVar,
        renderLocation,
      };
    })(),
    init: () => {
      setup();
      Exp.render.markupContainer();
    },
    render: {
      markupContainer() {
        Exp.cache.renderLocation.insertAdjacentHTML('afterbegin', `
          <div class="PD033_Container">
            <h2 class="PD033_Header">browse by area</h2>
            <div class="PD033_Navigation_Container PD033_Area_1">
            </div>
            <div class="PD033_Navigation_Container PD033_Area_2">
            </div>
            <div class="PD033_Navigation_Container PD033_Area_3">
            </div>
            <img class="PD033_Image" alt="Browse by body area" src="//cdn-sitegainer.com/lmx89ltqwbplasz.png" />
          </div>
        `);
        const area1 = Exp.cache.bodyVar.querySelector('.PD033_Area_1');
        const area2 = Exp.cache.bodyVar.querySelector('.PD033_Area_2');
        const area3 = Exp.cache.bodyVar.querySelector('.PD033_Area_3');
        this.navMarkup(area1, 0, 2);
        this.navMarkup(area2, 3, 5);
        this.navMarkup(area3, 6, 7);
      },
      navMarkup: (navContainer, startIndex, endIndex) => {
        let markupCollector = '';
        // Loop over the required content for the div container
        for (let i = startIndex; i <= endIndex; i += 1) {
          const currentObject = navigationData[i];
          markupCollector += `
          <div class="PD033_Navigation_Area PD033_Navigation_Area_${i}">
            <span class="PD033_Navigation_Header">${currentObject.category}</span>
            <div class="PD033_Navigation_Link_Container">
          `;
          // Iterate over data for current object
          for (let j = 0, n = currentObject.data.length; j < n; j += 1) {
            markupCollector += `
            <a class="PD033_Navigation_Link" href="${currentObject.links[j]}">${currentObject.data[j]}</a>
            `;
          }
          // Close markup
          markupCollector += `
              </div>
            </div>
          `;
        }
        navContainer.insertAdjacentHTML('afterbegin', markupCollector);
        // Add tracking
        Exp.cache.bodyVar.querySelector('.PD033_Container').addEventListener('click', (e) => {
          const clickedElement = e.target;
          if (clickedElement.classList.contains('PD033_Navigation_Link')) {
            // Send event
            events.send(`${settings.ID}`, 'Clicked', clickedElement.textContent.trim(), { sendOnce: true });
          }
        });
      },
    },
  };

  Exp.init();
};

export default Run;
