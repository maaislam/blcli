import shared from "../shared";

// create a map of product names
// add the placeholder text
export default () => {

    const { ID } = shared;

    /*const bestSeller = [
        "TAG Heuer Formula 1 Men's Stainless Steel Bracelet Watch",
        "TAG Heuer Formula 1 Men's Stainless Steel Bracelet Watch",
        "TAG Heuer Formula 1 Men's Stainless Steel Bracelet Watch",
        "Tag Heuer Formula 1 Men's Stainless Steel Bracelet Watch",
        "TAG Heuer Formula 1 Men's Stainless Steel Bracelet Watch",
        "TAG Heuer Exclusive Aquaracer Limited Edition Bracelet Watch",
        "TAG Heuer Formula 1 Men's Two Colour Bracelet Watch",
        "TAG Heuer Formula 1 Men's Stainless Steel Bracelet Watch",
        "TAG Heuer Formula 1 Men's Black Rubber Strap Watch",
        "TAG Heuer Carrera Ladies' Stainless Steel Bracelet Watch",
        "TAG Heuer Formula 1 Men's Stainless Steel Black Strap Watch",
        "TAG Heuer Limited Edition Formula 1 Men's Bracelet Watch",

        //omega
        "Omega Speedmaster Professional Moonwatch Men's Watch",
        "Omega Seamaster Diver 300M Men's Stainless Steel Strap Watch",
        "Omega Constellation Quartz Ladies' Two Colour Bracelet Watch",
        'Omega Seamaster Aqua Terra Bracelet Watch',
        "Omega Seamaster Men's Stainless Steel Bracelet Watch",
        "Omega De Ville Prestige Co-Axial Men's Black Strap Watch",
        "Omega Seamaster Diver 300M Men's Stainless Steel Strap Watch",
        "Omega Seamaster Men's Stainless Steel Bracelet Watch",
        "Ladies' Omega Constellation Manhattan 25mm",

        //breitling
        "Breitling Colt Men's Stainless Steel Bracelet Watch",
        "Breitling Superocean II 42 Men's Blue Rubber Strap Watch",
        "Breitling Avenger Seawolf Men's Bracelet Watch",
        "Breitling Navitimer 46 Men's Stainless Steel Bracelet Watch",
        'Breitling Navitimer 1 B01 Chronograph Black Strap Watch',
        "Breitling Superocean Heritage 46 Men's Stainless Steel Watch",
        "Breitling Colt Men's Stainless Steel Bracelet Watch",
        "Breitling Colt 44 Men's Stainless Steel Bracelet Watch",
        "Breitling Colt Men's Stainless Steel Bracelet Watch",
        "Breitling Colt Chronograph Men's Stainless Steel Watch",
        "Breitling Navitimer 1 Men's Brown Leather Strap Watch",

    ]*/

    const bestSeller = [
        '5009022',
        '5009480',
        '4716973',
        '4797582',
        '4611918',
        '4264452',
        '2148943',
        '1031678',
        '6956319',
        '6380476',
        '5009480',
        '6252354',
        '4612035',
        '4611977',
        '2189429',
        '3558584',
        '4909585',
        '2189429',
        '1121197',
        '3518442',
        '6955207',
        '3558584',
        '2523442',
        '3450783',
        '4981278',
        '9178236',
        '9178074',
        '9552200',
        '3450783',
        '9178074',
        '2523442',
        '3307301',
        '3306984',
    ];

    const buyersChoice = [ 
        '3477770',
        '6956246',
        '3477177',
        '2179709',
        '2923416',
        '9304800',
        '2465159',
        '9178090',
        '6939783',
        '9552537',
        '3307166',
    ];


    const perfectGift = [
        '2378701',
        '3479153',
        '5446694',
        '6956254',
        '2465914',
        '8561338',
        '4981235',
        '6939600',
        '6050905',
        '9552235',
    ];



    // loop through all the products, match against arrays
    const allProducts = document.querySelectorAll('.product-tile-list__item');
    for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        // const productName = element.querySelector('.product-tile__description').textContent.trim();
        
        const SKU = element.querySelector('meta[itemprop="sku"]').getAttribute('content');
        if(SKU) {
        
            // add best seller badge
            if (bestSeller.indexOf(SKU) > -1) {
                const productBadge = document.createElement('div');
                productBadge.classList.add(`${ID}-productBadge`);
                productBadge.innerHTML = `
                    <span class="${ID}-badge_image" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/12EAE8E674C25FA50C4E784759DB0BF3CD7AF2427E2BE889B5DF5A7F76817493/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/EJ-Best-Seller.png')">
                    </span>`;
                element.querySelector('.product-tile').appendChild(productBadge);
                
            // if buyers choice
            } else if (buyersChoice.indexOf(SKU) > -1) {
                const productBadge = document.createElement('div');
                productBadge.classList.add(`${ID}-productBadge`);
                productBadge.innerHTML = `
                    <span class="${ID}-badge_image" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/2B44C144AD31007446CACFA68F7BB59F9A1681E2A8C6AD764D2E05E49CB9D0C9/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/BUYERSchoice.png')">
                    </span>`;
                element.querySelector('.product-tile').appendChild(productBadge);

            // if perfect gift
            } else if (perfectGift.indexOf(SKU) > -1) {
                const productBadge = document.createElement('div');
                productBadge.classList.add(`${ID}-productBadge`);
                productBadge.innerHTML = `
                <span class="${ID}-badge_image" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/3F8302294A9842D11496AED18DBFC49023FF5B5392E9F856C08488605D5DD825/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/EJ-Perfect-Gift-1.png')">
                </span>`;
                element.querySelector('.product-tile').appendChild(productBadge);
            } 
            // if exclusive sash
            else if(element.querySelector('.product-tile__corner-flag')) {
                const sashName = element.querySelector('.product-tile__corner-flag').textContent.trim().toLowerCase();
                if(sashName === 'exclusive') {
                    const productBadge = document.createElement('div');
                    productBadge.classList.add(`${ID}-productBadge`);
                    productBadge.innerHTML = `
                    <span class="${ID}-badge_image" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/1C0301B1DB977C7DBED7F7005AF6C3C1BC121332C0155FFB2EC3322FFC61F67C/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/EJ-Exclusive.png')">
                    </span>`;
                    element.querySelector('.product-tile').appendChild(productBadge);
                }
            }


            // if topRated
            else if (element.querySelector('.rating-stars')) {
                const starAmount = element.querySelector('.rating-stars__rating-count').textContent.replace('(', '').replace(')', '');
                const starsRating = element.querySelector('.rating-stars .sr-only');
                if((starsRating.textContent === '5 out of 5 stars') && (parseInt(starAmount, 10) >= 5)) {
                    const productBadge = document.createElement('div');
                    productBadge.classList.add(`${ID}-productBadge`);
                    productBadge.innerHTML = `
                    <span class="${ID}-badge_image" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/CE7FA8708E45F4F73B07F16E6CF8AD0D580FF39102D54E0E7298A57148CB6B71/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/EJ-Top-Rated.png')">
                    </span>`;
                    element.querySelector('.product-tile').appendChild(productBadge);
                }
            }

        }
    }
}