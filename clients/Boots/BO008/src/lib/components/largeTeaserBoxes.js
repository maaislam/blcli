import shared from "../shared";

export default () => {

    const { ID } = shared;

    const createBoxes = () => {
        const largeboxes = {
            box1: {
                image: 'https://via.placeholder.com/150',
                subtitle: 'Subtitle',
                title: 'Save up to 1/2 price',
                boxText: 'The gliding, lightweight texture with ultra-fine pigments perfectly matches 100% of the population',
                flash: `<div class="${ID}__flash ${ID}__flashRed">Was £299.99<span>Now £199.99</span></div>`,
                link: '#',
           },
           box2: {
                image: 'https://via.placeholder.com/150',
                title: 'Save up to 1/2 price',
                subtitle: 'Subtitle',
                flash: `<div class="${ID}__flash ${ID}__flashRed">Was £299.99<span>Now £199.99</span></div>`,
                boxText: 'The gliding, lightweight texture with ultra-fine pigments perfectly matches 100% of the population',
                link: '#',
            },
        }
    
        Object.keys(largeboxes).forEach((i) => {
            const data = largeboxes[i];
            const boxEl = document.createElement('div');
            boxEl.classList.add(`col-12-sm`);
            boxEl.classList.add(`col-6`);
            boxEl.classList.add(`${ID}__teaserBox`);
            boxEl.innerHTML = 
            `<div class="${ID}__outer ${ID}__fullImage"">
                <div class="${ID}__inner">
                    <div class="${ID}__inner-image" style="background-image:url(${data.image})"/>
                    ${data.flash ? data.flash : ''}
                    <div class="${ID}__subtitleBanner"><h3 class="${ID}__h3">${data.subtitle}</h3></div>
                    </div>
                    <div class="${ID}__inner-text">
                        <h3 class="${ID}__h3">${data.title}</h3>
                        <p class="${ID}__p">${data.boxText}</p>
                        <div class="${ID}__button ${ID}__secondary ${ID}__secondary__ghostBlue col-sm-12 col-6">
                            <a href="${data.link}">Find out more</a>
                        </div>
                    </div>
                </div>
            </div>`;
        
            document.querySelector(`.${ID}__largeBoxes .row`).appendChild(boxEl);
        });
    }
    createBoxes();
}