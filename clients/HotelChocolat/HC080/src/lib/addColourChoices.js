import shared from "./shared";

const colourObj = {
    'Limited Edition: Stellar White': {
        id: '472810',
        image: 'https://editor-assets.abtasty.com/48343/618a3db87b6b21636449720.jpg',
    },
    'Copper': {
        id: '472726',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw60e28e28/images/472786-1.jpg?sw=500&sh=500&sm=fit',
    },
    'Charcoal': {
        id: '472727',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwb83c3862/images/472787-1.jpg?sw=500&sh=500&sm=fit',
    },    
}


const { ID } = shared;

export const addColourChoices = () => {
    // add accessories
    Object.keys(colourObj).forEach((i) => {
        const colourData = colourObj[i];
        const colour = document.createElement('div');
        colour.classList.add(`${ID}-product`);
        colour.classList.add(`${ID}-colour`);
        colour.setAttribute('prod-id', colourData.id);
        colour.setAttribute('prod-name', [i][0]);
        colour.innerHTML = `
        <div class="${ID}-productimage" style="background-image:url(${colourData.image})"></div>
        <p>${[i][0]}<span class="${ID}-price">£99.95</span></p>`;

        document.querySelector(`.${ID}-accordionStep.${ID}-colours .${ID}-stepContent`).appendChild(colour);
    });
}