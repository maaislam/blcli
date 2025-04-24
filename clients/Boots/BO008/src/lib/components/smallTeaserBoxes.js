/**
 * @desc thin grey boxes
 */

import shared from "../shared";

export default () => {

    const { ID } = shared;

    const createBoxes = () => {
        const boxes = {
            box1: {
                image: 'https://via.placeholder.com/150',
                title: 'Save up to 1/2 price',
                boxText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit*',
                link: '#',
           },
           box2: {
                image: 'https://via.placeholder.com/150',
                title: 'Save up to 1/2 price',
                boxText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit*',
                link: '#',
            },
            box3: {
                image: 'https://via.placeholder.com/150',
                title: 'Save up to 1/2 price',
                boxText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit*',
                link: '#',
            },
            box4: {
                image: 'https://via.placeholder.com/150',
                title: 'Save up to 1/2 price',
                boxText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit*',
                link: '#',
            }
        }
    
        Object.keys(boxes).forEach((i) => {
            const data = boxes[i];
            const boxEl = document.createElement('div');
            boxEl.classList.add(`col-6-sm`);
            boxEl.classList.add(`col-3`);
            boxEl.classList.add(`${ID}__teaserBox`);

            boxEl.innerHTML = 
            `<div class="${ID}__outer">
                <div class="${ID}__inner">
                    <div class="${ID}__inner-image">
                        <div class="${ID}__image" style="background-image:url(${data.image})"></div>
                    </div>
                    <div class="${ID}__inner-text">
                        <h3 class="${ID}__h3">${data.title}</h3>
                        <p class="${ID}__p">${data.boxText}</p>
                        <a href="${data.link}" class="${ID}__buttonLink ${ID}__quaternaryBlue">Shop now</a>
                    </div>
                </div>
            </div>`;
        
            document.querySelector(`.${ID}__smallBoxes .row`).appendChild(boxEl);
        });
    }
    createBoxes();
}