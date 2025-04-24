/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
    setup();

    fireEvent('Conditions Met');

    // -----------------------------
    // Add events that apply to both variant and control
    // -----------------------------
    // ...

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (shared.VARIATION == 'control') {
        return;
    }

    // Write experiment code here
    // ...
    var FLAK1 = {
        init: function() {
            this.mainJs();
        },
        /* WRITE CODE BELOW THIS LINE */
        mainJs: function() {
            const mainBody = document.querySelector('body');
            const contentContainer = document.querySelector('div.container-fluid.ContentWrapper');

            mainBody.classList.add('BSP-FLAK-Survey');

            var surveyMsgPopUp = '<div class="BSP-FLAK-popup"><p>Just a quick question...</p></div>';
            mainBody.insertAdjacentHTML('beforeend', surveyMsgPopUp);
            const orderNumberContainer = document.querySelector('.OrderCompleteNumber');
            const orderNumber = orderNumberContainer !== null ? orderNumberContainer.innerText : 'OrderNumberNotFound';
            var orderConfirmMsg =
                `<div class="BSP-FLAK-order-confirm-msg"><strong><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="BSP-FLAK-check-icon"><path fill="currentColor" d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z" class=""></path></svg> Thank You</strong> - Your Order has been processed. Order number: <strong class="custom-orderNumber">${orderNumber}</strong></div>`;

            var stepContainer = '<div class="BSP-Flank-custom-container"><div class="BSP-FLAK-step-container"></div></div>';
            contentContainer.innerHTML = '';
            contentContainer.insertAdjacentHTML('afterbegin', stepContainer);
            contentContainer.insertAdjacentHTML('afterbegin', orderConfirmMsg);

            // document.querySelector('.BSP-FLAK-order-confirm-msg strong.custom-orderNumber').innerText =
            //   document.querySelector('span.OrderCompleteNumber').innerText;

            var data = {};
            var steps = `<div class="BSP-FLAK-step BSP-FLAK-step-1 BSP-FLAK-step-prev BSP-FLAK-active" id="BSP-FLAK-step-1">
                        <div class="BSP-FLAK-step-top">
                            <div class="BSP-FLAK-Progress BSP-FLAK-Progress-1"></div>
                            <div class="BSP-FLAK-question">
                                Who did you shop for?
                            </div>
                        </div>
                        <div class="BSP-FLAK-step-mid">
                            <div class="BSP-FLAK-inputs-container">
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="shop_for1" name="shop_for" value="Myself">
                                    <label for="shop_for1">Myself</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="shop_for2" name="shop_for" value="Someone else">
                                    <label for="shop_for2">Someone else</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="shop_for3" name="shop_for" value="Multiple">
                                    <label for="shop_for3">Multiple</label>
                                </div>
                            </div>
                        </div>
                        <div class="BSP-FLAK-step-bottom">
                            <button class="BSP-FLAK-prev-btn BSP-FLAK-disabled" step="BSP-FLAK-step-1">Previous</button>
                            <button class="BSP-FLAK-next-btn BSP-FLAK-disabled" step="BSP-FLAK-step-2">Next</button>
                        </div>
                    </div>

                    <div class="BSP-FLAK-step BSP-FLAK-step-2" id="BSP-FLAK-step-2">
                        <div class="BSP-FLAK-step-top">
                            <div class="BSP-FLAK-Progress BSP-FLAK-Progress-2"></div>
                            <div class="BSP-FLAK-question">
                                When will you be wearing the items that you purchased today?
                            </div>
                        </div>
                        <div class="BSP-FLAK-step-mid">
                            <div class="BSP-FLAK-inputs-container">
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="wearing_time1" name="wearing_time" value="For a formal occasion">
                                    <label for="wearing_time1">For a formal occasion</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="wearing_time2" name="wearing_time" value="Day time/everyday wear">
                                    <label for="wearing_time2">Day time/everyday wear</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="wearing_time3" name="wearing_time" value="Work">
                                    <label for="wearing_time3">Work</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="wearing_time4" name="wearing_time" value="For a sporting activity">
                                    <label for="wearing_time4">For a sporting activity</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="wearing_time5" name="wearing_time" value="On holiday">
                                    <label for="wearing_time5">On holiday</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="wearing_time6" name="wearing_time" value="Other">
                                    <label for="wearing_time6">Other</label>
                                    <div class="BSP-FLAK-other-input">
                                        <input type="text" class="BSP-FLAK-wearing-time-other" placeholder="Please specify other"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="BSP-FLAK-step-bottom">
                            <button class="BSP-FLAK-prev-btn" step="BSP-FLAK-step-1">Previous</button>
                            <button class="BSP-FLAK-next-btn BSP-FLAK-disabled" step="BSP-FLAK-step-3">Next</button>
                        </div>
                    </div>

                    <div class="BSP-FLAK-step BSP-FLAK-step-3" id="BSP-FLAK-step-3">
                        <div class="BSP-FLAK-step-top">
                            <div class="BSP-FLAK-Progress BSP-FLAK-Progress-3"></div>
                            <div class="BSP-FLAK-question">
                                Which best describes your formal occasion?
                            </div>
                        </div>
                        <div class="BSP-FLAK-step-mid">
                            <div class="BSP-FLAK-inputs-container">
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="formal_occasion1" name="formal_occasion" value="Birthday outfit">
                                    <label for="formal_occasion1">Birthday outfit</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="formal_occasion2" name="formal_occasion" value="Night out">
                                    <label for="formal_occasion2">Night out</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="formal_occasion3" name="formal_occasion" value="Date night">
                                    <label for="formal_occasion3">Date night</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="formal_occasion4" name="formal_occasion" value="Wedding outfit">
                                    <label for="formal_occasion4">Wedding outfit</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="formal_occasion5" name="formal_occasion" value="Holiday">
                                    <label for="formal_occasion5">Holiday</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="formal_occasion6" name="formal_occasion" value="One off event">
                                    <label for="formal_occasion6">One off event</label>
                                    <div class="BSP-FLAK-other-input">
                                        <input type="text" class="BSP-FLAK-wearing-time-other" placeholder="Please specify what the event is"/>
                                    </div>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="formal_occasion7" name="formal_occasion" value="Other">
                                    <label for="formal_occasion7">Other</label>
                                    <div class="BSP-FLAK-other-input">
                                        <input type="text" class="BSP-FLAK-wearing-time-other" placeholder="Please specify other"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="BSP-FLAK-step-bottom">
                            <button class="BSP-FLAK-prev-btn" step="BSP-FLAK-step-2">Previous</button>
                            <button class="BSP-FLAK-next-btn BSP-FLAK-disabled" step="BSP-FLAK-step-4">Next</button>
                        </div>
                    </div>

                    <div class="BSP-FLAK-step BSP-FLAK-step-4" id="BSP-FLAK-step-4">
                        <div class="BSP-FLAK-step-top">
                            <div class="BSP-FLAK-Progress BSP-FLAK-Progress-4"></div>
                            <div class="BSP-FLAK-question">
                                Which of the following best describes the style you are shopping for today?
                            </div>
                        </div>
                        <div class="BSP-FLAK-step-mid">
                            <div class="BSP-FLAK-inputs-container">
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="style_for_shopping1" name="style_for_shopping" value="Forever wardrobe staples">
                                    <label for="style_for_shopping1">Forever wardrobe staples</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="style_for_shopping2" name="style_for_shopping" value="Streetwear">
                                    <label for="style_for_shopping2">Streetwear</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="style_for_shopping3" name="style_for_shopping" value="Formal wear">
                                    <label for="style_for_shopping3">Formal wear</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="style_for_shopping4" name="style_for_shopping" value="Chic">
                                    <label for="style_for_shopping4">Chic</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="style_for_shopping5" name="style_for_shopping" value="Smart Casual">
                                    <label for="style_for_shopping5">Smart Casual</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="style_for_shopping6" name="style_for_shopping" value="Sport / fitness /activities">
                                    <label for="style_for_shopping6">Sport / fitness /activities</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="style_for_shopping7" name="style_for_shopping" value="New Season trends">
                                    <label for="style_for_shopping7">New Season trends</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="style_for_shopping8" name="style_for_shopping" value="Basics">
                                    <label for="style_for_shopping8">Basics</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="style_for_shopping9" name="style_for_shopping" value="On trend">
                                    <label for="style_for_shopping9">On trend</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="radio" id="style_for_shopping10" name="style_for_shopping" value="Other">
                                    <label for="style_for_shopping10">Other</label>
                                    <div class="BSP-FLAK-other-input">
                                        <input type="text" class="BSP-FLAK-wearing-time-other" placeholder="Please specify other"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="BSP-FLAK-step-bottom">
                            <button class="BSP-FLAK-prev-btn" step="BSP-FLAK-step-3">Previous</button>
                            <button class="BSP-FLAK-next-btn BSP-FLAK-disabled" step="BSP-FLAK-step-5">Next</button>
                        </div>
                    </div>

                    <div class="BSP-FLAK-step BSP-FLAK-step-5" id="BSP-FLAK-step-5">
                        <div class="BSP-FLAK-step-top">
                            <div class="BSP-FLAK-Progress BSP-FLAK-Progress-5"></div>
                            <div class="BSP-FLAK-question">
                                Which factors are most important to when shopping at Flannels?(pick up to 3)
                            </div>
                        </div>
                        <div class="BSP-FLAK-step-mid">
                            <div class="BSP-FLAK-inputs-container">
                                <div class="BSP-FLAK-input">
                                    <input type="checkbox" id="important_factors1" name="important_factors" value="Large product range">
                                    <label for="important_factors1">Large product range</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="checkbox" id="important_factors2" name="important_factors" value="Price">
                                    <label for="important_factors2">Price</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="checkbox" id="important_factors3" name="important_factors" value="Comfort ">
                                    <label for="important_factors3">Comfort </label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="checkbox" id="important_factors4" name="important_factors" value="New Styles">
                                    <label for="important_factors4">New Styles</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="checkbox" id="important_factors5" name="important_factors" value="Quality">
                                    <label for="important_factors5">Quality</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="checkbox" id="important_factors6" name="important_factors" value="Size availability">
                                    <label for="important_factors6">Size availability</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="checkbox" id="important_factors7" name="important_factors" value="Range of designers available">
                                    <label for="important_factors7">Range of designers available</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="checkbox" id="important_factors8" name="important_factors" value="Delivery pricing">
                                    <label for="important_factors8">Delivery pricing</label>
                                </div>
                                <div class="BSP-FLAK-input">
                                    <input type="checkbox" id="important_factors9" name="important_factors" value="Delivery pricing">
                                    <label for="important_factors9">Speed of delivery</label>
                                </div>
                            </div>
                        </div>
                        <div class="BSP-FLAK-step-bottom">
                            <button class="BSP-FLAK-prev-btn" step="BSP-FLAK-step-4">Previous</button>
                            <button class="BSP-FLAK-next-btn BSP-FLAK-disabled" step="BSP-FLAK-step-6">Submit</button>
                        </div>
                    </div>

                    <div class="BSP-FLAK-step BSP-FLAK-step-6" id="BSP-FLAK-step-6">
                        <div class="BSP-FLAK-step-last">
                            <div class="BSP-FLAK-close-circle">
                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="BSP-FLAK-check-icon"><path fill="currentColor" d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z" class=""></path></svg>
                            </div>
                            <div class="BSP-FLAK-response">Thank you for your response!</div>
                            <a class="BSP-FLAK-home-btn" href="https://www.flannels.com">Go to home page</a>
                        </div>
                    </div>
                `;

            document.querySelector('.BSP-FLAK-step-container').insertAdjacentHTML('beforeend', steps);
            const radios = document.querySelectorAll('.BSP-FLAK-input input[type="radio"]');

            radios.forEach(function(elm) {
                elm.addEventListener('change', function(e) {
                    const step = elm.closest('.BSP-FLAK-step');
                    const stepNo = step.getAttribute('id').trim();
                    const selectedValue = elm.value.trim();
                    const isOther = selectedValue === 'Other' || selectedValue === 'One off event' ? true : false;

                    if (stepNo === 'BSP-FLAK-step-1' || stepNo === 'BSP-FLAK-step-2') {
                        const nextBtn = step.querySelector('.BSP-FLAK-next-btn');
                        if (selectedValue === 'Myself' || selectedValue === 'For a formal occasion') {
                            const nextStepNo = parseInt(stepNo.split('-')[3]) + 1;
                            const nextStepId = 'BSP-FLAK-step-' + nextStepNo;

                            const prevBtnOfNextStep = document.getElementById(nextStepId).querySelector('.BSP-FLAK-prev-btn');

                            prevBtnOfNextStep.setAttribute('step', stepNo);
                            nextBtn.setAttribute('step', nextStepId);
                        } else {
                            document.querySelector('#BSP-FLAK-step-4 .BSP-FLAK-prev-btn').setAttribute('step', stepNo);
                            nextBtn.setAttribute('step', 'BSP-FLAK-step-4');
                        }
                    }

                    if (isOther) {
                        const textFieldContainer = elm.closest('.BSP-FLAK-input').querySelector('.BSP-FLAK-other-input');
                        if (textFieldContainer != null) {
                            textFieldContainer.classList.add('BSP-FLAK-other-input-show');
                            textFieldContainer.querySelector('input').focus();
                            if (textFieldContainer.querySelector('input').value == '') {
                                step.querySelector('.BSP-FLAK-next-btn').classList.add('BSP-FLAK-disabled');
                            }
                        }
                    } else {
                        const textfields = step.querySelector('.BSP-FLAK-input .BSP-FLAK-other-input');
                        if (textfields !== null) {
                            textfields.classList.remove('BSP-FLAK-other-input-show');
                            textfields.querySelector('input').value = '';
                        }
                        step.querySelector('.BSP-FLAK-next-btn').classList.remove('BSP-FLAK-disabled');
                    }

                    data['step' + stepNo.split('-')[3]] = {
                        question: step.querySelector('.BSP-FLAK-question').textContent.trim(),
                        key: elm.getAttribute('name').trim(),
                        response: elm.value.trim(),
                    };
                });
            });

            const checkboxes = document.querySelectorAll('.BSP-FLAK-input input[type="checkbox"]');

            checkboxes.forEach(function(elm) {
                elm.addEventListener('change', function(e) {
                    const step = elm.closest('.BSP-FLAK-step');
                    const stepNo = step.getAttribute('id').trim();
                    var selectedItems = step.querySelectorAll('.BSP-FLAK-input input[type="checkbox"]:checked');
                    var notSelectedItems = step.querySelectorAll('.BSP-FLAK-input input[type="checkbox"]:not(:checked)');
                    var selectedInput = [];
                    if (selectedItems.length > 0) {
                        selectedItems.forEach(function(item) {
                            selectedInput.push(item.value.trim());
                        });
                        step.querySelector('.BSP-FLAK-next-btn').classList.remove('BSP-FLAK-disabled');
                    } else {
                        step.querySelector('.BSP-FLAK-next-btn').classList.add('BSP-FLAK-disabled');
                    }

                    if (selectedItems.length >= 3) {
                        notSelectedItems.forEach(function(elm) {
                            elm.nextElementSibling.classList.add('BSP-FLAK-disabled-input');
                        });
                    } else {
                        notSelectedItems.forEach(function(elm) {
                            elm.nextElementSibling.classList.remove('BSP-FLAK-disabled-input');
                        });
                    }

                    data['step' + stepNo.split('-')[3]] = {
                        question: step.querySelector('.BSP-FLAK-question').textContent.trim(),
                        key: elm.getAttribute('name').trim(),
                        response: selectedInput,
                    };
                });
            });

            const OthertextFields = document.querySelectorAll('.BSP-FLAK-other-input input[type="text"]');

            OthertextFields.forEach(function(elm) {
                elm.addEventListener('keyup', function(e) {
                    const step = elm.closest('.BSP-FLAK-step');
                    if (e.target.value.trim() !== '') {
                        step.querySelector('.BSP-FLAK-next-btn').classList.remove('BSP-FLAK-disabled');
                    } else {
                        step.querySelector('.BSP-FLAK-next-btn').classList.add('BSP-FLAK-disabled');
                    }
                });
            });

            const nextBtns = document.querySelectorAll('.BSP-FLAK-next-btn');
            nextBtns.forEach(function(elm) {
                elm.addEventListener('click', function(e) {
                    const nextStep = document.getElementById(elm.getAttribute('step'));
                    const step = elm.closest('.BSP-FLAK-step');
                    const stepNo = step.getAttribute('id').trim();
                    const textfields = step.querySelector('.BSP-FLAK-input .BSP-FLAK-other-input');
                    if (textfields !== null && textfields.querySelector('input').value !== '') {
                        data['step' + stepNo.split('-')[3]].response =
                            data['step' + stepNo.split('-')[3]].response + '-' + textfields.querySelector('input').value;
                    }
                    step.classList.add('BSP-FLAK-step-prev');
                    step.classList.remove('BSP-FLAK-active');
                    nextStep.classList.add('BSP-FLAK-active');
                    nextStep.classList.remove('BSP-FLAK-step-prev');
                    if (elm.getAttribute('step') == 'BSP-FLAK-step-6') {
                        fireEvent(`Data collected from order Confirmation Survey : ${JSON.stringify(data)}`);
                    }
                });
            });

            const prevBtns = document.querySelectorAll('.BSP-FLAK-prev-btn');
            prevBtns.forEach(function(elm) {
                elm.addEventListener('click', function(e) {
                    const prevStep = document.getElementById(elm.getAttribute('step'));
                    const step = elm.closest('.BSP-FLAK-step');
                    step.classList.remove('BSP-FLAK-step-prev');
                    step.classList.remove('BSP-FLAK-active');
                    prevStep.classList.remove('BSP-FLAK-step-prev');
                    prevStep.classList.add('BSP-FLAK-active');
                });
            });
        },
    };

    (function pollForFLAK1() {
        if (document.querySelector('body .ContentWrapper')) {
            try {
                FLAK1.init();
            } catch (error) {
                console.log('Error:', error);
            }
        } else {
            setTimeout(pollForFLAK1, 25);
        }
    })();
};