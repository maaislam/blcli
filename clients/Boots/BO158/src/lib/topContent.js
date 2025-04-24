import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { isReturningNoPurchase } from "./helpers";


/**
 * Markup for V3
 */
export default () => {

    const { ID, VARIATION } = shared;


    // content categories to first show
    const content = {
        categories: {
            'Beauty & skincare': {
                link: '/beauty',
            },
            'Christmas': {
                link: '/christmas',
            },
            'Baby & child': {
                link: '/baby-child',
            },
            'Offers': {
                link: '/offers',
            },
            'Fragrance': {
                link: '/fragrance',
            },
            'Health & pharmacy': {
                link: '/health-pharmacy',
            },
            'Toiletries': {
                link: '/toiletries',
            },
            'Make-up': {
                link: '/beauty/makeup',
            },
            
        },
    }

    const offerData = {
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
            heading: 'Only £30, worth £79',
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


    // if PLP visited, show last viewed and then 3 from here. If last viewed is in there don't show it
    const departmentCategories = {
        'christmas': {
            '3 for 2 ': {
                link: '/christmas/christmas-3-for-2',
            },
            'Advent Calendars': {
                link: '/christmas/advent-calendars/shop-all-advent-calendars',
            },
            'Gifts For Him': {
                link: '/christmas/gifts-for-him/all-christmas-gifts-for-him',
            },
            'Gifts For Her': {
                link: '/christmas/gifts-for-her/all-christmas-gifts-for-her',
            },
        },
        'health-pharmacy': {
            'Health Offers': {
                link: '/health-pharmacy/health-offers',
            },
            'Vitamins': {
                link: '/health-pharmacy/vitaminsandsupplements',
            },
            'Pain Relief': {
                link: '/health-pharmacy/medicines-treatments/painrelief',
            },
            'Diet & Weight Management': {
                link: '/health-pharmacy/lifestyle-wellbeing/weightloss',
            },
        },
        'beauty': {
            'Beauty Offers': {
                link: '/beauty/beauty-skincare-offers',
            },
            'All Skincare': {
                link: '/beauty/skincare/skincare-all-skincare',
            },
            'Make Up': {
                link: '/beauty/makeup',
            },
            'Premium Make Up': {
                link: '/beauty/luxury-beauty-skincare/luxury-beauty-makeup',
            },
        },
        'baby-child': {
            'Baby Event': {
                link: '/baby-child/baby-event',
            },
            'Baby Value Packs & Bundles': {
                link: '/baby-value-packs-and-bundles',
            },
            'Baby Clothing': {
                link: '/baby-child/mothercare-clothing/shop-all-baby-kids-clothing',
            },
            'Nursery & Bedding': {
                link: '/baby-child/nursery-furniture',
            },
        },
        'electrical': {
            'Electrical Offers': {
                link: '/electrical/electrical-offers',
            },
            'Beauty Tools': {
                link: '/electrical/beauty-tools/all-electrical-beauty-tools',
            },
            'Hair Styling Tools': {
                link: '/electrical/hair-styling-tools/all-electrical-hair-styling-tools',
            },
            'New In Electrical': {
                link: '/electrical/new-in-electrical',
            },
        },
        'fragrance': {
            'Fragrance Offers': {
                link: '/fragrance/fragrance-offers',
            },
            'All Perfume': {
                link: '/fragrance/perfume/all-perfume',
            },
            'All Aftershave': {
                link: '/fragrance/aftershave/mens-aftershave',
            },
            'New In Fragrance': {
                link: 'fragrance/new-in-fragrance',
            },
        },
        'holidays': {
            'Suncare': {
                link: '/holidays/suncare',
            },
            'Fake & Gradual Tan': {
                link: '/holidays/fake-gradual-tan/fake-and-gradual-tan-all',
            },
            'Travel Toiletries': {
                link: '/holidays/travel-toiletries',
            },
            'Travel Health': {
                link: 'holidays/travel-health',
            },
        },
        'wellness': {
            'New In Wellness': {
                link: '/wellness/new-in-wellness',
            },
            'Vitamins': {
                link: '/wellness/vitaminsandsupplements',
            },
            'Diet & Weight Management': {
                link: '/wellness/weightloss/weight-management-shop-all',
            },
            'Sports Nutrition': {
                link: '/wellness/sports-nutrition/sport-nutrition-shop-all',
            },
        },
        'toiletries': {
            'Toiletries Offers': {
                link: '/toiletries/toiletries-offers',
            },
            'All Skincare': {
                link: '/toiletries/skincare/skincare-all-skincare',
            },
            'Haircare': {
                link: '/toiletries/hair/all-hair',
            },
            'Fake & Gradual Tan': {
                link: '/toiletries/fake-gradual-tan/fake-and-gradual-tan-all',
            },
        },
        'mens': {
            'Men’s Toiletries': {
                link: '/mens/mens-toiletries',
            },
            'Shaving & Grooming': {
                link: '/mens/shaving-grooming',
            },
            'Men’s Skincare': {
                link: '/mens/skincare-body',
            },
            'Aftershave': {
                link: 'mens/aftershave',
            },
        },
    }


    let data;
    let personalisedData;

    if(VARIATION === 'control') {
        data = content.categories;
       

    } else {
       
        // --- if first time visit
        if(!localStorage.getItem(`${ID}-userType`) || localStorage.getItem(`${ID}-userType`) === 'new') {
            data = content.categories;

            // set first time storage for new user
            localStorage.setItem(`${ID}-userType`, 'new');

            fireEvent('New user banner shown');

        } else if (localStorage.getItem(`${ID}-userType`) 
        && localStorage.getItem(`${ID}-userType`) === 'returning' 
        && isReturningNoPurchase() === true 
        && localStorage.getItem(`BOUrls`)) {

            data = content.categories;
        
            const lastURLStored = JSON.parse(localStorage.getItem(`BOUrls`));
            const lastURL = lastURLStored[lastURLStored.length - 1];
            const lastDepartment = lastURL.link.split("/")[1];

            const lastPageTitle = lastURL.pageTitle;
            const lastPageURL = lastURL.link;

            personalisedData = departmentCategories[lastDepartment];
            
            delete data['Baby & child'];
            delete data['Toiletries'];
            delete data['Make-up'];

        
            let lastMatch = false;

            Object.keys(personalisedData).forEach((d) => {
                // if last viewed is already in the object, remove it
                if(lastURL.link.indexOf(personalisedData[d].link) > -1) {
                    delete personalisedData[d];
                    lastMatch = true;
                } 
            });


            Object.keys(data).forEach((d) => {
                // if last viewed is already in the object, remove it
                if(lastURL.link.indexOf(data[d].link) > -1) {
                    delete data[d];
                } 
            });
            

            // delete last item in obj if last viewed is added
            if(lastMatch === false) {
                delete personalisedData[Object.keys(personalisedData)[Object.keys(personalisedData).length-1]];
            }


            // Add last viewed as the first item in the data
            const objectToAdd = {};
            objectToAdd[lastPageTitle] = {
                link: lastPageURL
            };

            personalisedData = Object.assign(objectToAdd, personalisedData);
            
            
        } else {
            data = content.categories;
        }

    }

   
    const createMarkup = () => {
        const content = document.createElement('div');
        content.classList.add(`${ID}-topContent`);
        content.innerHTML = `
        ${window.innerWidth >= 1024 ? `
        <div class="${ID}-heroBanner">
            <div class="${ID}-left"></div>
            <div class="${ID}-middle ${ID}-ctaWrap">
                <h3>Shop Our Categories</h3>
                <div class="${ID}-buttons">
                
                </div>
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
        const ctas = data;

        Object.keys(ctas).forEach((i) => {
            const catEl = ctas[i];
            const category = document.createElement('a');
            category.classList.add(`${ID}-button`);
            category.setAttribute('href', catEl.link);
            category.innerHTML = `<span>${[i][0]}</span>`;
            document.querySelector(`.${ID}-ctaWrap .${ID}-buttons`).appendChild(category);

            
        });
    }

    // add the personalised categories
    const addNewCategories = () => {
        const ctas = personalisedData;

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
        const offersData = offerData;
        Object.keys(offersData).forEach((i) => {
            const offerEl = offersData[i];
            const offer = document.createElement('div');
            offer.classList.add(`${ID}-offer`);
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
    
   
    if(data !== '') {
       createMarkup();
       if(VARIATION !== 'control') {
            if(localStorage.getItem(`BOUrls`) && personalisedData !== undefined) {
                addNewCategories();
                fireEvent('Returning user banner shown');
            }
        }
       addCategories();   
    }
    
    addOffers();

    const moveOffers = () => {
        const offerBlock = document.querySelector(`.${ID}-offersWrap`);
        document.querySelector(`.${ID}-topContent`).insertAdjacentElement('afterbegin', offerBlock);
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
                            draggable: false,
                        }
                    },
                    {
                        breakpoint: 1023,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            centerMode: false,
                            arrows: true,
                        }
                    },
                    {
                        breakpoint: 766,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            centerMode: false,
                            arrows: false,
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

    if(VARIATION === '2') {
        moveOffers();
        offerCarousel();
    }
    //if(window.innerWidth >= 1024) {
       // offerCarousel();
    //}
    //markupTracking();

    
}