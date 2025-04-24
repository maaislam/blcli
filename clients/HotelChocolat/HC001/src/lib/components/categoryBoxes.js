import shared from "../shared"
const { ID } = shared;


/**
 * Main categories
 */
const mainCats = {
    'Best-selling gift boxes': {
        image: 'https://editor-assets.abtasty.com/48343/5efb2bf4180141593519092.png',
        link: 'https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/best-chocolate/',
    },
    'Alcohol':{
        image: 'https://editor-assets.abtasty.com/48343/5efb2c31221351593519153.png',
        link: 'https://www.hotelchocolat.com/uk/shop/collections/products/wine-chocolate/',
    },
    'The Velvetiser':{
        image: 'https://editor-assets.abtasty.com/48343/5efb2c7b1417d1593519227.png',
        link: 'https://www.hotelchocolat.com/uk/about-the-velvetiser.html',
    },
    'Gifts for her': {
        image: 'https://editor-assets.abtasty.com/48343/5efb2cb64d52f1593519286.png',
        link: 'http://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-her/',
    },
    'Gifts for him':{
        image: 'https://editor-assets.abtasty.com/48343/5efb2cc7c3df41593519303.png',
        link: 'http://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-him/',
    },
    'Gifts for couples':{
        image: 'https://editor-assets.abtasty.com/48343/5efb2cd99132e1593519321.png',
        link: 'http://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-recipient/for-couples/',
    },
    'Birthday Gifts':{
        image: 'https://editor-assets.abtasty.com/48343/5efb2d083bee91593519368.png',
        link: 'http://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/birthday/',
    },
    'Thank you gifts':{
        image: 'https://editor-assets.abtasty.com/48343/5efb2d2101a111593519393.png',
        link: 'https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/thank-you/',
    },
    'Congratulations Gifts':{
        image: 'https://editor-assets.abtasty.com/48343/5efb2d4f151d51593519439.png',
        link: 'https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/congratulations/',
    },
}

/**
 * Gift categories
 */
const giftCats = {
    'Gifts for her': {
        image: 'https://editor-assets.abtasty.com/48343/5efb2cb64d52f1593519286.png',
        link: 'https://www.hotelchocolat.com/uk/summer-desserts-chocolate-sleekster-box.html',
    },
    'Gifts for him':{
        image: 'https://editor-assets.abtasty.com/48343/5efb2cc7c3df41593519303.png',
        link: 'https://www.hotelchocolat.com/uk/summer-desserts-chocolate-sleekster-box.html',
    },
    'Gifts for couples':{
        image: 'https://editor-assets.abtasty.com/48343/5efb2cd99132e1593519321.png',
        link: 'https://www.hotelchocolat.com/uk/summer-desserts-chocolate-sleekster-box.html',
    },
    'Birthday Gifts':{
        image: 'https://editor-assets.abtasty.com/48343/5efb2d083bee91593519368.png',
        link: 'https://www.hotelchocolat.com/uk/summer-desserts-chocolate-sleekster-box.html',
    },
    'Thank you gifts':{
        image: 'https://editor-assets.abtasty.com/48343/5efb2d2101a111593519393.png',
        link: 'https://www.hotelchocolat.com/uk/summer-desserts-chocolate-sleekster-box.html',
    },
    'Congratulations Gifts':{
        image: 'https://editor-assets.abtasty.com/48343/5efb2d4f151d51593519439.png',
        link: 'https://www.hotelchocolat.com/uk/summer-desserts-chocolate-sleekster-box.html',
    },
}

const discoverBoxes = {
    'Our drinks & Ices': {
        image: 'https://editor-assets.abtasty.com/48343/5efb2d866cf971593519494.png',
        desc: 'Cocoa cafés with a cacao-inspired menu, brewed cocoa drinks...',
        link: 'https://www.hotelchocolat.com/uk/cocoa-bar-cafes.html',
    },
    'Our London Restaurant': {
        image: 'https://editor-assets.abtasty.com/48343/5efb2db6dee231593519542.png',
        desc: 'Book a table at our stylish restaurant in London and savour unique dishes...',
        link: 'https://www.hotelchocolat.com/uk/restaurants/rabot-1745.html',
    },
    'Our hotel in St Lucia': {
        image: 'https://editor-assets.abtasty.com/48343/5efb2dcd150d31593519565.png',
        desc: '1,000 feet above the glittering Caribbean sea, on the paradise island of Saint Lucia...',
        link: 'https://www.hotelchocolat.com/uk/boucan.html',
    },
    'Chocolate Experiences': {
        image: 'https://editor-assets.abtasty.com/48343/5efb2de244db51593519586.png',
        desc: 'You can now join us for amazing chocolate-making sessions...',
        link: 'https://www.hotelchocolat.com/uk/shop/products/gift-experiences.html',
    },
}



export const mainCategories = () => {
    Object.keys(mainCats).forEach((i) => {
        const data = mainCats[i];

        const categoryBox = document.createElement('div');
        categoryBox.classList.add(`${ID}-categoryBox-outer`);
        categoryBox.innerHTML = `
        <a href="${data.link}">
            <div class="${ID}-boxImage" style="background-image: url(${data.image})"></div>
            <p class="${ID}-textLink"">${[i][0]}</p>
        </a>`;

        document.querySelector(`.${ID}-categories .${ID}-categoryBlocks.${ID}-main`).appendChild(categoryBox);
    });
}

/*export const giftCategories = () => {
    Object.keys(giftCats).forEach((i) => {
        const dataGifts = giftCats[i];

        const categoryBox = document.createElement('div');
        categoryBox.classList.add(`${ID}-categoryBox-outer`);
        categoryBox.innerHTML = `
        <a href="${dataGifts.link}">
            <div class="${ID}-boxImage" style="background-image: url(${dataGifts.image})"></div>
            <p class="${ID}-textLink">${[i][0]}</p>
        </a>`;

        document.querySelector(`.${ID}-categories .${ID}-categoryBlocks.${ID}-gift`).appendChild(categoryBox);
    });
}*/

export const discoverBox = () => {
    Object.keys(discoverBoxes).forEach((i) => {
        const boxEl = discoverBoxes[i];

        const discoverItem = document.createElement('div');
        discoverItem.classList.add(`${ID}-categoryBox-outer`);
        discoverItem.innerHTML = `
        
        <a href="${boxEl.link}"><div class="${ID}-boxImage" style="background-image: url(${boxEl.image})"></div></a>
        <div class="${ID}-title">${[i][0]}</div>
        <p class="${ID}-p">${boxEl.desc} <a href="${boxEl.link}">Read More</p>`;

        document.querySelector(`.${ID}-discover .${ID}-categoryBlocks`).appendChild(discoverItem);
    });


    const seeMoreClick = () => {
        const allSeeMore = document.querySelectorAll(`.${ID}-p .${ID}-expand`);

        for (let index = 0; index < allSeeMore.length; index++) {
            const element = allSeeMore[index];
            if(element) {
                element.addEventListener('click', () => {
                    element.parentNode.classList.add(`${ID}-expanded`);
                });
            }
        }
    }
    seeMoreClick();
}