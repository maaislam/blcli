import shared from "../../shared";

export default () => {

    const { ID } = shared;

    let usp2Icon;
    let uspTitle;
    let usp2Text;


    // check if the diamond is certified

    const productDesc = document.querySelector('.product-description');

    const certificated = document.querySelector('.product-description__certified-diamond');
    if((certificated && certificated.innerText.indexOf('Certificated diamond') > -1) || (productDesc.innerText.indexOf('Certificated by GSI') > -1)) {
        uspTitle = 'Certificated diamond';
        usp2Icon = 'https://service.maxymiser.net/cm/images-us/1/1/2/CC21B8658C36648B452269801421F8289B830ABC88D2670A06C45C0828ACBD99/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/noun_Diamond_2356115.png';
        usp2Text = 'Every certificated diamond comes complete with a Jewellery Identification Report from the International Gemmological Institute'; 
    } else {
        uspTitle = 'Free click and collect';
        usp2Icon = 'https://service.maxymiser.net/cm/images-us/1/1/2/EC0C46FCDA69D9EC57240BD6A9ACE39DB1EBBA861EAE424984FA44F3E8978029/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/clickandcollect.png';
        usp2Text = 'Purchase online and have your order delivered to store for free. You can have your order sent to any Ernest Jones store in the UK.'; 
    }


    const usps = {
        usp1: {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/70B0A01526C52E2B702EAD5B55E86759A81DFB6F212A95412A8E5C8FCC3ACE48/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/noun_Refund_1544357.png',
            title: 'Free Returns',
            text: 'If your ring isn’t right for you, we offer free returns and exchanges online and in-store',
        },
        usp2: {
            icon:  usp2Icon,
            title: uspTitle,
            text:  usp2Text,
        },
        usp3: {
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/48714073A1C6D92825D2F95B81FCD73308BE245A3C00273B7E80B8D9A28980B6/ernestjones-co-uk/EJ074---Engagement-Ring-PDP/noun_delivery_1944507.png',
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