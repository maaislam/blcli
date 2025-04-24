import shared from '../shared';
import { __ } from '../helpers';

const { ID } = shared;

export default class Markup {
    constructor() {
        this.create();
        this.render();
    }

    create() {
        const element = document.createElement('div');
        element.classList.add(`${ID}_container`);
        element.innerHTML =
            `<div class="${ID}-header">
                <div class="${ID}-logo"><a href="/"></a></div>
                <div class="${ID}-intro">
                    <div class="${ID}-inner_text">
                        <h1>${__('Discover Cycling')}</h1>
                        <p>${__('Our stationary cycles can deliver the most realistic feeling and help your motivation.')}</p>
                        <div class="${ID}-cta"><a href="https://www.technogym.com/gb/products/shopby/product_type-exercise_bikes.html" target="_blank">${__('See all bikes')}</a></div>
                    </div>
                </div>
            </div>
            <div class="${ID}-mainForm">
                <div class="${ID}-success_message">
                    <h3>Thanks, your brochure is now ready to download</h3>
                </div>
                <div class="${ID}-form_headerText">
                    <h2>${__('Find the right product for you')}</h2>
                    <p>${__('Simply fill in the form and one of our consultants will get back to you.')}</p>
                </div>
            </div>
            <section class="${ID}-section ${ID}-mainProduct">
                <div class="${ID}-main_inner">
                    <div class="${ID}-main_text">
                        <h2>${__('Technogym bike: <br>The best training experience')}</h2>
                        <p>${__('Techogym’s latest innovation allowing you to experience at home, at the gym or at a hotel, live or on demand, fitness classes with your favourite trainers')}</p>
                        <span class="${ID}-price">${__('£2,450')} <span class="${ID}-financeBike">${__('Finance options available')}</span></span>
                        <div class="${ID}-cta"><a href="${__('https://www.technogym.com/gb/indoor-cycling-live-bike.html')}" target="_blank">Learn More</a></div>
                    </div>
                    <div class="${ID}-main_Image">
                        <div class="${ID}-product_images">
                            <img src="//cdn.optimizely.com/img/8355110909/ed7c861a2d3544fe90780c94b3e405c3.png"/>
                            <img src="//cdn.optimizely.com/img/8355110909/0503a37d7c784cc0a94cb81270060eb5.png"/>
                            <img src="//cdn.optimizely.com/img/8355110909/0d1517d17fd841eb93142a295638c580.png"/>
                        </div>
                    </div>
                </div>
            </section>
            <section class="${ID}-section ${ID}-bestselling">
                <div class="${ID}-title_text">
                    <h2>${__('Best selling bikes')}</h2>
                    <p>${__('Take every chance to pedal your way to wellness, burn calories and bring your athletic performance to the next level.')}</p>
                </div>
                <div class="${ID}-bestSell_products"></div>
            </section>
            <section class="${ID}-section ${ID}-moreProducts">
                <div class="${ID}-title_text">
                    <h2>${__('More like this')}</h2>
                    <p>${__('Take every chance to pedal your way to wellness, burn calories and bring your athletic performance to the next level.')}</p>
                </div>
                </section>
            <section class="${ID}-section ${ID}-contact">
            <div class="${ID}-title_text">
                <h2>${__("Not what you're looking for?")}</h2>
                <a class="${ID}-cta" target="_blank" href="/contacts">${__('Contact Us')}</a>
            </div>
            </section>`;
        this.component = element;

        // move the form
        const currentForm = document.querySelector('#form-wrapper');
        element.querySelector(`.${ID}-mainForm`).appendChild(currentForm);
    }

    render() {
        const { component } = this;
        document.querySelector('.title-form').insertAdjacentElement('afterend', component);
    }
}
 