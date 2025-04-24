import { shuffle } from '../../../../../../lib/utils/arrays';
import shared from '../shared';


export default () => {

    const { ID } = shared;

    const settings = {
        NUM_TO_SHOW: 6,
        EVERY_NTH_CHILD: 6,
    };
    let inGridConfig;

    // urls to match pathname exactly
    const URL = window.location.pathname;
    const brands = {
        // Tag heuer
        '/webstore/l/mens-tag-heuer-watches/': {
            brandName: 'TAG Heuer',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/78D75E7D590F8D0DBE3894CDEC7E8F97244C800772894CAF9D1D738E05F172C8/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/TAG_HEUER_logo.png',
            guarantee: '2',
        },
        // Tag heuer
        '/webstore/l/tag-heuer-aquaracer-watches/': {
            brandName: 'TAG Heuer',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/78D75E7D590F8D0DBE3894CDEC7E8F97244C800772894CAF9D1D738E05F172C8/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/TAG_HEUER_logo.png',
            guarantee: '2',
        },
        '/webstore/l/tag-heuer-watches/': {
            brandName: 'TAG Heuer',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/78D75E7D590F8D0DBE3894CDEC7E8F97244C800772894CAF9D1D738E05F172C8/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/TAG_HEUER_logo.png',
            guarantee: '2',

        },
        '/webstore/l/womens-tag-heuer-watches/': {
            brandName: 'TAG Heuer',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/78D75E7D590F8D0DBE3894CDEC7E8F97244C800772894CAF9D1D738E05F172C8/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/TAG_HEUER_logo.png',
            guarantee: '2',
        },
        '/webstore/l/ladies-tag-heuer-watches/': {
            brandName: 'TAG Heuer',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/78D75E7D590F8D0DBE3894CDEC7E8F97244C800772894CAF9D1D738E05F172C8/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/TAG_HEUER_logo.png',
            guarantee: '2',
        },
        '/webstore/l/tag-heuer-formula-one-watches/': {
            brandName: 'TAG Heuer',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/78D75E7D590F8D0DBE3894CDEC7E8F97244C800772894CAF9D1D738E05F172C8/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/TAG_HEUER_logo.png',
            guarantee: '2',
        },
        '/webstore/l/mens-tag-heuer-watches/series%7Ctag+heuer+formula+one/': {
            brandName: 'TAG Heuer',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/78D75E7D590F8D0DBE3894CDEC7E8F97244C800772894CAF9D1D738E05F172C8/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/TAG_HEUER_logo.png',
            guarantee: '2',
        },
        '/webstore/l/tag-heuer-carrera-watches/': {
            brandName: 'TAG Heuer',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/78D75E7D590F8D0DBE3894CDEC7E8F97244C800772894CAF9D1D738E05F172C8/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/TAG_HEUER_logo.png',
            guarantee: '2',
        },
        '/webstore/l/tag-heuer-watches/series%7Ctag+heuer+monaco/': {
            brandName: 'TAG Heuer',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/78D75E7D590F8D0DBE3894CDEC7E8F97244C800772894CAF9D1D738E05F172C8/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/TAG_HEUER_logo.png',
            guarantee: '2',
        },

        // breitling

        '/webstore/l/breitling-watches/': {
            brandName: 'Breitling',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/7C74799E9E81ACB08C37F687880D3501BE4751E30D845D273BA9BB4BDBF4B508/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Breitling_logo.svg1.png',
            guarantee: '2',

        },
        '/webstore/l/mens-breitling-watches/': {
            brandName: 'Breitling',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/7C74799E9E81ACB08C37F687880D3501BE4751E30D845D273BA9BB4BDBF4B508/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Breitling_logo.svg1.png',
            guarantee: '2',
        },
        '/webstore/l/ladies-breitling-watches/': {
            brandName: 'Breitling',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/7C74799E9E81ACB08C37F687880D3501BE4751E30D845D273BA9BB4BDBF4B508/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Breitling_logo.svg1.png',
            guarantee: '2',

        },
        '/webstore/l/womens-breitling-watches/': {
            brandName: 'Breitling',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/7C74799E9E81ACB08C37F687880D3501BE4751E30D845D273BA9BB4BDBF4B508/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Breitling_logo.svg1.png',
            guarantee: '2',

        },
        '/webstore/l/breitling-watches/series%7Cbreitling+superocean/': {
            brandName: 'Breitling',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/7C74799E9E81ACB08C37F687880D3501BE4751E30D845D273BA9BB4BDBF4B508/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Breitling_logo.svg1.png',
            guarantee: '2',

        },
        '/webstore/l/breitling-watches/series%7Cbreitling+premier/': {
            brandName: 'Breitling',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/7C74799E9E81ACB08C37F687880D3501BE4751E30D845D273BA9BB4BDBF4B508/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Breitling_logo.svg1.png',
            guarantee: '2',

        },
        '/webstore/l/breitling-watches/series%7Cbreitling+navitimer/': {
            brandName: 'Breitling',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/7C74799E9E81ACB08C37F687880D3501BE4751E30D845D273BA9BB4BDBF4B508/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Breitling_logo.svg1.png',
            guarantee: '2',
        },
        '/webstore/l/breitling-superocean-heritage-watches/': {
            brandName: 'Breitling',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/7C74799E9E81ACB08C37F687880D3501BE4751E30D845D273BA9BB4BDBF4B508/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Breitling_logo.svg1.png',
            guarantee: '2',
        },
        '/webstore/l/breitling-watches/series%7Cbreitling+avenger/': {
            brandName: 'Breitling',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/7C74799E9E81ACB08C37F687880D3501BE4751E30D845D273BA9BB4BDBF4B508/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Breitling_logo.svg1.png',
            guarantee: '2',
        },
        '/webstore/l/breitling-watches/series%7Cbreitling+chronomat/': {
            brandName: 'Breitling',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/7C74799E9E81ACB08C37F687880D3501BE4751E30D845D273BA9BB4BDBF4B508/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Breitling_logo.svg1.png',
            guarantee: '2',
        },
        '/webstore/l/breitling-watches/series%7Cbreitling+professional/': {
            brandName: 'Breitling',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/7C74799E9E81ACB08C37F687880D3501BE4751E30D845D273BA9BB4BDBF4B508/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Breitling_logo.svg1.png',
            guarantee: '2',
        },
        '/webstore/l/breitling-watches/series%7Cbreitling+galactic/': {
            brandName: 'Breitling',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/7C74799E9E81ACB08C37F687880D3501BE4751E30D845D273BA9BB4BDBF4B508/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Breitling_logo.svg1.png',
            guarantee: '5',
        },

        // omega

        '/webstore/l/mens-omega-watches/': {
            brandName: 'Omega',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/AF93016F0B1E7CB778C861F3689DC15C8911688D90D6C95A90284F3B2B56CE1B/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Omega_Logo.svg1.png',
            guarantee: '3',

        },
        '/webstore/l/omega-watches/': {
            brandName: 'Omega',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/AF93016F0B1E7CB778C861F3689DC15C8911688D90D6C95A90284F3B2B56CE1B/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Omega_Logo.svg1.png',
            guarantee: '3',

        },
        '/webstore/l/ladies-omega-watches/': {
            brandName: 'Omega',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/AF93016F0B1E7CB778C861F3689DC15C8911688D90D6C95A90284F3B2B56CE1B/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Omega_Logo.svg1.png',
            guarantee: '3',
        },
        '/webstore/l/omega-watches/': {
            brandName: 'Omega',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/AF93016F0B1E7CB778C861F3689DC15C8911688D90D6C95A90284F3B2B56CE1B/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Omega_Logo.svg1.png',
            guarantee: '3',
        },
        '/webstore/l/omega-seamaster-watches/': {
            brandName: 'Omega',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/AF93016F0B1E7CB778C861F3689DC15C8911688D90D6C95A90284F3B2B56CE1B/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Omega_Logo.svg1.png',
            guarantee: '3',
        },
        '/webstore/l/omega-speedmaster-watches/': {
            brandName: 'Omega',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/AF93016F0B1E7CB778C861F3689DC15C8911688D90D6C95A90284F3B2B56CE1B/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Omega_Logo.svg1.png',
            guarantee: '3',
        },
        '/webstore/l/omega-de-ville-watches/': {
            brandName: 'Omega',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/AF93016F0B1E7CB778C861F3689DC15C8911688D90D6C95A90284F3B2B56CE1B/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Omega_Logo.svg1.png',
            guarantee: '3',
        },
        '/webstore/l/omega-watches/series%7Comega+aqua+terra/': {
            brandName: 'Omega',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/AF93016F0B1E7CB778C861F3689DC15C8911688D90D6C95A90284F3B2B56CE1B/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Omega_Logo.svg1.png',
            guarantee: '3',
        },
        '/webstore/l/omega-speedmaster-watches/': {
            brandName: 'Omega',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/AF93016F0B1E7CB778C861F3689DC15C8911688D90D6C95A90284F3B2B56CE1B/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Omega_Logo.svg1.png',
            guarantee: '3',
        },
        '/webstore/l/omega-constellation-watches/': {
            brandName: 'Omega',
            brandLogo: 'https://service.maxymiser.net/cm/images-us/1/1/2/AF93016F0B1E7CB778C861F3689DC15C8911688D90D6C95A90284F3B2B56CE1B/ernestjones-co-uk/EJ035---PLP-Badging---Prestige-Watches/1200px-Omega_Logo.svg1.png',
            guarantee: '3',
        },
    }
    

    // match the content to the pathname exactly
    Object.keys(brands).forEach((i) => {
        const data = brands[i];
        if(URL.indexOf([i][0]) > -1) {

            //let brand = brands[URL];
            let brand = data;
            inGridConfig = [    
                {
                    classLabel: `${ID}-interest`,
                    textHTML: ` <div class="${ID}-brandLogo" style="background-image: url(${brand.brandLogo})"></div>
                    <div class="${ID}-heading">Interest Free Credit.</div>
                    <div class="${ID}-dash"></div>
                    <p>4 years interest free credit available on ${brand.brandName} products, add products to basket for more information.</p>`,
                    id: 1,
                },
                {
                    classLabel: `${ID}-delivery`,
                    textHTML: ` <div class="${ID}-brandLogo" style="background-image: url(${brand.brandLogo})"></div>
                    <div class="${ID}-heading">Free Express Delivery</div>
                    <div class="${ID}-dash"></div>
                    <p>Free Tracked Delivery available on all ${brand.brandName} products or free delivery to any Ernest Jones store.</p>`,
                    id: 2,
                },
                {
                    classLabel: `${ID}-guarantee`,
                    textHTML: ` <div class="${ID}-brandLogo" style="background-image: url(${brand.brandLogo})"></div>
                    <div class="${ID}-heading">Minimum ${brand.guarantee} year guarantee</div>
                    <div class="${ID}-dash"></div>
                    <p>Minimum ${brand.guarantee} Year ${brand.brandName} Guarantee on all products. Plus free adjustments and repairs in any Ernest Jones store.</p>`,
                    id: 3,
                },
                {
                    classLabel: `${ID}-returns`,
                    textHTML: ` <div class="${ID}-brandLogo" style="background-image: url(${brand.brandLogo})"></div>
                    <div class="${ID}-heading">Free Returns</div>
                    <div class="${ID}-dash"></div>
                    <p>Giving you peace of mind when buying a luxury watch. Return by post, courier or to any of our stores</p>`,
                    id: 4,
                },
            ];
        }
    });
    

    /*if (brands[URL]) {
    
        let brand = brands[URL];

        inGridConfig = [
            {
                classLabel: `${ID}-interest`,
                textHTML: ` <div class="${ID}-brandLogo" style="background-image: url(${brand.brandLogo})"></div>
                <div class="${ID}-heading">Interest Free Credit.</div>
                <div class="${ID}-dash"></div>
                <p>4 years interest free credit available on ${brand.brandName} products, add products to basket for more information.</p>`,
                id: 1,
            },
            {
                classLabel: `${ID}-delivery`,
                textHTML: ` <div class="${ID}-brandLogo" style="background-image: url(${brand.brandLogo})"></div>
                <div class="${ID}-heading">Free Next Day Delivery</div>
                <div class="${ID}-dash"></div>
                <p>Tracked delivery on <span class="${ID}-date"></span> when you order in the next <span class="${ID}-countdown"></span></p>`,
                id: 2,
            },
            {
                classLabel: `${ID}-guarantee`,
                textHTML: ` <div class="${ID}-brandLogo" style="background-image: url(${brand.brandLogo})"></div>
                <div class="${ID}-heading">Minimum ${brand.guarantee} year guarantee</div>
                <div class="${ID}-dash"></div>
                <p>Minimum ${brand.guarantee} Year ${brand.brandName} Guarantee on all products. Plus free adjustments and repairs in any Ernest Jones store.</p>`,
                id: 3,
            },
            {
                classLabel: `${ID}-returns`,
                textHTML: ` <div class="${ID}-brandLogo" style="background-image: url(${brand.brandLogo})"></div>
                <div class="${ID}-heading">Free Returns</div>
                <div class="${ID}-dash"></div>
                <p>Giving you peace of mind when buying a luxury watch. Return by post, courier or to any of our stores</p>`,
                id: 4,
            },
        ];*/
    //}



    /**
     * Create HTML for an object item
     *
     */
    const itemToHtml = prod => {
        let html = '';
        if (prod && prod.textHTML) {
            html += `
        <li class="${ID}-inGridBlock ${prod.classLabel} product-tile-list__item js-product-list-item">
            <div class="${ID}-inGridBlock_text">${prod.textHTML}</div>
        </li>
        `;
        }
        return html;
    };

    /**
     * Apply images to visible grid
     *
     * @param {NodeList} gridProducts
     * @param {Array} images
     */
    const applyImagesToVisibleGrid = (gridProducts, images) => {
        const addedImages = [];
        let counter = 0;
        [].forEach.call(gridProducts, (prod, idx) => {
            if ((idx - 2) % settings.EVERY_NTH_CHILD === 0) {
                prod.insertAdjacentHTML('afterend', itemToHtml(images[counter]));
                addedImages.push(images[counter]);
                counter += 1;
                if(counter === images.length) {
                    counter = 0;
                }
            }
        });
        return addedImages;
    };

    /**
     * Run
     *
     * @param {HTMLElement} grid
     * @param {Object} imagesToShow
     * @param {Number} numAvailable
     */
    const run = (grid, imagesToShow, numAvailable) => {
        if (grid) {
            const gridProducts = grid.querySelectorAll('.product-tile-list__item');
            if (gridProducts && gridProducts.length >= settings.EVERY_NTH_CHILD) {
                applyImagesToVisibleGrid(gridProducts, imagesToShow);
            }
        }
    };

    // ----------------------------------------------------------
    // Add images
    // ----------------------------------------------------------
    const grid = document.querySelector('.items');
    if(inGridConfig) {
        const imagesToShow = (inGridConfig).slice(0, settings.NUM_TO_SHOW);
        const numAvailable = imagesToShow.length;

        run(grid, imagesToShow, numAvailable);
    }
};