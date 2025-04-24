/**
 * add brand story if it matches
 */

import shared from "../../shared";

export default () => {

    const { ID } = shared;

    

    let title;
    let brandText;

    const description = document.querySelector('.product-description');

    const dataBrand = window.digitalData.product[0].productInfo.brand;
    const brands = {
        'The Forever Diamond': {
            title: 'Brand Story',
            brandText: "The Forever Diamond has a unique flower cut featuring 73 beautifully proportioned facets, 15 more than the average brilliant cut diamond. The result is exceptional sparkle and radiance, as more facets means there are more surfaces for light to bounce off. This cut is exclusive to H.Samuel, so it cannot be found anywhere else on the marketplace, making it even more special and unique.",
            subText: 'The exclusive Forever Diamond range is independently certificated for the diamond 4Cs. This is your guarantee of quality and beauty.',
        }, 
        'Emmy London': {
            title: 'Brand Story',
            brandText: 'Emmy Scarterfield is the designer behind the luxury brand Emmy London.<br></br>Emmy London has evolved as a recognised luxury lifestyle brand, focusing on bridal & event shoes and accessories that encompass undeniable beauty, bespoke craftsmanship and quintessentially British style. Whilst attention to detail is at the heart of everything the designer represents, it’s the hidden diamond on the sole of the shoes and the band of the rings that captures the hearts of her fans.<br></br>Emmy now draws on her design expertise to bring a collection of modern and exquisite diamond jewellery with art deco influences, exclusively to H.Samuel.',
            subText: "Crafted with elegance, each piece of the Emmy London collection is delicately detailed from all angles. Every piecehas been independentlycertified for the 3 C’s and Emmy's range of rings features a hidden diamond alongside Emmy’s signature logo which echoes the design on the sole of her bridal shoes, and of course all items come in beautiful packaging echoing an Emmy London shoe box.",
        },
        'Enchanted Disney Fine Jewelry': {
            title: 'Brand Story',
            brandText: "Making your fairytale a happily ever after, has inspired us to curate a collection that brings out the inner princess in you. With Bridal rings and jewellery inspired by the attributes of each Disney Princess, experience magical moments with the exclusive Enchanted Disney fine Jewelery collection that connects you to a special place in your heart, filled with love, romance and dreams.",
            subText: `Happily forever after begins at H.Samuel. <br></br><a href="https://www.hsamuel.co.uk/webstore/brands/enchanted-disney-fine-jewelry.cdo?icid=hs-plp-enchanted-disney#quiz" class="${ID}__textLink">Take our quiz to find out what Princess or villain you are</a><br><a href="https://www.hsamuel.co.uk/webstore/brands/enchanted-disney-fine-jewelry.cdo?icid=hs-plp-enchanted-disney" class="${ID}__textLink">Shop by princess</a>`,
        },
        'Perfect Fit': {
            title: 'Brand Story',
            brandText: "Perfect Fit bridal sets combine a diamond engagement ring with a diamond set wedding band to ensure that both of your rings will set together perfectly. By shopping for your engagement ring and wedding band as a set, you are guaranteed exquisite comfort and a matching style that shines and sparkles as a perfect pair.",
        },
        'Princessa': {
            title: 'Brand Story',
            brandText: 'Make her feel like a princess with our range of Princessa diamond rings. <br></br>Exclusive to H.Samuel, this contemporary collection showcases a range of princess cut diamond cluster rings and each ring has a unique tiara shaped emblem on the side for that special finishing touch designed to make her feel like a princess.',
        },
        'The Diamond Story': {
            title: 'Brand Story',
            brandText: "Follow your diamonds individual journey from rough diamond to your finger. <br><br/> The Diamond Story begins with the birth certificate that shows your diamond in its pure form. The diamond's country of origin is written on the certificate for added assurance that your stone was sourced ethically and responsibly. <br><br/> The precise cut of your diamond is mapped into the roughstone, showcasing the amount of precision and technical expertise it takes in order for your diamond to be cut. The names of the craftsmen and designers that made your ring are included on the birth certificate. <br><br/> After several stages of precise cutting and polishing, the finished stone is carefully set into your ring, made with the unique knowledge of what it took for the diamond to reach you.",
            subText: 'The Diamond Story, journey as unique as yours. <br><br/> Your diamond is also independently certificated by GSI for the 3 C’s.',
        }, 
    }

    if(brands[dataBrand]) {
        const data = brands[dataBrand];
        const brandStory = document.createElement('div');
        brandStory.className = `${ID}__section ${ID}__story`;
        brandStory.innerHTML = 
        `<div class="${ID}__sectionContainer">
            <h3 class="${ID}__heading">${data.title}</h3>
            <div class="${ID}__paragraph">
                ${data.brandText} ${data.subText ? `<div class="${ID}__textLink">Read More</div><div class='${ID}__paragraph ${ID}__moreText'><br/>${data.subText}</div>`: ''}
            </div>
        </div>`;

        document.querySelector(`.${ID}__usps`).insertAdjacentElement('afterend', brandStory);


         // read more on mobile
         if (window.innerWidth < 767) {
            const readMoreLink = document.querySelector(`.${ID}__paragraph .${ID}__textLink`);
            const hiddenText = document.querySelector(`.${ID}__paragraph.${ID}__moreText`);
            readMoreLink.addEventListener('click', () => {
                hiddenText.classList.add(`${ID}__showAll`);
                readMoreLink.style.display = 'none';
            });
        }
    }
}

