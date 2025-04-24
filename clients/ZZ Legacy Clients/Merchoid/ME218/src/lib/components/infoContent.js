import shared from '../shared';

const { ID } = shared;

export default () => {

    let jumperName;
    let markup;
    let urlName;
    const URL = window.location.pathname;

    if(URL.indexOf('/us/') > -1) {
        jumperName = 'sweater';
        urlName = '/us/';
    } else {
        jumperName = 'jumper';
        urlName = '/uk/';
    }

    const knitted = {
        heading: `Genuine knitted Christmas ${jumperName}`,
        smallText: `A Christmas ${jumperName} just isn’t the same unless it’s knitted. This knitted Christmas ${jumperName} is all you need to feel really festive this season.`,
        point1: '100% knitted',
        point2: 'Machine washable',
    };

    const exclusive = {
        heading: 'Exclusive collection',
        smallText: `This Christmas ${jumperName} is exclusive to Merchoid - you can’t find it anywhere else. Love what you see? Don’t leave it behind.`,
        point1: '[Material]',
        point2: 'Machine washable',
    };

    const printed = {
        heading: 'Comfy and cosy',
        smallText: `Keep it casual in this comfy sweatshirt, the fleece lining is cosy whilst the design is sharp, making an enviable festive combination.`,
        point1: '[Material]',
        point2: 'Machine washable',
    };

    // if knitted URLs
    const printedURL = [
        `${urlName}rick-and-morty-get-wrecked-xmas-sweater-jumper/`,
        `${urlName}superman-christmas-sweaterjumper/`,
        `${urlName}harley-quinn-christmas-sweaterjumper/`,
        `${urlName}nintendo-super-mario-bros-jumping-green-unisex-christmas-sweater-jumper/`,
        `${urlName}star-wars-christmas-tree-christmas-sweaterjumper/`,
        `${urlName}star-wars-stormtrooper-christmas-sweaterjumper/`,
        `${urlName}star-wars-darth-vader-christmas-sweaterjumper/`,
        `${urlName}green-lantern-christmas-sweaterjumper/`,
    ];

    const exclusiveURL = [
        `${urlName}nintendo-super-mario-bros-blue-christmas-sweaterjumper/`,
        `${urlName}star-wars-lack-of-cheer-disturbing-unisex-knitted-christmas-sweaterjumper/`,
        `${urlName}spider-man-big-eyes-knitted-unisex-christmas-sweater-jumper/`,
        `${urlName}spider-man-knitted-unisex-christmas-sweater-jumper/`,
        `${urlName}sonic-the-hedgehog-unisex-knitted-christmas-sweaterjumper/`,
        `${urlName}star-wars-at-at-hoth-unisex-knitted-christmas-sweaterjumper/`,
        `${urlName}star-wars-trench-run-knitted-christmas-sweater-jumper/`,
        `${urlName}star-wars-merry-sithmas-knitted-unisex-christmas-sweaterjumper/`,
        `/uk/star-wars-christmas-tree-christmas-sweaterjumper/`,
        `${urlName}star-wars-darth-vader-christmas-sweaterjumper/`,
        `${urlName}star-wars-stormtrooper-christmas-sweaterjumper/`,
        `${urlName}green-lantern-christmas-sweaterjumper/`,
    ];

    // if none of the urls match the printed/exclusive array
    // set to knitted 
    markup = knitted;
    for (let i = 0; i < printedURL.length; i += 1) {
        if(window.location.href.indexOf(printedURL[i]) > -1) {
            markup = printed;
        } 
    }
    for (let i = 0; i < exclusiveURL.length; i += 1) {
        if(window.location.href.indexOf(exclusiveURL[i]) > -1) {
            markup = exclusive;
        } 
    }


    // get the first image and the fourth image
    const firstImage = document.querySelector('.fotorama-item .fotorama__nav .fotorama__nav__frame img');
    const fourthImage = document.querySelectorAll('.fotorama-item .fotorama__nav .fotorama__nav__frame')[3].querySelector('img');
    // add the markup to the description
    const descriptionMarkup = 
    `<div class="${ID}-sectionContent">
        <h4>${markup.heading}</h4>
        <div class="${ID}-productImage" style="background-image: url(${firstImage.getAttribute('src')})"></div>
        <div class="${ID}-innerText">
            <p>${markup.smallText}</p>
            <ul>
                <li>${markup.point1}</li>
                <li>${markup.point2}</li>
            </ul>
        </div>
    </div>
    <div class="${ID}-sectionContent bottom">
        <h4>Amazing design</h4>
        <div class="${ID}-productImage" ${fourthImage ? `style="background-image: url(${fourthImage.getAttribute('src')})` : ''}"></div>
        <div class="${ID}-innerText">
            <p>This ain't your Grandma's knitted ${jumperName}; lovingly detailed and expertly knitted - your Christmas has come early!</p>
        </div>
    </div>`;

    document.querySelector(`.${ID}-productInfo`).innerHTML = descriptionMarkup;


    
}