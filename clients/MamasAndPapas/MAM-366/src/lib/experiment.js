/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import litepicker from './litepicker';
import { pollerLite, logMessage, getCookie, setCookie } from '../../../../../lib/utils';
// set up variation control variables
const { ID, VARIATION } = shared;

let segmentationElement, segmentPlacement;

let segmentationThankyouCategories = [
    {name: 'pushchairs', url: 'https://www.mamasandpapas.com/collections/pushchairs', image: 'https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-cat-pushchairs.jpg', visibleName: "Pushchairs"},
    {name: 'carseats', url: 'https://www.mamasandpapas.com/collections/car-seats', image: 'https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-cat-carseats.jpg', visibleName: "Car Seats"},
    {name: 'furniture', url: 'https://www.mamasandpapas.com/collections/furniture', image: 'https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-cat-furniture.jpg', visibleName: "Furniture"},
    {name: 'clothing', url: 'https://www.mamasandpapas.com/collections/baby-clothing', image: 'https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-cat-clothes.jpg', visibleName: "Clothing"},
    {name: 'nursery', url: 'https://www.mamasandpapas.com/collections/nursery', image: 'https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-cat-nursery.jpg', visibleName: "Nursery"},
    {name: 'toysgifts', url: 'https://www.mamasandpapas.com/collections/toys-gifts', image: 'https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-cat-toysgifts.jpg', visibleName: "Toys & Gifts"},
    {name: 'bathingchanging', url: 'https://www.mamasandpapas.com/collections/bathing-changing', image: 'https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-cat-bathingchanging.jpg', visibleName: "Bathing & Changing"},
    {name: 'babysafety', url: 'https://www.mamasandpapas.com/collections/baby-safety', image: 'https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-cat-babysafety.jpg', visibleName: "Baby Safety"},
    {name: 'feedingweaning', url: 'https://www.mamasandpapas.com/collections/feeding-weaning', image: 'https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-cat-feedingweaning.jpg', visibleName: "Feeding & Weaning"},
];

let interactiveOuter, optionsOuter, interactives, options, closeLink;

const pushOrderData = () => {


    let miniBagViewTable = document.querySelector('.product-table');

    let miniBagItems = miniBagViewTable.querySelectorAll('tr.product');

    let GAstring = "";

    [].slice.call(miniBagItems).forEach((item) => {

        let prodSKU = item.getAttribute('data-product-id');

        let prodName = item.querySelector('.product__description__name').innerHTML;

        if(prodName == "Ship to Store") {
            return;
        }

        GAstring += "Product SKU: "+prodSKU+" Product Name: "+prodName+" // ";

    });

    fireEvent('Interaction - Selection made on Order Conf page, summary of items: '+GAstring);

}


const closeAndComplete = (segment) => {

    let displayedItems = [];
    let itemsToAdd = [];

    if(segment == "parent-to-be") {
        itemsToAdd = ['pushchairs', 'carseats', 'furniture', 'bathingchanging', 'babysafety', 'clothing'];
    } else if(segment == "parent") {
        itemsToAdd = ['clothing', 'furniture', 'nursery', 'pushchairs', 'carseats', 'feedingweaning'];
    } else if(segment == "friends-family") {
        itemsToAdd = ['toysgifts', 'clothing', 'nursery', 'bathingchanging', 'feedingweaning', 'babysafety'];
    }

    itemsToAdd.forEach((itemName) => {       
        
        segmentationThankyouCategories.map((item) => {
            if(item.name == itemName) {
                displayedItems.push(item);
            }
        });


    })

    let categoryHolder = document.querySelector(`.${ID}-suggested-categories`);

    if(categoryHolder.childElementCount <= 0) {
        displayedItems.forEach((item) => {

            let itemHTML = `
                <a href="${item.url}" class="${ID}-suggested-category" style="background-image: url('${item.image}');">
    
                    <h3 class="shop-text"> Shop by </h3>
    
                    <p class="category-main-text"> ${item.visibleName} </p>
    
                </a>
            `;
    
            categoryHolder.insertAdjacentHTML('beforeend', itemHTML);
    
        });
    }
    

    pollerLite([`.${ID}-suggested-category`], () => {

        let allSuggestedCategories = document.querySelectorAll(`.${ID}-suggested-category`);

        [].slice.call(allSuggestedCategories).forEach((category) => {

            category.addEventListener('click', (e) => {
                let suggestedCategory = e.target.closest('a').href;
                fireEvent("Click - suggested category: "+suggestedCategory+" clicked on after segmentation");
            });

        })


    })

    setTimeout(function() {
        
        segmentationElement.classList.add('thank-you');
        document.querySelector(`.${ID}-section-interactives`).classList.remove('interactive-enabled');

    }, 500); 

    
}

