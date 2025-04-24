import shared from "../../../../../core-files/shared";

const { ID } = shared;

const addButtons = (buttonsArray) => {

    let buttons = '';
    buttonsArray.forEach(function(button){
        buttons += `<a class="${ID}-button" href="${button.link}">${button.name}</a>`
    });

    return buttons;
}

export const addGridTile = (className, gridData) => {

    const gridTileMarkup = 
    `<div class="${className}">
        ${gridData.imageLink ? `<a class="${ID}-linkFull" href="${gridData.imageLink}"></a>` : ''}
            <div class="${ID}-image">
                <picture>
                    <source media="(min-width:300px)" srcset="${gridData.mobileImage}">
                    <source media="(min-width:767px)" srcset="${gridData.desktopImage}">
                    <img src="${gridData.desktopImage}" alt="img">
                </picture>
            </div>
            ${gridData.textBanner ? 
                `
                <div class="${ID}-textBanner">
                    ${gridData.textBanner.title ? `<span>${gridData.textBanner.title}</span>` : ''}
                    ${gridData.textBanner.ctas ? `<div class="${ID}-ctas">${addButtons(gridData.textBanner.ctas)}</div>` : ''}
                </div>
            `: ''}
    </div>`;

    return gridTileMarkup;
}