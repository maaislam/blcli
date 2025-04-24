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
        'The Diamond Story': {
            title: 'Brand Story',
            brandText: "Follow your diamonds individual journey from rough diamond to your finger. <br><br/> The Diamond Story begins with the birth certificate that shows your diamond in its pure form. The diamond's country of origin is written on the certificate for added assurance that your stone was sourced ethically and responsibly. <br><br/> The precise cut of your diamond is mapped into the rough stone, showcasing the amount of precision and technical expertise it takes in order for your diamond to be cut. The names of the craftsmen and designers that made your ring are included on the birth certificate. <br><br/> After several stages of precise cutting and polishing, the finished stone is carefully set into your ring, made with the unique knowledge of what it took for the diamond to reach you.",
            subText: 'The Diamond Story, journey as unique as yours. <br><br/> Your diamond is also independently certificated by GSI for the 3 C’s.',
        }, 
        'Vera Wang Love': {
            title: 'Brand Story',
            brandText: 'Renowned bridal and fashion designer, Vera Wang, brings her design philosophy to an exceptional collection of fine jewelry. The Vera Wang LOVE collection offers exclusive bridal and fashion designs that each feature a blue sapphire accent as a symbol of everlasting love.',
            subText: 'As an authentic Vera Wang piece, the inside of the shank includes the Vera Wang LOVE inscription and her signature blue sapphire that sits underneath the setting. <br/> Each Vera Wang ring comes with a certificate of Authenticity, ensuring it is a genuine Vera Wang design. <br></br> Exclusively at Ernest Jones',
        },
        'Tolkowsky': {
            title: 'Brand Story',
            brandText: "In 1919 Marcel Tolkowsky invented the Ideal Cut diamond, a precise set of mathematical proportions that maximises the 3 elements of light in the diamond: <br></br><b>Brilliance, Fire and Sparkle</b><br></br>Today the TOLKOWSKY IDEAL CUT remains celebrated as the finest method of cutting round brilliant diamonds. All Tolkowsky Ideal Cut centre diamonds are guaranteed to achieve the highest rating of 'Very High' in all three light performance ratings on the GemEx report.",
            subText: "Each Tolkowsky® diamond ring comes with three certificates, GSI certificate, GEMEX light performance certificate and a Certificate of Authenticity, ensuring it is a genuine Tolkowsky® design. <br></br>Exclusively at Ernest Jones.",
        },
        'Arctic Light': {
            title: 'Brand Story',
            brandText: "Discover exceptional Colourless Canadian diamonds from Arctic Light, exclusively at Ernest Jones. <br></br> Born in Canada's Northwest Territories, where awe-inspiring beauty of untamed wilderness and pristine waters watch over diamonds that were formed here deep in the earth more than a billion years ago, Arctic Light diamonds are 100% trackable from the mine to the stunning finished product, with both CanadaMark certification for origin and IGI certification for colour and clarity.",
        },
        'Leo Diamonds': {
            title: 'Brand Story',
            brandText: 'For over 4 generations Leo Schachter’s passion has been to handcraft the worlds most brilliant diamonds.Additional, strategically placed facets transform a conventual diamond into a Leo diamond, the Leo diamond has a unique patented cut allowing for unsurpassed sparkle and brilliance.Every Leo Diamond® is accompanied by a gemmological certificate issued by IGI or GSI, both leading independent diamond grading laboratories, and a GemEx light performance certificate.',
            subText: 'All Leo Diamond® jewellery is guaranteed to score a minimum of three high ratings on the GemEx report.',
        },
        'Neil Lane': {
            title: 'Brand Story',
            brandText: "Exclusive to Ernest Jones <br></br> As a distinguished designer and collector, Neil Lane's life journey has always been focused on a deep appreciation of all things glamorous. Creating hand-crafted treasured pieces inspired by history for some of Hollywood's legendary stars. Neil has become one of the most celebrated jewelry designers in the world.",
            subText: "Neil's designs can be seen on virtually every red carpet in Hollywood, at high profile weddings, top A-list events and as part of the love story of couples around the world.",
        },
        'Le Vian': {
            title: 'Brand Story',
            brandText: "The Le Vian family have been guardians of the most unique and precious jewellery for ancient royals since 1746. Le Vian's collectors include the most discerning buyers and Hollywood's elite. The Le Vian name has become a byword for some of the world's most exquisite and expertly crafted jewellery, with Ernest Jones being the only place in the UK to find Chocolate Quartz stones, exclusively crafted by Le Vian.",
            subText: "The house of Le Vian is famed for jewellery that combines a reverence for the past with a passion for gems and defining future trends. Le Vian designers have a passion for beautiful, expertly-made fine jewellery, building upon a legacy of artistry and expertise. Discover exclusive styles of Le Vian jewellery including natural Chocolate Diamonds and flavourful gemstone designs.",
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

    if(dataBrand === 'Ernest Jones Diamond Collection' && description && description.innerText.indexOf('certified by De Beers Group') > -1) {
        const brandStory = document.createElement('div');
        brandStory.className = `${ID}__section ${ID}__story`;
        brandStory.innerHTML = 
        `<div class="${ID}__sectionContainer">
            <h3 class="${ID}__heading">Collection story</h3>
            <div class="${ID}__paragraph">
            Our exclusive Ernest Jones DeBeers certificated collection brings together the quality of having your centre diamond set in platinum, with the heritage of the DeBeers diamond grading house. <br></br> The rings in this collection are classicstyles with a modern contemporary theme of talon shaped claws –a subtle modern update to the setting holding your diamond. <br/>These rings are luxuriously crafted from 18ct gold, with a contemporary platinum setting for extra stone security.
            </div>
        </div>`;

        document.querySelector(`.${ID}__usps`).insertAdjacentElement('afterend', brandStory);
    }
}