const addEvents = () => {

    // set all assignations

    interactiveOuter = document.querySelector(`.${ID}-section-interactives`);
    optionsOuter = document.querySelector(`.${ID}-section-options`);
    interactives = document.querySelectorAll(`.${ID}-section-interactive`);
    options = document.querySelectorAll(`.${ID}-section-option`);
    closeLink = document.getElementById(`${ID}-section-close`);
    

    let parentToBeLink = document.getElementById(`${ID}-section-option-1`);
    let friendsFamilyLink = document.getElementById(`${ID}-section-option-2`);
    let parentLink = document.getElementById(`${ID}-section-option-3`);

    let interactivePTBForm = document.getElementById(`${ID}-parenttobe-form`);
    let interactivePTBFormQ2 = document.getElementById(`${ID}-parenttobe-form-q2`);
    let interactiveFrFaSubmit = document.getElementById(`${ID}-friendsfamily-child-age-submit`);
    let interactiveParSubmit = document.getElementById(`${ID}-parent-child-age-submit`);

    // event listeners for each section

    // initial click on outer section sets local storage with segment and 'noshow' cookie so that the user isn't bothered
    // to enter the age-specific or date-specific information. Then opens the inner section.

    parentToBeLink.addEventListener('click', (e) => {
        e.preventDefault();

        optionsOuter.classList.add('interactive-enabled');
        interactiveOuter.classList.add('interactive-enabled');

        [].slice.call(interactives).forEach((interactive) => {

            if(interactive.classList.contains('interactive-enabled')) {
                interactive.classList.remove('interactive-enabled');
            } 
        });

        if(segmentPlacement == "orderconf") {
            pushOrderData();
        }

        document.getElementById(`${ID}-section-interactive-1`).classList.add('interactive-enabled');

        setTimeout(function() {
            document.getElementById(`${ID}-section-interactive-1`).classList.add('interactive-enabled-visible');
            localStorage.setItem(`${ID}-segment-type`, 'parent-to-be');
            fireEvent(`Click - User Selected: [parent-to-be] on ${segmentPlacement}`);

            window.DY.API("event", {
                name: "customerType",
                properties: {  
                    segment: "parent-to-be",
                    dateEntered: new Date().toString(),
                }
            });

            setCookie(`MAM-366-noshow`, true);
        }, 500);
    });

    friendsFamilyLink.addEventListener('click', (e) => {
        e.preventDefault();

        optionsOuter.classList.add('interactive-enabled');
        interactiveOuter.classList.add('interactive-enabled');

        [].slice.call(interactives).forEach((interactive) => {

            if(interactive.classList.contains('interactive-enabled')) {
                interactive.classList.remove('interactive-enabled');
            } 
        });

        if(segmentPlacement == "orderconf") {
            pushOrderData();
        }

        document.getElementById(`${ID}-section-interactive-2`).classList.add('interactive-enabled')

        setTimeout(function() {
            document.getElementById(`${ID}-section-interactive-2`).classList.add('interactive-enabled-visible');
            localStorage.setItem(`${ID}-segment-type`, 'friends-family');
            fireEvent(`Click - User Selected: [friends-family] on ${segmentPlacement}`);

            window.DY.API("event", {
                name: "customerType",
                properties: {  
                    segment: "friends-family",
                    dateEntered: new Date().toString(),
                }
            });

            setCookie(`MAM-366-noshow`, true);
        }, 500);
    });

    parentLink.addEventListener('click', (e) => {
        e.preventDefault();

        optionsOuter.classList.add('interactive-enabled');
        interactiveOuter.classList.add('interactive-enabled');

        [].slice.call(interactives).forEach((interactive) => {

            if(interactive.classList.contains('interactive-enabled')) {
                interactive.classList.remove('interactive-enabled');
            } 
        });

        if(segmentPlacement == "orderconf") {
            pushOrderData();
        }

        document.getElementById(`${ID}-section-interactive-3`).classList.add('interactive-enabled')

        setTimeout(function() {
            document.getElementById(`${ID}-section-interactive-3`).classList.add('interactive-enabled-visible');
            localStorage.setItem(`${ID}-segment-type`, 'parent');
            fireEvent(`Click - User Selected: [parent] on ${segmentPlacement}`);

            window.DY.API("event", {
                name: "customerType",
                properties: {  
                    segment: "parent",
                    dateEntered: new Date().toString(),
                }
            });

            setCookie(`MAM-366-noshow`, true);
        }, 500);
    });

    // close link
    closeLink.addEventListener('click', (e) => {
        e.preventDefault();

        segmentationElement.classList.add('hidden');
        segmentationElement.classList.remove('thank-you');
        document.documentElement.classList.remove(`${ID}-noscroll`);

    });

    // inner section opens up and handlers get the data that is provided from the datepicker or the select
    // and sets a local storage item for the secondary segment information.

    interactivePTBForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let datepicker = document.getElementById(`${ID}-parenttobe-duedate`)

        let value = datepicker.value;

        

        if(value !== "") {

            datepicker.classList.remove('error');

            let todayDate = new Date();
            let valueArray = value.split('-');
            let dueDate = new Date(parseInt(valueArray[0]), parseInt(valueArray[1])-1, parseInt(valueArray[2]));

            let threeMonthPastDate = new Date(parseInt(valueArray[0]), parseInt(valueArray[1])-1, parseInt(valueArray[2]));
            threeMonthPastDate.setMonth(threeMonthPastDate.getMonth() - 3);
            
            let sixMonthPastDate = new Date(parseInt(valueArray[0]), parseInt(valueArray[1])-1, parseInt(valueArray[2]));
            sixMonthPastDate.setMonth(sixMonthPastDate.getMonth() - 6);

            let nineMonthPastDate = new Date(parseInt(valueArray[0]), parseInt(valueArray[1])-1, parseInt(valueArray[2]));
            nineMonthPastDate.setMonth(nineMonthPastDate.getMonth() - 9);

            let trimester = "";

            if(todayDate.getTime() <= sixMonthPastDate.getTime()) {
                trimester = "1st trimester";
            } else if(todayDate.getTime() >= sixMonthPastDate.getTime() && todayDate.getTime() <= threeMonthPastDate.getTime()) {
                trimester = "2nd trimester";
            } else {
                trimester = "3rd trimester";
            }

            fireEvent(`Click - User clicked on: [parent-to-be] on ${segmentPlacement} and their due date is: ${value} making them in their ${trimester}`)

            localStorage.setItem(`${ID}-user-due-date`, value);

            interactivePTBForm.classList.add(`${ID}-hidden`);
            interactivePTBFormQ2.classList.remove(`${ID}-hidden`);

            window.DY.API("event", {
                name: "trimester",
                properties: {  
                    trimester: trimester,
                    dateEntered: new Date().toString(),
                }
            });


        } else {

            datepicker.classList.add('error');

        }


              

    });

    interactivePTBFormQ2.addEventListener('submit', (e) => {
        e.preventDefault();

        let firstTimeParentValue = document.querySelector(`input[type=radio][name="${ID}-parenttobe-firstchild"]:checked`).value;

        if(firstTimeParentValue !== "") {

            fireEvent(`Click - User clicked on: [parent-to-be] on ${segmentPlacement} and they are ${firstTimeParentValue == "first-time" ? 'a first time parent' : 'not a first time parent'}`)

            localStorage.setItem(`${ID}-user-firsttimeparent`, firstTimeParentValue);

            closeAndComplete("parent-to-be");

        } else {

            datepicker.classList.add('error');

        }

        window.DY.API("event", {
            name: "firstTimeParent",
            properties: {  
                ftpParent: firstTimeParentValue,
                dateEntered: new Date().toString(),
            }
        });
              

    });


    interactiveFrFaSubmit.addEventListener('click', (e) => {
        e.preventDefault();

        let value = document.getElementById(`${ID}-friendsfamily-child-age`).value;
        if(value !== "Select an age") {

            document.getElementById(`${ID}-friendsfamily-child-age`).classList.remove('error');

            fireEvent(`Click - User clicked on: [friends-family] on ${segmentPlacement} and the age they are buying for is: ${value}`);

            localStorage.setItem(`${ID}-child-age`, value);
    
            closeAndComplete("friends-family"); 
        } else {

            document.getElementById(`${ID}-friendsfamily-child-age`).classList.add('error');

        }

        window.DY.API("event", {
            name: "buyingFor",
            properties: {  
                age: value,
                dateEntered: new Date().toString(),
            }
        });

    });

    interactiveParSubmit.addEventListener('click', (e) => {
        e.preventDefault();

        let value = document.getElementById(`${ID}-parent-child-age`).value;

        if(value !== "Select an age") {

            document.getElementById(`${ID}-parent-child-age`).classList.remove('error');

            fireEvent(`Click - User clicked on: [parent] on ${segmentPlacement} and the age they are buying for is: ${value}`);

            localStorage.setItem(`${ID}-child-age`, value);

            closeAndComplete("parent");  

        } else {

            document.getElementById(`${ID}-parent-child-age`).classList.add('error');

        }

        window.DY.API("event", {
            name: "buyingFor",
            properties: {  
                age: value,
                dateEntered: new Date().toString(),
            }
        });

    });

}

