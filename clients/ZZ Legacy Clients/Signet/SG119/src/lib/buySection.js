import shared from "./shared"

export default () => {

    const { ID } = shared;

    /* Existing elements to move */
    const productDetailChanges = () => {
        const ecomSection = document.querySelector(`.${ID}-details`);

        /** Reviews */
        const reviewTotal = ecomSection.querySelector('.product-customer-rating-summary');
        const reviewText = ecomSection.querySelector('.product-customer-rating-summary__text');
        if(reviewTotal) {
            ecomSection.querySelector('.product-price').insertAdjacentElement('beforebegin', reviewTotal);
        }
        if(reviewText) {
            reviewText.textContent = reviewText.textContent.replace('Customer Reviews', '');
        }
       /** Finance */
        const financeAvailable = document.querySelector('finance-options');
        if(financeAvailable) {
            ecomSection.querySelector('.product-price').insertAdjacentHTML('beforeend',`<div class="${ID}-financeAvailable"><span>0% Finance available</span></div>`);

            // click old finance if new finance is clicked
            const financeButton = document.querySelector(`.${ID}-financeAvailable`);
            
            // hide finance box/child elements in shadow root
            financeAvailable.shadowRoot.querySelector('.finance-options__button').style.display = 'none';
            financeAvailable.shadowRoot.querySelector('p').style.display = 'none';
            financeAvailable.shadowRoot.querySelector('.finance-options').style = 'padding: 0px';
            //const button = document.querySelector('finance-options').shadowRoot.querySelector('.finance-options__button');
            
            financeButton.addEventListener('click', () => {
                document.querySelector('finance-options').shadowRoot.querySelector('.finance-options__button').click();
            });
        }

        /** Select Labels */
        const diamondLabel = document.querySelector('.detail-page__right-column #product-step-up-down__Diamond');
        if(diamondLabel) {
            diamondLabel.parentNode.parentNode.querySelector('label').textContent = 'Choose your diamond:';
        }

        const ringSizeLabel = document.querySelector('.detail-page__right-column .product-ring-size__heading label');
        if(ringSizeLabel) {
            ringSizeLabel.textContent = 'Choose your ring size:';

            const willItFit = document.querySelector('.product-ring-size__will-it-fit');
            if(window.innerWidth >= 840) {
                document.querySelector('.product-ring-size').insertAdjacentElement('afterend', willItFit);
            }
        }

        /** See similar */
        const seeSimilar = document.querySelector('.detail-page__left-column .js-syte-functionality');
        if(seeSimilar) {
            document.querySelector(`.${ID}-seeSimilar`).appendChild(seeSimilar);
        }
    }
    

    /** New material colours */
    // add the new colour options using the old ones

    const materialOpt = document.querySelector('#product-step-up-down__Material');

    const metalSelection = () => {
        materialOpt.parentNode.parentNode.classList.add(`${ID}-metalHidden`);

        // get colours from material to create new options
        const newOptions = document.createElement('div');
        newOptions.classList.add(`${ID}-materialSelect`);
        newOptions.innerHTML = `<h4>Choose your material:</h4><div class="${ID}-options"></div>`;

        document.querySelector('.detail-page__right-column .product-step-up-down').insertAdjacentElement('beforebegin', newOptions);

        const allOptions = materialOpt.querySelectorAll('option');
        for (let index = 0; index < allOptions.length; index += 1) {
            const element = allOptions[index];
            const metalName = element.textContent.trim();
            const metalVal = element.value;
            const metalClass = metalName.replace('18ct', '').replace('9ct', '').replace('14ct', '').toLowerCase().replace(/\s/g, '');

            const colourOpt = document.createElement('div');
            colourOpt.classList.add(`${ID}-option`);
            colourOpt.classList.add(`${ID}-${metalClass}`);
            colourOpt.setAttribute('colour-data', metalVal);
            // if no value, make selected
            if(!metalVal.match(/^\d+$/g)) {
                colourOpt.classList.add(`${ID}-selected`);
            }
            colourOpt.innerHTML = `<span class="${ID}-colIcon"></span><p>${metalName}</p>`;
            newOptions.querySelector(`.${ID}-options`).appendChild(colourOpt);
        }


        // on click of option, go to that product
        const newMetals = document.querySelectorAll(`.${ID}-materialSelect .${ID}-option`);
        for (let index = 0; index < newMetals.length; index += 1) {
            const element = newMetals[index];
            element.addEventListener('click', (e) => {
                const elVal = e.currentTarget.getAttribute('colour-data');
                if(elVal.match(/\d+/g)) {
                    window.location.href = `https://www.ernestjones.co.uk/webstore/d/${elVal}`;
                }
            })
        }
    }

    productDetailChanges();

    if(materialOpt) {
        metalSelection();
    }
}