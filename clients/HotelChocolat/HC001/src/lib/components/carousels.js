import shared from "../shared";

const { ID } = shared;

/**
 * Products for the hero banner
 */
const heroItems = {
    'The Summer Picnic Collection': {
        image: 'https://editor-assets.abtasty.com/48343/5f0eca1ce6e351594804764.jpg',
        price: '£25',
        link: 'https://www.hotelchocolat.com/uk/summer-fruits-bundle-gift.html',
    },
    'The Little Tipples Collection':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ec9e5e4cc71594804709.jpg',
        price: '£20',
        link: 'https://www.hotelchocolat.com/uk/alcohol-bottles-bundle-gift.html',
    },
    'Summer Desserts Sleekster':{
        image: 'https://editor-assets.abtasty.com/48343/5f0eca45d25031594804805.jpg',
        price: '£22.95',
        link: 'https://www.hotelchocolat.com/uk/summer-desserts-chocolate-sleekster-box.html',
    },
    'Summer Sundaes Sleekster':{
        image: 'https://editor-assets.abtasty.com/48343/5f0eca5869f081594804824.jpg',
        price: '£22.95',
        link: 'https://www.hotelchocolat.com/uk/summer-sundaes-chocolate-sleekster-box.html',
    },
    'Just Fruity Selector Collection':{
        image: 'https://editor-assets.abtasty.com/48343/5f0eca6a9c90f1594804842.jpg',
        price: '£20',
        link: 'https://www.hotelchocolat.com/uk/fruit-selector-bundle-gift-2.html',
    },
    'The Enrobed Fruits Collections':{
        image: 'https://editor-assets.abtasty.com/48343/5f0eca7cd0be31594804860.jpg',
        price: '£22',
        link: 'https://www.hotelchocolat.com/uk/boozy-fruit-bundle-gift.html',
    },
    'The Surprisingly Vegan Collection':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ecb018e4841594804993.jpg',
        price: '£25',
        link: 'https://www.hotelchocolat.com/uk/vegan-bundle-gift.html',
    },
}

/**
 * Products for the gift sleeve banner
 */
const giftSleeveItems = {
    'Everything Sleekster': {
        image: 'https://editor-assets.abtasty.com/48343/5f0ecfa9100c01594806185.jpg',
        price: '£22.95',
        link: 'https://www.hotelchocolat.com/uk/everything-chocolate-box.html',
    },
    'Milk to Caramel Sleekster':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ecf07972121594806023.jpg',
        price: '£22.95',
        link: 'https://www.hotelchocolat.com/uk/caramel-milk-chocolate-box.html',
    },
    'Fruity Sleekster':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ecee940aa51594805993.jpg',
        price: '£22.95',
        link: 'https://www.hotelchocolat.com/uk/luxury-fruit-chocolate-box.html',
    },
    'Tipsy Truffles Sleekster':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ecf6d296ec1594806125.jpg',
        price: '£22.95',
        link: 'https://www.hotelchocolat.com/uk/boozy-truffles-chocolate-box.html',
    },
    'The Patisserie Sleekster':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ecf17be11a1594806039.jpg',
        price: '£22.95',
        link: 'https://www.hotelchocolat.com/uk/patisserie-chocolate-box.html',
    },
    'The Dark Chocolate Box Sleekster':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ecea496b2b1594805924.jpg',
        price: '£22.95',
        link: 'https://www.hotelchocolat.com/uk/luxury-dark-chocolates.html',
    },
    'Everything Luxe Sleekster':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ecebb6cc831594805947.jpg',
        price: '£35.95',
        link: 'https://www.hotelchocolat.com/uk/luxe-chocolate-box-selection.html',
    },
}

/**
 * Products for recommendations
 */

