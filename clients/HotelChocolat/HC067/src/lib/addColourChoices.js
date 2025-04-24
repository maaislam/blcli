import shared from "./shared";

const colourObj = {
    'Copper': {
        id: '472726M',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw60e28e28/images/472786-1.jpg?sw=500&sh=500&sm=fit',
    },
    'Charcoal': {
        id: '472727M',
        image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwb83c3862/images/472787-1.jpg?sw=500&sh=500&sm=fit',
    },
    'White': {
        id: '472725M',
        image: 'https://editor-assets.abtasty.com/48343/5f3fbed6b81db1598013142.jpg',
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