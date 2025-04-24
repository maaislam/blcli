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

    var stepOneQuestions = [
        'myself',
        'family',
        'multiple'
    ]

    var stepTwoQuestions = [
        'Cheapest place to get what I needed',
        'Could get everything in one place for my activity/sport',
        'Website is easy to use',
        'I don’t have a sports direct store near me',
        'Nowhere else sells the products that I needed',
        'I’ve always shopped at sports direct',
        'Wouldn’t know where else to go'
    ]

    var stepThreeQuestions = [
        'Beginner',
        'It’s a hobby that I’ve done for a while',
        'Professional'
    ]


    var sportsType = [
        'Running ',
        'Football',
        'Outdoor',
        'Golf',
        'Cycling',
        'Skiing ',
        'Skate',
        'Rugby',
        'Tennis',
        'Boxing',
    ]

    var stepFiveQuestions = [
        'I’ve started a new sport',
        'I needed to replace my old sportswear',
        'Upcoming sporting competition',
        'Loungewear',
        'Gifting',
        'Treating myself ( no real reason) ',
        'Other',
    ]

    var d1 = document.getElementById('BodyWrap');
    d1.insertAdjacentHTML(
        'beforebegin',
        `<div class="question-popup">
            <h2>Just a quick question...</h2>
        </div>`
    );

    setTimeout(function() {
        document.querySelector('.question-popup').style.display = 'none';
    }, 1999);



    var step_content = `
    <div class="servey-section ${ID}-custom-survey-section">
        <div class="servey-header">
            <p class="confirmation-title">Thank you! - Your order has been processed. Order number SD12345</p>
        </div>
        <div class="servey-main-content">


            <div class="servey-step servey-step-one show">
            <div class="servey-progressbar">
                <span class="bg-pink"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
    
            </div>
            <div class="servey-step-title">
                <h4>Who did you shop for today?</h4>
            </div>

            <div class="servey-options" id="step-one-radio">
            ${
                stepOneQuestions.map((item) => {
                    return `
                    <label class="label-container">${item}
                        <input type="radio" name="shop_for" id="${item}" value="${item}">
                        <span class="checkmark"></span>
                    </label>
                    `
                }).join('\n')
            }
            </div>


                <div class="survey-pagination">
                    <button class="servey-step-previous servey-step-one-previous -hide-elem">Previous</button>
                    <button class="servey-step-next servey-step-one-next" id="servey-step-one-next">Next</button>
                </div>
            </div>


            <div class="servey-step servey-step-two">
                <div class="servey-progressbar">
                <span></span>
                <span class="bg-pink"></span>
                <span></span>
                <span></span>
                <span></span>
                </div>
                <div class="servey-step-title">
                    <h4>Why did your choose to shop at Sports direct? (Pick up to 3)</h4>
                </div>
                <div class="servey-options" id="step-two-checkbox">
                ${
                    stepTwoQuestions.map((item) => {
                        return `
                        <label class="container-checkbox">${item}
                            <input type="checkbox" name="purchase_factors" value="${item}" class="purchase-factors">
                            <span class="checkbox-checkmark"></span>
                        </label>
                        `
                    }).join('\n')
                }
                </div>
                <div class="survey-pagination">
                    <button class="servey-step-previous servey-step-two-previous">Previous</button>
                    <button class="servey-step-next servey-step-two-next" id="servey-step-two-next">Next</button>
                </div>
            </div>


            <div class="servey-step servey-step-three">
                <div class="servey-progressbar">
                <span></span>
                <span ></span>
                <span class="bg-pink"></span>
                <span></span>
                <span></span>
                </div>
                <div class="servey-step-title">
                    <h4>How much of an expert would you say you were in your sport?</h4>
                </div>
                <div class="servey-options" id="step-three-radio">
                    ${
                        stepThreeQuestions.map((item) => {
                            return `
                            <label class="label-container">${item} 
                                <input type="radio" name="buying_reason" value="${item}">
                                <span class="checkmark"></span>
                            </label>
                            `
                        }).join('\n')
                    }
                </div>
                <div class="survey-pagination">
                    <button class="servey-step-previous servey-step-three-previous">Previous</button>
                    <button class="servey-step-next servey-step-three-next"id="servey-step-three-next">Next</button>
                </div>
            </div>


            <div class="servey-step servey-step-four">
                <div class="servey-progressbar">
                <span></span>
                <span ></span>
                <span ></span>
                <span class="bg-pink"></span>
                <span></span>
                </div>
                <div class="servey-step-title">
                    <h4>What sport were you shopping for?</h4>
                </div>
                <div class="servey-options servey-options-four" id="step-four-radio">
                    <div class="${ID}-custom-select">
                        <select class="${ID}-select-custom">
                            <option value="0" disabled selected>Select sport</option>
                            ${
                                sportsType.map((item) => {
                                    return `<option value="${item}">${item}</option>`
                                }).join('\n')
                            }
                        </select>
                        <div class="plus alt"></div>
                    </div>
                </div>
                <div class="survey-pagination">
                    <button class="servey-step-previous servey-step-four-previous">Previous</button>
                    <button class="servey-step-next servey-step-four-next" id="servey-step-four-next">Next</button>
                </div>
            </div>



            <div class="servey-step servey-step-four">
                <div class="servey-progressbar">
                <span></span>
                <span ></span>
                <span ></span>
                <span ></span>
                <span class="bg-pink"></span>
                </div>
                <div class="servey-step-title">
                    <h4>What was the main reason for buying the items that you did today?</h4>
                </div>
                <div class="servey-options" id="step-five-radio">
                ${
                    stepFiveQuestions.map((item) => {
                        return `
                        <label class="label-container">${item}  
                            <input type="radio" name="buying_purpose" value="${item}">
                            <span class="checkmark"></span>
                        </label>
                        `
                    }).join('\n')
                }
                    <div class="-other-input">
                        <input type="text" class="-wearing-time-other" placeholder="Please specify"/>
                    </div>
                </div>



                <div class="survey-pagination">
                    <button class="servey-step-previous servey-step-four-previous">Previous</button>
                    <button class="servey-step-next servey-step-four-next" id="servey-step-five-next">Submit</button>
                </div>
            </div>

            <div class="servey-step servey-step-five">
                <div class="success-circle"><span></span></div>
                <div class="servey-step-title">
                    <h4>Thanks for your feedback!</h4>
                </div>
                <div class="servey-step-five-go-to-home">
                    <a href="/">Go to homepage</a>
                </div>
            </div>



        </div>
    </div>
    `;

    var mainContent = document.querySelector('.container-fluid.ContentWrapper')
    mainContent.insertAdjacentHTML('beforebegin', step_content)

    document.querySelector('[id="main-content"]').style.display = 'none';

    const getRadioValue = (name) => {
        const radios = document.getElementsByName(name);
        let val;
        Object.keys(radios).forEach((obj, i) => {
            if (radios[i].checked) {
                val = radios[i].value;
                if (val != '') {
                        radios[i].closest('.servey-options').nextElementSibling.children[1].style.opacity = '1';
                        radios[i].closest('.servey-options').nextElementSibling.children[1].style.pointerEvents = 'inherit';
                    
                }
                if(val == 'Other'){
                    document.querySelector('.-other-input').style.display = "block";
                } else{
                    document.querySelector('.-other-input').style.display = "none";
                }
            }
        });
        return val;
    };

    document.getElementById('step-one-radio').addEventListener('change', (e) => {
        getRadioValue('shop_for');
    });

    const getRadioValue2 = (name) => {
        const radios = document.getElementsByName(name);
        let val;
        Object.keys(radios).forEach((obj, i) => {
            if (radios[i].checked) {

                if (val != '') {
                    radios[i].closest('.servey-options').nextElementSibling.children[1].style.opacity = '1';
                    radios[i].closest('.servey-options').nextElementSibling.children[1].style.pointerEvents = 'inherit';
                }
            } else {
                if (document.querySelectorAll("input[name='purchase_factors']:checked").length === 0) {
                    document.getElementById('servey-step-two-next').style.opacity = '.5';
                    document.getElementById('servey-step-two-next').style.pointerEvents = 'none';
                }
            }
        });
        return val;
    };

    document.getElementById('step-two-checkbox').addEventListener('change', (e) => {
        getRadioValue2('purchase_factors');
    });

    document.getElementById('step-three-radio').addEventListener('change', (e) => {
        getRadioValue('buying_reason');
    });

    document.getElementById('step-five-radio').addEventListener('change', (e) => {
        getRadioValue('buying_purpose');
    });

    var checks = document.querySelectorAll('.purchase-factors');
    var max = 3;
    for (var i = 0; i < checks.length; i++) checks[i].onclick = selectiveCheck;

    function selectiveCheck(event) {
        var checkedChecks = document.querySelectorAll('.purchase-factors:checked');
        if (checkedChecks.length >= max + 1) {
            return false;
        }
    }

    var next = document.getElementsByClassName('servey-step-next');

    var nextShow = function() {
        this.closest('.servey-step').classList.remove('show');
        this.closest('.servey-step').nextElementSibling.classList.add('show');
    };

    for (var i = 0; i < next.length; i++) {
        next[i].addEventListener('click', nextShow, false);
    }

    var previous = document.getElementsByClassName('servey-step-previous');

    var previousShow = function() {
        this.closest('.servey-step').classList.remove('show');
        this.closest('.servey-step').previousElementSibling.classList.add('show');
    };

    for (var i = 0; i < previous.length; i++) {
        previous[i].addEventListener('click', previousShow, false);
    }
    document.querySelector('.SD-654-select-custom').addEventListener('change', ()=> {

        var selectVale = document.querySelector('.SD-654-select-custom').value

        if(selectVale != 0){
            document.querySelector('.SD-654-select-custom').closest('.servey-options').nextElementSibling.children[1].style.opacity = '1';
            document.querySelector('.SD-654-select-custom').closest('.servey-options').nextElementSibling.children[1].style.pointerEvents = 'inherit';
        }


    })

    document.getElementById('servey-step-five-next').addEventListener('click', (e) => {
        var step_1value = document.querySelector('input[name="shop_for"]:checked').value;

        var checkboxes = document.getElementsByName('purchase_factors');
        var step_2value = '';
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            if (checkboxes[i].checked) {
                step_2value += ', ' + checkboxes[i].value;
            }
        }
        if (step_2value) step_2value = step_2value.substring(1);

        var step_3value = document.querySelector('input[name="buying_reason"]:checked').value;
        var step_4value = document.querySelector('.SD-654-select-custom').value;

        if(document.querySelector('input[name="buying_purpose"]:checked').value != "Other"){

            var step_5value = document.querySelector('input[name="buying_purpose"]:checked').value;
        } else{
            var step_5value = document.querySelector('.-wearing-time-other').value;
        }
        fireEvent(
            `Who did you shop for? Ans:${step_1value},` +
            `Why did your choose to shop at Sports direct? (Pick up to 3) Ans:${step_2value},` +
            `How much of an expert would you say you were in your sport? Ans:${step_3value},` +
            `What sport were you shopping for?  Ans:${step_4value},` +
            `What was the main reason for buying the items that you did today? Ans:${step_5value},` 
        );
    });

}