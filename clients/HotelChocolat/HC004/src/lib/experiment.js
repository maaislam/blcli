/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import menuData from './data';

/**
 * Menu data to html
 */
const menuToHtml = (data) => {

  let html = `<ul class="${shared.ID}-menu" id="main-navigation">`;
  data.forEach(topLevel => {
    const name = topLevel.name;
    const link = topLevel.link;
    const cats = topLevel.cats;

    html += `
      <li class="top-level ${cats && cats.length ? `has-sub-menu` : ``}">
        <a class="${shared.ID}-menu__toplevel" 
          href="${link}"><span>${name}</span></a>
    `;

    if((cats && cats.length ) || (topLevel.promotions && topLevel.promotions.length)) {
      html += `<div class="content-asset">`;
        html += `<ul class="sub-level">`;

        if(cats) {
          cats.forEach(cat => {
            const name = cat.name;
            const links = cat.links;

            if(links.length) {
              html += `<li class="${shared.ID}-menu__catname sub-level-item ${
                topLevel.spaceLinksMore ? 'xmorespace' : ''
              }"
              >
                <span>${name}</span>`;

              html += `<div class="sub-level-content">`;
                html += `<ul class="">`;

              links.forEach(link => {
                html += `
                  <li class="${link.all ? `${shared.ID}-all-link` : ''}">
                    <a class="${shared.ID}-menu__catlink" href="${link.link}"
                      >${link.all ? `<span>` : ''}${link.name}${link.all ? `</span>` : ''}</a>
                  </li>
                `;
              });

                html += `</ul>`;
              html += `</div>`;

              html += '</li>';
            }
          });
        }

        if(topLevel.promotions) {
          topLevel.promotions.forEach(promo => {
            html += `<li class="${shared.ID}-menu__catname sub-level-item ${shared.ID}-menu__promo ${
              topLevel.spaceLinksMore ? 'xmorespace' : ''
            }">`;

            html += `
              <div>
                <a href="${promo.link}">
                  <img src="${promo.image}">
                  <span>${promo.text}</span>
                </a>
              </div>
            `;

            html += '</li>';
          });
        }

        html += `</ul>`;
      html += `</div>`;
    }

    html += '</li>';
  });

  return `
    <div class="${shared.ID}-nav hlp-centered-wrapper">
      ${html}
    </div>
  `;
};

/**
 * Entry point for experiment
 */
export default () => {
  const { ID, VARIATION } = shared;

  setup();
  
  // Data
  const navigation = document.querySelector('#navigation');
  if(navigation) {
    console.log('x');
    navigation.insertAdjacentHTML('afterbegin', menuToHtml(menuData));

    // ------------------------
    // Event tracking
    // ------------------------
    const topLevelLinks = document.querySelectorAll(`.${ID}-menu__toplevel`);
    [].forEach.call(topLevelLinks, (link) => {
      link.addEventListener('click', () => {
        events.send(`Main Navigation`, 'Top Level');
      });
    });

    const catLinks = document.querySelectorAll(`.${ID}-menu__catlink`);
    [].forEach.call(catLinks, (link) => {
      link.addEventListener('click', () => {
        events.send(`Main Navigation`, 'Product Level', link.innerText.trim());
      });
    });

    const promoLinks = document.querySelectorAll(`.${ID}-menu__promo a`);
    [].forEach.call(promoLinks, (link) => {
      link.addEventListener('click', () => {
        events.send(`Main Navigation`, 'Product Level - Image', link.innerText.trim());
      });
    });
  }
};
