import shared from "../../shared";
import { getSiteFromHostname } from "../../services";

export default () => {

    const { ID } = shared;

    let returnIcon;
    let collectIcon;
    let deliveryIcon;

    if(getSiteFromHostname() === 'ernestjones') {
        returnIcon = 'https://service.maxymiser.net/cm/images-us/1/1/2/70B0A01526C52E2B702EAD5B55E86759A81DFB6F212A95412A8E5C8FCC3ACE48/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/noun_Refund_1544357.png';
        collectIcon = 'https://service.maxymiser.net/cm/images-us/1/1/2/EC0C46FCDA69D9EC57240BD6A9ACE39DB1EBBA861EAE424984FA44F3E8978029/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/clickandcollect.png';
        deliveryIcon = 'https://service.maxymiser.net/cm/images-us/1/1/2/48714073A1C6D92825D2F95B81FCD73308BE245A3C00273B7E80B8D9A28980B6/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/noun_delivery_1944507.png';
    } else if (getSiteFromHostname() === 'hsamuel') {
        returnIcon = 'https://service.maxymiser.net/cm/images-us/1/1/2/B11F52412313A0FB90DC65821147B9CCEE365AE0C92CA61BDF99A9FEDA177153/hsamuel-co-uk/HS074---Engagement-Rings-PDP/noun_Refund_1544357Copy.png';
        collectIcon = 'https://service.maxymiser.net/cm/images-us/1/1/2/0D15B44503C2310F77B698D1AFB60100FBDFDD5F18BC8835B738ED78F5E865DF/hsamuel-co-uk/HS074---Engagement-Rings-PDP/clickcollect.png';
        deliveryIcon = 'https://service.maxymiser.net/cm/images-us/1/1/2/FB56E9F18D2ED6CC40DB57BB4BECDB920C8E3F24D7CCE74368DB18E46F6A9EF3/hsamuel-co-uk/HS074---Engagement-Rings-PDP/noun_delivery_1944507copy.png';
    }


    // check if the diamond is certified
    const productDesc = document.querySelector('.product-description');


    const usps = {
        usp1: {
            icon: returnIcon,
            title: 'Free Returns',
        },
        usp2: {
            icon:  collectIcon,
            title: 'Free Click & Collect',
        },
        usp3: {
            icon: deliveryIcon,
            title: `Free Discreet Delivery`,
        }
    }

    Object.keys(usps).forEach((i) => {
        const data = usps[i];

        const usp = document.createElement('div');
        usp.classList.add(`${ID}-uspBlock`);
        usp.classList.add('swiper-slide');
        usp.innerHTML = `<span style="background-image:url('${data.icon}')"></span><h4>${data.title}</h4>`;

        document.querySelector(`.${ID}__usps .swiper-wrapper`).appendChild(usp);
    });
    
    // setTimeout(function(){  
    // if (window.digitalData.product[0].productInfo.onSale = true){
    //     document.querySelectorAll('.product-price--current')[1].style.color = '#dd223b'
    // }
    // }, 500);

    const mySwiper = new Swiper (`.${ID}__usps .swiper-container`, {
        direction: 'horizontal',
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 7000,
        },
    });

    if(window.innerWidth > 767) {
        mySwiper.destroy(true, true);
    }
    
}