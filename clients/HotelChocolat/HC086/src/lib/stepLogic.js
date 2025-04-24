import { flakePrices, kitPrices, smoothScroll, updatePrice } from "./helpers";
import shared from "../../../../../core-files/shared";
import { fireEvent } from "../../../../../core-files/services";


export default () => {

    const { ID, VARIATION } = shared;

    let currentTab = 0;

    // tab to show
    function showTab(n) {
        const tab = document.getElementsByClassName(`${ID}-accordionStep`);
        if (!tab[n].classList.contains(`${ID}-stepComplete`)) {
            tab[n].classList.add(`${ID}-stepShow`);
        }
    }

    // hide tab on selected
    const closeTab = (step) => {
        const tab = document.getElementsByClassName(`${ID}-accordionStep`);
        tab[step].classList.add(`${ID}-stepComplete`);
        tab[step].classList.remove(`${ID}-stepShow`);
    }

    const countSelectedFlakes = () => {
        const selectedAmount = document.querySelectorAll(`.${ID}-flakesSlider .${ID}-product.${ID}-selected:not(.${ID}-skip)`);
        const extraSpan = document.querySelector(`.${ID}-extraAmount`);
        return extraSpan.textContent = selectedAmount.length;
    }

    // show chosen flake options
    const chosenFlakes = () => {

        // loop through selected names
        const allSelected = document.querySelectorAll(`.${ID}-flakesSlider .${ID}-selected:not(.${ID}-skip)`);
        const addOns = document.querySelector(`.${ID}-flakesSlider .${ID}-addOns`);
        const moreFlakes = addOns.querySelector(`.${ID}-more`);

        addOns.querySelector(`.${ID}-allSelected`).innerHTML = '';

        if (allSelected.length > 3) {
            moreFlakes.classList.add(`${ID}-moreThanThree`);
        }

        for (let index = 0; index < allSelected.length; index += 1) {
            const element = allSelected[index];
            const elName = element.querySelector(`.${ID}-name`);

            const addOnproduct = document.createElement('li');
            addOnproduct.classList.add(`${ID}-addOn`);
            addOnproduct.innerHTML = `${elName.textContent}`;

            addOns.querySelector(`.${ID}-allSelected`).appendChild(addOnproduct);
        }

        // change title to add ons if edited
        document.querySelector(`.${ID}-flakesSlider .${ID}-optionTitle p`).innerHTML = `<b>Add ons:</b>`;
        document.querySelector(`.${ID}-flakesSlider .${ID}-optionTitle .${ID}-image`).setAttribute('style', `background-image:url(https://editor-assets.abtasty.com/48343/615589a0a4ef61632995744.png)`);

        // if more clicked
        addOns.querySelector(`.${ID}-more`).addEventListener('click', () => {
            addOns.classList.add(`${ID}-showAll`);
            addOns.querySelector(`.${ID}-more`).classList.add(`${ID}-hide`);
        });
    }

    // remove all currently selected for when skip is clicked
    const removeAllSelected = (el) => {
        const allSelected = el.querySelectorAll(`.${ID}-selected:not(${ID}-skip)`);
        if (allSelected) {
            for (let index = 0; index < allSelected.length; index++) {
                const element = allSelected[index];
                element.classList.remove(`${ID}-selected`);
            }
        }
    }

    // show selected on complete - only for flakes if skipped
    const selectedOption = (type, step) => {
        const stepChoice = step.querySelector(`.${ID}-selected`);
        const chosenImage = step.querySelector(`.${ID}-chosenOption .${ID}-image`)
        const chosenProduct = step.querySelector(`.${ID}-chosenOption p`);

        if (stepChoice) {

            // if skipped - none selected
            if (stepChoice.classList.contains(`${ID}-skip`)) {
                chosenImage.setAttribute('style', `background-image:url(https://editor-assets.abtasty.com/48343/61532669237ef1632839273.png)`);
                chosenProduct.innerHTML = `<b>${type}:</b> None selected`;
            } else if (stepChoice.querySelector(`.${ID}-productimage`)) {
                const selectedImage = stepChoice.querySelector(`.${ID}-productimage`).getAttribute('style');
                const selectedName = stepChoice.querySelector(`.${ID}-name`).textContent;

                chosenImage.setAttribute('style', selectedImage);
                chosenProduct.innerHTML = `<b>${type}:</b> ${selectedName}`;

            }
        }
    }

    /**
     * Choose Starter Kit
     */
    const chooseKit = () => {

        const kitproduct = document.querySelectorAll(`.${ID}-accordionStep.${ID}-kits .${ID}-product`);

        const makeActive = (e) => {
            e.preventDefault();

        
            if(VARIATION === '1') {
                if(window.innerWidth > 1024) {
                    window.jQuery(`.${ID}-carousel`).slick('refresh');
                }

                window.addEventListener('resize', () => {
                    if(window.innerWidth >= 1024) {
                        window.jQuery(`.${ID}-carousel`).slick('refresh');;
                    }
                });
            }

            // ----- if skipped
            if (e.currentTarget.classList.contains(`${ID}-skip`)) {
                removeAllSelected(document.querySelector(`.${ID}-kits`));
                e.currentTarget.classList.add(`${ID}-selected`);
                selectedOption('Starter Kit', document.querySelector(`.${ID}-kits`));
                closeTab(1);
                showTab(2);

                kitPrices.pop();
                updatePrice();
            } else

                // ------ if deselected
                if (e.currentTarget.classList.contains(`${ID}-selected`)) {
                    e.currentTarget.classList.remove(`${ID}-selected`);
                    kitPrices.pop();
                    updatePrice();

                    // remove skip active class
                    document.querySelector(`.${ID}-kits .${ID}-skip`).classList.remove(`${ID}-active`);

                    // ----- make current one active
                } else if (!e.currentTarget.classList.contains(`${ID}-selected`)) {

                // remove skip active class
                document.querySelector(`.${ID}-kits .${ID}-skip`).classList.remove(`${ID}-active`);

                for (let index = 0; index < kitproduct.length; index += 1) {
                    const element = kitproduct[index];
                    element.classList.remove(`${ID}-selected`);
                    kitPrices.pop();
                    updatePrice();
                }

                e.currentTarget.classList.add(`${ID}-selected`);

                const price = parseFloat(e.currentTarget.querySelector(`.${ID}-price`).textContent.replace('£', ''));

                if (price !== '') {
                    kitPrices.push(price);
                }
                updatePrice();

                selectedOption('Starter Kit', document.querySelector(`.${ID}-kits`));
                closeTab(1);
                showTab(2);

                smoothScroll(document.querySelector(`.${ID}-flakesSlider`));

            }

        }

        for (let x = 0; x < kitproduct.length; x += 1) {
            const el = kitproduct[x];
            el.addEventListener('click', makeActive);
        }

    }

    /**
     * Choose Flakes
     */
    const chooseFlakes = () => {

        const confirmFlakes = document.querySelector(`.${ID}-confirm`);

        const product = document.querySelectorAll(`.${ID}-accordionStep.${ID}-flakesSlider .${ID}-product`);
        for (let index = 0; index < product.length; index += 1) {
            const element = product[index];

            element.addEventListener('click', () => {

                // clicked skip, remove all selected
                if (element.classList.contains(`${ID}-skip`)) {

                    // remove any from completed choices
                    document.querySelector(`.${ID}-allSelected`).innerHTML = '';

                    removeAllSelected(document.querySelector(`.${ID}-flakesSlider`));
                    element.classList.add(`${ID}-selected`);
                    selectedOption('Extras added', document.querySelector(`.${ID}-flakesSlider`));
                    closeTab(2);
                    flakePrices.pop();
                    updatePrice();
                    smoothScroll(document.querySelector(`.${ID}-flakesSlider`));
                } else

                    // if deselected
                    if (element.classList.contains(`${ID}-selected`)) {
                        element.classList.remove(`${ID}-selected`);
                        flakePrices.pop();
                        updatePrice();

                        confirmFlakes.classList.add(`${ID}-show`);

                        // if none selected, hide confirm choices, show skip
                        if (!document.querySelector(`.${ID}-flake.${ID}-selected`)) {
                            confirmFlakes.classList.remove(`${ID}-show`);
                            document.querySelector(`.${ID}-flakesSlider .${ID}-skip`).classList.remove(`${ID}-hide`);
                        }

                        // if selected
                    } else {
                        confirmFlakes.classList.add(`${ID}-show`);

                        element.classList.add(`${ID}-selected`);

                        const price = parseFloat(element.querySelector(`.${ID}-price`).textContent.replace('£', ''));

                        // hide skip
                        document.querySelector(`.${ID}-flakesSlider .${ID}-skip`).classList.add(`${ID}-hide`);

                        flakePrices.push(price);

                        updatePrice();
                    }

                countSelectedFlakes();
            });
        }

        // on choices confirmed
        confirmFlakes.addEventListener('click', () => {
            closeTab(2);
            confirmFlakes.classList.remove(`${ID}-show`);
            chosenFlakes();
            smoothScroll(document.querySelector(`.${ID}-flakesSlider`));
        });
    }

    /**
     * reopen tabs to change selection
     */
    const editTabs = (el) => {
        if (el.classList.contains(`${ID}-stepComplete`)) {
            el.classList.remove(`${ID}-stepComplete`);
            el.classList.add(`${ID}-stepShow`);

            // remove skip
            if (el.querySelector(`.${ID}-skip`)) {
                el.querySelector(`.${ID}-skip`).classList.remove(`${ID}-selected`);
            }

            if (el.classList.contains(`${ID}-flakesSlider`) && el.querySelector(`.${ID}-selected:not(.${ID}-skip)`)) {
                document.querySelector(`.${ID}-flakesSlider .${ID}-confirm`).classList.add(`${ID}-show`);
            }
        }
    }


    /**
     * Show colour options first
     */
    showTab(currentTab);

    if (currentTab === 0) {
        const colourChoice = document.querySelectorAll(`.${ID}-product.${ID}-colour`);

        //make one active
        const makeActive = (e) => {
            e.preventDefault();
            for (let index = 0; index < colourChoice.length; index += 1) {
                const element = colourChoice[index];
                element.classList.remove(`${ID}-selected`);

            }
            e.currentTarget.classList.add(`${ID}-selected`);

            closeTab(0);

            selectedOption('Colour', document.querySelector(`.${ID}-colours`));

            showTab(1);

            updatePrice();

            // enable add button, including mobile
            const addButton = document.querySelectorAll(`.${ID}-add`);
            for (let index = 0; index < addButton.length; index++) {
                const element = addButton[index];
                element.classList.add(`${ID}-buttonShow`);
            }


            const klarnaBox = document.querySelector(`.${ID}-priceBox klarna-placement`);
            if (klarnaBox) {
                klarnaBox.classList.add(`${ID}-klarnaShow`);
                window.KlarnaOnsiteService.push({
                    eventName: 'refresh-placements'
                });
            }

            smoothScroll(document.querySelector(`.${ID}-kits`));

            if(VARIATION === '1') {
                if(window.innerWidth > 1024) {
                    window.jQuery(`.${ID}-carousel`).slick('refresh');
                }

                window.addEventListener('resize', () => {
                    if(window.innerWidth >= 1024) {
                        window.jQuery(`.${ID}-carousel`).slick('refresh');;
                    }
                });
            }
        }

        for (let x = 0; x < colourChoice.length; x += 1) {
            const el = colourChoice[x];
            el.addEventListener('click', makeActive);
        }
    }


    /**
     * Reopen tabs
     */
    const allTabs = document.querySelectorAll(`.${ID}-chosenOption`);
    for (let index = 0; index < allTabs.length; index += 1) {
        const element = allTabs[index];
        const selectedParent = element.parentNode;
        element.querySelector(`.${ID}-optionTitle`).addEventListener('click', () => {
            editTabs(selectedParent);
        });
    }

    /**
     * Add all to bag
     */
    const addProductToBag = () => {
        const addButton = document.querySelector(`.${ID}-add`);

        const ajaxAdd = () => {
            const qty = document.querySelector('input[name=Quantity]').value;

            // get all added
            const allSelected = document.querySelectorAll(`.${ID}-product.${ID}-selected:not(.${ID}-skip)`);
            let names = [];
            if (allSelected) {
                let storedProducts = [];
                for (let index = 0; index < allSelected.length; index += 1) {
                    const element = allSelected[index];
                    const productSku = element.getAttribute('prod-id');
                    const elName = element.textContent.trim();

                    const storedName = element.innerHTML;
                    const price = element.querySelector(`.${ID}-price`).textContent;
                    if (productSku) {

                        // push all the added products to object
                        var obj = {};

                        obj['name'] = storedName;
                        obj['price'] = price;
                        storedProducts.push(obj);

                        let addurl = false;

                        window.jQuery.ajax({
                            url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
                            type: 'post',
                            data: `Quantity=${qty}&cartAction=add&pid=${productSku}`,
                            success: function () {
                                window.scrollTo(0, 0);
                                document.querySelector(`.${ID}-add`).classList.remove(`${ID}-addingToBag`);
                                sessionStorage.setItem(`${ID}-productsAdded`, JSON.stringify(storedProducts));
                                if (addurl === false) {
                                    window.location.href = `${window.location.pathname}?addtobasket=true`;
                                    addurl = true;
                                }
                            }
                        });

                        names.push(elName);
                    }
                    fireEvent(`Clicked add to bag with options: ${names}`);
                }
            }
        }

        addButton.addEventListener('click', () => {
            addButton.classList.add(`${ID}-addingToBag`);
            addButton.textContent = 'Adding...';
            ajaxAdd();
        });
    }

    chooseKit();
    chooseFlakes();
    addProductToBag();
}