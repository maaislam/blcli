import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { isReturningNoPurchase } from "./helpers";

export default () => {

    const { ID, VARIATION } = shared;


    const content = {
        categories: {
            'Beauty & skincare': {
                link: '/beauty',
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
            'Electrical Beauty': {
                link: '/electrical',
            },
            'Wellness': {
                link: '/wellness',
            },
            
        },
    }

    const offerData = {
        offer1: {
            heading: '3 for 2',
            text: 'on selected vitamins & supplements',
            link: 'https://www.boots.com/sitesearch?promotionalText%5B0%5D=3+for+2+on+selected+vitamins%2C+supplements%2C+health+foods+and+complementary+medicines+-+cheapest+free',
        },
        offer2: {
            heading: '3 for 2',
            text: 'on selected No7 skincare',
            link: 'https://www.boots.com/no7-shop-all#facet:-10504949515350585132102111114325032111110321151011081019911610110032781115532115107105110999711410132453267104101971121011151163270114101101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&',
        },
        offer3: {
            heading: 'Baby Event!',
            text: 'Offers you won’t want to miss',
            link: 'https://www.boots.com/baby-child/baby-event',
        },
        offer4: {
            heading: 'Save up to ½ price',
            text: ' on selected skincare',
            link: 'https://www.boots.com/sitesearch?promotionalText%5B0%5D=Save+up+to+1%2F2+price+on+selected+skincare',
        },
        offer5: {
            heading: 'Better than ½ price',
            text: 'on selected electrical beauty',
            link: 'https://www.boots.com/sitesearch?promotionalText%5B0%5D=Better+than+1%2F2+price+on+selected+electrical+beauty',
        },
        offer6: {
            heading: 'Amazing savings',
            text: 'on toiletries & haircare',
            link: 'https://www.boots.com/savings/toiletries-and-haircare-savings',
        },
    }
    
    // if PLP visited, show last viewed and then 3 from here. If last viewed is in there don't show it
    const departmentCategories = {
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

    if(VARIATION !== '2') {
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

            if (personalisedData){
           
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
            
            }
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
                <h3>${VARIATION == '3' || VARIATION == '4' ? 'Shop the latest offers' : 'Our Offers'}</h3>
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
        if(VARIATION === '2') {
             if(localStorage.getItem(`BOUrls`) && personalisedData !== undefined) {
                 addNewCategories();
                 fireEvent('Returning user banner shown');
             }
         }
        addCategories();   
    }
    addOffers();


    /** V3 && V4 */

    const moveOffers = () => {
        const offerBlock = document.querySelector(`.${ID}-offersWrap`);
        document.querySelector(`.${ID}-topContent`).insertAdjacentElement('afterbegin', offerBlock);
    }

    if(VARIATION === '3' || VARIATION === '4') {
        moveOffers();
    }



    // const offerCarousel = () => {
    //     const init = () => {
    //         window.jQuery(`.${ID}-offers`).slick({
    //             slidesToShow: 1,
    //             slidesToScroll: 1,
    //             dots: false,
    //             arrows: false,
    //             infinite: true,
    //             autoplay: true,
    //             autoplaySpeed: 5000,
    //             swipeToSlide: true,
    //             centerMode: true,
    //             centerPadding: '30px',
    //             cssEase: 'linear', 
    //             variableWidth: true,
    //             rows: 0,
    //             mobileFirst: true,
    //             responsive: [
    //                 {
    //                     breakpoint: 1280,
    //                     settings: {
    //                         slidesToShow: 3,
    //                         slidesToScroll: 1,
    //                         arrows: true,
    //                         centerMode: false,
    //                         variableWidth: false,
    //                         draggable: false,
    //                     }
    //                 },
    //                 {
    //                     breakpoint: 1023,
    //                     settings: {
    //                         slidesToShow: 4,
    //                         slidesToScroll: 1,
    //                         centerMode: false,
    //                         arrows: true,
    //                     }
    //                 },
    //                 {
    //                     breakpoint: 766,
    //                     settings: {
    //                         slidesToShow: 3,
    //                         slidesToScroll: 1,
    //                         centerMode: false,
    //                         arrows: false,
    //                     }
    //                 },
    //                 {
    //                     breakpoint: 320,
    //                     settings: {
    //                         slidesToShow: 1,
    //                         slidesToScroll: 1,
    //                     }
    //                 },
    //             ]
    //         });  
    //     }
    //     if(window.jQuery && window.jQuery.fn.slick) {
    //         init();
    //       } else {
    //         window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
    //           init();
    //         });
    //     }
    // }

    
}