const insertTrigger = (triggerInsertionPointPlacement) => {

    let triggerHTML;

    if(VARIATION == 1) {
        triggerHTML = `
        
            <div class="${ID}-segmentation-trigger-holder">

                <div class="${ID}-section-close"> <a href="#" id="${ID}-trigger-section-close" class="${ID}-section-close-link"> <svg height='18px' width='18px' fill="#a2a2a2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><defs><g id="a"><path fill="#a2a2a2" stroke="none" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></g></defs><g transform="matrix( 1, 0, 0, 1, 0,0) "><use xlink:href="#a"></use></g></svg> </a> </div>
            
                <h2> Which of the following best describes you? </h2>

                <div class="${ID}-banner-section-options">

                    <a href="#" id="${ID}-section-option-banner-1" class="${ID}-banner-section-option" style="background-image: url('https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-parenttobe.jpg');">

                        <h3> I am </h3>

                        <h2> Expecting </h2>

                    </a>

                    <a href="#" id="${ID}-section-option-banner-2" class="${ID}-banner-section-option" style="background-image: url('https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-parents.jpg');">

                        <h3> I am a </h3>

                        <h2> Parent </h2>

                    </a>

                    <a href="#" id="${ID}-section-option-banner-3" class="${ID}-banner-section-option" style="background-image: url('https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-friendsfamily.jpg');">

                        <h3> I am shopping for </h3>

                        <h2> Friends and Family </h2>

                    </a>

                </div>
            
            </div>
        
        `;
    } else {
        triggerHTML = `
        
            <div class="${ID}-segmentation-trigger-holder">
                <img src="https://blcro.fra1.digitaloceanspaces.com/MAM-366/orderconf-top.jpg" alt="mamas and papas image" class="${ID}-oc-image" />
                <div class="${ID}-section-close"> <a href="#" id="${ID}-trigger-section-close" class="${ID}-section-close-link"> <svg height='18px' width='18px' fill="#a2a2a2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><defs><g id="a"><path fill="#a2a2a2" stroke="none" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></g></defs><g transform="matrix( 1, 0, 0, 1, 0,0) "><use xlink:href="#a"></use></g></svg> </a> </div>
            
                <h2> Which of the following best describes you? </h2>

                <div class="${ID}-banner-section-options">

                    <a href="#" id="${ID}-section-option-banner-1" class="${ID}-banner-section-option" style="background-image: url('https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-parenttobe.jpg');">

                        <h3> I am </h3>

                        <h2> Expecting </h2>

                    </a>

                    <a href="#" id="${ID}-section-option-banner-2" class="${ID}-banner-section-option" style="background-image: url('https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-parents.jpg');">

                        <h3> I am a </h3>

                        <h2> Parent </h2>

                    </a>

                    <a href="#" id="${ID}-section-option-banner-3" class="${ID}-banner-section-option" style="background-image: url('https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-friendsfamily.jpg');">

                        <h3> I am shopping for </h3>

                        <h2> Friends and Family </h2>

                    </a>

                </div>
            
            </div>
        
        `;
    }

    let triggerInsertionPoint = document.querySelector(triggerInsertionPointPlacement);
    triggerInsertionPoint.insertAdjacentHTML('afterend', triggerHTML);

    if(VARIATION == 2 && window.outerWidth < 992) {
        document.documentElement.classList.add(`${ID}-noscroll`);
    }

    interactiveOuter = document.querySelector(`.${ID}-section-interactives`);
    let parentToBeLink = document.getElementById(`${ID}-section-option-banner-1`);
    let parentLink = document.getElementById(`${ID}-section-option-banner-2`);
    let friendsFamilyLink = document.getElementById(`${ID}-section-option-banner-3`);

    // event listeners for each section

    // initial click on outer section sets local storage with segment and 'noshow' cookie so that the user isn't bothered
    // to enter the age-specific or date-specific information. Then opens the inner section.

    parentToBeLink.addEventListener('click', (e) => {
        e.preventDefault();

        if(document.querySelector(`.${ID}-section`).classList.contains('hidden')) {
            document.querySelector(`.${ID}-section`).classList.remove('hidden');
            document.querySelector(`.${ID}-segmentation-trigger-holder`).remove();
            document.documentElement.classList.add(`${ID}-noscroll`);

            fireEvent("Click - user has clicked on the expecting button on the PDP banner to open the segmentation quiz", true);

        } else {
            document.querySelector(`.${ID}-section`).classList.add('hidden');
            document.documentElement.classList.remove(`${ID}-noscroll`);
        }

        optionsOuter.classList.add('interactive-enabled');
        interactiveOuter.classList.add('interactive-enabled');

        [].slice.call(interactives).forEach((interactive) => {

            if(interactive.classList.contains('interactive-enabled')) {
                interactive.classList.remove('interactive-enabled');
            } 
        });

        if(segmentPlacement == "orderconf") {
            pushOrderData();
        }

        document.getElementById(`${ID}-section-interactive-1`).classList.add('interactive-enabled');

        setTimeout(function() {
            document.getElementById(`${ID}-section-interactive-1`).classList.add('interactive-enabled-visible');
            localStorage.setItem(`${ID}-segment-type`, 'parent-to-be');
            fireEvent(`Click - User Selected: [parent-to-be] on ${segmentPlacement}`);

            window.DY.API("event", {
                name: "customerType",
                properties: {  
                    segment: "parent-to-be",
                    dateEntered: new Date().toString(),
                }
            });

            setCookie(`MAM-366-noshow`, true);
        }, 500);
    });

    friendsFamilyLink.addEventListener('click', (e) => {
        e.preventDefault();

        if(document.querySelector(`.${ID}-section`).classList.contains('hidden')) {
            document.querySelector(`.${ID}-section`).classList.remove('hidden');
            document.querySelector(`.${ID}-segmentation-trigger-holder`).remove();
            document.documentElement.classList.add(`${ID}-noscroll`);

            fireEvent("Click - user has clicked on the friends/family button on the PDP banner to open the segmentation quiz", true);

        } else {
            document.querySelector(`.${ID}-section`).classList.add('hidden');
            document.documentElement.classList.remove(`${ID}-noscroll`);
        }

        optionsOuter.classList.add('interactive-enabled');
        interactiveOuter.classList.add('interactive-enabled');

        [].slice.call(interactives).forEach((interactive) => {

            if(interactive.classList.contains('interactive-enabled')) {
                interactive.classList.remove('interactive-enabled');
            } 
        });

        if(segmentPlacement == "orderconf") {
            pushOrderData();
        }

        document.getElementById(`${ID}-section-interactive-2`).classList.add('interactive-enabled')

        setTimeout(function() {
            document.getElementById(`${ID}-section-interactive-2`).classList.add('interactive-enabled-visible');
            localStorage.setItem(`${ID}-segment-type`, 'friends-family');
            fireEvent(`Click - User Selected: [friends-family] on ${segmentPlacement}`);

            window.DY.API("event", {
                name: "customerType",
                properties: {  
                    segment: "friends-family",
                    dateEntered: new Date().toString(),
                }
            });

            setCookie(`MAM-366-noshow`, true);
        }, 500);
    });

    parentLink.addEventListener('click', (e) => {
        e.preventDefault();

        if(document.querySelector(`.${ID}-section`).classList.contains('hidden')) {
            document.querySelector(`.${ID}-section`).classList.remove('hidden');
            document.querySelector(`.${ID}-segmentation-trigger-holder`).remove();
            document.documentElement.classList.add(`${ID}-noscroll`);

            fireEvent("Click - user has clicked on the parent button on the PDP banner to open the segmentation quiz", true);

        } else {
            document.querySelector(`.${ID}-section`).classList.add('hidden');
            document.documentElement.classList.remove(`${ID}-noscroll`);
        }

        optionsOuter.classList.add('interactive-enabled');
        interactiveOuter.classList.add('interactive-enabled');

        [].slice.call(interactives).forEach((interactive) => {

            if(interactive.classList.contains('interactive-enabled')) {
                interactive.classList.remove('interactive-enabled');
            } 
        });

        if(segmentPlacement == "orderconf") {
            pushOrderData();
        }

        document.getElementById(`${ID}-section-interactive-3`).classList.add('interactive-enabled')

        setTimeout(function() {
            document.getElementById(`${ID}-section-interactive-3`).classList.add('interactive-enabled-visible');
            localStorage.setItem(`${ID}-segment-type`, 'parent');
            fireEvent(`Click - User Selected: [parent] on ${segmentPlacement}`);

            window.DY.API("event", {
                name: "customerType",
                properties: {  
                    segment: "parent",
                    dateEntered: new Date().toString(),
                }
            });

            setCookie(`MAM-366-noshow`, true);
        }, 500);
    });

    let closeTriggerLink = document.getElementById(`${ID}-trigger-section-close`);

    // close Trigger link
    closeTriggerLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        document.documentElement.classList.remove(`${ID}-noscroll`);
        document.querySelector(`.${ID}-segmentation-trigger-holder`).remove();
        setCookie(`MAM-366-noshow`, true);

        fireEvent("Click - user has clicked the X to hide the segmentation quiz trigger", true);

    });


}