const recommended = {
    'The Everything Sleekster': {
        image: 'https://editor-assets.abtasty.com/48343/5f0ecfa9100c01594806185.jpg',
        price: '£22.95',
        link: 'https://www.hotelchocolat.com/uk/everything-chocolate-box.html',
    },
    'The Everything Luxe Sleekster':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ecebb6cc831594805947.jpg',
        price: '£35.95',
        link: 'https://www.hotelchocolat.com/uk/luxe-chocolate-box-selection.html',
    },
    'Summer Desserts Sleekster':{
        image: 'https://editor-assets.abtasty.com/48343/5f0eca45d25031594804805.jpg',
        price: '£22.95',
        link: 'https://www.hotelchocolat.com/uk/summer-desserts-chocolate-sleekster-box.html',
    },
    'Summer Sundaes Sleekster':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ed25614a931594806870.jpg',
        price: '£22.95',
        link: 'https://www.hotelchocolat.com/uk/summer-sundaes-chocolate-sleekster-box.html',
    },
    'The Summer Picnic Collection': {
        image: 'https://editor-assets.abtasty.com/48343/5f0eca1ce6e351594804764.jpg',
        price: '£25',
        link: 'https://www.hotelchocolat.com/uk/summer-fruits-bundle-gift.html',
    },
    'The Patisserie Sleekster':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ecf17be11a1594806039.jpg',
        price: '£22.95',
        link: 'https://www.hotelchocolat.com/uk/patisserie-chocolate-box.html',
    },
    'The Milk to Caramel Sleekster':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ecf07972121594806023.jpg',
        price: '£22.95',
        link: 'https://www.hotelchocolat.com/uk/caramel-milk-chocolate-box.html',
    },
    'The Simply Thanks Collection – Milk & Caramel ':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ed232ee9351594806834.jpg',
        price: '£25.00',
        link: 'https://www.hotelchocolat.com/uk/thank-you-bundle-gift-1.html',
    },
    'The Selectors Collection – Cookies to Caramel':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ed2009e9ce1594806784.jpg',
        price: '£20.00',
        link: 'https://www.hotelchocolat.com/uk/classic-caramel-bundle-gift.html',
    },
    'The Selectors Collection – Nuts & Pralines':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ed2224329f1594806818.jpg',
        price: '£20.00',
        link: 'https://www.hotelchocolat.com/uk/praline-selectors-bundle-gift.html',
    },
    'The Everything H-Box of Chocolates':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ed1ec98be71594806764.jpg',
        price: '£12.95',
        link: 'https://www.hotelchocolat.com/uk/everything-chocolate-selection.html',
    },
    'Fruit Chocolate Sleekster':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ecee940aa51594805993.jpg',
        price: '£22.95',
        link: 'https://www.hotelchocolat.com/uk/luxury-fruit-chocolate-box.html',
    },
    'Large Chocolate Hamper':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ed1d7858341594806743.jpg',
        price: '£40.00',
        link: 'https://www.hotelchocolat.com/uk/the-everything-collection-large.html',
    },
    'The Selectors Collection – Dark':{
        image: 'https://editor-assets.abtasty.com/48343/5f0ed20fa95031594806799.jpg',
        price: '£20.00',
        link: 'https://www.hotelchocolat.com/uk/dark-selectors-bundle-gift.html',
    },
}

export const heroCarousel = () => {

    Object.keys(heroItems).forEach((i) => {
        const data = heroItems[i];

        const carouselItem = document.createElement('div');
        carouselItem.classList.add(`${ID}-carouselItem`);
        carouselItem.innerHTML = 
        `<a href="${data.link}">
            <div class="${ID}-image" style="background-image: url(${data.image})"></div>
            <div class="${ID}-productInfo">
                <span>${[i][0]}</span>
                <p class="${ID}-p">${data.price}</p>
            </div>
        </a>`;

        document.querySelector(`.${ID}-banner.${ID}-hero .${ID}-carousel`).appendChild(carouselItem);
    });
}

export const giftCarousel = () => {

    Object.keys(giftSleeveItems).forEach((i) => {
        const dataGift = giftSleeveItems[i];

        const carouselItem = document.createElement('div');
        carouselItem.classList.add(`${ID}-carouselItem`);
        carouselItem.innerHTML = 
        `<a href="${dataGift.link}">
        <div class="${ID}-image" style="background-image: url(${dataGift.image})"></div>
        <div class="${ID}-productInfo">
            <span>${[i][0]}</span>
            <p class="${ID}-p">${dataGift.price}</p>
        </div>
        </a>`;

        document.querySelector(`.${ID}-banner.${ID}-gift .${ID}-carousel`).appendChild(carouselItem);
    });
}


export const slickBothBanners = () => {
    // slick 
    window.jQuery(`.${ID}-banner .${ID}-carousel`).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                }
            },
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ]
    });
}

export const recommendations = () => {

    Object.keys(recommended).forEach((i) => {
        const data = recommended[i];

        const recItem = document.createElement('div');
        recItem.classList.add(`${ID}-carouselItem`);
        recItem.innerHTML = 
        `<a href="${data.link}">
            <div class="${ID}-image" style="background-image: url(${data.image})"></div>
            <div class="${ID}-productInfo">
                <span>${[i][0]}</span>
                <p class="${ID}-p">${data.price}</p>
            </div>
        </a>`;

        document.querySelector(`.${ID}-recommended .${ID}-carousel`).appendChild(recItem);
    });

    // slick 
    window.jQuery(`.${ID}-recommended .${ID}-carousel`).slick({
        arrows: true,
        infinite: true,
        //mobileFirst: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 1,
                }
            },
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}