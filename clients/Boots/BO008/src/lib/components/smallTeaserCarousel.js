/**
 * @desc makes the thin grey boxes in the carousel
 */

import shared from "../shared";

export default () => {

    const { ID } = shared;
    const $ = window.jQuery;

    const createCarouselBoxes = () => {
        const boxes = {
            box1: {
                image: 'https://via.placeholder.com/150',
                title: 'Save up to 1/2 price',
                boxText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit*',
                link: '#',
                flash: `<div class="${ID}__flash ${ID}__flashRed">Was £299.99<span>Now £199.99</span></div>`,
                disclaimer: `<div class="${ID}__disclaimer">*Lorem ipsum dolor sit amet</div>`,
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
                flash: `<div class="${ID}__flash ${ID}__flashRed">Was £299.99<span>Now £199.99</span></div>`,
            },
            box4: {
                image: 'https://via.placeholder.com/150',
                title: 'Save up to 1/2 price',
                boxText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit*',
                link: '#',
            },
            box5: {
                image: 'https://via.placeholder.com/150',
                title: 'Save up to 1/2 price',
                boxText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit*',
                link: '#',
                disclaimer: `<div class="${ID}__disclaimer">*Lorem ipsum dolor sit amet</div>`,
            },
            box6: {
                image: 'https://via.placeholder.com/150',
                title: 'Save up to 1/2 price',
                boxText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit*',
                link: '#',
            },
            box7: {
                image: 'https://via.placeholder.com/150',
                title: 'Save up to 1/2 price',
                boxText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit*',
                link: '#',
                flash: `<div class="${ID}__flash ${ID}__flashRed">Was £299.99<span>Now £199.99</span></div>`,
            },
            box8: {
                image: 'https://via.placeholder.com/150',
                title: 'Save up to 1/2 price',
                boxText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit*',
                link: '#',
                flash: `<div class="${ID}__flash ${ID}__flashRed">Was £299.99<span>Now £199.99</span></div>`,
            },
        }
    
        Object.keys(boxes).forEach((i) => {
            const data = boxes[i];
            const boxEl = document.createElement('div');
            boxEl.classList.add(`col-6-sm`);
            boxEl.classList.add(`col-3`);
            boxEl.classList.add(`${ID}__teaserBox`);
            boxEl.classList.add(`${ID}__carouselBox`);

            boxEl.innerHTML = 
            `<div class="${ID}__outer">
                <div class="${ID}__inner">
                    <div class="${ID}__inner-image">
                        <div class="${ID}__image" style="background-image:url(${data.image})"></div>
                        ${data.flash ? data.flash : ''}
                    </div> 
                    
                    <div class="${ID}__inner-text">
                        <h3 class="${ID}__h3">${data.title}</h3>
                        <p class="${ID}__p">${data.boxText}</p>
                        <a href="${data.link}" class="${ID}__buttonLink ${ID}__quaternaryBlue">Shop now</a>
                        ${data.disclaimer ? data.disclaimer : ''}
                    </div>
                </div>
            </div>`;
        
            document.querySelector(`.${ID}__smallBoxes.${ID}__carouselBar .${ID}__carousel__inner`).appendChild(boxEl);
        });
    }
    createCarouselBoxes();

    // slick the brand bar
    const slickBoxes = () => {
        $(`.${ID}__smallBoxes.${ID}__carouselBar .${ID}__carousel__inner`).slick({
            //centerMode: true,
            //centerPadding: '10px',
            infinite: true,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 4,
        });
    }
    // only on tablet
    if(window.innerWidth > 1100) {
        document.querySelector(`.${ID}__smallBoxes.${ID}__carouselBar .${ID}__carousel__inner`).classList.add('container');
        slickBoxes();
    }
}