const createModal = () => {

    

    // dates for the datepicker

    let todayDate = new Date();
    let nineMonthDate = new Date();
    nineMonthDate.setMonth(nineMonthDate.getMonth() + 9);
    let formattedTodayString = todayDate.getFullYear() + "-" + ("0" + (todayDate.getMonth() + 1)).slice(-2) + "-" +todayDate.getDate();
    let formattedNineMonthString = nineMonthDate.getFullYear() + "-" + ("0" + (nineMonthDate.getMonth() + 1)).slice(-2) + "-" +nineMonthDate.getDate();
    let pageTitle = "";
    if(segmentPlacement == "plp") {
        pageTitle = document.querySelector('h1').innerText;
    } else if(segmentPlacement == "pdp") {
        pageTitle = "product";
    }

    let sectionHTML = `

        <div class="${ID}-section ${segmentPlacement} hidden">

            <div class="${ID}-section-close"> <a href="#" id="${ID}-section-close" class="${ID}-section-close-link"> <svg height='18px' width='18px' fill="#a2a2a2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><defs><g id="a"><path fill="#a2a2a2" stroke="none" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></g></defs><g transform="matrix( 1, 0, 0, 1, 0,0) "><use xlink:href="#a"></use></g></svg> </a> </div>

            <div class="${ID}-section-content">

                <div class="${ID}-section-options">

                    <img src="https://blcro.fra1.digitaloceanspaces.com/MAM-366/orderconf-top-desktop.jpg" alt="top image" />

                    <h2> Which of the following best describes you? </h2>

                    <div class="${ID}-section-options-holder">

                        <a href="#" id="${ID}-section-option-1" class="${ID}-section-option" style="background-image: url('https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-parenttobe.jpg');">

                            <h3> I am </h3>

                            <h2> Expecting </h2>

                        </a>

                        <a href="#" id="${ID}-section-option-3" class="${ID}-section-option" style="background-image: url('https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-parents.jpg');">

                            <h3> I am a </h3>

                            <h2> Parent </h2>

                        </a>

                        <a href="#" id="${ID}-section-option-2" class="${ID}-section-option" style="background-image: url('https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-friendsfamily.jpg');">

                            <h3> I am shopping for </h3>

                            <h2> Friends and Family </h2>

                        </a>

                    </div>

                </div>

                <div class="${ID}-section-interactives">

                    <div class="${ID}-section-interactive" id="${ID}-section-interactive-1">

                        <div class="${ID}-section-option" style="background-image: url('https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-parenttobe.jpg');">

                            <h3> I am </h3>

                            <h2> Expecting </h2>

                        </div>

                        <div class="${ID}-section-datagather ${ID}-parenttobe">

                            

                            <form method="POST" action="" id="${ID}-parenttobe-form" class="${ID}-parenttobe-form">

                                <h3> When is your due date? </h3>

                                <p> Sharing this information with us is optional but will help us to improve the online experience </p>

                                <div class="${ID}-duedate-holder">
                                    <div class="${ID}-duedate-date-field">
                                        <input type="text" id="${ID}-parenttobe-duedate" placeholder="dd/mm/yyyy" name="${ID}-parenttobe-duedate" class="${ID}-datagather-input" readonly />
                                        <svg id="${ID}-duedate-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                    </div>
                                    <button type="submit" class="btn btn--secondary ${ID}-datagather-submit">Next</button>
                                </div>

                                
                            </form>

                            <form method="POST" action="" id="${ID}-parenttobe-form-q2" class="${ID}-parenttobe-form ${ID}-parenttobe-form ${ID}-hidden">

                                <h3> Is this your first child? </h3>

                                <div class="${ID}-parenttobe-firstchild"> 
                                    <div class="${ID}-spacer">
                                        <input type="radio" name="${ID}-parenttobe-firstchild" checked="checked" value="first-time" id="${ID}-parenttobe-firstchild-yes" />
                                        <label for="${ID}-parenttobe-firstchild-yes">Yes, this will be my first child</label>
                                    </div>
                                    <div class="${ID}-spacer">
                                        <input type="radio" name="${ID}-parenttobe-firstchild" value="not-first-time" id="${ID}-parenttobe-firstchild-no" />
                                        <label for="${ID}-parenttobe-firstchild-no">No, this won't be my first child</label>
                                    </div>
                                    

                                </div>

                                <button type="submit" class="btn btn--secondary ${ID}-datagather-submit">Next</button>
                            </form>

                            

                            

                            
                        </div>

                    </div>

                    <div class="${ID}-section-interactive flipped" id="${ID}-section-interactive-2">

                        <div class="${ID}-section-option" style="background-image: url('https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-friendsfamily.jpg');">

                            <h3> I am shopping for </h3>

                            <h2> Friends and Family </h2>

                        </div>

                        <div class="${ID}-section-datagather ${ID}-friendsfamily">

                            <h2> How old is their child? </h2>

                            
                            <select name="${ID}-friendsfamily-child-age" id="${ID}-friendsfamily-child-age" class="${ID}-datagather-input">
                                <option default>Select an age</option>
                                <option value="not-born-yet"> Not born yet </option>
                                <option value="zero-to-three-months"> 0-3 months </option>
                                <option value="three-to-six-months"> 3-6 months </option>
                                <option value="six-to-nine-months"> 6-9 months </option>
                                <option value="nine-to-twelve-months"> 9-12 months </option>
                                <option value="twelve-to-eighteen-months"> 12-18 months </option>
                                <option value="eighteen-to-twentyfour-months"> 18-24 months </option>
                                <option value="two-years-plus"> 2 years + </option>
                            </select>
                            
                            <a href="#" id="${ID}-friendsfamily-child-age-submit" class="btn btn--secondary ${ID}-datagather-submit"> Next </a>

                        </div>

                    </div>

                    <div class="${ID}-section-interactive flipped" id="${ID}-section-interactive-3">

                        <div class="${ID}-section-option" style="background-image: url('https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-204-parents.jpg');">

                            <h3> I am a </h3>

                            <h2> Parent </h2>

                        </div>

                        <div class="${ID}-section-datagather ${ID}-parent">

                            <h2> How old is your child? </h2>

                            <select name="${ID}-parent-child-age" id="${ID}-parent-child-age" class="${ID}-datagather-input">
                                <option default>Select an age</option>
                                <option value="zero-to-three-months"> 0-3 months </option>
                                <option value="three-to-six-months"> 3-6 months </option>
                                <option value="six-to-nine-months"> 6-9 months </option>
                                <option value="nine-to-twelve-months"> 9-12 months </option>
                                <option value="twelve-to-eighteen-months"> 12-18 months </option>
                                <option value="eighteen-to-twentyfour-months"> 18-24 months </option>
                                <option value="two-years-plus"> 2 years + </option>
                            </select>
                            
                            <a href="#" id="${ID}-parent-child-age-submit" class="btn btn--secondary ${ID}-datagather-submit"> Next </a>

                        </div>

                    </div>

                </div>

                <div class="${ID}-section-thankyou ${segmentPlacement}">

                    <h2> Thank you! </h2>

                    <p> Please select one of our recommended categories to browse </p>

                    <div class="${ID}-suggested-categories">



                    </div>

                </div>


            </div>

        </div>

        


    `;

    

    // sets the insertion point and adds events once the interactives have been added to the dom

    let sectionInsertionPoint, triggerInsertionPointSelector;

    logMessage("segment placement: "+segmentPlacement);

    if(segmentPlacement == "plp") {
        let placementNumber = 0;
        if(window.outerWidth > 1200) {
            placementNumber = 16;
        } else if(window.outerWidth > 820 && window.outerWidth < 1199) {
            placementNumber = 12;
        } else {
            placementNumber = 8;
        }

        

        

        pollerLite(['#bc-sf-filter-products .grid__item'], () => {

           

            setTimeout(() => {
                if(window.location.href.indexOf('/collections/pushchairs') > -1 || window.location.href.indexOf('/collections/furniture') > -1 || window.location.href.indexOf('/collections/baby-clothing') > -1 || window.location.href.indexOf('/collections/car-seats') > -1 || window.location.href.indexOf('/collections/feeding-weaning') > -1) {
                    placementNumber --;
                } 
                triggerInsertionPointSelector = '#bc-sf-filter-products .grid__item:nth-of-type('+placementNumber+')';
                //insertTrigger(triggerInsertionPointSelector);
            }, 1500);
            

        });

    } else if(segmentPlacement == "pdp") {
        triggerInsertionPointSelector = '#shopify-section-usp-bar';
        
        pollerLite(['#shopify-section-usp-bar'], () => {

            insertTrigger(triggerInsertionPointSelector);

        });
    
    } 

    sectionInsertionPoint = document.body;

    sectionInsertionPoint.insertAdjacentHTML('afterbegin', sectionHTML);

    segmentationElement = document.querySelector(`.${ID}-section`);

    document.documentElement.addEventListener('click', (e) => {
        if (e.target.classList.contains(`${ID}-noscroll`)) {
            segmentationElement.classList.add('hidden');
            segmentationElement.classList.remove('thank-you');
            document.documentElement.classList.remove(`${ID}-noscroll`);

            fireEvent("Click - user closed the popup by clicking outside of the element", true);

        } else {
            return true;
        }
    })    

    litepicker();

    const picker = new Litepicker({ 
        element: document.getElementById(`${ID}-parenttobe-duedate`),
        maxDate: formattedNineMonthString,
        minDate: formattedTodayString
    });

    pollerLite([`.${ID}-section-interactives`], () => {
        addEvents();
    });

    window.addEventListener('orientationchange', (e) => {

        if(window.orientation == 90) {
            if(!document.querySelector(`.${ID}-section`).classList.contains('hidden')) {
                document.querySelector(`.${ID}-section`).classList.add(`hidden`);
                document.documentElement.classList.add(`${ID}-noscroll`);
                document.querySelector(`.${ID}-segmentation-trigger-holder`).classList.add(`${ID}-hidden`);
            }
            
        } else {
            if(document.querySelector(`.${ID}-section`).classList.contains('hidden')) {
                document.querySelector(`.${ID}-section`).classList.remove(`${ID}-hidden`);
                document.documentElement.classList.remove(`${ID}-noscroll`);
                document.querySelector(`.${ID}-segmentation-trigger-holder`).classList.remove(`${ID}-hidden`);
            }
        }

    })


}

