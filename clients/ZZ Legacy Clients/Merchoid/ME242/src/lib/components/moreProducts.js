import shared from '../shared';

const { ID } = shared;

export default () => {

    const moreProductsSection = document.querySelector('#related-brand-products');

    // change the title
    const brand = document.querySelector(`meta[property~="og:brand"]`).content.match(/^[^,]+/);

    moreProductsSection.querySelector('.brand-section-header-content').innerHTML = 
    `<div class="${ID}-moreProducts_title">
        <h2>More ${brand[0]} merch</h2>
        <p>for the biggest ${brand[0]} fans</p>
    </div>`;

    const removeStyling = () => {
        const allProducts = document.querySelectorAll('#related-brand-products .products.wrapper li');
        for (let index = 0; index < allProducts.length; index++) {
            const element = allProducts[index];
            element.removeAttribute('style');
        }
    }

    removeStyling();


    // get all the headings
    const getCategories = () => {
        let allHeadings = [];

        const moreProductsTitle = moreProductsSection.querySelectorAll('.products.wrapper .wrapper-head');
        for (let index = 0; index < moreProductsTitle.length; index += 1) {
            const element = moreProductsTitle[index];
            
            const heading = element.textContent;

            // remove the hidden default style
            element.parentElement.removeAttribute('style');

            element.parentElement.setAttribute('data-target', `${heading.trim().replace(/\s/g, '-').replace('&','').replace(',', '').replace('\'','').toLowerCase()}`);
            
            allHeadings.push(heading); 
        }
        return allHeadings;
    }

    // loop through and add filters to new bar
    const addFilters = () => {

        // create the bar
        const catFilters = document.createElement('div');
        catFilters.classList.add(`${ID}-filterBar`);
        catFilters.innerHTML = `<div class="${ID}-filters"></div>`;
        moreProductsSection.querySelector('.brand-section-header').insertAdjacentElement('afterend', catFilters);

        // add the filters
        const titles = getCategories();

        for (let index = 0; index < titles.length; index += 1) {
            const element = titles[index];

            const headingEl = document.createElement('div');
            headingEl.classList.add(`${ID}-filterTitle`);
            headingEl.setAttribute('data-target', `${element.trim().replace(/\s/g, '-').replace('&','').replace(',', '').replace('\'','').toLowerCase()}`);
            headingEl.innerHTML = element;

            document.querySelector(`.${ID}-filters`).appendChild(headingEl);
        }
    }
    addFilters();


    const slickFilters = () => {
        jQuery(`.${ID}-filters`).slick({
            centerMode: false,
            variableWidth: true,
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: true,
            responsive: [
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                  }
                },
            ],
        });

    }
    slickFilters();

    // on click of each filter, show hide products
    const showCategories = () => {
        // make the first one active 
        moreProductsSection.querySelector('.products.wrapper').classList.add(`${ID}-cat_active`);
        moreProductsSection.querySelector(`.${ID}-filterTitle`).classList.add(`${ID}-filter_active`);

        const allFilters = document.querySelectorAll(`.${ID}-filterTitle`);
        
        for (let index = 0; index < allFilters.length; index += 1) {
            const element = allFilters[index];

            element.addEventListener('click', (e) => {
                const selectedCat = e.currentTarget.getAttribute('data-target');

                
                // force a "fake" scroll so the image load in
                window.scrollTo(window.scrollX, window.scrollY - 1);
                window.scrollTo(window.scrollX, window.scrollY + 1);

                // get active block and heading, make inactive
                document.querySelector(`.products.wrapper.${ID}-cat_active`).classList.remove(`${ID}-cat_active`);
                document.querySelector(`.${ID}-filterTitle.${ID}-filter_active`).classList.remove(`${ID}-filter_active`);
                
                // get matching el, make active
                e.currentTarget.classList.add(`${ID}-filter_active`);
                document.querySelector(`.products.wrapper.grid[data-target=${selectedCat}]`).classList.add(`${ID}-cat_active`);
                
            });
        }
    }
    showCategories();

    const addBrandLink = () => {
        // brand[0] is a string
        const brands = {
            'Marvel': '/brand/marvel/',
            'Star Wars': '/brand/star-wars/',
            'DC Comics': '/brand/nintendo-super-mario-bros/',
            'Legend of Zelda': '/brand/nintendo-legend-of-zelda/',
            'Zelda': '/brand/nintendo-legend-of-zelda/',
            'Rick and Morty': '/brand/rick-and-morty/',
            'Game of Thrones': '/brand/game-of-thrones/',
            'Super Mario Bros': '/brand/nintendo-super-mario-bros/',
            'PlayStation': '/brand/playstation/',
            'Disney' : '/brand/disney/',
            'Harry Potter': '/brand/harry-potter/',
        }
        
        if(brands[brand[0]]) {
            const viewBrandButton = document.createElement('div');
            viewBrandButton.classList.add(`${ID}-viewBrand`);
            viewBrandButton.innerHTML = `<a href="${brands[brand[0]]}">Shop all ${brand} </a>`;

            moreProductsSection.appendChild(viewBrandButton);
        } 
    }

    addBrandLink();
}