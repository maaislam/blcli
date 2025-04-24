import shared from "../shared";

export default () => {

    const { ID } = shared;

    const propositionBox = () => {
        const uspBoxes = {
            usp1: {
                image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/CA2C5D9B8700CC3EDFB550DDF3BE87397E7A097AC8E8250363E1413B331733F4/new-boots-com/BO008---VML-DDL-Homepage/ClickCollect.svg',
                title: 'Click & collect',
                boxText: 'Free when you spend £10',
           },
           usp2: {
                image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/CDE35047BFAED49A55D295AB255B5F619C52CBBC32AE0B0E70B40DC27E63B77D/new-boots-com/BO008---VML-DDL-Homepage/homeDelivery.svg',
                title: 'Home delivery',
                boxText: 'Free when you spend £45',
            },
            usp3: {
                image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/4DB971896B36C80222B0D38F3EA14F21C05B93DAF9067E54EE04E5115E3137CC/new-boots-com/BO008---VML-DDL-Homepage/advantageCard.svg',
                title: 'Advantage card',
                boxText: 'Collect 4 points per £1',
            },
            usp4: {
                image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/D98B52F85F702939B58987D8B605B94DDEB846E78FD8E2A417BF38161A4C13E9/new-boots-com/BO008---VML-DDL-Homepage/bootsApp.svg',
                title: 'The Boots app',
                boxText: 'Never miss out on points again',
            }
        }
    
        Object.keys(uspBoxes).forEach((i) => {
            const data = uspBoxes[i];
            const uspEl = document.createElement('div');
            uspEl.classList.add(`col-6-sm`);
            uspEl.classList.add(`col-3`);
            uspEl.classList.add(`${ID}__propBox`);

            uspEl.innerHTML = 
            `<div class="${ID}__innerText">
                <div class="${ID}__icon" style="background-image:url(${data.image})"></div>
                <span>${data.title}</span>
                <p class="${ID}__p">${data.boxText}</p>
            </div>`;
        
            document.querySelector(`.${ID}__propositions .row`).appendChild(uspEl);
        });
    }
    propositionBox();
}