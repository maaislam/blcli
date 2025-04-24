import settings from '../../lib/settings';
import {
  categories,
  categoriesMap,
  defaultCategories,
  defaultProducts,
} from '../data/data';
import {
  getUserData,
  generateProduct,
  generateCategoryName,
} from '../../lib/services';
import {
  events
} from '../../../../../../lib/utils';

const {
  ID,
  VARIATION
} = settings;

export default class SliderBanner {
  /**
   * @param {object} options
   * @param {function} options.render Function to render component
   */
  constructor(options) {
    const opts = options || {};
    this.create();
    this.bindEvents();
    if (opts.render) opts.render(this.component);
  }

  create() {
    const countryCode = document.querySelector('html').getAttribute('lang').toUpperCase();
    let data = [];
    let shopNow;
    switch (countryCode) {
      case 'EN':
        data = {
          title: 'New',
          excerpt: 'All our latest products come with first-class service as standard.',
          category: 'New in: ',
          button: 'See all New Products',
        };
        shopNow = 'Shop now';
        break;
      case 'DE':
        data = {
          title: 'Neu',
          excerpt: 'Alle unsere neuesten Produkte werden mit dem üblichen erstklassigem Service geliefert.',
          category: 'Neu in: ',
          button: 'Alle Neuheiten',
        };
        shopNow = 'Jetzt kaufen';
        break;
      case 'CH':
        data = {
          title: 'Neu',
          excerpt: 'Alle unsere neuesten Produkte werden mit dem üblichen erstklassigem Service geliefert.',
          category: 'Neu in: ',
          button: 'Alle Neuheiten',
        };
        shopNow = 'Jetzt kaufen';
        break;
      case 'FR':
        data = {
          title: 'Nouveau',
          excerpt: 'Tous nos produits offrent une qualité de service irréprochable par défaut.',
          category: 'Nouveautés de: ',
          button: 'Voir tous les nouveaux produits',
        };
        shopNow = 'Commander dès maintenant';
        break;
      case 'SV':
        data = {
          title: 'Ny',
          excerpt: 'Alla våra senaste produkter har som standard högsta service.',
          category: 'Nyheter inom: ',
          button: 'Se alla nya produkter',
        };
        shopNow = 'Köp nu';
        break;
      default:
        break;
    }
    const USER_DATA = getUserData();
    const element = document.createElement('div');
    element.classList.add(`${ID}_sliderWrap`);
    let sliderText = '';
    sliderText += `
      <div class="${ID}_slider__textWrap">
        <div class="${ID}_slider__text">
          <h3 class="${ID}_slider__title">${data.title}</h3>
          <p class="${ID}_slider__excerpt">${data.excerpt}</p>
          <span class="${ID}_slider__category">${data.category}<span></span></span>
          <div class="${ID}_slider__buttonWrap">
            <a href="/new-products/cms/new" class="${ID}_slider__button">${data.button}</a>
          </div>
        </div>
      </div>
    `;
    let html = `
    <div class="${ID}_slider">
      ${sliderText}
      <div class="${ID}_slider__tabWrap">
        <div class="${ID}_slider__tab">
          <div class="${ID}_slider__tabHeader">
            <ul class="${ID}_slider__tabHeader--list">`;
            let area;
            let areaLabel;
            if(JSON.parse(localStorage.getItem('DS003'))){
              area = JSON.parse(localStorage.getItem('DS003'));
              areaLabel = area.areaofuse;;
            } else {
              area = '(Other) Research';
              areaLabel = area;
            }
            const subCategories = categoriesMap[areaLabel];
            let index = 0;
            for (let i = 0; i < subCategories.length; i += 1) {
              const cleanCat = subCategories[i].name.replace(/[&\s]/g, '').replace(',', '');
              const defCats = Object.keys(defaultProducts);
              if (defCats.indexOf(subCategories[i].name) > -1) {
                index += 1;
                html += generateCategoryName(countryCode, subCategories[i], cleanCat, index);
              }
            }
  html += `
            </ul>
    </div>
    <div class="${ID}_slider__tabBodyWrap">
      <div class="${ID}_slider__tabBody">
        <div class="${ID}_slider__tabBody--item">
          <ul class="${ID}_slider__tabBody--list">
  `;
  for (let i = 0; i < subCategories.length; i += 1) {
    const cleanCat = subCategories[i].name.replace(/[&\s]/g, '');
    const defCats = Object.keys(defaultProducts);
    if (defCats.indexOf(subCategories[i].name) > -1) {
      const defElements = subCategories[i].products;
      for (let y = 0; y < defElements.length; y += 1) {
        html += `
          <li class="${ID}_slider__tabBody--listItemWrap">
            <div class="${ID}_slider__tabBody--listItem">
              ${generateProduct(countryCode, defElements[y], shopNow)}
            </div>
          </li>
      `;
      }
    }
  }
  html += `
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  element.innerHTML = html;
    this.component = element;
  }

  bindEvents() {
    /*
     * Change the category name in -> "New in: {data-categoryName}"
     * and the background color of the slider
     */
    //this.component.addEventListener('click', (e) => {
      /*-------------------------------------------
      * Set the category name for the element New in: {data-categoryName}
      --------------------------------------------*/
      //const categorySwitch = this.component.querySelector(`.${ID}_slider__category span`);
      //if (categoryName != null) {
        //categorySwitch.setAttribute('data-category', categoryName);
      //}
    //});

    const shopNowButton = this.component.querySelectorAll(`.${ID}_slider__tabBody--listItem__button`);
    if (shopNowButton) {
      [].forEach.call(shopNowButton, function(button){
        button.addEventListener('click', () => {
          events.send(ID, 'User clicked', `new-in-product - Variation ${VARIATION}`);
        });
      });
    }
  }
}
