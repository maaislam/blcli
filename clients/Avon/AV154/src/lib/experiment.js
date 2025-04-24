/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { elementIsInView, logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {



    let newContentHTML = `

    <div class="${ID}-elements-holder">


        <div class="${ID}-element ${ID}-benefits">

            <div class="${ID}-element--image" style="background-image: url('https://blcro.fra1.digitaloceanspaces.com/AV154/benefitsimage.jpg');"></div>

            <div class="${ID}-element--content">

                <h2> Benefits </h2>

                <div class="${ID}-benefit-divider">
                    <p> Skin around eyes looks less puffy, fresh and well rested.* </p>
                    <p> Instantly blurs and brightens the look of the eye area.* </p>
                    <p> Dramatically smooths, reduces lines and wrinkles and intensely hydrates.* </p>
                </div>

            </div>

        </div>

        <div class="${ID}-element ${ID}-awardwinning">

            <div class="${ID}-element--image" style="background-image: url('https://blcro.fra1.digitaloceanspaces.com/AV154/awardwinningimage.jpg');"></div>

            <div class="${ID}-element--content">

                <h2> Award-winning </h2>

                <p> Award-winning Protinol &trade; helps reduce the appearance of fine lines and wrinkles. </p>

                <p class="${ID}-globeaward"> BEAUTY GLOBE AWARD </p>

            </div>

        </div>

        <div class="${ID}-element ${ID}-beforeafter">

            <div class="${ID}-element--befaft">
            <img src="https://blcro.fra1.digitaloceanspaces.com/AV154/beforeimage.jpg" alt="Before image" />
            <span> Before </span>
            </div>

            <div class="${ID}-element--befaft">
            <img src="https://blcro.fra1.digitaloceanspaces.com/AV154/afterimage.jpg" alt="After image" />
            <span> Instantly </span>
            </div>

        </div>

        <div class="${ID}-element ${ID}-activeingred">

            <div class="${ID}-element--image" style="background-image: url('https://blcro.fra1.digitaloceanspaces.com/AV154/activeingredimage.jpg');"></div>

            <div class="${ID}-element--content">

            <h2> Active Ingredients </h2>

            <div class="${ID}-benefit-divider">
                <p> <span class="${ID}-bold">Protinol &trade; Technology</span><span>Works faster than retinol to give your skin a collagen boost.</span> </p>
                <p> <span class="${ID}-bold">Niacinamide</span><span>Protects collagen and helps renew skin at the surface.</span> </p>
                <p> <span class="${ID}-bold">Light Diffusion Technology</span><span>Reflects light away from imperfections to help improve appearance.</span> </p>
            </div>

            </div>


        </div>

        <div class="${ID}-element ${ID}-prodholder">

            <h2 class="${ID}-routine"> The Routine </h2>
            <div class="${ID}-products">

            

                <div class="${ID}-product ${ID}-serum">

                    <div class="${ID}-product--info">
                        <h2> 1. Serum </h2>
                        <p class="${ID}-fancy"> After cleansing, massage one pump of the serum all over your face and neck. </p>
                    </div>

                    <img src="https://blcro.fra1.digitaloceanspaces.com/AV154/powerserumimage.jpg" alt="Serum image" />

            
                    <p class="${ID}-product--name">Anew Renewal Protinol Power Serum</p>
                    <p class="${ID}-product--price">£19.50</p>
                    <p class="${ID}-product--measurement">30ml (£73.33 / 100ml)</p>
                    

                    <button id="${ID}-serum-button" class="${ID}-product--button">Add to Basket</button>

                </div>

                <div class="${ID}-product ${ID}-eyecream">

                    <div class="${ID}-product--info">
                        <h2> 2. Eye cream </h2>
                        <p class="${ID}-fancy"> Follow your serum with our eye cream; Massage it in with the specially designed applicator. </p>
                    </div>

                    <img src="https://blcro.fra1.digitaloceanspaces.com/AV154/eyecreamimage.jpg" alt="Eye Cream image" />

            
                    <p class="${ID}-product--name">Anew Renewal Power Eye</p>
                    <p class="${ID}-product--price">£14.00</p>
                    <p class="${ID}-product--measurement">15ml (£93.33 / 100ml)</p>


                    <button id="${ID}-eyecream-button" class="${ID}-product--button">Add to Basket</button>

                </div>

                <a href="https://avon.uk.com/products/anew-ultimate-day-firming-cream-spf25" class="${ID}-product ${ID}-daycream">

                    <div class="${ID}-product--info">
                        <h2> 3. Day Cream </h2>
                        <p class="${ID}-fancy"> Gently smoothing your favourite Anew day or night cream over your face and neck. </p>
                    </div>

                    <img src="https://blcro.fra1.digitaloceanspaces.com/AV154/daycreamimage.jpg" alt="Day Cream image" />


                    <p class="${ID}-product--name">Anew Ultimate Day Firming Cream SPF25 </p>
                    <p class="${ID}-product--price">£16.00</p>
                    <p class="${ID}-product--measurement">50ml (£32 / 100ml)</p>


                    <button id="${ID}-daycream-button" class="${ID}-product--button">Add to Basket</button>

                </a>

                <a href="" class="${ID}-product ${ID}-bundle" style="display: none;">

                    <div class="${ID}-product--saving"><h2> Save 33% by buying the full routine </h2></div>

                    <div class="${ID}-product--bundle"> 

                        <img src="https://blcro.fra1.digitaloceanspaces.com/AV154/fullpackageimage.jpg" alt="Serum image" />

                        <p class="${ID}-product--name">Anew Ultimate Skin Renewal Power Pack</p>
                        <p class="${ID}-product--price ${ID}-product--pricesaving">£36.00 <span>£19.50</span></p>
                        <p class="${ID}-product--measurement">&nbsp;</p>
                    

                        <button id="${ID}-bundle-button" class="${ID}-product--button">Add to Basket</button>

                    </div>

                </a>
            </div>

        </div>

        <div class="${ID}-element ${ID}-toprated">

            <div class="${ID}-element--image" style="background-image: url('https://blcro.fra1.digitaloceanspaces.com/AV154/topratedimage.jpg');">
            
            </div>

            <div class="${ID}-element--content">

            <h2> Top Rated </h2>

            <div class="${ID}-stars">
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.8125 0.775992L9.24534 5.18582C9.37922 5.59784 9.76317 5.87681 10.1964 5.87681H14.8332L11.0819 8.60223C10.7315 8.85687 10.5848 9.30824 10.7187 9.72027L12.1515 14.1301L8.40029 11.4047C8.0498 11.15 7.5752 11.15 7.22472 11.4047L3.47349 14.1301L4.90633 9.72026C5.0402 9.30824 4.89355 8.85687 4.54306 8.60223L0.791834 5.87681H5.4286C5.86183 5.87681 6.24579 5.59785 6.37966 5.18582L7.8125 0.775992Z" stroke="#E5004B"/></svg>
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.8125 0.775992L9.24534 5.18582C9.37922 5.59784 9.76317 5.87681 10.1964 5.87681H14.8332L11.0819 8.60223C10.7315 8.85687 10.5848 9.30824 10.7187 9.72027L12.1515 14.1301L8.40029 11.4047C8.0498 11.15 7.5752 11.15 7.22472 11.4047L3.47349 14.1301L4.90633 9.72026C5.0402 9.30824 4.89355 8.85687 4.54306 8.60223L0.791834 5.87681H5.4286C5.86183 5.87681 6.24579 5.59785 6.37966 5.18582L7.8125 0.775992Z" stroke="#E5004B"/></svg>
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.8125 0.775992L9.24534 5.18582C9.37922 5.59784 9.76317 5.87681 10.1964 5.87681H14.8332L11.0819 8.60223C10.7315 8.85687 10.5848 9.30824 10.7187 9.72027L12.1515 14.1301L8.40029 11.4047C8.0498 11.15 7.5752 11.15 7.22472 11.4047L3.47349 14.1301L4.90633 9.72026C5.0402 9.30824 4.89355 8.85687 4.54306 8.60223L0.791834 5.87681H5.4286C5.86183 5.87681 6.24579 5.59785 6.37966 5.18582L7.8125 0.775992Z" stroke="#E5004B"/></svg>
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.8125 0.775992L9.24534 5.18582C9.37922 5.59784 9.76317 5.87681 10.1964 5.87681H14.8332L11.0819 8.60223C10.7315 8.85687 10.5848 9.30824 10.7187 9.72027L12.1515 14.1301L8.40029 11.4047C8.0498 11.15 7.5752 11.15 7.22472 11.4047L3.47349 14.1301L4.90633 9.72026C5.0402 9.30824 4.89355 8.85687 4.54306 8.60223L0.791834 5.87681H5.4286C5.86183 5.87681 6.24579 5.59785 6.37966 5.18582L7.8125 0.775992Z" stroke="#E5004B"/></svg>
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.8125 0.775992L9.24534 5.18582C9.37922 5.59784 9.76317 5.87681 10.1964 5.87681H14.8332L11.0819 8.60223C10.7315 8.85687 10.5848 9.30824 10.7187 9.72027L12.1515 14.1301L8.40029 11.4047C8.0498 11.15 7.5752 11.15 7.22472 11.4047L3.47349 14.1301L4.90633 9.72026C5.0402 9.30824 4.89355 8.85687 4.54306 8.60223L0.791834 5.87681H5.4286C5.86183 5.87681 6.24579 5.59785 6.37966 5.18582L7.8125 0.775992Z" stroke="#E5004B"/></svg>
            </div>

            <p> "Fantastic eye cream. Tried for 7 days and noticed a difference...works well with the power serum as well" </p>

            <p class="${ID}-name"> Julie K, Product Triallist </div>

            </div>

        </div>

    <div>



  `;


    let prodTabsHolder = document.getElementById('product-tabs-desktop');
    if (window.outerWidth < 550) {
        prodTabsHolder = document.getElementById('product-tabs-mobile');
    }
    prodTabsHolder.insertAdjacentHTML('beforebegin', newContentHTML);

    pollerLite(['.pdp-extra'], () => {
        let extraContainers = document.querySelectorAll('.pdp-extra');//.parentElement;
        [].slice.call(extraContainers).forEach(function (extraContainer) {
            if (!extraContainer.parentElement.classList.contains(`${ID}-extra-container`)) {
                extraContainer.parentElement.classList.add(`${ID}-extra-container`);
            }
        });
    });




    // set up close accordion

    document.querySelector('.accordion-item.active .accordion-title').click();

    // set up event listeners

    let allCheckoutButtons = document.querySelectorAll(`.${ID}-product--button`);
    [].slice.call(allCheckoutButtons).forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            let productId = ``;

            if (e.target.id == `${ID}-serum-button`) {
                productId = 39569615323181;
            } else if (e.target.id == `${ID}-eyecream-button`) {
                productId = 41579025170477;
            } else if (e.target.id == `${ID}-daycream-button`) {
                productId = 41609232056365;
            } else if (e.target.id == `${ID}-bundle-button`) {
                productId = 41609208135725;
            }

            let theData = {
                quantity: 1,
                id: productId,
            };

            fireEvent(`Click - add to bag button clicked on ${e.target.id == `${ID}-bundle-button` ? `bundle product` : `routine product`}`);

            let currentGetProductsXhr = $.ajax({
                cache: true,
                type: "POST",
                url: 'https://avon.uk.com/cart/add.js',
                data: theData,
                dataType: "json",
                success: function (returnedData) {

                    e.target.innerText = 'Added';
                    setTimeout(() => {
                        e.target.innerText = 'Add to bag';
                    }, 5000);

                },
            });


        });
    });


    setTimeout(() => {
        setupScrollEvents();
    }, 500);


}

