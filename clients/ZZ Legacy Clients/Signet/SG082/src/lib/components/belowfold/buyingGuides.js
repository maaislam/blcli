/**
 * Add buying guides
 */

import shared from "../../shared";

export default () => {

    const { ID } = shared;

    const articles = {
        'How to Secretly Discover Your Partner’s Ring Size': {
            image: 'https://service.maxymiser.net/cm/images-us/1/1/2/702F1F9432188B52A31CF7CAB9D557E698A8EB9A7FC76959F779778D24062F0F/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/ringsize.png',
            description: 'The perfect surprise marriage proposal needs a diamond engagement ring, but what if you don’t know your partner’s ring finger size? We have some secret methods to help you buy the ideal diamond ring.',
            link: '/webstore/blog/secretly-discover-your-partners-ring-size/',
        },
        'Engagement Ring Buying Guide': {
            image: 'https://service.maxymiser.net/cm/images-us/1/1/2/41218D90FFCE5F004FA2C12769071E802E8E71ECB90D292A400EA6507AF1F852/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/buyingguide.png',
            description: 'Our comprehensive engagement ring guide covers all the most important elements, from the carat and clarity of diamonds to the subtle differences between different styles and metals.',
            link: '/webstore/engagement-ring-buyers-guide.cdo?icid=ej-tn-engagement-guide',
        },
    };

    Object.keys(articles).forEach((i) => {
        const data = articles[i];
        const article = document.createElement('div');
        article.classList.add(`${ID}__article`);
        article.innerHTML = 
        `<div class="${ID}__colLeft">
            <div class="${ID}__image" style="background-image:url(${data.image})"></div>
        </div>
        <div class="${ID}__colRight">
            <h3 class="${ID}__heading">${[i][0]}</h3>
            <p class="${ID}__paragraph">${data.description}</p>
            <a class="${ID}__contentLink" target="_blank" href="${data.link}">Learn More</a>
        </div>`;

        document.querySelector(`.${ID}__buyingGuides .${ID}__sectionContainer`).appendChild(article);
    });
}