import { setup } from './services';
import settings from './settings';
import { events } from '../../../../../../../../lib/utils';

/**
 * {{GD040}} - {{Push towards Size interaction - Navigation}}
 */

const Run = () => {
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const allNavImgHeaders = bodyVar.querySelectorAll('.GD017_img-block label');
      const allNavImgSubText = bodyVar.querySelectorAll('.GD017_img-block > span');
      const renderLocations = bodyVar.querySelectorAll('.GD017_male-wrap .GD017_img-wrap');
      const maleLinks = [
        { size: 'Smaller Frames', link: '/gender/male/framesize/s/' },
        { size: 'Medium Frames', link: '/gender/male/framesize/m/' },
        { size: 'Larger Frames', link: '/gender/male/framesize/l/' },
      ];
      const femaleLinks = [
        { size: 'Smaller Frames', link: '/gender/female/framesize/s/' },
        { size: 'Medium Frames', link: '/gender/female/framesize/m/' },
        { size: 'Larger Frames', link: '/gender/female/framesize/l/' },
      ];
      const glassesIcon = `
      <svg class="GD040_Glasses_Icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" width="512px" height="512px">
        <path d="M59,28h-2.18c-0.951-5.666-5.85-10-11.748-10c-5.822,0-10.696,4.119-11.825,9.579c-0.971-0.814-2.079-1.246-3.247-1.246  c-1.167,0-2.274,0.432-3.245,1.245C25.639,22.118,20.825,18,15.072,18C8.756,18,3.565,22.851,3.051,29H1c-0.553,0-1,0.448-1,1  s0.447,1,1,1h2.051c0.514,6.149,5.705,11,12.021,11c6.467,0,11.736-5.207,11.911-11.671c0.853-1.285,1.915-1.996,3.017-1.996  c1.102,0,2.164,0.712,3.017,1.996C33.195,36.793,38.528,42,45.072,42C51.649,42,57,36.617,57,30h2c0.553,0,1-0.448,1-1  S59.553,28,59,28z M15.072,40C9.519,40,5,35.514,5,30s4.519-10,10.072-10C20.64,20,25,24.393,25,30S20.64,40,15.072,40z M45.072,40  C39.519,40,35,35.514,35,30s4.519-10,10.072-10C50.64,20,55,24.393,55,30S50.64,40,45.072,40z" fill="#FFFFFF"/>
      </svg>`;
      return {
        docVar,
        bodyVar,
        allNavImgHeaders,
        allNavImgSubText,
        renderLocations,
        maleLinks,
        femaleLinks,
        glassesIcon,
      };
    })(),
    init: () => {
      setup();
      const { render } = Exp;
      render.rearrangeElements();
      // Render navigation content for male and female navigation containers
      render.sizeLinks(Exp.cache.renderLocations[0], Exp.cache.maleLinks);
      render.sizeLinks(Exp.cache.renderLocations[1], Exp.cache.femaleLinks);
      // Bind GA tracking
      Exp.bindExperimentEvents.addTracking();
    },
    render: {
      /**
       * @desc Rearranges the content of GD017, moves offer text under offer title
       */
      rearrangeElements: () => {
        for (let i = 0, n = Exp.cache.allNavImgHeaders.length; i < n; i += 1) {
          const currentLink = Exp.cache.allNavImgHeaders[i].parentNode;
          currentLink.insertAdjacentHTML('beforeend', `
            <div class="GD040_Offer_Text_Container">
            </div>
          `);
          const currentContainer = currentLink.querySelector('.GD040_Offer_Text_Container');
          currentContainer.insertAdjacentElement('beforeend', Exp.cache.allNavImgHeaders[i]);
          currentContainer.insertAdjacentElement('beforeend', Exp.cache.allNavImgSubText[i]);
        }
      },
      /**
       * @desc Renders size link area
       * @param {DOM element} renderLocation - Location to add size links
       * @param {Object} sizeData - Object containing links and text for frames
       */
      sizeLinks: (renderLocation, sizeData) => {
        let markup = `
          <div class="GD040_Size_Container">
            <span class="GD040_Size_Header">Shop by size</span>
        `;
        for (let i = 0, n = sizeData.length; i < n; i += 1) {
          markup += `
            <a class="GD040_Size_Link" href="${sizeData[i].link}">
              <span class="GD040_Size_Option">${sizeData[i].size}</span>
              ${Exp.cache.glassesIcon}
            </a>
          `;
        }
        markup += `
            <span class="GD040_WG_Header">Wearing Glasses?</span>
            <span class="GD040_Size_Text">Search based on the size of your current glasses</span>
            <a class="GD040_Best_Fit_Link" href="/best-fit/">Best Fit machine</a>
          </div>
        `;
        renderLocation.insertAdjacentHTML('afterend', markup);
      },
    },
    bindExperimentEvents: {
      /**
       * @desc Adds tracking to sizing and best fit machine links
       */
      addTracking: () => {
        // Track size sizing links
        const allSizeButtons = Exp.cache.bodyVar.querySelectorAll('.GD040_Size_Link');
        for (let i = 0, n = allSizeButtons.length; i < n; i += 1) {
          allSizeButtons[i].addEventListener('click', (e) => {
            events.send(`${settings.ID}`, 'Clicked', `${e.target.textContent.trim()}`, { sendOnce: true });
          });
        }
        // Track best fit machine links
        const allBestFit = Exp.cache.bodyVar.querySelectorAll('.GD040_Best_Fit_Link');
        allBestFit[0].addEventListener('click', () => {
          events.send(`${settings.ID}`, 'Clicked', 'Best fit machine', { sendOnce: true });
        });
        allBestFit[1].addEventListener('click', () => {
          events.send(`${settings.ID}`, 'Clicked', 'Best fit machine', { sendOnce: true });
        });
        // Hover tracking
        const navItems = Exp.cache.bodyVar.querySelectorAll('#nav-primary-inner .item-level-1');
        Array.prototype.forEach.call(navItems, (el) => {
          el.addEventListener('mouseover', () => {
            events.send(`${settings.ID}`, 'Hovered', 'Navigation', { sendOnce: true });
          });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
