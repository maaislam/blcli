import shared from "../shared";
import { getData } from "../productData";

export default () => {

    const { ID } = shared;

    let warranty;
    const productSKU = window.digitalData.product[0].productInfo.masterSku;
    const productObj = getData(productSKU);

    const usps = {
        usp1: {
            icon: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/D3A3D39479CB501877CE45D7846A1CBCBDD9D4291CFC78D406EC5C934984D4A2.png?meta=/EJ084---Tissot-and-Longines-addition/noun_Refund_1544357.png',
            tissotIcon: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/83A13EB064E719760CC511AAB673883FE844621215946F3876EC6F9804C0A3DB.png?meta=/EJ084---Tissot-and-Longines-addition/noun_Refund_1544357-1.png',
            text: 'Free Returns',
        },
        usp2: {
            icon: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/39126AF50D79B348F47F7669F8023471FB2795A716CAC033DECC67AD33F7FA8B.png?meta=/EJ084---Tissot-and-Longines-addition/noun_warranty_85329.png',
            tissotIcon: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/667822262888477F00E24B7135E9BF1543286C5C1D612ADD6B86CFC0B2E1F7B4.png?meta=/EJ084---Tissot-and-Longines-addition/noun_warranty_85329-1.png',
            text: `${productObj.warranty} Year Warranty`,
        },
        usp3: {
            icon: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5AFCC312C63B3DC2C35C42E475327C2B2EB43764DC1211AC376D1173652C6CFA.png?meta=/EJ084---Tissot-and-Longines-addition/noun_delivery_1944507.png',
            tissotIcon: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/D44545D9E8873B2CB78E4B8F216B03AE3CAD511E5B3B21D0254DE4D9AD412B0F.png?meta=/EJ084---Tissot-and-Longines-addition/noun_delivery_1944507-1.png',
            text: 'Free Express Delivery',
        }
    }

    Object.keys(usps).forEach((i) => {
        const data = usps[i];

        const usp = document.createElement('div');
        usp.classList.add(`${ID}-uspBlock`);
        usp.classList.add('swiper-slide');
        usp.innerHTML = `<span style="background-image:url('${document.body.classList.contains(`${ID}-ts`) ? data.tissotIcon : data.icon}')"></span><p>${data.text}</p>`;

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