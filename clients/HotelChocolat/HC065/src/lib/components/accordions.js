import { poller, pollerLite } from "../../../../../../lib/utils";
import { fireEvent } from "../services";
import shared from "../shared";

const { ID, VARIATION} = shared;

const reviewsExist = () => {
    return new Promise((resolve, reject) => {
        pollerLite(['#BVRRContainer .bv-content-item', '.bv-content-summary-body-text', '.bv-content-author-name .bv-author span', '.bv-content-top-review'], () => {
            document.documentElement.classList.add(`${ID}-hasReviews`);
            resolve();
            return true;
        });
    });

}

export default class Accordion {
    constructor() {
        this.create();
        this.bindEvents();
        this.render();
    }
    create() {
        const element = document.createElement('div');
        element.classList.add(`${ID}-accordion`);
        element.innerHTML = `
        <div class="${ID}-accordionItem">
            <h3 class="${ID}-accordionHeading" acc-target="description">Description</h3>
            <div id="${ID}-description" class="${ID}-accContent">
                <div class="${ID}-container">
                    <div class="${ID}-desc"></div>
                    <div class="${ID}-readMore ${ID}-textLink">Read More</div>
                </div>
            </div>
        </div>


        <div class="${ID}-accordionItem">
            <h3 class="${ID}-accordionHeading" acc-target="ingredients">Ingredients</h3>
            <div id="${ID}-ingredients" class="${ID}-accContent">
                <div class="${ID}-container"></div>
            </div>
        </div>

        <div class="${ID}-accordionItem">
            <h3 class="${ID}-accordionHeading" acc-target="delivery">Delivery</h3>
            <div id="${ID}-delivery" class="${ID}-accContent">
                <div class="${ID}-container">
                    <div class="${ID}-deliveryIntro">
                        <p>We make every effort to ensure your order arrives in perfect condition. This may include the use of Ecoflo; a unique packing material designed to protect your goods whilst in transit. Afterwards, you can re-use, compost or recycle it in accordance with current environmental regulations.</p>
                        <a class="${ID}-textLink" href="https://www.hotelchocolat.com/uk/help/delivery.html">All delivery information</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="${ID}-accordionItem">
            <h3 class="${ID}-accordionHeading" acc-target="gifting">Gifting</h3>
            <div id="${ID}-gifting" class="${ID}-accContent">
                <div class="${ID}-container">
                <a class="${ID}-textLink" href="https://www.hotelchocolat.com/uk/help/gifting-information.html">All gifting information</a>
                </div>
            </div>
        </div>

        <div class="${ID}-accordionItem">
            <h3 class="${ID}-accordionHeading" acc-target="reviews">Reviews</h3>
            <div id="${ID}-reviews" class="${ID}-accContent">
                <div class="${ID}-container"></div>
            </div>
        </div>
      `;
        this.component = element;


        

        // move content
        const description = document.querySelector('#tabDesc');
        if(description.querySelector('.menu') && window.innerWidth > 767) {
            description.querySelector('.menu').remove();
        }
        element.querySelector(`#${ID}-description .${ID}-container .${ID}-desc`).innerHTML = description.innerHTML.replace(/<p>(&nbsp;)+<\/p>/g, '');
      
        
        
        const ingredients = document.querySelector('#tabIngredients');
        element.querySelector(`#${ID}-ingredients .${ID}-container`).appendChild(ingredients);

        const gifting = document.querySelector('.prod-info.prod-info-b ul');
        element.querySelector(`#${ID}-gifting .${ID}-container`).insertAdjacentElement('afterbegin', gifting);

        const delivery = document.querySelector('.prod-info.prod-info-c ul');
        element.querySelector(`#${ID}-delivery .${ID}-container`).appendChild(delivery);

        const reviews = document.querySelector('#tabReviews');
        element.querySelector(`#${ID}-reviews .${ID}-container`).appendChild(reviews);
        

        //change delivery text
        const deliveryText = element.querySelector(`#${ID}-delivery .prod-opt-b .content-enabled`);
        deliveryText.innerHTML = `<p>Standard delivery from just <b>£3.95</b> for one item.</p><p>Next day and nominated day delivery options also available from just <b>£5.95</b> for one item.</p>`;

        //move gift by text
        const giftByText = element.querySelector(`#${ID}-delivery .prod-opt-e`);
        element.querySelector(`#${ID}-gifting .${ID}-container ul`).insertAdjacentElement('beforeend', giftByText);


    }

