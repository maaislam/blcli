/**
 * Selection boxes markup
 */

import shared from "../shared";
import { __ } from "../helpers";

export default () => {

    const { ID } = shared;
    
    const boxes = {
        payment: {
            markup: [
                `<div class="${ID}_boxDesc">
                    <h3>${__('1. Select your package')}</h3>
                    <p>${__('You can purchase the bike outright or spread the cost over 36 months with no deposit.')}</p>
                </div>
                <div class="${ID}-error_message">${__('Please select an option')}</div>
                <div class="${ID}_box ${ID}_fullPrice" box-target="fullpay" option-name="Pay in full">
                    <div class="${ID}-title">
                        <div class="${ID}-radioButton"><span></span></div> 
                        <h3>${__('Pay in full')}</h3>
                    </div>
                    <p class="${ID}_boxPrice"><b>${__('£2,450.00')}</b></p>
                    <div class="${ID}-includes">
                        <p>Includes:</p>
                        <ul>
                            <li>Technogym Bike</li>
                            <li>A pair of 1.5kg cast iron weights</li>
                            <li>Delivery and setup</li>
                            <li>24 months warranty</li>
                        </ul>
                    </div>
                    <div class="${ID}-warranty">24 ${__('months warranty')}</div>
                </div>
                <div class="${ID}_box ${ID}_monthly" box-target="monthly" option-name="Pay monthly">
                    <div class="${ID}-title">
                        <div class="${ID}-radioButton"><span></span></div> 
                        <h3>${__('Pay monthly')}</h3>
                    </div>
                    <p class="${ID}_boxPrice">${__('<b>£71.00</b> a month')}</p>
                    <span class="${ID}-finance">${__('over 36 months, no deposit, 0% APR')}</span>
                    <div class="${ID}-includes">
                        <p>Includes:</p>
                        <ul>
                            <li>Technogym Bike</li>
                            <li>A pair of 1.5kg cast iron weights</li>
                            <li>Delivery and setup</li>
                            <li>36 months warranty</li>
                        </ul>
                    </div>
                    <div class="${ID}-warranty">36 ${__('months warranty')}</div>
                </div>
                <div class="${ID}_button ${ID}-next" option-target="classes">Add your classes</div>`
            ]
        },
        classes: {
            markup: [
                `
                <div class="${ID}-options ${ID}-fullPay">
                    <div class="${ID}_boxDesc">
                        <h3>${__('2. Select your classes')}</h3>
                        <p>${__('You only pay from the first login on the Technogym bike. Subscription can be cancelled or modified at any time')}</p>
                    </div>
                    <div class="${ID}-error_message">${__('Please select an option')}</div>
                
                    <div class="${ID}_box ${ID}_rebel" box-target="rebel-full" option-name="Rebel classes">
                        <div class="${ID}-title">
                            <div class="${ID}-radioButton">
                                <span></span>
                            </div> 
                            <div class="${ID}_logo"></div>
                        </div>
                        <p class="${ID}_boxPrice">${__('<b>£36.00</b> a month')}</p>
                        <p class="${ID}_desc">${__('Subscription to 1Rebel classes, in live streaming from London and on demand, in English.')}</p>
                    </div>
                    <div class="${ID}_box ${ID}_revolution" box-target="revolution-full" option-name="Revolution classes">
                        <div class="${ID}-title">
                            <div class="${ID}-radioButton">
                                <span></span>
                            </div> 
                            <div class="${ID}_logo"></div>
                        </div>
                        <p class="${ID}_boxPrice">${__('<b>£34.00</b> a month')}</p>
                        <p class="${ID}_desc">${__('Subscription to Revolution classes, in live streaming from Milan and on demand, in Italian, English, Spanish and French.')}</p>
                    </div>
                    <div class="${ID}_box ${ID}_combined" box-target="combinedClass-full" option-name="Rebel & Revolution classes">
                        <div class="${ID}-title">
                            <div class="${ID}-radioButton">
                                <span></span>
                            </div> 
                            <div class="${ID}_logo ${ID}_rebel"></div>
                            <div class="${ID}_plus"></div>
                            <div class="${ID}_logo ${ID}_revolution"></div>
                        </div>
                        <p class="${ID}_boxPrice">${__('<b>£49.00</b> a month')}</p>
                        <p class="${ID}_desc">${__('Subscription to all classes, in live streaming from Milan and on demand, in Italian, English, Spanish and French.')}</p>
                    </div>
                    <div class="${ID}_button ${ID}-next" option-target="accessories">Add your accessories</div>
                    <div class="${ID}-backLink" option-target="payment">Back to payment type</div>
                </div>
                <div class="${ID}-options ${ID}-monthlyPay">
                    <div class="${ID}_boxDesc">
                        <h3>${__('2. Select your classes')}</h3>
                        <p>${__('You only pay from the first login on the Technogym bike. Subscription can be cancelled or modified at any time')}</p>
                    </div>
                    <div class="${ID}-error_message">${__('Please select an option')}</div>
                    <div class="${ID}_box ${ID}_rebel" box-target="rebel-monthly" option-name="Rebel classes">
                        <div class="${ID}-title">
                            <div class="${ID}-radioButton">
                                <span></span>
                            </div> 
                            <div class="${ID}_logo"></div>
                        </div>
                        <p class="${ID}_boxPrice">${__('<b>£36.00</b> a month')}</p>
                        <p class="${ID}_desc">${__('Subscription to 1Rebel classes, in live streaming from London and on demand, in English.')}</p>
                    </div>
                    <div class="${ID}_box ${ID}_revolution" box-target="revolution-monthly" option-name="Revolution classes">
                        <div class="${ID}-title">
                            <div class="${ID}-radioButton">
                                <span></span>
                            </div> 
                            <div class="${ID}_logo"></div>
                        </div>
                        <p class="${ID}_boxPrice">${__('<b>£34.00</b> a month')}</p>
                        <p class="${ID}_desc">${__('Subscription to Revolution classes, in live streaming from Milan and on demand, in Italian, English, Spanish and French.')}</p>
                    </div>
                    <div class="${ID}_box ${ID}_combined" box-target="combinedClass-monthly" option-name="Rebel & Revolution classes">
                        <div class="${ID}-title">
                            <div class="${ID}-radioButton">
                                <span></span>
                            </div> 
                            <div class="${ID}_logo ${ID}_rebel"></div>
                            <div class="${ID}_plus"></div>
                            <div class="${ID}_logo ${ID}_revolution"></div>
                        </div>
                        <p class="${ID}_boxPrice">${__('<b>£49.00</b> a month')}</p>
                        <p class="${ID}_desc">${__('Subscription to all classes, in live streaming from Milan and on demand, in Italian, English, Spanish and French.')}</p>
                    </div>
                    <div class="${ID}_CTA">Add to cart</div>
                    <div class="${ID}-backLink" option-target="payment">Back to payment type</div>
                </div>`
                
            ]
        },
        accessories: {
            markup: [
                `
                <div class="${ID}_boxDesc">
                    <h3>${__('3. Add accessories')}</h3>
                    <p>(${__('Optional')})</p>
                </div>
                <div class="${ID}-error_message">${__('Please fill in required fields')}</div>
                <div class="${ID}-accessoriesItems"></div>
                <div class="${ID}_CTA ${ID}-next">Add to cart</div>
                <div class="${ID}-backLink" option-target="classes">Back to classes</div>`
            ]
        }
    };


    Object.keys(boxes).forEach((i) => {
        const data = boxes[i];
        const optionBoxWrap = document.createElement('div');
        optionBoxWrap.classList.add(`${ID}-optionBox_wrapper`);
        optionBoxWrap.id =`${ID}-${[i][0]}`;
        optionBoxWrap.innerHTML = data.markup[0];      
        document.querySelector(`.${ID}_selectionBoxes`).appendChild(optionBoxWrap);
    });
}