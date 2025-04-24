import { fireEvent, getSiteFromHostname } from "./services";
import shared from "./shared";

/**
 * Markup for V3
 */
export default () => {

    const { ID } = shared;

    const EJcontent = {
        categories: {
            'Watches': {
                link: '/webstore/watches.do?icid=ej-tn-watches-coll-all',
            },
            'Luxury Watches': {
                link: '/webstore/l/watches/select%7Cluxury+watches/?icid=ej-tn-watches-coll-lux',
            },
            'Engagement': {
                link: '/webstore/l/engagement-rings/?icid=ej-tn-engagement-all',
            },
            'Wedding Rings': {
                link: '/webstore/l/wedding-rings/',
            },
            'Diamonds': {
                link: '/webstore/diamonds.do?icid=ej-tn-diamonds',
            },
            'Jewellery': {
                link: 'https://www.ernestjones.co.uk/webstore/jewellery.do?icid=ej-tn-jewellery',
            }
        },
        offers: {
            offer1: {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/413C445F1DB5B2C6BC4036F3AE123EC6493F5EF931A3F326EFF281111F2A8FD3.jpg?meta=/SGXXX---Pers/EJ2107WC01_WK27_Autumn_Diamond_Promo_Homepage_600x475_03.jpg',
                heading: 'Watches offer',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                link: 'https://www.ernestjones.co.uk/webstore/l/jewellery/?select=autumn%20collection',
            },
            offer2: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/f3a08fe2-fea8-11eb-8449-de8a67451344',
                heading: 'Watches offer',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                link: 'https://www.ernestjones.co.uk/webstore/content/eternal-diamond/',
            },
            offer4: {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/8667D7A02B2D44A7CF9B21E3A0AD141E6A03C95DBB6892DB714AA1D59886BEFA.jpg?meta=/SGXXX---Pers/EJ2107W09_Week27_GWP_600x475.jpg',
                heading: 'Jewellery 2 offer',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                link: 'https://www.ernestjones.co.uk/webstore/l/luxury-watches/',
            },
            offer3: {
                image: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/6a05ccfc-fc50-11eb-adf0-ce0cc7502625',
                heading: '5 Years Interest Free Credit',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                link: 'https://www.ernestjones.co.uk/webstore/store-appointment-booking.cdo',
            },
            offer5: {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/54D15F4F3229FCF8E8BC9ED376F45CEA6015822DCDA9F709419FC46320C15F2B.jpg?meta=/SGXXX---Pers/EJ2107WC02_WK27_Bridal_600x475_02.jpg',
                heading: 'Shop Diamonds',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                link: 'https://www.ernestjones.co.uk/webstore/diamonds.do?icid=ej-tn-diamonds',
            },
            offer6: {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/7F6519E550B393DA2D187F7D42FDC7DDCAB4E730DA92AAF534056A4E8D23F096.jpg?meta=/SGXXX---Pers/EJ2107W09_Week27_GOLD_600x475_01.jpg',
                heading: 'Jewellery offer',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                link: 'https://www.ernestjones.co.uk/webstore/l/jewellery/?material.lvl0=rose%20gold&material.lvl0=gold%20tone&material.lvl0=rose%20gold%20plated%20silver&material.lvl0=rose%20gold%20tone&material.lvl0=two%20colour%20gold&material.lvl0=yellow%20gold',
            },

        }
    }

    const HScontent = {
        categories: {
            'Watches': {
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/?icid=hs-nv-watches-all',
            },
            'Engagement': {
                link: 'https://www.hsamuel.co.uk/engagement-rings/?icid=hs-nv-engagement-rings',
            },
            'Wedding Rings': {
                link: 'https://www.hsamuel.co.uk/webstore/content/wedding-rings/',
            },
            'Jewellery': {
                link: 'https://www.hsamuel.co.uk/webstore/jewellery.do?icid=hs-nv-jewellery-page',
            },
            'Gifts': {
                link: 'https://www.hsamuel.co.uk/webstore/l/gifts/?icid=hs-nv-gifts-all-gifts',
            },
            'Sale': {
                link: 'https://www.hsamuel.co.uk/webstore/offers.do?icid=hs-nv-sale-page',
            },
        },
        offers: {
            offer1: {
                // up to 50% off summer campaign
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B900040A93C80A3C9FA90F30FDAF8A6BDB21011ECB3E80EE39A5AD9D889ED813.jpg?meta=/SG133---Homepage-Banner/HS_Homepageredesign650x500_M1Variation3.jpg',
                heading: 'Offer 1',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                link: 'https://www.hsamuel.co.uk/webstore/l/select%7csale/',
            },
            // up to 50% off watches - summer campaign
            offer2: {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/796BC213FABB19BA3D6B55E649677F23F0B2C99077A626FD6D6A705CD50A3432.jpg?meta=/SG133---Homepage-Banner/HS_Homepageredesign-2.jpg',
                heading: 'Offer 2',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/select%7csale/',
            },
            // Chamilia buy one get one free
            offer4: {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/70A47FA5974EC01CAA831EEDBC7513F20E7F87D58D77C72210EE502FB573174B.jpg?meta=/SG133---Homepage-Banner/HS_Homepageredesign-3.jpg',
                heading: 'Offer 4',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                link: 'https://www.hsamuel.co.uk/webstore/l/chamilia-jewellery/',
            },
            //up to 50% off selected diamonds - diamond event
            offer5: {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/07E24FA5BA95823C36C8D911FB9CD55B76CCF171C026CBB587258EA765AD9DEF.jpg?meta=/SG133---Homepage-Banner/HS_Homepageredesign-1.jpg',
                heading: 'Offer 5',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/select%7cUp+to+half+price+diamonds/selectovm%7csale/',
            },
            // Wedding Event - 25% off when you buy 2 wedding rings 
            offer6: {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/7DEE5ADB8E024770374AD84AEAF202E09B599CBC295EAC96F5C4E8BEA75FEED0.jpg?meta=/SG133---Homepage-Banner/HS_Homepageredesign-4.jpg',
                heading: 'Offer 5',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/occasion%7Cwedding/selectovm%7cfull+price/',
            },
        }
    }

    let data;
    if(getSiteFromHostname() === 'ernestjones') {
        data = EJcontent;
    } else {
        data = HScontent;
    }


    const createMarkup = () => {
        const content = document.createElement('div');
        content.classList.add(`${ID}-topContent`);
        content.innerHTML = `
        ${window.innerWidth >= 1024 ? `
        <div class="${ID}-heroBanner">
            <div class="${ID}-left"><a href="https://www.ernestjones.co.uk/webstore/l/luxury-watches/"></a></div>
            <div class="${ID}-middle ${ID}-ctaWrap">
                <h3>Shop Our Categories</h3>
                <div class="${ID}-buttons"></div>
            </div>
            <div class="${ID}-right"><a href="https://www.ernestjones.co.uk/webstore/l/diamond-rings/?brand.lvl0=eternal%20diamond"></a></div>
        </div>` : `
        <div class="${ID}-heroBanner">
            <div class="${ID}-bannerWrap">
                <div class="${ID}-left"><a href="https://www.ernestjones.co.uk/webstore/l/luxury-watches/"></a></div>
                <div class="${ID}-right"><a href="https://www.ernestjones.co.uk/webstore/l/diamond-rings/?brand.lvl0=eternal%20diamond"></a></div>
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

        document.querySelector('.home-tile-grid').insertAdjacentElement('beforebegin', content);
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
            offer.innerHTML = `
            <a href="${offerEl.link}">
            <div class="${ID}-offerImage" style ="background-image: url(${offerEl.image})">
            </div>
            <div class="${ID}-offerInfo">
                <h4>${offerEl.heading}</h4>
                <p>${offerEl.text}</p>
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
        offerCarousel();
    //}
    markupTracking();

    
}