const setupScrollEvents = () => {

    // set up scrollEvents 

    let benefitEvent = false;
    let awardEvent = false;
    let beforeAfterEvent = false;
    let activeIngredEvent = false;
    let productsEvent = false;
    let topRatedEvent = false;


    window.addEventListener('scroll', () => {

        if (elementIsInView(document.querySelector(`.${ID}-benefits`)) && benefitEvent == false) {
            fireEvent('Interaction - the benefits section is visible', true);
            benefitEvent = true;
        }

        if (elementIsInView(document.querySelector(`.${ID}-awardwinning`)) && awardEvent == false) {
            fireEvent('Interaction - the award winning section is visible', true);
            awardEvent = true;
        }

        if (elementIsInView(document.querySelector(`.${ID}-beforeafter`)) && beforeAfterEvent == false) {
            fireEvent('Interaction - the beforeafter section is visible', true);
            beforeAfterEvent = true;
        }

        if (elementIsInView(document.querySelector(`.${ID}-activeingred`)) && activeIngredEvent == false) {
            fireEvent('Interaction - the activeingredients section is visible', true);
            activeIngredEvent = true;
        }

        if (elementIsInView(document.querySelector(`.${ID}-prodholder`)) && productsEvent == false) {
            fireEvent('Interaction - the products section is visible', true);
            productsEvent = true;
        }

        if (elementIsInView(document.querySelector(`.${ID}-toprated`)) && topRatedEvent == false) {
            fireEvent('Interaction - the toprated section is visible', true);
            topRatedEvent = true;
        }


    });

}

export default () => {

    setup();

    logMessage(ID + " Variation: " + VARIATION);

    fireEvent('Conditions Met');

    // -----------------------------
    // Add events that apply to both variant and control
    // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
    // -----------------------------
    // ...

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (VARIATION == 'control') {
        return;
    }

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...


    startExperiment();


};
