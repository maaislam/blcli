import { pollerLite } from "../../../../../../lib/utils"

import shared from "../shared"
import CategoriesBar from "./carouselBar"
import getcatData from "./categoryData";

export default () => {

    const {
       ID, VARIATION 
    } = shared;
    
    // create category wrapper
    new CategoriesBar();

    /**
   * Add categories
   */
  const addCategories = () => {
    const data = getcatData();
    
    const categoryBar = document.querySelector(`.${ID}_categoriesInner`);

    if(data) {
        // loop through object
        Object.keys(data).forEach((i) => {
        const category = data[i];

        const categoryEl = document.createElement('div');
        categoryEl.classList.add(`${ID}_category`);

        if(category.link) {
            categoryEl.innerHTML = `
            <div class="${ID}_categoryIcon">
                <a href="${category.link}"></a>
                <span style="background-image:url(${category.icon})"></span>
                <p>${[i][0]}</p>
            </div>`;
        } 
        categoryBar.querySelector(`.${ID}_categories`).appendChild(categoryEl);
        });
    }
     
  }



  const mmEvents = () => {
    const allCategories = document.querySelectorAll(`.${ID}_categoryIcon`);
    for (let index = 0; index < allCategories.length; index += 1) {
      const element = allCategories[index];

      if(element.querySelector('p')){
        const regex = /[\s\&]*/gi;
        const elName = element.querySelector('p').textContent.replace(regex, '');

        element.addEventListener('click', () => {
          window.cmCreateManualLinkClickTag('/BO022?cm_sp=InteractedRoundel-_-' + [elName] + '-_-Maxymiser');
        });   
      };   
    }

    const allInnerLinks = document.querySelectorAll(`.${ID}_innerLink`);
    for (let i = 0; i < allInnerLinks.length; i += 1) {
      const catLink = allInnerLinks[i];

      if(catLink.querySelector('a')){
        const regex = /[\s\&]*/gi;
        const linkName = catLink.querySelector('a').textContent.replace(regex, '');

        catLink.querySelector('a').addEventListener('click', () => {
          window.cmCreateManualLinkClickTag('/BO022?cm_sp=InteractedRoundel-_-' + [linkName] + '-_-Maxymiser');
        });   
      }; 
      
    }
  }

  const slickCategories = () => {
    window.jQuery(`.${ID}_categories`).slick({
      slidesToShow: 7,
      centerPadding: '60px',
      infinite: true,
      arrows: true,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          }
        },
      ]
  });
  }

    // move red ribbon
    if(document.querySelector('.cu-ribbon')) {
      document.querySelector('#estore_coremedia_template_container').insertAdjacentElement('afterbegin', document.querySelector('.cu-ribbon'));
    }

    addCategories();

    
    if(window.innerWidth >= 767) {
        slickCategories();
        //pollerLite(['.slick-cloned'], () => {
        //categoryEvents();
        //});
    } else {
      //categoryEvents();
    }

   // mmEvents();
}