    bindEvents() {
        const {
            component
        } = this;

        // accordion toggle
        const accItem = component.querySelectorAll(`.${ID}-accordionItem`);
        const accHeading = component.querySelectorAll(`.${ID}-accordionHeading`);

        for (let index = 0; index < accHeading.length; index += 1) {
            const el = accHeading[index];
            el.addEventListener('click', toggleItem, false);
        }

        function elmYPosition(eID) {
            var elm = document.querySelector(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
          }
          

        function toggleItem() {
            const itemClass = this.parentNode.className;
            for (let i = 0; i < accItem.length; i += 1) {
                const accEl = accItem[i];
                accEl.className = `${ID}-accordionItem`;
            }

            if (itemClass == `${ID}-accordionItem`) {
                this.parentNode.className = `${ID}-accordionItem ${ID}-open`;
                const accName = this.parentNode.querySelector('h3');

                scrollTo(0, elmYPosition(`.${ID}-accordionItem.${ID}-open`));
                //document.documentElement.scrollTop += this.parentNode.getBoundingClientRect().top - 70;
                fireEvent('Clicked Accordion' + accName.textContent.trim());
            }
        }

        /**
         * Read More
         */
         const description = component.querySelector(`#${ID}-description`);
         description.querySelector(`.${ID}-readMore`).addEventListener('click', (e) => {
             if (description.classList.contains('textExpand')) {
                 description.classList.remove('textExpand');
                 e.currentTarget.textContent = 'Read More';
             } else {
                 description.classList.add('textExpand');
                 e.currentTarget.textContent = 'Read Less';
                 document.documentElement.scrollTop += description.getBoundingClientRect().top;
             }
         });

    }

    render() {
        const { component } = this;


        //document.querySelector('.tab-desktop-content').insertAdjacentElement('beforebegin', component);
        if (window.innerWidth <= 767) {
            document.querySelector('.tab-desktop-content').insertAdjacentElement('beforebegin', component);
        } else {
            document.querySelector('.product-col-2.product-detail').insertAdjacentElement('afterend', component);
        }


        /**
         * Review for V2
         */ 
         
        if(VARIATION === '2') {
            const scrollToElement = (element) => {
                window.scroll({
                    behavior: 'smooth',
                    left: 0,
                    top: element.getBoundingClientRect().top + window.scrollY - 20,
                });
            }

            //description.innerHTML.replace(/<p>(&nbsp;)+<\/p>/g, '')
            reviewsExist().then(() => {
                const description = document.querySelector('#tabDesc');
                component.querySelector(`#${ID}-description .${ID}-container`).innerHTML = 
                    `<div class="${ID}-descText">
                        <h3 class="${ID}-descTitle">Description</h3>
                        <div class="${ID}-desc">${description.innerHTML.replace(/<p>(&nbsp;)+<\/p>/g, '')}</div>
                        <div class="${ID}-readMore ${ID}-textLink">Read More</div>
                    </div>
                    <div class="${ID}-reviewBlock"></div>`;


                    const allReviews = document.querySelectorAll('#BVRRContainer .bv-content-item');
                    for (let index = 0; index < allReviews.length; index += 1) {
                        const review = allReviews[index];
                        if (review.classList.contains('bv-content-top-review')) {
                            
                            const authorName = review.querySelector('.bv-content-author-name .bv-author span');
                            const reviewText = review.querySelector('.bv-content-summary-body-text p');
        
                            component.querySelector(`.${ID}-reviewBlock`).innerHTML =
                                `<div class="${ID}-stars"></div>
                                <h4><q>${reviewText.innerHTML.replace(/\n/g, " ").replace(/<br>/g, '. ')}</q></h4>
                                <p><span>-</span> ${authorName.textContent.trim()}</p>`;
        
                            break;
                        }
                    }

                    if(component.querySelector(`.${ID}-reviewBlock`)) {
                        component.querySelector(`.${ID}-reviewBlock`).addEventListener('click', () => {
                            if(!document.querySelector('[acc-target="reviews"]').parentNode.classList.contains(`${ID}-open`)) {
                                document.querySelector('[acc-target="reviews"]').click();
                            }
                            scrollToElement(document.querySelector(`#${ID}-reviews`));
                            fireEvent('Clicked Review');
                        });
                    }

                     /**
                     * Read More
                    */
                    const desc = component.querySelector(`.${ID}-descText`);
                    desc.querySelector(`.${ID}-readMore`).addEventListener('click', (e) => {
                        if (desc.classList.contains('textExpand')) {
                            desc.classList.remove('textExpand');
                            e.currentTarget.textContent = 'Read More';
                        } else {
                            desc.classList.add('textExpand');
                            e.currentTarget.textContent = 'Read Less';
                            document.documentElement.scrollTop += desc.getBoundingClientRect().top;
                        }
                    });
            });
        }
      

        
    }
}