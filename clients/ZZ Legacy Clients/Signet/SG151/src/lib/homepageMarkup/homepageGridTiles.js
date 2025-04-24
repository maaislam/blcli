import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import catData from "../categoryData";
import { getSiteFromHostname } from "../helpers";

const { ID } = shared;

const data = catData.tileBanners;


//<a class="${ID}-button" href="${data.textBanner.link}">${data.textBanner.linkText}</a>
export default class HomePageGrid {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-gridWrapper`);
      element.innerHTML = `
        <div class="${ID}-homeTile-large">
          ${!data.largeBanner.link2 ? `<a class="${ID}-mainLink" href="${data.largeBanner.link1}"><div class="${ID}-image" style="background-image: url(${data.largeBanner.image})"></div></a>` : `<div class="${ID}-image" style="background-image: url(${data.largeBanner.image})"></div>`}
          <div class="${ID}-textBanner">
              <div class="${ID}-textContainer ${data.largeBanner.title2 ? `${ID}-twoButtons`: ''}">
                  <b>Shop</b>
                  <div class="${ID}-links">
                    <a href="${data.largeBanner.link1}">${data.largeBanner.title1}</a>
                    ${data.largeBanner.title2 ? `<a class="${ID}-secondLink" href="${data.largeBanner.link2}">${data.largeBanner.title2}</a>` : ''}
                  </div>
              </div>
          </div>
        </a>
      
        </div>
        <div class="${ID}-homeTile-small">
            <a class="${ID}-mainLink" href="${data.smallBanner1.link}">
                <div class="${ID}-image" style="background-image: url(${data.smallBanner1.image})"></div>
           
                <div class="${ID}-textBanner">
                    <div class="${ID}-textContainer">
                      <b>Shop</b>
                      <a>${data.smallBanner1.title}</a>
                    </div>
                </div>
             </a>
            
        </div>
        <div class="${ID}-homeTile-small ${ID}-last">
            <a class="${ID}-mainLink" href="${data.smallBanner2.link}">
              <div class="${ID}-image" style="background-image: url(${data.smallBanner2.image})"></div>
            
              <div class="${ID}-textBanner">
                  <div class="${ID}-textContainer">
                    <b>Shop</b>
                    <a>${data.smallBanner2.title}</a>
                  </div>
                   
              </div>
            </a>
    
        </div>
       ${getSiteFromHostname() === 'ernestjones' ? ` 
       <div class="${ID}-homeTile-full" ${data.textBanner.image ? `style="background-image:url(${data.textBanner.image})` : ''}">
            <a href="${data.textBanner.link}">
            ${!data.textBanner.image ? `<h3>${data.textBanner.title}</h3>` : ''}
            </a>
        </div>
        ` : ` 
        <div class="${ID}-homeTile-full">
          <div class="${ID}-inner">
            <a href="${data.textBanner.link}"></a>
            <h3>${data.textBanner.title}</h3>
          </div>
        </div>`}
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      const allBanners = component.querySelectorAll(`[class^="${ID}-homeTile"]`);
      for (let index = 0; index < allBanners.length; index += 1) {
        const element = allBanners[index];
        element.querySelector('a').addEventListener('click', () => {
          const elName = element.querySelector('a').textContent;
          fireEvent('Clicked Banner ' + elName);
        });
      }

    }
  
    render() {
      const { component } = this;
      document.querySelector('.home-tile-grid').insertAdjacentElement('beforebegin', component);
      
    }
  }