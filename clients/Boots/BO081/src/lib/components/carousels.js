import shared from "../shared";
import catData from "./carouselData";

const { ID, VARIATION } = shared;

export default () => {

    const createCarousels = () => {
        let categorydata;
        let categoryBrands;
        
        const banners = document.querySelectorAll(`.${ID}_maincategory`);

        for (let index = 0; index < banners.length; index += 1) {
            const element = banners[index];
            const categoryName = element.querySelector(`.${ID}_carousel`).getAttribute('catName');

            // define which banner to add the matching data
            if(categoryName === 'beautyskincare') {
                categorydata = catData['beautyskincare']['categories'];
                categoryBrands = catData['beautyskincare']['brands'];
            } else if(categoryName === 'healthpharmacy') {
                categorydata = catData['healthpharmacy']['categories'];
                categoryBrands = catData['healthpharmacy']['brands'];
            }

            // create the carousel category items
            Object.keys(categorydata).forEach((i) => {
                const catItem = categorydata[i];
                
                const carouselItem = document.createElement('div');
                carouselItem.classList.add(`${ID}_category`);

                if(VARIATION === '1') {
                    carouselItem.innerHTML = `
                    <div class="${ID}_categoryIcon">
                        <a href="${catItem.link}"></a>
                        <span style="background-image:url(${catItem.icon})"></span>
                        <p>${[i][0]}</p>
                    </div>`;
                } else {
                    carouselItem.innerHTML = `
                    <div class="${ID}_linkItem">
                        <a href="${catItem.link}">${[i][0]}</a>
                    </div>`;
                }
            
                element.querySelector(`.${ID}_categories`).appendChild(carouselItem);
            });

            // create the brand items
            if(VARIATION === '2') {
                Object.keys(categoryBrands).forEach((i) => {
                    const catBrand = categoryBrands[i];
                    
                    const brandItem = document.createElement('div');
                    brandItem.classList.add(`${ID}_brand`);
    
                    brandItem.innerHTML = `
                    <div class="${ID}_linkItem">
                        <a href="${catBrand.link}">${[i][0]}</a>
                    </div>`;
                
                    element.querySelector(`.${ID}_brands`).appendChild(brandItem);
                });
            }
        }
    }

    // create two offer carousels
    const mainCarousels = () => {
        const banners = document.querySelectorAll(`.${ID}_maincategory`);

        let categoryOffers;
        for (let index = 0; index < banners.length; index += 1) {
            const element = banners[index];
            const categoryName = element.getAttribute('cat-name');
            let offerData;

            // define which banner to add the matching data
            if(categoryName === 'beautyskincare') {
                categoryOffers = catData['beautyskincare'];
                offerData = catData['beautyskincare']['V4offer'];
            } else if(categoryName === 'healthpharmacy') {
                categoryOffers = catData['healthpharmacy'];
                offerData = catData['healthpharmacy']['V4offer'];
            }

            // create the carousel offers
            Object.keys(offerData).forEach((i) => {
                const catOffer = offerData[i];
                
                const carouselEl = document.createElement('div');
                carouselEl.classList.add(`${ID}-offer`);
                /*if(window.innerWidth > 767) {*/
                    carouselEl.setAttribute('style', `background-image:url(${catOffer.image})`);
               /* } else {
                    carouselEl.setAttribute('style', `background-color:${catOffer.bgColor}`);
                }*/
                carouselEl.innerHTML = 
                `<a href="${catOffer.link}"></a>
                <div class="${ID}-offerText">
                    <h3>${catOffer.heading}</h3>
                    <p>${catOffer.text}</p>
                    <a class="${ID}__button ${ID}__blue" href="${catOffer.link}">${catOffer.linkText}</a>
                    <a class="${ID}__button ${ID}__primary" href="${categoryOffers.allLink}">Shop all ${categoryOffers.name}</a>
                </div>`;
                
                element.appendChild(carouselEl);
            });
        }

    }

    const slickOuterCarousel = () => {
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


        // hide the dropdown if slide is changed
        if(shared.VARIATION === '2') {
    
            window.jQuery(`.${ID}_bannerOuter`).on("beforeChange", function (){
                const openDropdown = document.querySelector(`.${ID}_innerLinksContainer.${ID}_open`);
                const activeCat = document.querySelector(`.${ID}_categoryIcon.${ID}_show`);
                if(openDropdown && activeCat) {
                    openDropdown.classList.remove(`${ID}_open`);
                    activeCat.classList.remove(`${ID}_show`);
                }
            });
        }
    }

    const slickSmallCategories = () => {
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
        window.jQuery(`.${ID}_categoriesInner .${ID}_brands`).slick({
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


    if(VARIATION !== '4') {
        createCarousels();
    } else {
        mainCarousels();
    }
    
    if(VARIATION === '1') {
        slickOuterCarousel();
    }

    if(VARIATION !== '3' || VARIATION !=='4') {
        if(window.innerWidth >= 767) {
            slickSmallCategories();
        }
    }

    
}