
import shared from "../../../../../core-files/shared";
import { getData } from "../productData";


export default () => {

    const { ID } = shared;
    const productSKU = window.digitalData.product[0].productInfo.masterSku;
    const productObj = getData(productSKU);

    const usps = {
        usp1: {
            icon: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/986b0084-0b24-11ec-b354-3e51c8c235e0',
            text: `${productObj.warranty} Year Warranty`,
        },
        usp2: {
            icon: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/87d384a2-0b25-11ec-820c-42d137037b90',
            text: 'Free Returns',
        },
        usp3: {
            icon: 'https://storage.googleapis.com/exp-app-storage/63c9e2be-b0b2-11ea-b9e3-3af835c8f71c/media/original/c6ce9676-0b23-11ec-8837-de27dbedefe0',
            text: 'Official Stockist',
        }
    }

    Object.keys(usps).forEach((i) => {
        const data = usps[i];

        const usp = document.createElement('div');
        usp.classList.add(`${ID}-uspBlock`);
        usp.classList.add('swiper-slide');
        usp.innerHTML = `<span style="background-image:url('${document.body.classList.contains(`${ID}-br`) ? data.brIcon : data.icon}')"></span><p>${data.text}</p>`;

        document.querySelector(`.${ID}__usps .swiper-wrapper`).appendChild(usp);
    });

    const mySwiper = new Swiper (`.${ID}__usps .swiper-container`, {
        direction: 'horizontal',
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
        },
    });

    if(window.innerWidth > 767) {
        mySwiper.destroy(true, true);
    }
    
}