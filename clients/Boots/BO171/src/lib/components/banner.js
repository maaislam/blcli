import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { testType } from "../helpers";

const { ID, VARIATION} = shared;
const type = testType('stargift');

export default class MainBanner {
  
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {

      const element = document.createElement('div');
      element.classList.add(`${ID}_banner`);
      element.classList.add(`${ID}-${type.name}`);
      element.setAttribute('style', `background-image: url(${type.carouselbg})`);

    element.innerHTML = `
    <a class="main" href="${type.url}"></a>
    <div class="${ID}-container">
      ${type.name === 'threeTwo' ? `
        <div class="${ID}-threeText">
          <div class="${ID}-textLabel">
              <h3>3</h3>
              <span>for</span>
              <h3>2</h3>
          </div>
          <h4>MIX & MATCH</h4>
        </div>` : `<div class="${ID}-titleImage" style="background-image: url(${type.v2BannerTitle})"></div>`}
        <div class="${ID}-innerText">
          ${VARIATION == '2' ? `${type.v2BannerText}` : `${type.v3Text}`}</div>
          <a href="${type.url}" class="${ID}-shopCTA ${ID}-${type.name}">Shop Now</a>
        </div>`;
      
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      const bannerClickMain = component.querySelector('.main');
      bannerClickMain.addEventListener('click', () => {
        console.log('click')
          fireEvent('Clicked banner ' + type.name);
      })

      const bannerShop = component.querySelector(`.${ID}-shopCTA`);
      bannerShop.addEventListener('click', () => {
          fireEvent('Clicked banner ' + type.name);
      })
    }
  
    render() {
      const { component } = this;
      document.querySelector('.oct-grid__row.oct-grid__row--full-width .oct-grid.oct-aem-grid .oct-grid__row.oct-grid__row--full-width').insertAdjacentElement('afterend', component); 
    }

  }