export default () => {
    setup();

    fireEvent('Conditions Met');

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if(shared.VARIATION == 'control') {
        return;
    }

    // Write experiment code here
    // ...

    if(VARIATION == 1) {
        if(document.body.classList.contains('template-product')) {
            segmentPlacement = "pdp";
        } else {
            segmentPlacement = "plp";
        }
        
    } else if(VARIATION == 2) {
        segmentPlacement = "orderconf";
    } else if(VARIATION == 3) {
        segmentPlacement = "exitintent";
    }

    if(!getCookie('MAM-366-noshow')) {
            
        // show experiment

        let triggerInsertionPointSelector;

        createModal();

        if(segmentPlacement == 'plp') {
            pollerLite(['#bc-sf-filter-products .grid__item'], () => {
                let placementNumber = 0;
                if(window.outerWidth > 1280) {
                    placementNumber = 16;
                } else if(window.outerWidth > 820 && window.outerWidth < 1279) {
                    placementNumber = 12;
                } else {
                    placementNumber = 8;
                }

                setTimeout(() => {
                    
                    triggerInsertionPointSelector = '#bc-sf-filter-products .grid__item:nth-of-type('+placementNumber+')';

                    insertTrigger(triggerInsertionPointSelector);
                    
                }, 1500);
            
            });
        } else if(segmentPlacement == 'orderconf') {
            // show experiment
            pollerLite(['body'], () => {
                
                setTimeout(() => {

                    triggerInsertionPointSelector = 'body';
                    insertTrigger(triggerInsertionPointSelector);
                    
                }, 1500);

            });
        } else if(segmentPlacement == 'exitintent') {
            // show experiment
            pollerLite(['body'], () => {
                
                document.querySelector(`.${ID}-section`).classList.remove('hidden');
                document.documentElement.classList.add(`${ID}-noscroll`);

            });
        }

        

        fireEvent(`Interaction - test displayed - page: ${segmentPlacement}`);


    } else {
        fireEvent(`Interaction - user has already seen and closed the modal - page: ${segmentPlacement}`);
    }

};
