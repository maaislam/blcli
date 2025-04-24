import shared from "../../../../../../core-files/shared";
import { getData } from "../data";

export default () => {

    const { ID } = shared;

    const productSKU = window.digitalData.product[0].productInfo.masterSku;
    const productObj = getData(productSKU);

    const usps = {
        usp1: {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/42DF72A936AC4119E629A52E3942A485DD0003097BD6652218BE755F738744EA/ernestjones-co-uk/EJ059---Prestige-Watch-PDP/returns.png',
            brIcon: 'https://service.maxymiser.net/cm/images-us/1/1/2/45043284ACC84EE7ACC9D29DD08C048A875A707139C3966105027ABA39A34336/ernestjones-co-uk/EJ059---Prestige-Watch-PDP/noun_Refund_1544357.png',
            text: 'Free Returns',
        },
        usp2: {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/82A7FFF77AD352836C23E4478C6388DDEEA6956973028CEB7EF66C74603B9749/ernestjones-co-uk/EJ059---Prestige-Watch-PDP/warranty.png',
            brIcon: 'https://service.maxymiser.net/cm/images-us/1/1/2/92F7B6540F704CB62ED5065ED5FB74FC98067D88BC1499A2E5E428C16300E022/ernestjones-co-uk/EJ059---Prestige-Watch-PDP/noun_warranty_85329.png',
            text: `${productObj.warranty} Year Warranty`,
        },
        usp3: {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/563C340A7653FC1E9F209F8212B5EC0CDCF3301BE8AB51FF36568BBE7438CF17/ernestjones-co-uk/EJ059---Prestige-Watch-PDP/delivery.png',
            brIcon: 'https://service.maxymiser.net/cm/images-us/1/1/2/0C228CBEB7570E5464F141BC32F66348D40BC040AFFED62096B2704F777CC923/ernestjones-co-uk/EJ059---Prestige-Watch-PDP/noun_delivery_1944507.png',
            text: 'Free Delivery',
        }
    }

    Object.keys(usps).forEach((i) => {
        const data = usps[i];

        const usp = document.createElement('div');
        usp.classList.add(`${ID}-uspBlock`);
        usp.classList.add('swiper-slide');
        usp.innerHTML = `<span style="background-image:url('${data.icon}')"></span><p>${data.text}</p>`;

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