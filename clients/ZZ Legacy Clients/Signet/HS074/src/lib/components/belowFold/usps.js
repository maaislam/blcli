import shared from "../../shared";

export default () => {

    const { ID } = shared;


    let usp2Icon;
    let uspTitle;
    let usp2Text;


    // check if the diamond is certified
    const exclusiveCertificated = document.querySelectorAll('.product-properties__property-text');

    if(exclusiveCertificated) {
        for (let index = 0; index < exclusiveCertificated.length; index++) {
            const element = exclusiveCertificated[index];
            if(element) {
                if(element.innerText.indexOf('Certificated diamond') > -1){
                    uspTitle = 'Certificated diamond';
                    usp2Icon = 'https://service.maxymiser.net/cm/images-us/1/1/2/A2A9147FD2FBEB028A860204D7F69BC00C16C5DEC57BD0BD164DC887D8D4E495/hsamuel-co-uk/HS074---Engagement-Rings-PDP/noun_Diamond_2356115Copy.png',
                    usp2Text = 'Every certificated diamond comes complete with a Jewellery Identification Report from the International Gemmological Institute'; 
                } else {
                    uspTitle = 'Free click and collect';
                    usp2Icon = 'https://service.maxymiser.net/cm/images-us/1/1/2/0D15B44503C2310F77B698D1AFB60100FBDFDD5F18BC8835B738ED78F5E865DF/hsamuel-co-uk/HS074---Engagement-Rings-PDP/clickcollect.png';
                    usp2Text = 'Purchase online and have your order delivered to store for free. You can have your order sent to any H Samuel store in the UK.'; 
                }
            }
            
        }
    } else {
        uspTitle = 'Free click and collect';
        usp2Icon = 'https://service.maxymiser.net/cm/images-us/1/1/2/0D15B44503C2310F77B698D1AFB60100FBDFDD5F18BC8835B738ED78F5E865DF/hsamuel-co-uk/HS074---Engagement-Rings-PDP/clickcollect.png';
        usp2Text = 'Purchase online and have your order delivered to store for free. You can have your order sent to any H Samuel store in the UK.'; 
    }

    const usps = {
        usp1: {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/B11F52412313A0FB90DC65821147B9CCEE365AE0C92CA61BDF99A9FEDA177153/hsamuel-co-uk/HS074---Engagement-Rings-PDP/noun_Refund_1544357Copy.png',
            title: 'Free Returns',
            text: 'If your ring isn’t right for you, we offer free returns and exchanges online and in-store',
        },
        usp2: {
            icon:  usp2Icon,
            title: uspTitle,
            text:  usp2Text,
        },
        usp3: {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/FB56E9F18D2ED6CC40DB57BB4BECDB920C8E3F24D7CCE74368DB18E46F6A9EF3/hsamuel-co-uk/HS074---Engagement-Rings-PDP/noun_delivery_1944507copy.png',
            title: `Free Discreet Delivery`,
            text: 'We offer free discreet delivery so you can be assured your loved one won’t figure out your surprise.',
        }
    }

    Object.keys(usps).forEach((i) => {
        const data = usps[i];

        const usp = document.createElement('div');
        usp.classList.add(`${ID}-uspBlock`);
        usp.classList.add('swiper-slide');
        usp.innerHTML = `<span style="background-image:url('${data.icon}')"></span><h4>${data.title}</h4><p>${data.text}</p>`;

        document.querySelector(`.${ID}__usps .swiper-wrapper`).appendChild(usp);
    });

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