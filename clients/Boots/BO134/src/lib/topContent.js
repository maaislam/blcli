import shared from "./shared";

/**
 * Markup for V3
 */
export default () => {

    const { ID } = shared;

    const content = {
        categories: {
            'Beauty & skincare': {
                link: 'https://www.boots.com/beauty',
            },
            'Baby & child': {
                link: 'https://www.boots.com/baby-child',
            },
            'Offers': {
                link: 'https://www.boots.com/offers',
            },
            'Fragrance': {
                link: 'https://www.boots.com/fragrance',
            },
            'Health & pharmacy': {
                link: 'https://www.boots.com/health-pharmacy',
            },
            'Toiletries': {
                link: 'https://www.boots.com/toiletries',
            },
            'Make-up': {
                link: 'https://www.boots.com/beauty/makeup',
            },
            'No7': {
                link: 'https://www.boots.com/beauty/no7',
            },
        },
        offers: {
            offer1: {
                color: '#e8eff9',
                heading: '3 for 2',
                text: 'on selected Vitamins and Supplements',
                link: 'https://www.boots.com/sitesearch?promotionalText%5B0%5D=3+for+2+on+selected+vitamins%2C+supplements%2C+health+foods+and+complementary+medicines+-+cheapest+free',
            },
            offer2: {
                color: '#f2f2f2',
                heading: 'Save up to half price',
                text: 'on selected Fragrance',
                link: 'https://www.boots.com/fragrance/fragrance-offers/fragrance-offers-save-up-to-half-price',
            },
            offer3: {
                color: '#e8eff9',
                heading: '3 for 2',
                text: 'on selected No7 Skincare',
                link: 'https://www.boots.com/sitesearch?promotionalText%5B0%5D=3+for+2+on+No7+Age+Defying+skincare+-+cheapest+free',
            },
            offer4: {
                color: '#f2f2f2',
                heading: 'Save up to half price',
                text: ' on selected Skincare',
                link: 'https://www.boots.com/beauty/skincare/skincare-all-skincare#facet:-105049495153505883971181013211711232116111324947503211211410599101321111103211510110810199116101100321151071051109997114101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&',
            },
            offer5: {
                color: '#e8eff9',
                heading: 'Only £35, worth £79',
                text: 'on MAC limited edition Summer Vibes 6-piece Set - online only',
                link: 'https://www.boots.com/mac-summer-vibes-set-10296486',
            },
            offer6: {
                color: '#f2f2f2',
                heading: 'Better than half price',
                text: ' on Oral B iO8 Toothbrush',
                link: 'https://www.boots.com/sitesearch?searchTerm=oral%20b%20io8&promotionalText%5B0%5D=Better%2Bthan%2B1%252F2%2Bprice%2Bon%2Bselected%2Belectrical%2Bdental',
            },
        }
    }

    const data = content;


    const createMarkup = () => {
        const content = document.createElement('div');
        content.classList.add(`${ID}-topContent`);
        content.innerHTML = `
        ${window.innerWidth >= 1024 ? `
        <div class="${ID}-heroBanner">
            <div class="${ID}-left"></div>
            <div class="${ID}-middle ${ID}-ctaWrap">
                <h3>Shop Our Categories</h3>
                <div class="${ID}-buttons"></div>
            </div>
            <div class="${ID}-right"></div>
        </div>` : `
        <div class="${ID}-heroBanner">
            <div class="${ID}-bannerWrap">
                <div class="${ID}-left"></div>
                <div class="${ID}-right"></div>
            </div>
            <div class="${ID}-middle ${ID}-ctaWrap">
                <h3>Shop Our Categories</h3>
                <div class="${ID}-buttons"></div>
            </div>
        </div>`}  
        <div class="${ID}-offersWrap">
            <div class="${ID}-offerContainer">
                <h3>Our Offers</h3>
                <div class="${ID}-offers"></div>
            </div>
        </div>`;

        if(document.querySelector('.oct-carousel-hero')) {
           document.querySelector('.oct-carousel-hero').parentNode.parentNode.insertAdjacentElement('beforebegin', content);
        } else {
            document.querySelector('.oct-grid__row.oct-grid__row--full-width').parentNode.insertAdjacentElement('beforebegin', content);
        }
    }

    const addCategories = () => {
        const ctas = data.categories;
        Object.keys(ctas).forEach((i) => {
            const catEl = ctas[i];
            const category = document.createElement('a');
            category.classList.add(`${ID}-button`);
            category.setAttribute('href', catEl.link);
            category.innerHTML = `<span>${[i][0]}</span>`;

            document.querySelector(`.${ID}-ctaWrap .${ID}-buttons`).appendChild(category);
        });
    }

    const addOffers = () => {
        const offersData = data.offers;
        Object.keys(offersData).forEach((i) => {
            const offerEl = offersData[i];
            const offer = document.createElement('div');
            offer.classList.add(`${ID}-offer`);
            //offer.setAttribute('style', `background-color:${offerEl.color}`);
            offer.innerHTML = `
            <a href="${offerEl.link}">
            </div>
            <div class="${ID}-offerInfo">
                <h4>${offerEl.heading}</h4>
                <p>${offerEl.text}</p>
                <a class="${ID}-shopCta" href="${offerEl.link}">Shop now</a>
            </div>
            </a>`;

            document.querySelector(`.${ID}-offerContainer .${ID}-offers`).appendChild(offer);
        });
        
    }

    const offerCarousel = () => {
        const init = () => {
            window.jQuery(`.${ID}-offers`).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 5000,
                swipeToSlide: true,
                centerMode: true,
                centerPadding: '30px',
                cssEase: 'linear', 
                variableWidth: true,
                rows: 0,
                mobileFirst: true,
                responsive: [
                    {
                        breakpoint: 1280,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            arrows: true,
                            centerMode: false,
                            variableWidth: false,
                        }
                    },
                    {
                        breakpoint: 1023,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            centerMode: false,
                            arrows: true,
                        }
                    },
                    {
                        breakpoint: 766,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 320,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                ]
            });  
        }
        if(window.jQuery && window.jQuery.fn.slick) {
            init();
          } else {
            window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
              init();
            });
        }
    }

    const markupTracking = () => {
        const allOffers = document.querySelectorAll(`.${ID}-offers`);
        for (let index = 0; index < allOffers.length; index += 1) {
            const element = allOffers[index];
            if(element) {
                element.querySelector('a').addEventListener('click', () => {
                    fireEvent('Clicked Homepage Offer ' + index);
                }); 
            }
        }

        const allCategoryLinks = document.querySelectorAll(`.${ID}-ctaWrap .${ID}-button`);
        for (let i = 0; i < allCategoryLinks.length; i += 1) {
            const cat = allCategoryLinks[i];
            if(cat) {
                cat.addEventListener('click', () => {
                    fireEvent('Clicked Hero Category CTA ' + i);
                });
            }
        }
    }


    createMarkup();
    addCategories();
    addOffers();
    //if(window.innerWidth >= 1024) {
       // offerCarousel();
    //}
    //markupTracking();

    
}