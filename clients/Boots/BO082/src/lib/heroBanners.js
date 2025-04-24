import catData from "../../../BO081/src/lib/components/carouselData";
import shared from "./shared";

const { ID, VARIATION } = shared;

export default class HeroBanners {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
      this.slickBanner();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}_mainBanner`);
        element.innerHTML = `
            <div class="${ID}_container">
            <div class="${ID}_bannerOuter">
                <div class="${ID}_leftCategory ${ID}_maincategory">
                    <div class="${ID}_bannerContent">
                        <div class="${ID}_textBlock">
                            <h2>Beauty & Skincare</h2>
                            <p>Our beauty haul will let you put your best face forward whilst looking & feeling great.</p>
                            <a class="${ID}__button ${ID}__primary" href="https://www.boots.com/beauty">Shop beauty & skincare</a>
                        </div>
                    </div>
                    <div class="${ID}_categoryBar ${ID}_carousel" catName="beautyskincare">
                        <div class="${ID}_categoriesInner">
                            <div class="${ID}_categories"></div>
                        </div>
                    </div>
                </div>
                <div class="${ID}_rightCategory ${ID}_maincategory">
                    <div class="${ID}_bannerContent">
                        <div class="${ID}_textBlock">
                            <h2>Health & Pharmacy</h2>
                            <p>At Boots, we've got all the products and services you need to help you keep on form.</p>
                            <a class="${ID}__button ${ID}__primary" href="https://www.boots.com/health-pharmacy">Shop health & pharmacy</a>
                        </div>
                    </div>
                    <div class="${ID}_categoryBar ${ID}_carousel" catName="healthpharmacy">
                        <div class="${ID}_categoriesInner">
                            <div class="${ID}_categories"></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        
        `;
     
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      if(document.querySelector('.oct-carousel-hero')) {
        document.querySelector('.oct-carousel-hero').parentNode.insertAdjacentElement('afterend', component);   
      }  else {
        document.querySelector('#cu_2021_pay_day').parentNode.parentNode.insertAdjacentElement('afterend', component);  
      }
    }

    slickBanner () {
        let categorydata;
            
        const banners = document.querySelectorAll(`.${ID}_maincategory`);

        for (let index = 0; index < banners.length; index += 1) {
            const element = banners[index];
            const categoryName = element.querySelector(`.${ID}_carousel`).getAttribute('catName');
        
            // define which banner to add the matching data
            if(categoryName === 'beautyskincare') {
                categorydata = catData['beautyskincare']['categories'];
            } else if(categoryName === 'healthpharmacy') {
                categorydata = catData['healthpharmacy']['categories'];
            }

            // create the carousel category items
            Object.keys(categorydata).forEach((i) => {
                const catItem = categorydata[i];
                
                const carouselItem = document.createElement('div');
                carouselItem.classList.add(`${ID}_category`);
                carouselItem.innerHTML = `
                <div class="${ID}_linkItem">
                    <a href="${catItem.link}">${[i][0]}</a>
                </div>`;
            
                element.querySelector(`.${ID}_categories`).appendChild(carouselItem);
            });
        }

        window.jQuery(`.${ID}_bannerOuter`).slick({
            slidesToShow: 1,
            infinite: false,
            arrows: true,
            draggable: false,
            swipeToSlide: false,
            swipe: false,
            swipeToSlide: false,
            draggable: false,
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: "unslick"
                },
            ]
        });

        if(window.innerWidth > 767) {
            window.jQuery(`.${ID}_categoriesInner .${ID}_categories`).slick({
                slidesToShow: 3,
                infinite: true,
                arrows: true,
                variableWidth: true,
                responsive: [
                    {
                      breakpoint: 1200,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 1008,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: "unslick"
                    }
    
                  ]
            });
        }
        
    }
  }