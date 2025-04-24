import shared from "../../shared";

export default () => {

    const { ID } = shared;

    let deliveryText;
    const freeDeliveryEligible = document.querySelector('.product-propositions__message');
    if(freeDeliveryEligible.textContent.indexOf('This product is eligible for free standard delivery') > -1) {
        deliveryText = 'This product is eligible for free standard delivery'
    } else {
        deliveryText = 'Available on orders over £49';
    }

    const usps = {
        usp1: {
            icon: 'https://service.maxymiser.net/cm/images-us/hsamuel-co-uk/348B86F53845CC62ADE1D49667880FC87DE2999136126CA474160F893BA0DC52.png?meta=/SG088---H-Samuel---Fashion-Watches/noun_deliverytruck_2657140.png',
            title: 'Free Delivery',
            subText: deliveryText,
        },
        usp2: {
            icon:  'https://service.maxymiser.net/cm/images-us/hsamuel-co-uk/3157B74D7CE0BB2306E60AE97CE6CD5F8E4720E08BEADCEB3D4BB2012D8154CC.png?meta=/SG088---H-Samuel---Fashion-Watches/noun_tick_908358.png',
            title: 'Save 10%',
            subText: `Sign up to our <span class="${ID}-newsletter">newsletter</span>and get a code to save 10% today`,
        },
        usp3: {
            icon: 'https://service.maxymiser.net/cm/images-us/hsamuel-co-uk/2C63D9F66D54D0281EFAA5488ACE03DA99E0C320EB4AB0FF0B290FABCD41A6B0.png?meta=/SG088---H-Samuel---Fashion-Watches/noun_returnpackage_3424244.png',
            title: 'Free Returns & Exchanges.',
            subText: 'Giving you peace of mind so you can try the watch on at home.',
        }
    }

    Object.keys(usps).forEach((i) => {
        const data = usps[i];

        const usp = document.createElement('div');
        usp.classList.add(`${ID}-uspBlock`);
        usp.innerHTML = `<span style="background-image:url('${data.icon}')"></span><div class="${ID}__uspText"><h4>${data.title}</h4><p>${data.subText}</p></div>`;

        document.querySelector(`.${ID}__usps .${ID}__sectionContainer`).appendChild(usp);
    });

    function scrollToElement(element) {
        window.scroll({
          behavior: 'smooth',
          left: 0,
          top: element.getBoundingClientRect().top + window.scrollY - 200,
        });
      }
    const newsletterEl = document.querySelector(`.${ID}-newsletter`);
    if(newsletterEl) {
        newsletterEl.addEventListener('click', () => {
            scrollToElement(document.querySelector('#skip-to-email-sign-up'));
        });
    }
}