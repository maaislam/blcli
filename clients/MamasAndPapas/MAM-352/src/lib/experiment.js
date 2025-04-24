/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

    setup();

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
    console.log(ID)

    // hideElem('mp-drawer')
    // hideElem('modal-overlay')

    // addNewModal()

    variationOne()

};

var hideElem = (elemClass) => {
    document.querySelector(`.${elemClass}`).classList.add(`${ID}-hide-elem`)
}

var addNewModal = () => {
    let newModal = document.createElement('div')
    newModal.classList.add(`${ID}-new-modal`)
    let header = document.querySelector('#shopify-section-header')
    header.insertAdjacentElement('afterend', newModal)
}

var variationOne = () => {
    document.querySelector('.cart.drawer__content').classList.add(`${ID}-newHeight`);

    var variationOneParent =

        `
    <div class="${ID}-parent-container">
        <div class="${ID}-main-mssg-container">
            <div class="drawer__header">
                <span class="title">You Will Also Need</span>
            </div>
        </div>
        <div class="${ID}-main-slider-container">
            <div class="${ID}-product-parent-container">
                <img class="${ID}-img-container" src="https://source.unsplash.com/1600x900/?beach"></img>
                <div class="${ID}-product-name">Product name over two lines looks like this.</div>
                <div class="${ID}-item-price">£14.25</div>
                <a href="#" class="cart__checkout btn btn--solid-color">Add to Bag</a>
            </div>
            <div class="${ID}-product-parent-container">
                <img class="${ID}-img-container" src="https://source.unsplash.com/1600x900/?beach"></img>
                <div class="${ID}-product-name">Product name over two lines looks like this.</div>
                <div class="${ID}-item-price">£14.25</div>
                <a href="#" class="cart__checkout btn btn--solid-color">Add to Bag</a>
            </div>
            <div class="${ID}-product-parent-container">
                <img class="${ID}-img-container" src="https://source.unsplash.com/1600x900/?beach"></img>
                <div class="${ID}-product-name">Product name over two lines looks like this.</div>
                <div class="${ID}-item-price">£14.25</div>
                <a href="#" class="cart__checkout btn btn--solid-color">Add to Bag</a>
            </div>
            <div class="${ID}-product-parent-container">
                <img class="${ID}-img-container" src="https://source.unsplash.com/1600x900/?beach"></img>
                <div class="${ID}-product-name">Product name over two lines looks like this.</div>
                <div class="${ID}-item-price">£14.25</div>
                <a href="#" class="cart__checkout btn btn--solid-color">Add to Bag</a>
            </div>
            <div class="${ID}-product-parent-container">
                <img class="${ID}-img-container" src="https://source.unsplash.com/1600x900/?beach"></img>
                <div class="${ID}-product-name">Product name over two lines looks like this.</div>
                <div class="${ID}-item-price">£14.25</div>
                <a href="#" class="cart__checkout btn btn--solid-color">Add to Bag</a>
            </div>
            <div class="${ID}-product-parent-container">
                <img class="${ID}-img-container" src="https://source.unsplash.com/1600x900/?beach"></img>
                <div class="${ID}-product-name">Product name over two lines looks like this.</div>
                <div class="${ID}-item-price">£14.25</div>
                <a href="#" class="cart__checkout btn btn--solid-color">Add to Bag</a>
            </div>
            <div class="${ID}-product-parent-container">
                <img class="${ID}-img-container" src="https://source.unsplash.com/1600x900/?beach"></img>
                <div class="${ID}-product-name">Product name over two lines looks like this.</div>
                <div class="${ID}-item-price">£14.25</div>
                <a href="#" class="cart__checkout btn btn--solid-color">Add to Bag</a>
            </div>
        </div>
    </div>
    `

    document.querySelector('#sidebar-cart > div.cart.drawer__content.MAM-352-newHeight').insertAdjacentHTML('afterend', variationOneParent)

    $(`.${ID}-main-slider-container`).slick({
        dots: false,
        infinite: false,
        speed: 300,
        arrows: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

}