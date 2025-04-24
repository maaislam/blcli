/**
 * Replace the first product with in-grid content
 */

import shared from "./shared";

export default () => {
    const { ID } = shared;
    const gridBlocks = {
        bestsellers:{
            background: '#f7ced4',
            title: `<span>Our editors</span><span>bestselling picks</span>`,
            link: '#',
            linkText: 'Shop now'
        },
        new:{
            background: '#cfeaca',
            title: `<span>Our editors</span><span>new beauty picks</span>`,
            link: '#',
            linkText: 'Shop now'
        },
        seasonal:{
            background: '#d3f1bf',
            title: `<span>Our editors</span><span>top beauty picks</span>`,
            link: '#',
            linkText: 'Shop now'
        },
    }

    Object.keys(gridBlocks).forEach((i) => {
        const data = gridBlocks[i];

        const gridBlock = `
        <div class="${ID}-contentBlock estore_product_container" style="background-color:${data.background}">
            <div class="${ID}-text">${data.title}</div>
            <a class="${ID}-button ${ID}-blue">${data.linkText}</a>
        </div>`
        
        const matchingCarousels = document.querySelector(`.${ID}-tabCarousel[tab-data="${[i][0]}"]`);
        
        // replace inner html of matching
        if(matchingCarousels) {
          matchingCarousels.querySelectorAll(`.${ID}-product:not(.slick-cloned)`)[1].innerHTML = gridBlock;
        }

    });


}